<template>
  <div>
    <div class="userInfo">
      <div>{{ userInfo.name }}</div>
      <div>
        <el-tooltip effect="dark" content="添加知识库" placement="bottom-start">
          <img
            @click="addKnowledge"
            class="knowledgeBaseAdd"
            src="/images/yuque/knowledge_base.png"
            alt
          />
        </el-tooltip>
      </div>
    </div>
    <div class="containerSilder">
      <ul class="ul">
        <li
          @click="changeRepo(item)"
          class="top"
          v-for="(item, index) in knowledgeBaseData"
          :key="index"
          v-loading="loadingToc"
        >
          <el-dropdown trigger="contextmenu" :tabindex="index" placement="top">
            <span class="el-dropdown-link">
              <div class="name">
                <img class="img" src="/images/yuque/name.png" />
                {{ item.name }}
              </div>
              <div class="count">
                <img class="img" src="/images/yuque/count.png" />
                {{
                  item.items_count
                }}
              </div>
              <div class="time">
                <img class="img" src="/images/yuque/update_time.png" />
                {{
                  format(item.content_updated_at)
                }}
              </div>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item icon="el-icon-refresh" @click="refresh(item)">刷新</el-dropdown-item>
                <el-dropdown-item icon="el-icon-folder-add" @click="add(item)">添加文档</el-dropdown-item>
                <el-dropdown-item icon="el-icon-edit" @click="editKnowledge(item)">编辑知识库</el-dropdown-item>
                <el-dropdown-item icon="el-icon-delete" @click="delKnowledge(item)">删除知识库</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>

          <template v-if="item.isShow">
            <div class="child" v-for="(v, vindex) in item.list" :key="vindex">
              <el-dropdown trigger="contextmenu" :tabindex="index">
                <span
                  :style="currentIndex === vindex ? { color: 'red' } : {}"
                  @click.stop="changeChild(v, item, vindex)"
                  class="el-dropdown-link childTitle"
                >{{ v.title }}</span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item icon="el-icon-edit" @click="editToc(v, item)">编辑文档</el-dropdown-item>
                    <el-dropdown-item icon="el-icon-delete" @click="deleteToc(v, item)">删除文档</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </template>
        </li>
      </ul>
      <el-backtop target=".containerSilder"></el-backtop>
    </div>

    <el-dialog title="添加文档" v-model="addVisible" center width="50%" :before-close="handleClose">
      <el-form :model="ruleForm" :rule="rules" label-width="100px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="slug">
          <el-input disabled v-model="ruleForm.slug"></el-input>
        </el-form-item>
        <el-form-item label="是否公开">
          <el-select v-model="ruleForm.public" placeholder="请选择是否公开">
            <el-option label="私密" :value="0"></el-option>
            <el-option label="公开" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文档格式">
          <el-select disabled v-model="ruleForm.format" placeholder="请选择文档格式">
            <el-option label="markdown" value="markdown"></el-option>
            <el-option label="html" value="html"></el-option>
            <el-option label="lake" value="lake"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button v-loading="loadingAdd" @click="addVisible = false">取 消</el-button>
          <el-button type="primary" v-loading="loadingAdd" @click="addSubmit">确 定</el-button>
        </span>
      </template>
    </el-dialog>
    <knowledge-baseVue ref="knowledgeRef" @refresh="getKnowledgeBase"></knowledge-baseVue>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, onMounted, ref, h } from 'vue';
import { useRouter } from 'vue-router';
import { UserInfoData } from '@/types/yuque/user';
import Business from '@/utils/business';
import { reqDel, reqGet, reqPost, reqPut } from '@/utils/request';
import {
  KnowledgeBaseType,
  KnowledgeBaseTypeData,
} from '@/types/yuque/knowledge_base';
import utils from '@/utils/index';
import { TocList, TocListData } from '@/types/yuque/toc_list';
import { ElMessage, ElMessageBox } from 'element-plus';
import { useStore } from 'vuex';
import { BaseStateType } from '@/store/store';
import { ContentDetail } from '@/types/yuque/content_detail';
import knowledgeBaseVue from './knowledgeBase.vue';
import { cloneDeep } from 'lodash';

const Slider = defineComponent({
  name: 'slider',
  components: {
    knowledgeBaseVue,
  },
  setup() {
    const store = useStore<BaseStateType>();
    const offset = 10000;
    const knowledgeBaseData = ref<KnowledgeBaseTypeData[]>([]);
    const currentIndex = ref(-1);
    const loadingToc = ref(false);
    let userInfo = ref<Partial<UserInfoData>>({});
    const router = useRouter();
    const list = reactive<Layout.SliderType[]>([
      {
        title: '首页',
        url: 'home',
      },
    ]);
    function change(item: any) {
      console.log(`当前选择的: ${JSON.stringify(item)}`);
      router.push(item.url);
    }

    onMounted(() => {
      Business.getUserInfo().then((res) => {
        if (res) {
          userInfo.value = res;
          console.log(userInfo, 'user');
          getKnowledgeBase();
        }
      });
    });

    // 知识库
    const knowledgeRef = ref();
    function getKnowledgeBase() {
      return reqGet<KnowledgeBaseType>(`users/${userInfo.value.id}/repos`, {
        type: 'all',
        offset: offset,
      }).then((res) => {
        knowledgeBaseData.value = res.data;
      });
    }
    function format(val: string) {
      return utils.formatTime(val);
    }
    function changeRepo(val?: KnowledgeBaseTypeData, refresh?: boolean) {
      if (val) {
        console.log(val);
        loadingToc.value = true;
        getTocList(val.namespace, val.id, refresh)
      }
    }
    function getTocList(namespace: string, id: number, refresh?: boolean) {
      const index = knowledgeBaseData.value.findIndex((item) => item.id === id);
      console.log(index,)
      console.log(knowledgeBaseData.value)
      if (index !== -1) {
        const child = knowledgeBaseData.value[index].list;
        if (child && child.length > 0 && !refresh) {
          knowledgeBaseData.value[index].isShow =
            knowledgeBaseData.value[index].isShow != null
              ? !knowledgeBaseData.value[index].isShow
              : false;
          loadingToc.value = false;

        } else {
          // `/repos/${namespace}/toc`
          reqGet<TocList>(`/repos/${namespace}/docs`).then((res) => {
            console.log(res, 'res');
            loadingToc.value = false;
            knowledgeBaseData.value[index].list = res.data;
            knowledgeBaseData.value[index].isShow = true;
          });
        }
      }
    }
    function changeChild(val: TocListData, item: KnowledgeBaseTypeData, index: number) {
      currentIndex.value = index;
      console.log(val);
      store.commit('update', {
        data: val,
        know: item,
      });
      // if (val.type === 'DOC') {

      // } else {
      //   ElMessage({
      //     type: 'info',
      //     message: `当前的类型为: ${val.type}`,
      //   });
      // }
    }
    function addKnowledge() {
      knowledgeRef.value.openShow();
    }
    function editKnowledge(item: KnowledgeBaseTypeData) {
      knowledgeRef.value.openShow(item);
    }

    function delKnowledge(item: KnowledgeBaseTypeData) {
      knowledgeRef.value.openShow(item, 'del');
    }

    // 添加文章
    const addVisible = ref(false)
    const loadingAdd = ref(false)
    const defaultForm = {
      "title": "",
      "slug": Date.now(),
      "public": 0,
      "format": "markdown",
      "body": "",
      "id": 0,
    }
    let ruleForm = reactive(defaultForm)
    const rules = {
      title: [
        {
          required: true,
          message: "请输入标题",
        }
      ]
    }
    const addTocData = ref<KnowledgeBaseTypeData>();
    function add(item: KnowledgeBaseTypeData) {
      console.log(item);
      ruleForm.title = "",
        ruleForm.slug = Date.now(),
        ruleForm.public = 0,
        ruleForm.format = "markdown",
        ruleForm.body = "";
      ruleForm.id = 0;
      addTocData.value = item;
      addVisible.value = true;
    }
    function handleClose() {
      addVisible.value = false;
    }
    function addSubmit() {
      if (addTocData.value) {
        loadingAdd.value = true;
        if (!ruleForm.id) {
          reqPost<ContentDetail>(`/repos/${addTocData.value.id}/docs`, ruleForm).then(async (res) => {
            await refreshData(res, '添加')
          }).catch(err => {
            loadingAdd.value = false;
          })
        } else {
          reqPut<ContentDetail>(`/repos/${addTocData.value.id}/docs/${ruleForm.id}`, ruleForm).then(async (res) => {
            await refreshData(res, '修改')
          }).catch(err => {
            loadingAdd.value = false;
          })
        }
      }
    }
    async function refreshData(res: ContentDetail, title: string) {
      loadingAdd.value = false;
      addVisible.value = false;
      await getKnowledgeBase();
      changeRepo(addTocData.value);
      ElMessage.success(title + "成功")
      store.commit('update', {
        data: res.data,
        know: addTocData,
      });
    }

    function editToc(v: TocListData, item: KnowledgeBaseTypeData) {
      loadingToc.value = true;
      reqGet<ContentDetail>(`/repos/${item.namespace}/docs/${v.slug}`).then(res => {
        const data = res.data;
        ruleForm.title = data.title,
          ruleForm.slug = Number(data.slug),
          ruleForm.public = data.public,
          ruleForm.format = data.format,
          ruleForm.body = data.body;
        ruleForm.id = data.id;
        addTocData.value = item;
        addVisible.value = true;
        loadingToc.value = false;
      }).catch(err => {
        loadingToc.value = false;
      })
    }
    function deleteToc(v: TocListData, item: KnowledgeBaseTypeData) {
      // 删除
      ElMessageBox.prompt('提示', {
        title: "提示",
        message: h('p', null, [
          h('span', null, '删除的仓库是 '),
          h('i', { style: 'color: red' }, v.title)
        ]),
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputErrorMessage: "输入不正确",
        beforeClose: (action, instance, done) => {
          console.log(action)
          console.log(instance)
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            if (instance.inputValue === v.title) {
              reqDel<ContentDetail>(`/repos/${item.id}/docs/${v.id}`).then(async (res) => {
                instance.confirmButtonLoading = false;
                await refreshData(res, '删除')
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

    // 刷新
    function refresh(item: KnowledgeBaseTypeData) {
      changeRepo(item, true);
    }
    return {
      change,
      list,

      // userInfo
      userInfo,
      // 知识库
      knowledgeBaseData,
      format,
      changeRepo,
      addKnowledge,
      editKnowledge,
      delKnowledge,
      getKnowledgeBase,
      // Toc目录
      loadingToc,
      changeChild,
      currentIndex,
      knowledgeRef,
      editToc,
      deleteToc,

      // 添加文档
      add,
      addVisible,
      handleClose,
      addSubmit,
      loadingAdd,
      ruleForm,
      rules,
      refresh,
    };
  },
});

export default Slider;
</script>
<style lang="less" scoped>
@import "slider.module";
</style>
