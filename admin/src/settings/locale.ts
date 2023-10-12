import type { LangType, ILocaleStore } from '#/config';

export const LOCALE: { [key: string]: LangType } = {
  ZH_CN: 'zh-CN',
  EN_US: 'en-US',
};

export const localeStoreSetting: ILocaleStore = {
  lang: LOCALE.ZH_CN,
  // Default locale
  fallback: LOCALE.ZH_CN,
  // available Locales
  availableLocales: [LOCALE.ZH_CN, LOCALE.EN_US],
};