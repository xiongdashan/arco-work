import { StoreDefinition } from 'pinia';

declare module '@vue/runtime-core' {
  interface loadingStateData {
    loading: boolean;
  }

  interface ComponentCustomProperties {
    $loader: StoreDefinition;
  }
}
