export const Page404 = () => import('@/views/exception/404/index.vue');

export const Layout = () => import('@/layouts/default/index.vue');

export enum PageEnum {
  BASE_LOGIN = '/login',
  BASE_HOME = '/dashboard',
  ERROR_PAGE = '/exception',
  ERROR_LOG_PAGE = '/error-log/list',
}