<template>
  <a-select
    v-model="sltedVal"
    :loading="$loader.loading"
    placeholder="Please select ..."
    :filter-option="false"
    :allow-search="true"
    :allow-clear="true"
    :options="supliers"
    @search="handleSearch"
    @change="changed"
  >
  </a-select>
</template>

<script setup lang="ts">
  import { ref, reactive, computed } from 'vue';
  import { SuplierList } from '@/services/suplier';
  import { SelectItem } from '@/services/sharedmodles';
  import { SuplierVo } from '@/services/crmmodule';

  const props = defineProps<{
    value: string;
  }>();
  const supliers = reactive<SelectItem[]>([]);
  const sltedVal = ref<string>();
  const selectedSup = ref<SuplierVo | null>();

  const initVal = computed<string | null>(() => {
    if (props.value && props.value.length > 0) {
      return props.value;
    }
    return null;
  });

  const setSelectedSup = (val: string | null) => {
    if (!val || val.length === 0) {
      selectedSup.value = null;
      return;
    }
    const sup = supliers.find((item) => item.value === val);
    if (!sup) {
      return;
    }
    selectedSup.value = {
      cid: sup.value,
      name: sup.label,
    };
  };

  const changed = () => {
    setSelectedSup(sltedVal.value || '');
  };

  const loadData = async (val?: string) => {
    supliers.splice(0, supliers.length);
    const { data } = await SuplierList<any>({
      name: val,
      pageIndex: 1,
      pageSiz: 1000,
    });
    data.forEach((c: any) => {
      supliers.push({
        value: c.cid,
        label: c.name,
        extra: c.name + c.id,
      });
    });
    sltedVal.value = initVal.value || '';
    setSelectedSup(initVal.value);
  };
  const handleSearch = (val: string) => {
    loadData(val);
  };

  loadData();

  defineExpose({
    selectedSup,
  });
</script>
