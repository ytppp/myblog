export type LangType = 'zh-CN' | 'en-US';

export interface ILocaleStore {
  lang: LangType,
  fallbackLang: LangType;
  availableLangs: LangType[];
}

export interface GlobEnvConfig {
  VITE_GLOB_APP_TITLE: string;
}

export interface UserInfo {
  userId: string | number;
  username: string;
  email: string;
  permissions: string[];
  homePath?: string;
}

// base global local key
export const APP_LOCAL_CACHE_KEY = 'COMMON__LOCAL__KEY__';

// base global session key
export const APP_SESSION_CACHE_KEY = 'COMMON__SESSION__KEY__';

/**
 * 权限模式
 */
export enum PermissionModeEnum {
  ROUTE_MAPPING = 'ROUTE_MAPPING',
}

export enum CacheTypeEnum {
  SESSION,
  LOCAL,
}

export interface ProjectConfig {
  authCacheType: CacheTypeEnum;
  sessionTimeoutProcessing: SessionTimeoutProcessingEnum;
}

export enum SessionTimeoutProcessingEnum {
  ROUTE_JUMP,
  PAGE_COVERAGE,
}