//router
import router from '@/router/router';
// element-plus
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import { createApp } from 'vue';
import App from './App.vue';
import '@/assets/styles/common.less'




const app = createApp(App);

app.use(ElementPlus, { size: 'small', zIndex: 3000 }).use(router);
app.mount('#app');
