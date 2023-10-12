export type LangType = 'zh-CN' | 'en-US';

export interface ILocaleStore {
  // Current language
  lang: LangType,
  // default language
  fallback: LocaleType;
  // available Locales
  availableLocales: LocaleType[];
}

export interface GlobEnvConfig {
  // Site title
  VITE_GLOB_APP_TITLE: string;
}