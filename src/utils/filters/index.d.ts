import 'vue';

declare module 'vue' {
  interface ComponentCustomProperties {
    $filter: (date: any, format: string) => string;
  }
}

export {};
