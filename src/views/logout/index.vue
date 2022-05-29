<template>
  <router-view />
</template>

<script setup lang="ts">
  import { useUserStore } from '@/store';

  await useUserStore().logout();
  window.location.href = '/login';
</script>
