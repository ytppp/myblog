// To see this message, add the following to the `<head>` section in your
// views/layouts/application.html.erb
//
//    <%= vite_client_tag %>
//    <%= vite_javascript_tag 'application' %>
console.log('Vite ⚡️ Rails')

// If using a TypeScript entrypoint file:
//     <%= vite_typescript_tag 'application' %>
//
// If you want to use .jsx or .tsx, add the extension:
//     <%= vite_javascript_tag 'application.jsx' %>

console.log('Visit the guide for more information: ', 'https://vite-ruby.netlify.app/guide/rails')

// Example: Load Rails libraries in Vite.
//
// import * as Turbo from '@hotwired/turbo'
// Turbo.start()
//
// import ActiveStorage from '@rails/activestorage'
// ActiveStorage.start()
//
// // Import all channels.
// const channels = import.meta.globEager('./**/*_channel.js')

// Example: Import a stylesheet in app/frontend/index.css
// import '~/index.css'


import { createApp } from 'vue';
import { setupRouter } from '@/router';
import { setupI18n } from '@/locale';
import { setupStore } from '@/store';
import App from '@/App.vue';
import 'ant-design-vue/dist/reset.css';
import { initAppConfigStore } from '@/init';
import { registerGlobComp } from '@/components/registerGlobComp';
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
