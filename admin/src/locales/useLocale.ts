import { useLocaleStoreWithOut } from "@/store/modules/locale";
import { computed, unref } from "vue";
import { i18n } from ".";

export function useLocale() {
  const localeStore = useLocaleStoreWithOut();
  const getLang = computed(() => localeStore.getLang);
  const getAntdLocale = computed((): any => {
    return i18n.global.getLocaleMessage(unref(getLang))?.localeAntd ?? {};
  });

  return {
    getLang,
    getAntdLocale,
  };
}