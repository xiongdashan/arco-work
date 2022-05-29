<template>
  <a-modal v-model:visible="visible" title="分配OP" @ok="submit">
    <a-transfer
      v-model.selected="selectedOp"
      :data="data"
      simple
      :title="['OP列表', '已选择']"
    />
  </a-modal>
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import { asignOp } from '../../../../services/crm';
  import { OpUsers } from '../../../../services/user';
  import OPUser from './OpUser';

  interface submitModel {
    cid: string;
    ops: OPUser[];
  }
  const emit = defineEmits(['opSeted']);
  const data = ref([]);
  const selectedOp = ref([]);
  const visible = ref(false);
  const OpUserData = ref<OPUser[]>([]);
  const submitData = reactive<submitModel>({
    cid: '',
    ops: [],
  });

  const submit = async () => {
    if (!selectedOp.value || selectedOp.value.length === 0) {
      submitData.ops = [];
    } else {
      submitData.ops = OpUserData.value.filter((op) =>
        selectedOp.value.includes(op.userId)
      );
    }
    await asignOp(submitData);
    visible.value = false;
    emit('opSeted');
  };

  const loadData = async () => {
    if (OpUserData.value.length > 0) return;
    OpUserData.value = await OpUsers<OPUser[]>();
    OpUserData.value.forEach((item) => {
      data.value.push({
        value: item.userId,
        label: item.username,
      });
    });
  };

  const Display = (record: any) => {
    visible.value = true;
    submitData.cid = record.cid;
    selectedOp.value = [];
    if (record.ops && record.ops.length > 0) {
      record.ops.forEach((item) => {
        selectedOp.value.push(item.user_id);
      });
    }
    loadData();
  };

  defineExpose({
    Display,
  });
</script>

<style lang="scss" scoped></style>
