import { createApp } from 'vue';
import App from './App.vue';

// element-plus
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';

//router
import router from '@/router/router';

const app = createApp(App);

app.use(ElementPlus, { size: 'small', zIndex: 3000 }).use(router);
app.mount('#app');
