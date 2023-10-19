import { PageEnum } from '@/constants/page';
import { AppRouteRecordRaw } from '../types';
import { PAGE_NOT_FOUND_ROUTE, REDIRECT_ROUTE } from './basic';
import { outRoutes } from './out';

// 登录路由
export const LoginRoute: AppRouteRecordRaw = {
  path: '/login',
  name: 'Login',
  component: () => import('@/views/login/index.vue'),
  meta: {
    title: 'Login',
  },
};

// 根路由
export const RootRoute: AppRouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: PageEnum.BASE_HOME,
  meta: {
    title: 'Root',
  },
};

export const basicRoutes = [
  RootRoute,
  LoginRoute,
  ...outRoutes,
  REDIRECT_ROUTE,
  PAGE_NOT_FOUND_ROUTE,
];