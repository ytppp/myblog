import type { App } from 'vue';
import { Dropdown } from './dropdown';
import { Icon } from './icon';

export function registerGlobComp(app: App) {
  app.use(Dropdown);
  app.use(Icon);
}
