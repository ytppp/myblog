import type { LangType, ThemeType, ILocaleStore } from '@/constants/config';
import { IDropMenu } from '@/components/dropdown';

export const LANG: { [key: string]: LangType } = {
  ZH_CN: 'zh-CN',
  EN_US: 'en-US',
};

export const THEME: { [key: string]: ThemeType } = {
  DARK: 'dark',
  LIGHT: 'light',
};

export const localeStoreSetting: ILocaleStore = {
  lang: LANG.EN_US,
  fallbackLang: LANG.ZH_CN,
  availableLangs: [LANG.ZH_CN, LANG.EN_US],
  theme: THEME.DARK
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

export const themeList: IDropMenu[] = [
  {
    text: 'trans0031',
    key: THEME.LIGHT,
  },
  {
    text: 'trans0030',
    key: THEME.DARK,
  },
  {
    text: 'trans0032',
    key: 'auto',
  }
];