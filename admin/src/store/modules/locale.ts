import { defineStore } from 'pinia';
import { store } from '@/store';

export const useLangStore = defineStore({
  id: 'lang',
  state: () => ({
    lang: 'zh-CN'
  }),
  getters: {
    getLang(state){
      return state.lang
    }
  },
  actions: {
    setLang(lang:string) {
      this.lang = lang;
      localStorage.setItem('lang', lang)
    }
  }
})

// Need to be used outside the setup
export function useLangStoreWithOut() {
  return useLangStore(store);
}