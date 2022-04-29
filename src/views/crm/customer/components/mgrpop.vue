<template>
  <a-modal v-model:visible="open" title="添加" :footer="false">
    <a-form ref="formRef" :model="form" @submit="submit">
      <a-form-item
        field="name"
        label="名称"
        :rules="[{ required: true, message: '请输入名称' }]"
        validate-trigger="input"
      >
        <a-input v-model="form.name" />
      </a-form-item>

      <a-form-item field="phone" label="电话">
        <a-input v-model="form.phone" />
      </a-form-item>

      <a-form-item field="address" label="详细地址">
        <a-textarea
          v-model="form.address"
          placeholder="输入地址信息"
          allow-clear
        />
      </a-form-item>

      <a-form-item field="address" label="备注">
        <a-textarea
          v-model="form.remark"
          placeholder="输入备注信息"
          allow-clear
        />
      </a-form-item>

      <a-form-item>
        <a-space>
          <a-button
            v-enable="'crm:list:mgr'"
            html-type="submit"
            type="primary"
            size="small"
            >提交</a-button
          >
          <a-button>Reset</a-button>
        </a-space>
      </a-form-item>
    </a-form>
    {{ $loader.loading }}
  </a-modal>
</template>

<script setup lang="ts">
  import { Message } from '@arco-design/web-vue';
  import { reactive, ref } from 'vue';

  import { customerMgr } from '../../../../services/crm';

  const formdata = {
    name: '',
    phone: '',
    address: '',
    remark: '',
  };

  const form = reactive(formdata);

  const open = ref(false);

  const submit = () => {};

  const Display = () => {
    open.value = !open.value;
  };

  defineExpose({
    Display,
  });
</script>
