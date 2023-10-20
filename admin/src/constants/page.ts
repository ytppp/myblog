export enum PageEnum {
  BASE_LOGIN = '/login',
  BASE_HOME = '/dashboard',
  ERROR_PAGE = '/exception',
  ERROR_LOG_PAGE = '/error-log/list',
}

export const REDIRECT_NAME = 'Redirect';

export const PARENT_LAYOUT_NAME = 'ParentLayout';

export const PAGE_NOT_FOUND_NAME = 'PageNotFound';

export const EXCEPTION_COMPONENT = () => import('@/views/sys/exception/index.vue');

export const LAYOUT = () => import('@/layouts/default/index.vue');
