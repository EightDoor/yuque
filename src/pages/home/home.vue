<template>
  <div v-if="data" v-loading="loading">
    <div v-html="text"></div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, watch, computed } from 'vue';
import { log } from '@/utils/log';
import { reqGet } from '@/utils/request';
import { ContentDetail } from '@/types/yuque/content_detail';
import { useStore } from 'vuex';
import { BaseStateType } from '@/store/store';

const Home = defineComponent({
  name: 'home',
  setup() {
    const store = useStore<BaseStateType>();
    const data = ref<Partial<ContentDetail>>();
    const loading = ref(false);
    const text = ref<string>();
    // 获取文档详情
    function getDetail(namespace: string, slug: string) {
      // const namespace = 'eightdoor/kgdyuu';
      // const slug = 'qv5glg';
      loading.value = true;

      reqGet<ContentDetail>(`repos/${namespace}/docs/${slug}`).then((res) => {
        console.log(res);
        data.value = res;
        text.value = res.data.body_html;
        loading.value = false;
      });
    }

    const result = computed(() => store.state.data);
    watch(result, (newVal, oldVal) => {
      const name = store.state.know.namespace;
      console.log('data', newVal);
      console.log('name', name);
      if (name && newVal.slug) {
        getDetail(name, newVal.slug);
      }
    });

    return {
      data,
      text,
      loading,
    };
  },
});

export default Home;
</script>
