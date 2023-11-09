import { createApp } from 'vue';
import { setupRouter } from '@/router';
import { setupI18n } from '@/locale';
import { setupStore } from '@/store';
import App from './App.vue';
import 'ant-design-vue/dist/reset.css';
import { initAppConfigStore } from './init';
import { registerGlobComp } from './components/registerGlobComp';
import '@/style/app.css'

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
  
  app.mount('#app');
}

bootstrap()
