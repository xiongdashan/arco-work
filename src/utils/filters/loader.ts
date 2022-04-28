import { defineStore } from 'pinia';

const loadingState = defineStore('loader', {
  state: () => {
    return { loading: false };
  },
  actions: {
    start() {
      this.loading = true;
    },
    end() {
      this.loading = false;
    },
  },
});

export default loadingState;
