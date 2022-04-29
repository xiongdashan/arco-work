import { createApp } from 'vue';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $filter: (date: any, format: string) => string;
  }
}

export {};
