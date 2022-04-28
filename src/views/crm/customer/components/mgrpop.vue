<template>
  <a-modal v-model:visible="open" title="添加" :footer="false" @cancel="show">
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
            :loading="$loader.loading"
            >提交</a-button
          >
          <a-button @click="$refs.formRef.resetFields()">Reset</a-button>
        </a-space>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts">
  import { Message } from '@arco-design/web-vue';
  import { defineComponent, reactive, ref } from 'vue';

  import { customerMgr } from '../../../../services/crm';

  export default defineComponent({
    name: 'MgrPop',
    props: ['type', 'data'],
    emits: ['mgrsubmited'],
    setup(props, context) {
      const customData = {
        PID: '',
        ID: 0,
        name: '',
        phone: '',
        address: '',
        remark: '',
      };

      const form = reactive({ ...customData });

      const formRef: any = ref({});
      const open = ref(false);
      const submit = () => {
        formRef.value.validate((errs: any) => {
          if (errs) {
            return;
          }
          customerMgr(form).then((ret) => {
            if (ret.code < 0) {
              return;
            }
            Message.success('操作成功');
            context.emit('mgrsubmited');
            open.value = false;
          });
        });
      };
      const show = (data: any) => {
        open.value = !open.value;
        if (data) {
          Object.assign(form, data);
          return;
        }
        Object.assign(form, customData);
      };
      return {
        form,
        submit,
        formRef,
        open,
        show,
      };
    },
    data() {
      return {};
    },
  });
</script>
