import { UserInfo } from '@/constants/config';
import { defineStore } from 'pinia';
import { store } from '@/store';
import { PERMISSIONS_KEY, TOKEN_KEY, USER_INFO_KEY } from '@/constants/cache';

interface UserState {
  userInfo: Nullable<UserInfo>;
  token?: string;
  permissions: string[];
  sessionTimeout?: boolean;
  lastUpdateTime: number;
}

export const useUserStore = defineStore({
  id: 'app-user-store',
  state: (): UserState => ({
    // user info
    userInfo: null,
    // token
    token: undefined,
    // permissions
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
    setToken(info: string | undefined) {
      this.token = info ? info : ''; // for null or undefined value
      setAuthCache(TOKEN_KEY, info);
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
  }
})

export function useUserStoreWithOut() {
  return useUserStore(store);
}