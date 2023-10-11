import type { App } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
const Home = { template: '<div>Home</div>' }
const About = { template: '<div>About</div>' }

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/about', component: About },
  ],
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

export function setupRouter(app: App<Element>) {
  app.use(router);
}