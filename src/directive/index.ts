import { App } from 'vue';
import permission from './permission';
import displaydate from './displaydate';

export default {
  install(Vue: App) {
    Vue.directive('permission', permission);
    Vue.directive('displaydate', displaydate);
  },
};
