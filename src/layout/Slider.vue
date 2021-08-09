<template>
  <div class="userInfo">
    {{ userInfo.name }}
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
        <el-dropdown trigger="contextmenu" :tabindex="index">
          <span class="el-dropdown-link">
            <div class="name">
              <img class="img" src="/images/yuque/name.png" />{{ item.name }}
            </div>
            <div class="count">
              <img class="img" src="/images/yuque/count.png" />{{
                item.items_count
              }}
            </div>
            <div class="time">
              <img class="img" src="/images/yuque/update_time.png" />{{
                format(item.content_updated_at)
              }}
            </div>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item icon="el-icon-refresh"> 刷新</el-dropdown-item>
              <el-dropdown-item icon="el-icon-folder-add">
                添加</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>

        <template v-if="item.isShow">
          <div class="child" v-for="(v, vindex) in item.list" :key="vindex">
            <el-dropdown trigger="contextmenu" :tabindex="index">
              <span
                @click.stop="changeChild(v, item)"
                class="el-dropdown-link childTitle"
              >
                {{ v.title }}
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item icon="el-icon-plus"
                    >测试添加其他内容</el-dropdown-item
                  >
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </template>
      </li>
    </ul>
  </div>
  <el-backtop target=".containerSilder"></el-backtop>
</template>
<script lang="ts">
import { defineComponent, reactive, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { UserInfoData } from '@/types/yuque/user';
import Business from '@/utils/business';
import { reqGet } from '@/utils/request';
import {
  KnowledgeBaseType,
  KnowledgeBaseTypeData,
} from '@/types/yuque/knowledge_base';
import utils from '@/utils/index';
import { TocList, TocListData } from '@/types/yuque/toc_list';
import { Refresh, FolderAdd } from '@element-plus/icons';
import { ElMessage } from 'element-plus';
import { useStore } from 'vuex';
import { BaseStateType } from '@/store/store';

const Slider = defineComponent({
  name: 'slider',
  components: {
    Refresh,
    FolderAdd,
  },
  setup() {
    const store = useStore<BaseStateType>();
    const offset = 10000;
    const knowledgeBaseData = ref<KnowledgeBaseTypeData[]>([]);
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
    function changeRepo(val: KnowledgeBaseTypeData) {
      console.log(val);
      loadingToc.value = true;
      getTocList(val.namespace, val.id);
    }
    function getTocList(namespace: string, id: number) {
      const index = knowledgeBaseData.value.findIndex((item) => item.id === id);
      if (index !== -1) {
        const child = knowledgeBaseData.value[index].list;
        if (child && child.length > 0) {
          knowledgeBaseData.value[index].isShow =
            knowledgeBaseData.value[index].isShow != null
              ? !knowledgeBaseData.value[index].isShow
              : false;
          loadingToc.value = false;
        } else {
          reqGet<TocList>(`/repos/${namespace}/toc`).then((res) => {
            console.log(res, 'res');
            loadingToc.value = false;
            knowledgeBaseData.value[index].list = res.data;
            knowledgeBaseData.value[index].isShow = true;
          });
        }
      }
    }
    function changeChild(val: TocListData, item: KnowledgeBaseTypeData) {
      console.log(val);
      if (val.type === 'DOC') {
        store.commit('update', {
          data: val,
          know: item,
        });
      } else {
        ElMessage({
          type: 'info',
          message: `当前的类型为: ${val.type}`,
        });
      }
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
    };
  },
});

export default Slider;
</script>
<style lang="less" scoped>
@import 'slider.module';
</style>
