import type { App } from 'vue';
import { hasPermission } from './permission';

export const setupDirective = (app: App<Element>) => {
  app.directive('hasPermission', hasPermission);
};
