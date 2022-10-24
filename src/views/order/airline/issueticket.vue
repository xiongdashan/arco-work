<template>
  <a-form label-align="right" :model="orderform">
    <a-space direction="vertical" fill>
      <a-card title="基本信息">
        <a-row :gutter="16">
          <a-col :span="8">
            <a-form-item label="客户">
              <OPCustomerSelector ref="opCustomer" value="" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="供应商" field="su">
              <SuplierSelector ref="suplierVal" value="" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="8">
            <a-form-item field="title" label="标题">
              <a-input
                v-model="orderform.basic.title"
                placeholder="标题或团号"
              />
            </a-form-item>
          </a-col>
          <a-col :span="16">
            <a-form-item field="remark" label="备注" label-col-flex="52px">
              <a-input
                v-model="orderform.basic.remark"
                placeholder="please enter..."
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-card>
      <a-card title="正票信息">
        <AirOrder ref="airOrder" />
        <a-form-item
          label-col-flex="0px"
          :content-flex="false"
          style="text-align: center"
        >
          <a-button type="primary" @click="submitForm">提交</a-button>
        </a-form-item>
      </a-card>
    </a-space>
  </a-form>
</template>

<script setup lang="ts">
  import OPCustomerSelector from '@/components/opcustomerselect/index.vue';
  import SuplierSelector from '@/components/suplierselector/index.vue';
  import { reactive, ref } from 'vue';
  import AirOrder from '@/components/airline/airorder/index.vue';
  import { createAirOrder } from '@/services/order';
  import { Message } from '@arco-design/web-vue';

  const suplierVal = ref<InstanceType<typeof SuplierSelector>>();
  const opCustomer = ref<InstanceType<typeof OPCustomerSelector>>();
  const airOrder = ref<InstanceType<typeof AirOrder>>();

  const orderform = reactive<any>({
    basic: {},
  });

  const submitForm = async () => {
    orderform.basic.sup = suplierVal.value?.selectedSup;
    orderform.basic.cus = opCustomer.value?.SltedSup;
    orderform.airOrder = airOrder.value?.GetOrder();
    if (!orderform.basic.sup) {
      Message.error('请选择供应商');
      return;
    }
    if (!orderform.basic.cus) {
      Message.error('请选择客户');
      return;
    }
    if (!orderform.basic.title) {
      Message.error('请输入标题');
      return;
    }
    const rev = await createAirOrder(orderform);
    console.log(rev);
  };
</script>
