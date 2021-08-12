<template>
  <el-dialog title="添加知识库" v-model="addVisible" center width="50%" :before-close="handleClose">
    <el-form :model="ruleForm" :rule="rules" label-width="100px" ref="formRef">
      <el-form-item label="仓库名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="slug">
        <el-input disabled v-model="ruleForm.slug"></el-input>
      </el-form-item>
      <el-form-item label="是否公开">
        <el-select v-model="ruleForm.public" placeholder="请选择是否公开">
          <el-option label="私密" :value="0"></el-option>
          <el-option label="所有人可见" :value="1"></el-option>
          <el-option label="空间成员可见" :value="2"></el-option>
          <el-option label="空间所有人（含外部联系人）可见" :value="3"></el-option>
          <el-option label="知识库成员可见" :value="4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="文档格式">
        <el-select disabled v-model="ruleForm.type" placeholder="请选择文档格式">
          <el-option label="Book" value="Book"></el-option>
          <el-option label="Design" value="Design"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="说明">
        <el-input type="textarea" :rows="4" v-model="ruleForm.description"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button v-loading="loadingAdd" @click="addVisible = false">取 消</el-button>
        <el-button type="primary" v-loading="loadingAdd" @click="addSubmit">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { KnowledgeBaseTypeData } from "@/types/yuque/knowledge_base";
import Business from "@/utils/business";
import { reqDel, reqPost, reqPut } from "@/utils/request";
import { defineComponent, h, reactive, ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";

export default defineComponent({
  setup(props, { emit }) {
    const addVisible = ref(false);
    const loadingAdd = ref(false);
    const formRef = ref()
    const ruleForm = reactive({
      name: "",
      slug: Date.now(),
      public: 0,
      type: "Book",
      description: "",
      id: 0,
    })
    const rules = {
      name: [
        {
          required: true, message: '请输入活动名称',
          trigger: 'blur'
        }
      ]
    }

    function handleClose() {
      addVisible.value = false;
    }

    function openShow(val?: KnowledgeBaseTypeData, delStatus?: string) {
      ruleForm.name = '';
      ruleForm.description = '';
      ruleForm.id = 0;
      ruleForm.slug = Date.now();
      if (!delStatus) {
        addVisible.value = true;
      }
      if (val) {
        // 修改
        ruleForm.name = val.name;
        ruleForm.slug = Number(val.slug);
        ruleForm.public = val.public;
        ruleForm.type = val.type;
        ruleForm.description = val.description;
        ruleForm.id = val.id;
        if (delStatus) {
          // 删除
          ElMessageBox.prompt('提示', {
            title: "提示",
            message: h('p', null, [
              h('span', null, '删除的仓库是 '),
              h('i', { style: 'color: red' }, val.name)
            ]),
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            inputErrorMessage: "输入不正确",
            beforeClose: (action, instance, done) => {
              console.log(action)
              console.log(instance)
              if (action === 'confirm') {
                instance.confirmButtonLoading = true;
                if (instance.inputValue === val.name) {
                  reqDel(`/repos/${val.id}`).then(res => {
                    instance.confirmButtonLoading = false;
                    refresh("删除");
                    done()
                  }).catch(err => {
                    instance.confirmButtonLoading = false;
                  })
                } else {
                  ElMessage.info("请输入正确的仓库名称");
                  instance.confirmButtonLoading = false;

                }
              } else {
                done();
              }
            }
          });
        }
      }

    }

    function addSubmit() {
      Business.getUserInfo().then((userRes) => {
        if (userRes) {
          console.log(userRes, 'res')
          if (ruleForm.name) {
            loadingAdd.value = true;
            if (!ruleForm.id) {
              reqPost(`/users/${userRes.id}/repos`, ruleForm).then(res => {
                console.log(res);
                refresh("添加");
              }).catch(err => {
                loadingAdd.value = false;
              })
            } else {
              reqPut(`/repos/${ruleForm.id}`, ruleForm).then(res => {
                console.log(res);
                refresh("修改");
              }).catch(err => {
                loadingAdd.value = false;
              })
            }
          } else {
            ElMessage.info("请输入名称")
          }
        }
      });

    }

    function refresh(val: string) {
      ElMessage.success(val + "成功")
      loadingAdd.value = false;
      addVisible.value = false;
      emit("refresh")
    }
    return {
      addVisible,
      loadingAdd,
      formRef,
      ruleForm,
      rules,
      handleClose,
      addSubmit,
      openShow,
    }
  }
})
</script>

<style>
</style>