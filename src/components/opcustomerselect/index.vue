<template>
  <a-select
    v-model="sltedVal"
    :loading="$loader.loading"
    placeholder="Please select ..."
    :filter-option="false"
    :allow-search="true"
    :allow-clear="true"
    :options="oc.CustomerItems"
    @search="handleSearch"
    @change="changed"
  >
  </a-select>
</template>

<script setup lang="ts">
  import { ref, reactive, computed, toRef, onMounted } from 'vue';
  import OpSelectCus from '.';

  const sltedVal = ref<string>();

  const props = defineProps<{
    value: string;
  }>();

  const defaultVal = computed(() => {
    if (props.value && props.value.length > 0) {
      return props.value;
    }
    return null;
  });

  const oc = reactive(new OpSelectCus(sltedVal.value, defaultVal.value));
  const SltedSup = toRef(oc, 'SltedSup');

  function handleSearch(val: string) {
    oc.setSltSupVal(val);
  }

  const changed = () => {
    oc.setSltSupVal(sltedVal.value);
  };

  onMounted(() => {
    oc.init();
  });

  oc.setSltSupVal(props.value);

  defineExpose({
    SltedSup,
  });
</script>
