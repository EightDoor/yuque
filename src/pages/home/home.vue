<template>
  <div v-if="data" v-loading="loading" class="containerContent">
    <!-- <div v-html="text"></div> -->
    <div class="topBar">
      <div class="topBarItem">
        格式:
        <span>{{ data.data?.format }}</span>
      </div>
      <div class="topBarItem">
        字数:
        <span>{{ data.data?.comments_count }}</span>
      </div>
      <div class="topBarItem">
        更新时间:
        <span>{{ formatTime(data.data?.content_updated_at) }}</span>
      </div>
    </div>
    <editor @onSave="changeSave" class="editor" :toolbarsExclude="['github']" v-model="text" />
    <el-backtop target=".containerContent"></el-backtop>
  </div>
  <div v-else>
    <el-empty description="暂无内容"></el-empty>
  </div>
</template>
<script lang="ts" setup>
import { ref, watch, computed, onMounted, reactive } from 'vue';
import { log } from '@/utils/log';
import { reqGet, reqPut } from '@/utils/request';
import { ContentDetail } from '@/types/yuque/content_detail';
import { useStore } from 'vuex';
import { BaseStateType } from '@/store/store';
import { useRoute } from 'vue-router';
import Editor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import { TocListData } from '@/types/yuque/toc_list';
import { ElMessage } from 'element-plus';
import utils from '@/utils/index';


const store = useStore<BaseStateType>();
const data = ref<Partial<ContentDetail>>();
const loading = ref(false);
const text = ref<string>();
const sourceData = reactive<{
  namespace: string;
  data: Partial<TocListData>
}>({
  namespace: "",
  data: {}
})
const route = useRoute();

onMounted(() => {
  console.log(route.path)
})
// 获取文档详情
function getDetail(namespace: string, slug: string) {
  // const namespace = 'eightdoor/kgdyuu';
  // const slug = 'qv5glg';
  loading.value = true;

  reqGet<ContentDetail>(`repos/${namespace}/docs/${slug}`, { "raw": "1" }).then((res) => {
    console.log(res);
    data.value = res;
    text.value = res.data.body;
    loading.value = false;
  });
}

const result = computed(() => store.state.data);
watch(result, (newVal, oldVal) => {
  console.log('data', newVal);
  const name = store.state.know.namespace;
  sourceData.data = newVal;
  sourceData.namespace = name ?? "";
  if (name && newVal.slug) {
    getDetail(name, newVal.slug);
  }
});


function changeSave(val: string) {
  console.log(val, 'val')
  if (val) {
    loading.value = true;
    reqPut(`/repos/${sourceData.namespace}/docs/${sourceData.data.id}`, {
      "title": sourceData.data.title,
      "slug": sourceData.data.slug,
      "public": 0,
      "body": val,
    }).then(res => {
      loading.value = false;
      text.value = val;
      ElMessage.success("保存成功")
      console.log(res);
    })
  }
}

function formatTime(val: string) {
  return utils.formatTime(val);
}
</script>
<style lang="less" scoped>
.containerContent {
  min-height: 50vh;
}
.editor {
  height: 90vh;
}
.topBar {
  display: flex;
  height: 40px;
  flex-direction: row;
  justify-content: space-around;
}
.topBarItem {
  & > span {
    color: red;
    display: inline-block;
    margin-left: 5px;
  }
}
</style>
