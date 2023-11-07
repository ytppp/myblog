import { Layout } from './constant'
import { RouteRecordRaw } from 'vue-router';

// 404 page
export const Page404Route: RouteRecordRaw = {
  path: '/:path(.*)*',
  name: 'ErrorPage',
  component: Layout,
  meta: {
    title: 'ErrorPage',
    hideBreadcrumb: true,
    hideMenu: true,
  },
  children: [
    {
      path: '/:path(.*)*',
      name: 'ErrorPageSon',
      component: () => import('@/views/sys/exception/404/index.vue'),
      meta: {
        title: 'ErrorPage',
        hideBreadcrumb: true,
        hideMenu: true,
      },
    },
  ],
};

// error log
export const ErrorLogRoute: RouteRecordRaw = {
  path: '/error-log',
  name: 'ErrorLog',
  component: Layout,
  redirect: '/error-log/list',
  meta: {
    title: 'ErrorLog',
  },
  children: [
    {
      path: 'list',
      name: 'ErrorLogList',
      component: () => import('@/views/sys/error-log/index.vue'),
      meta: {
        title: 'ErrorLogList',
      },
    },
  ],
};