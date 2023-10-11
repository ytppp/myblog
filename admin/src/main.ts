import { createApp } from 'vue';
import { setupRouter } from '@/router';
import { setupI18n } from '@/locale';
import { setupStore } from '@/store';
import App from './App.vue';
import 'ant-design-vue/dist/reset.css';

async function bootstrap() {
  const app = createApp(App)
  
  // 配置 store
  setupStore(app);

  // 多语言配置
  setupI18n(app);

  // 配置 路由
  setupRouter(app);
  
  app.mount('#app')
}

bootstrap()
