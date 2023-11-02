import { UserInfo } from '@/constants/config';
import { defineStore } from 'pinia';
import { store } from '@/store';
import { PERMISSIONS_KEY, TOKEN_KEY, USER_INFO_KEY } from '@/constants/cache';
import { getAuthCache, setAuthCache } from '@/utils/auth';
import { login } from '@/api/user';
import { GetUserInfoModel, LoginParams } from '@/api/model/user';
import { ErrorMessageMode } from '@/constants/http';
import { PageEnum } from '@/router/constant';
import { router } from '@/router';

interface IUserState {
  userInfo: Nullable<UserInfo>;
  token: string;
  permissions: string[];
}

export const useUserStore = defineStore({
  id: 'app-user-store',
  state: (): IUserState => ({
    userInfo: null,
    token: '',
    permissions: []
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
      setAuthCache(USER_INFO_KEY, info);
    },
    resetState() {
      this.userInfo = null;
      this.token = '';
      this.permissions = [];
    },
    /**
     * @description: login
     */
    // const userInfo = await userStore.login({
    //   password: data.password,
    //   username: data.account,
    //   mode: 'none', //不要默认的错误提示
    // });
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
    afterLoginAction(goHome?: boolean) {},
    /**
     * @description: logout
     */
    async logout(goLogin = false) {
      if (this.getToken) {
        try {
          // await doLogout();
        } catch {
          console.log('注销Token失败');
        }
      }
      this.setToken(undefined);
      // this.setSessionTimeout(false);
      this.setUserInfo(null);
      goLogin && router.push(PageEnum.BASE_LOGIN);
    },
  }
})

export function useUserStoreWithOut() {
  return useUserStore(store);
}