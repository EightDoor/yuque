<template>
  <div>
    <div class="userInfo">{{ userInfo.name }}</div>
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
                <el-dropdown-item icon="el-icon-folder-add" @click="add(item)">添加</el-dropdown-item>
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
                    <el-dropdown-item icon="el-icon-plus">测试添加其他内容</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </template>
        </li>
      </ul>
      <el-backtop target=".containerSilder"></el-backtop>
    </div>

    <el-dialog title="添加" v-model="addVisible" center width="50%" :before-close="handleClose">
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
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { UserInfoData } from '@/types/yuque/user';
import Business from '@/utils/business';
import { reqGet, reqPost } from '@/utils/request';
import {
  KnowledgeBaseType,
  KnowledgeBaseTypeData,
} from '@/types/yuque/knowledge_base';
import utils from '@/utils/index';
import { TocList, TocListData } from '@/types/yuque/toc_list';
import { ElMessage } from 'element-plus';
import { useStore } from 'vuex';
import { BaseStateType } from '@/store/store';
import { ContentDetail } from '@/types/yuque/content_detail';

const Slider = defineComponent({
  name: 'slider',
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
    function getKnowledgeBase() {
      reqGet<KnowledgeBaseType>(`users/${userInfo.value.id}/repos`, {
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

    // 添加文章
    const addVisible = ref(false)
    const loadingAdd = ref(false)
    const defaultForm = {
      "title": "",
      "slug": Date.now(),
      "public": 0,
      "format": "markdown",
      "body": "",
    }
    let ruleForm = reactive(defaultForm);
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
      ruleForm = defaultForm;
      addTocData.value = item;
      addVisible.value = true;
    }
    function handleClose() {
      addVisible.value = false;
    }
    function addSubmit() {
      if (addTocData.value) {
        loadingAdd.value = true;
        reqPost<ContentDetail>(`/repos/${addTocData.value.id}/docs`, ruleForm).then(res => {
          console.log("添加成功了", res);
          loadingAdd.value = false;
          addVisible.value = false;
          changeRepo(addTocData.value);
          ElMessage.success("添加成功")
          store.commit('update', {
            data: res.data,
            know: addTocData,
          });
        }).catch(err => {
          loadingAdd.value = false;
        })
      }
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
      // Toc目录
      loadingToc,
      changeChild,
      currentIndex,

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
