import { useLocaleStoreWithOut } from "@/store/modules/locale";
import { computed } from "vue";
import { theme } from 'ant-design-vue';
import { THEME } from "@/settings/locale";
import { ThemeType } from "@/constants/config";


function setHtmlPageTheme(theme: ThemeType) {
  document.querySelector('html')?.classList.add(theme);
}

function setI18nLanguage(theme: ThemeType) {
  const localeStore = useLocaleStoreWithOut();
  localeStore.setLocaleStore({ theme });
  setHtmlPageTheme(theme);
}

export function useTheme() {
  const localeStore = useLocaleStoreWithOut();
  
  const getTheme = computed(() => localeStore.getTheme);
  const isDark = computed(() => getTheme.value === THEME.DARK);
  const antdDarkTheme = {
    algorithm: [theme.darkAlgorithm],
  };

  async function changeTheme(theme: ThemeType) {
    await setI18nLanguage(theme);
  }

  return {
    getTheme,
    isDark,
    antdDarkTheme,
    changeTheme
  };
}