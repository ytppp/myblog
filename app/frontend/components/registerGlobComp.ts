import type { App } from 'vue';
import { Dropdown } from './dropdown';

export function registerGlobComp(app: App) {
  app.use(Dropdown);
}
