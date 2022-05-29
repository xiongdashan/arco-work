<template>
  <a-modal v-model:visible="visible" title="PNR解析">
    <a-form :model="form" layout="vertical">
      <a-form-item field="text" label="PNR文本">
        <a-textarea
          v-model="form.text"
          placeholder="Please enter pnr text"
          allow-clear
          rows="10"
          :auto-size="{ minRows: 10 }"
        />
      </a-form-item>
    </a-form>
    <template #footer>
      <a-button type="primary" :loading="$loader.loading" @click="handleOk"
        >确定</a-button
      >
    </template>
  </a-modal>
</template>

<script setup lang="ts">
  import { setPnrAnalyzerEmitter } from '@/services/listenser/pnranalyzer';
  import { pnrAnalyzer } from '@/services/tools';
  import { Message } from '@arco-design/web-vue';
  import { reactive, ref } from 'vue';

  const form = reactive({
    text: '',
  });
  const visible = ref(false);

  const handleOk = () => {
    if (!form.text || form.text.length === 0) {
      Message.error('请输入PNR文本内容');
      return;
    }
    pnrAnalyzer(form.text).then((res) => {
      setPnrAnalyzerEmitter(res);
      visible.value = false;
    });
  };

  const display = () => {
    visible.value = true;
  };

  defineExpose({
    display,
  });
</script>
