/**
The routing of this file will not show the layout.
It is an independent new page.
 */
import { AppRouteRecordRaw } from '../types';

export const mainOutRoutes: AppRouteRecordRaw[] = [
  {
    path: '/main-out',
    name: 'MainOut',
    component: () => import('@/views/main-out/index.vue'),
    meta: {
      title: 'MainOut',
    },
  },
];
