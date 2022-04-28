<template>
  <a-modal v-model:visible="visible" title="分配OP" @ok="submit">
    <a-transfer
      v-model.selected="selectedOp"
      :data="data"
      :default-value="value"
      simple
      :title="['OP列表', '已选择']"
    />
    {{ selectedOp }}
  </a-modal>
</template>

<script lang="ts">
  import { asignOp } from '@/services/crm';
  import { OpUsers } from '@/services/user';
  import { Message } from '@arco-design/web-vue';
  import { defineComponent, onMounted, reactive, ref } from 'vue';

  interface OpType {
    userId: number;
    username: string;
  }

  interface OpVal {
    value: string;
    label: string;
  }

  export default defineComponent({
    name: 'OpSelect',
    emits: ['opChanged'],
    setup(props, context) {
      const sourceData: OpVal[] = [];
      const allOpData: OpType[] = [];
      const submitData = ref({
        cid: '',
        ops: [],
      });
      const value = ref<OpVal[]>([]);
      const data = ref(sourceData);
      const visible = ref(false);
      const selectedOp = ref([]);
      const allOp = ref(allOpData);
      const show = (record?: any) => {
        submitData.value.cid = record.PID;
        visible.value = !visible.value;
        if (visible.value) {
          loadData();
        }
        if (record.ops) {
          record.ops.forEach((item: any) => {
            value.value.push({
              value: item.user_id,
              label: item.username,
            });
          });
        }
      };
      const loadData = () => {
        if (sourceData.length > 0) {
          return;
        }
        OpUsers().then((ret) => {
          allOp.value = ret.data;
          ret.data.forEach((item: { userId: any; username: any }) => {
            data.value.push({
              value: item.userId,
              label: item.username,
            });
          });
        });
      };

      const FilterOpObj =  () => {
        const rev: OpType[] = [];
        allOp.value.filter((a) => selectedOp.value.some((v) => v === a.userId));
        return rev;
      };

      const submit = () => {
        const postData = {
          cid: submitData.value.cid,
          ops: FilterOpObj(),
        };
        asignOp(postData).then((ret) => {
          context.emit('opChanged');
          Message.success('分配成功');
        });
      };


      return {
        value,
        show,
        data,
        visible,
        selectedOp,
        submit,
      };
    },
  });
</script>

<style lang="scss" scoped></style>
