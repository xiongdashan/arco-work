import { App, Plugin } from 'vue';
import loadingState from './loader';
import DateFormate from './momentdate';

const plugin: Plugin = {
  install(app: App) {
    app.config.globalProperties.$dateFormator = DateFormate;
    app.config.globalProperties.$loader = loadingState();
  },
};

export default plugin;
