import type { LangType, ILocaleStore } from '@/constants/config';
import { IDropMenu } from '@/components/dropdown';

export const LANG: { [key: string]: LangType } = {
  ZH_CN: 'zh-CN',
  EN_US: 'en-US',
};

export const localeStoreSetting: ILocaleStore = {
  lang: LANG.EN_US,
  fallbackLang: LANG.ZH_CN,
  availableLangs: [LANG.ZH_CN, LANG.EN_US],
};

export const langList: IDropMenu[] = [
  {
    text: '简体中文',
    key: LANG.ZH_CN,
  },
  {
    text: 'English',
    key: LANG.EN_US,
  },
];