<template>
  <ul class="ul">
    <li v-for="(item, index) in list" :key="index" @click="change(item)">
      {{ item.title }}
    </li>
  </ul>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { useRouter } from 'vue-router';

const Slider = defineComponent({
  name: 'slider',
  setup() {
    const router = useRouter();
    const list = reactive<Layout.SliderType[]>([
      {
        title: '首页',
        url: 'home',
      }
    ]);
    function change(item: any) {
      console.log(`当前选择的: ${JSON.stringify(item)}`);
      router.push(item.url);
    }
    return {
      //fun
      change,
      //data
      list,
    };
  },
});

export default Slider;
</script>
<style lang="less" scoped>
@import 'slider.module';
</style>
