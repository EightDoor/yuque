<template>
  <div>
    首页123123
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { log } from '@/utils/log';

const Home = defineComponent({
  name: 'home',
  setup() {
    onMounted(() => {
      log('测试内容');
    });
  },
});

export default Home;
</script>
