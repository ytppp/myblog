import { withInstall } from '@/utils';
import localePicker from './src/locale-picker.vue';
import themePicker from './src/theme-picker.vue';

export const LocalePicker = withInstall(localePicker);
export const ThemePicker = withInstall(themePicker);