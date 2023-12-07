/**
The routing of this file will not show the layout.
It is an independent new page.
 */
import { RouteRecordRaw } from 'vue-router';

export const mainOutRoutes: RouteRecordRaw[] = [
  {
    path: '/main-out',
    name: 'MainOut',
    component: () => import('@/views/main-out/index.vue'),
    meta: {
      title: 'MainOut',
    },
  },
];
