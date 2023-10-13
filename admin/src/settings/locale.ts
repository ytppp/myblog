import type { LangType, ILocaleStore } from '#/config';

export const LOCALE: { [key: string]: LangType } = {
  ZH_CN: 'zh-CN',
  EN_US: 'en-US',
};

export const localeStoreSetting: ILocaleStore = {
  lang: LOCALE.EN_US,
  fallbackLang: LOCALE.ZH_CN,
  availableLangs: [LOCALE.ZH_CN, LOCALE.EN_US],
};