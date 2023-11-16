import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import './style.css';
import App from './App.vue';
import router from './router/router.ts';
// 引入pinia并实例化
import pinia from './store/store.ts';
import '@/assets/font/iconfont.css';

const app = createApp(App);
app.use(router);
app.use(ElementPlus);
app.use(pinia);
app.mount('#app');
