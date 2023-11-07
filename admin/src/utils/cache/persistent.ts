import { DEFAULT_CACHE_TIME } from "@/settings/encryption";
import { Memory } from "./memory";
import { createLocalStorage, createSessionStorage } from "./storage";
import { APP_LOCAL_CACHE_KEY, APP_SESSION_CACHE_KEY, UserInfo } from "@/constants/config";
import { toRaw } from "vue";
import { LOCK_INFO_KEY, PERMISSIONS_KEY, TOKEN_KEY, USER_INFO_KEY } from "@/constants/cache";
import { omit, pick } from "lodash-es";

interface BasicStore {
  [TOKEN_KEY]: string | number | null | undefined;
  [USER_INFO_KEY]: UserInfo;
  [PERMISSIONS_KEY]: string[];
}

type LocalStore = BasicStore;

type SessionStore = BasicStore;

export type BasicKeys = keyof BasicStore;
type LocalKeys = keyof LocalStore;
type SessionKeys = keyof SessionStore;

const ls = createLocalStorage();
const ss = createSessionStorage();

const lm = new Memory(DEFAULT_CACHE_TIME);
const sm = new Memory(DEFAULT_CACHE_TIME);

export class Persistent {
  static getLocal<T>(key: LocalKeys) {
    return lm.get(key)?.value as Nullable<T>;
  }

  static setLocal(key: LocalKeys, value: LocalStore[LocalKeys], immediate = false): void {
    lm.set(key, toRaw(value));
    immediate && ls.set(APP_LOCAL_CACHE_KEY, lm.getCache);
  }

  static removeLocal(key: LocalKeys, immediate = false): void {
    lm.remove(key);
    immediate && ls.set(APP_LOCAL_CACHE_KEY, lm.getCache);
  }

  static clearLocal(immediate = false): void {
    lm.clear();
    immediate && ls.clear();
  }

  static getSession<T>(key: SessionKeys) {
    return sm.get(key)?.value as Nullable<T>;
  }

  static setSession(key: SessionKeys, value: SessionStore[SessionKeys], immediate = false): void {
    sm.set(key, toRaw(value));
    immediate && ss.set(APP_SESSION_CACHE_KEY, sm.getCache);
  }

  static removeSession(key: SessionKeys, immediate = false): void {
    sm.remove(key);
    immediate && ss.set(APP_SESSION_CACHE_KEY, sm.getCache);
  }
  static clearSession(immediate = false): void {
    sm.clear();
    immediate && ss.clear();
  }

  static clearAll(immediate = false) {
    sm.clear();
    lm.clear();
    if (immediate) {
      ls.clear();
      ss.clear();
    }
  }
}

function initPersistentMemory() {
  const lc = ls.get(APP_LOCAL_CACHE_KEY);
  const sc = ss.get(APP_SESSION_CACHE_KEY);
  lc && lm.resetCache(lc);
  sc && sm.resetCache(sc);
}

function storageChange(e: any) {
  const { key, newValue, oldValue } = e;

  if (!key) {
    Persistent.clearAll();
    return;
  }

  if (!!newValue && !!oldValue) {
    if (APP_LOCAL_CACHE_KEY === key) {
      Persistent.clearLocal();
    }
    if (APP_SESSION_CACHE_KEY === key) {
      Persistent.clearSession();
    }
  }
}
console.log('111');
// beforeunload事件在当页面卸载(关闭)或刷新时调用
window.addEventListener('beforeunload', function () {
  // TOKEN_KEY 在登录或注销时已经写入到storage了，此处为了解决同时打开多个窗口时token不同步的问题
  // LOCK_INFO_KEY 在锁屏和解锁时写入，此处也不应修改
  alert('beforeunload');
  // omit(object, *keys)返回一个排除keys属性的对象
  // pick(object, *keys)返回一个只有keys属性的对象
  ls.set(APP_LOCAL_CACHE_KEY, {
    ...lm.getCache,
    ...pick(ls.get(APP_LOCAL_CACHE_KEY), [TOKEN_KEY, USER_INFO_KEY]),
  });
  ss.set(APP_SESSION_CACHE_KEY, {
    ...sm.getCache,
    ...pick(ss.get(APP_SESSION_CACHE_KEY), [TOKEN_KEY, USER_INFO_KEY]),
  });
});

window.addEventListener('storage', storageChange);

initPersistentMemory();