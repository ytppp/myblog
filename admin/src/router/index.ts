import type { App } from 'vue';
import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router';
import { Page404Route } from './basic';
import { mainOutRoutes } from './main-out';
import { PageEnum } from './constant';

// import.meta.glob() 直接引入所有的模块 Vite 独有的功能
const modules = import.meta.glob('./modules/**/*.ts', { eager: true });
const routeModuleList: RouteRecordRaw[] = [];

// 加入到路由集合中
Object.keys(modules).forEach((key) => {
  const mod = (modules as Recordable)[key].default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeModuleList.push(...modList);
});

// 需要验证权限
export const asyncRoutes = [Page404Route, ...routeModuleList];

// 登录路由
export const LoginRoute: RouteRecordRaw = {
  path: '/login',
  name: 'Login',
  component: () => import('@/views/login/index.vue'),
  meta: {
    title: 'Login',
  },
};

// 根路由
export const RootRoute: RouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: PageEnum.BASE_HOME,
  meta: {
    title: 'Root',
  },
};

// 普通路由 无需验证权限
export const constantRouter: RouteRecordRaw[] = [
  RootRoute,
  LoginRoute,
  ...mainOutRoutes,
  Page404Route,
];

export const router = createRouter({
  // 创建一个 hash 历史记录
  history: createWebHashHistory(),
  // 应该添加到路由的初始路由列表。
  routes: constantRouter,
  // 是否应该禁止尾部斜杠。默认为假
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

export function setupRouter(app: App<Element>) {
  app.use(router);
}