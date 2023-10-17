export type LangType = 'zh-CN' | 'en-US';

export interface ILocaleStore {
  lang: LangType,
  fallbackLang: LocaleType;
  availableLangs: LocaleType[];
}

export interface GlobEnvConfig {
  VITE_GLOB_APP_TITLE: string;
}