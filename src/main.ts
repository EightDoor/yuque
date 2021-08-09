//router
import router from '@/router/router';
// element-plus
import ElementPlus from 'element-plus';
import 'element-plus/packages/theme-chalk/src/index.scss';
import { createApp } from 'vue';
import App from './App.vue';
import '@/assets/styles/common.less';
// vuex
import store from '@/store/store';
// 编辑器
import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
import Prism from 'prismjs';

VueMarkdownEditor.use(vuepressTheme, {
  Prism,
});

const app = createApp(App);

app
  .use(ElementPlus, { size: 'small', zIndex: 3000 })
  .use(VueMarkdownEditor)
  .use(router)
  .use(store);
app.mount('#app');
