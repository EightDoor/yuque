<template>
  <el-container>
    <el-aside width="100px">
      <Slider />
    </el-aside>
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import Slider from '@/layout/Slider.vue';

const BaseLayout = defineComponent({
  name: 'baseLayout',
  components: { Slider },
  setup() {},
});

export default BaseLayout;
</script>
