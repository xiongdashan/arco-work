import { defineStore } from 'pinia';

const loadingState = defineStore({
  id: 'loadingState',
  state: () => {
    return { loading: false };
  },
  actions: {
    start(): void {
      this.loading = true;
    },
    end() {
      this.loading = false;
    },
  },
});

export default loadingState;
