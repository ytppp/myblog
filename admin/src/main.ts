import { createApp } from 'vue';
import { router, setupRouter } from '@/router';
import { setupI18n } from '@/locale';
import { setupStore } from '@/store';
import App from './App.vue';
import 'ant-design-vue/dist/reset.css';
import { initAppConfigStore } from './init';
import { registerGlobComp } from './components/registerGlobComp';
import { setupRouterGuard } from './router/guard';

async function bootstrap() {
  const app = createApp(App);
  
  // Configure store
  setupStore(app);

  // Initialize internal system configuration
  initAppConfigStore();

  // register global components
  registerGlobComp(app);

  // Configure i18n
  await setupI18n(app);

  // Configure routing
  setupRouter(app);

  // router-guard
  setupRouterGuard(router);
  
  app.mount('#app');
}

bootstrap()
