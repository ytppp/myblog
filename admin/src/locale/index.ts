import type { LangType } from '#/config';
import { localeStoreSetting } from '@/settings/locale';
import { useLocaleStoreWithOut } from '@/store/modules/locale';
import type { App } from 'vue';
import type { I18nOptions } from 'vue-i18n';
import { createI18n } from 'vue-i18n';

const { fallbackLang, availableLangs } = localeStoreSetting;
export let i18n: ReturnType<typeof createI18n>;

export function setHtmlPageLang(lang: LangType) {
  document.querySelector('html')?.setAttribute('lang', lang);
}

async function createI18nOptions():Promise<I18nOptions> {
  const langStore = useLocaleStoreWithOut();
  const lang = langStore.getLang;
  const defaultLocal = await import(`./lang/${lang}.js`);
  const message = defaultLocal.default?.message ?? {};

  setHtmlPageLang(lang);
  
  return {
    legacy: false, // 如果要支持compositionAPI，此项必须设置为false
    locale: lang, // 设置当前语言类型
    fallbackLocale: fallbackLang, // 默认语言类型
    messages: {
      [lang]: message,
    },
    availableLocales: availableLangs,
    globalInjection: true, // 全局注册$t方法
    // sync: true,
    // silentTranslationWarn: true,
    // missingWarn: false,
    // silentFallbackWarn: true,
  }
}

export async function setupI18n(app: App<Element>) {
  const options = await createI18nOptions();
  i18n = createI18n(options);
  app.use(i18n);
}