import { createApp } from 'vue';
import App from '../App.vue';
import { setupRouter } from '@/router';
import 'ant-design-vue/dist/reset.css';
import { setupStore } from '@/store';
import { setupI18n } from '@/locale';
import { registerGlobComp } from '@/components/registerGlobComp';
import { initAppConfigStore } from '@/init';

async function bootstrap() {
  const app = createApp(App);

  // 配置 store
  setupStore(app);

  // 初始化内部系统配置
  initAppConfigStore();

  // 注册全局组件
  registerGlobComp(app);

  // 多语言配置
  await setupI18n(app);

  // 配置路由
  setupRouter(app);

  app.mount('#app');
}

bootstrap()
