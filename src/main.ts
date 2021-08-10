//router
import '@/assets/styles/common.less';
import router from '@/router/router';
// vuex
import store from '@/store/store';
// element-plus
import ElementPlus from 'element-plus';
import 'element-plus/packages/theme-chalk/src/index.scss';
import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);

app.use(ElementPlus, { size: 'small', zIndex: 3000 }).use(router).use(store)
app.mount('#app');
