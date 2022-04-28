import { App, Plugin } from 'vue';
import loadingState from './loader';
import DateFormate from './momentdate';

const plugin: Plugin = {
  install(app: App) {
    app.config.globalProperties.$filter = (
      date: any,
      format: string
    ): string => {
      return DateFormate(date, format);
    };
    app.config.globalProperties.$loader = loadingState();
  },
};

export default plugin;
