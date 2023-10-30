import { useLocaleStoreWithOut } from "@/store/modules/locale";
import { computed, unref } from "vue";
import { i18n, setHtmlPageLang } from ".";
import type { LangType } from "@/constants/config";

function setI18nLanguage(lang: LangType) {
  const localeStore = useLocaleStoreWithOut();

  if (i18n.mode === 'legacy') {
    i18n.global.locale = lang;
  } else {
    (i18n.global.locale as any).value = lang;
  }
  localeStore.setLocaleStore({ lang });
  setHtmlPageLang(lang);
}

export function useLocale() {
  const localeStore = useLocaleStoreWithOut();
  const getLang = computed(() => localeStore.getLang);
  const getAntdLocale = computed((): any => {
    return (i18n.global.getLocaleMessage(unref(getLang)) as any)?.localeAntd ?? {};
  });

  async function changeLang(lang: LangType) {
    const globalI18n = i18n.global;
    const currentLang = unref(globalI18n.locale);
    if (currentLang === lang) {
      return lang;
    }

    const defaultLocal = await import(`./lang/${lang}.js`);
    const message = defaultLocal.default?.message ?? {};

    globalI18n.setLocaleMessage(lang, message);

    setI18nLanguage(lang);
    return lang;
  }

  function translate(key: string) {
    return i18n.global.t(key);
  }

  return {
    getLang,
    getAntdLocale,
    changeLang,
    translate
  };
}