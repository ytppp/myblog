import { createApp } from 'vue'
import App from './App.vue'
import 'ant-design-vue/dist/reset.css';

async function bootstrap() {
  const app = createApp(App)
  
  app.mount('#app')
}

bootstrap()
