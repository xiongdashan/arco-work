<template>
  <a-modal v-model:visible="open" title="添加" :footer="false" @close="onClose">
    <a-form ref="formElm" :model="form" @submit="handlerSubmit">
      <a-form-item
        field="name"
        label="名称"
        :rules="[{ required: true, message: '请输入名称' }]"
      >
        <a-input v-model="form.name" placeholder="please enter name..." />
        <input v-model="form.PID" type="hidden" />
      </a-form-item>
      <a-form-item field="phone" label="电话">
        <a-input v-model="form.phone" placeholder="please enter phone..." />
      </a-form-item>
      <a-form-item field="address" label="地址">
        <a-input v-model="form.address"></a-input>
      </a-form-item>
      <a-form-item field="remark" label="备注">
        <a-textarea v-model="form.remark" placeholder="" allow-clear />
      </a-form-item>
      <a-form-item>
        <a-button html-type="submit" type="primary" :loading="$loader.loading"
          >提交</a-button
        >
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
  import { SuplierMgr } from '@/services/suplier';
  import { Message } from '@arco-design/web-vue';
  import { reactive, ref } from 'vue';

  const open = ref(false);
  const formElm = ref<HTMLFormElement>();
  const emit = defineEmits(['mgrSubmited']);

  const form = reactive({
    name: '',
    phone: '',
    address: '',
    remark: '',
    PID: '',
  });

  const Display = (record?: any) => {
    open.value = true;
    if (!record) {
      return;
    }
    form.name = record.name;
    form.phone = record.phone;
    form.address = record.address;
    form.remark = record.remark;
    form.PID = record.cid;
  };

  const handlerSubmit = ({ values, errors }: any) => {
    if (errors) {
      return;
    }
    SuplierMgr(values).then((ret) => {
      Message.success('操作成功');
      emit('mgrSubmited');
      open.value = false;
    });
  };

  const onClose = () => {
    formElm.value?.resetFields();
    form.PID = '';
  };

  defineExpose({
    Display,
  });
</script>
