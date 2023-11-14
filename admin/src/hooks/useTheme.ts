import { useLocaleStoreWithOut } from "@/store/modules/locale";
import { computed } from "vue";
import { theme } from 'ant-design-vue';
import { THEME } from "@/settings/locale";

export function useTheme() {
  const localeStore = useLocaleStoreWithOut();
  
  const getTheme = computed(() => localeStore.getTheme);
  const isDark = computed(() => getTheme.value === THEME.DARK);
  const antdDarkTheme = {
    algorithm: [theme.darkAlgorithm],
  };

  return {
    getTheme,
    isDark,
    antdDarkTheme
  };
}