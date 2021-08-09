<template>
  <el-container>
    <el-aside width="250px">
      <Slider />
    </el-aside>
    <el-main class="main">
      <router-view />
      <el-backtop target=".main"></el-backtop>
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
<styles scoped lang="less">
.main {
  height: 100vh;
  overflow-y: auto;
}
</styles>
