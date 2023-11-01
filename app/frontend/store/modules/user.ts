import { UserInfo } from '@/constants/config';
import { defineStore } from 'pinia';
import { store } from '@/store';
import { PERMISSIONS_KEY, TOKEN_KEY, USER_INFO_KEY } from '@/constants/cache';
import { getAuthCache, setAuthCache } from '@/utils/auth';

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
  }
})

export function useUserStoreWithOut() {
  return useUserStore(store);
}