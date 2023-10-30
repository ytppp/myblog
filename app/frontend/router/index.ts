import type { App } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';

export const router = createRouter({
  // 创建一个 hash 历史记录
  history: createWebHashHistory(),
  // 应该添加到路由的初始路由列表。
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/index.vue'),
    },
  ],
  // 是否应该禁止尾部斜杠。默认为假
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

export function setupRouter(app: App<Element>) {
  app.use(router);
}