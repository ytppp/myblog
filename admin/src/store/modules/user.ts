import { UserInfo } from '@/constants/config';
import { defineStore } from 'pinia';
import { store } from '@/store';
import { PERMISSIONS_KEY, TOKEN_KEY, USER_INFO_KEY } from '@/constants/cache';
import { getAuthCache, setAuthCache } from '@/utils/auth';
import { getUserInfo, login, logout } from '@/api/user';
import { GetUserInfoModel, LoginParams } from '@/api/model/user';
import { ErrorMessageMode } from '@/constants/http';
import { PageEnum } from '@/router/constant';
import { router } from '@/router';
import { isArray } from 'lodash-es';

interface IUserState {
  userInfo: Nullable<UserInfo>;
  token: string;
  permissions: string[];
  sessionTimeout: boolean;
  lastUpdateTime: number;
}

export const useUserStore = defineStore({
  id: 'app-user-store',
  state: (): IUserState => ({
    userInfo: null,
    token: '',
    permissions: [],
    // Whether the login expired
    sessionTimeout: false,
    // Last fetch time
    lastUpdateTime: 0,
  }),
  getters: {
    getUserInfo(state): UserInfo {
      return state.userInfo || getAuthCache<UserInfo>(USER_INFO_KEY) || {};
    },
    getToken(state): string {
      return state.token || getAuthCache<string>(TOKEN_KEY);
    },
    getPermissions(state): string[] {
      return state.permissions.length > 0 ? state.permissions : getAuthCache<string[]>(PERMISSIONS_KEY);
    },
    getSessionTimeout(state): boolean {
      return !!state.sessionTimeout;
    },
    getLastUpdateTime(state): number {
      return state.lastUpdateTime;
    },
  },
  actions: {
    setToken(token: string | undefined) {
      this.token = token ? token : '';
      setAuthCache(TOKEN_KEY, token);
    },
    setPermissions(permissions: string[]) {
      this.permissions = permissions;
      setAuthCache(PERMISSIONS_KEY, permissions);
    },
    setUserInfo(info: UserInfo | null) {
      this.userInfo = info;
      this.lastUpdateTime = new Date().getTime();
      setAuthCache(USER_INFO_KEY, info);
    },
    setSessionTimeout(flag: boolean) {
      this.sessionTimeout = flag;
    },
    resetState() {
      this.userInfo = null;
      this.token = '';
      this.permissions = [];
      this.sessionTimeout = false;
    },
    /**
     * @description: login
     */
    async login(
      params: LoginParams & {
        goHome?: boolean;
        mode?: ErrorMessageMode;
      },
    ): Promise<GetUserInfoModel | null> {
      try {
        const { goHome = true, mode, ...loginParams } = params;
        const data = await login(loginParams, mode);
        const { token } = data;

        this.setToken(token);
        return this.afterLoginAction(goHome);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async afterLoginAction(goHome?: boolean): Promise<GetUserInfoModel | null> {
      if (!this.getToken) return null;
      // get user info
      const userInfo = await this.getUserInfoAction();

      const sessionTimeout = this.sessionTimeout;
      if (sessionTimeout) {
        this.setSessionTimeout(false);
      } else {
        // const permissionStore = usePermissionStore();
        // if (!permissionStore.isDynamicAddedRoute) {
        //   const routes = await permissionStore.buildRoutesAction();
        //   routes.forEach((route) => {
        //     router.addRoute(route as unknown as RouteRecordRaw);
        //   });
        //   router.addRoute(PAGE_NOT_FOUND_ROUTE as unknown as RouteRecordRaw);
        //   permissionStore.setDynamicAddedRoute(true);
        // }
        goHome && (await router.replace(userInfo?.homePath || PageEnum.BASE_HOME));
      }
      return userInfo;
    },
    async getUserInfoAction(): Promise<UserInfo | null> {
      if (!this.getToken) return null;
      const userInfo = await getUserInfo();
      const { permissions = [] } = userInfo;
      if (isArray(permissions)) {
        this.setPermissions(permissions);
      } else {
        userInfo.permissions = [];
        this.setPermissions([]);
      }
      this.setUserInfo(userInfo);
      return userInfo;
    },
    /**
     * @description: logout
     */
    async logout(goLogin = false) {
      if (this.getToken) {
        try {
          await logout();
        } catch {
          console.log('注销Token失败');
        }
      }
      this.setToken(undefined);
      this.setSessionTimeout(false);
      this.setUserInfo(null);
      goLogin && router.push(PageEnum.BASE_LOGIN);
    },
  }
})

export function useUserStoreWithOut() {
  return useUserStore(store);
}