import { defineStore } from 'pinia';
import { store } from '@/store';
import type { LangType, ILocaleStore } from '@/constants/config';
import { localeStoreSetting } from '@/settings/locale';
import { createLocalStorage } from '@/utils/cache/storage';
import { LOCALE_KEY } from '@/constants/cache';

interface ILocaleStoreState {
  localeStore: ILocaleStore;
}

const ls = createLocalStorage();
const lsDefault = (ls.get(LOCALE_KEY) || localeStoreSetting) as ILocaleStore;

export const useLocaleStore = defineStore({
  id: 'locale-store',
  state: (): ILocaleStoreState => ({
    localeStore: lsDefault,
  }),
  getters: {
    getLang(state): LangType {
      return state.localeStore.lang;
    },
  },
  actions: {
    setLocaleStore(info: Partial<ILocaleStore>) {
      this.localeStore = {
        ...this.localeStore,
        ...info,
      };
      ls.set(LOCALE_KEY, this.localeStore);
    },
    /**
     * Initialize multilingual information and load the existing configuration from the local cache
     */
    initLocale() {
      this.setLocaleStore({
        ...localeStoreSetting,
        ...this.localeStore,
      });
    },
  },
});

export function useLocaleStoreWithOut() {
  return useLocaleStore(store);
}
