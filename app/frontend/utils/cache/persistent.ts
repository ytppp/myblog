import { DEFAULT_CACHE_TIME } from "@/settings/encryption";
import { Memory } from "./memory";
import { createLocalStorage, createSessionStorage } from "./storage";
import { APP_LOCAL_CACHE_KEY, APP_SESSION_CACHE_KEY, UserInfo } from "@/constants/config";
import { toRaw } from "vue";
import { PERMISSIONS_KEY, TOKEN_KEY, USER_INFO_KEY } from "@/constants/cache";

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