<template>
  <a-modal v-model:visible="open" title="添加" :footer="false">
    <a-form ref="formElm" :model="form" @submit="handlerSubmit">
      <a-form-item
        field="name"
        label="名称"
        :rules="[{ required: true, message: '请输入名称' }]"
      >
        <a-input v-model="form.name" placeholder="please enter name..." />
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
        <a-button html-type="submit" type="primary">提交</a-button>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
  import { customerMgr } from '@/services/crm';
  import { reactive, ref } from 'vue';

  const open = ref(false);
  const formElm = ref<HTMLFormElement>();

  const form = reactive({
    name: '',
    phone: '',
    address: '',
    remark: '',
  });

  const Display = () => {
    open.value = true;
  };

  const handlerSubmit = ({ values, errors }: any) => {
    if (errors) {
      return;
    }
    customerMgr(values).then((ret) => {
      console.log(ret);
    });
  };

  defineExpose({
    Display,
  });
</script>
