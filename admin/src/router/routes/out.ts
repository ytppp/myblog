import { AppRouteRecordRaw } from '../types';

export const outRoutes: AppRouteRecordRaw[] = [
  {
    path: '/out',
    name: 'MainOut',
    component: () => import('@/views/out/index.vue'),
    meta: {
      title: 'MainOut',
      ignoreAuth: true,
    },
  },
];