import { localeStoreSetting } from '@/settings/locale';
import { useLocaleStoreWithOut } from '@/store/modules/locale';
import type { App } from 'vue';
import type { I18nOptions } from 'vue-i18n';
import { createI18n } from 'vue-i18n';

const { fallback, availableLocales } = localeStoreSetting;
export let i18n: ReturnType<typeof createI18n>;

async function createI18nOptions():Promise<I18nOptions> {
  const langStore = useLocaleStoreWithOut();
  const locale = langStore.getLang;
  const defaultLocal = await import(`./lang/${locale}.js`);
  const message = defaultLocal.default?.message ?? {};

  return {
    legacy: false,
    locale,
    fallbackLocale: fallback,
    messages: {
      [locale]: message,
    },
    availableLocales: availableLocales,
    sync: true,
    silentTranslationWarn: true, // true - warning off
    missingWarn: false,
    silentFallbackWarn: true,
  }
}

export async function setupI18n(app: App<Element>) {
  const options = await createI18nOptions();
  i18n = createI18n(options);
  app.use(i18n);
}