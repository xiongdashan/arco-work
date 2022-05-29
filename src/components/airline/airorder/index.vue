<template>
  <a-row :gutter="16" style="padding-bottom: 3px">
    <a-col :span="8">
      <a-form-item field="pnrCode" label="PNR">
        <a-input v-model="airOrder.pnrCode" placeholder="please enter...">
          <template #append>
            <a-button type="primary" size="mini" @click="importPnr"
              >导入</a-button
            >
          </template>
        </a-input>
      </a-form-item>
    </a-col>
    <a-col :span="8">
      <a-form-item field="pnrBigCode" label="PNR(大）">
        <a-input v-model="airOrder.pnrBigCode" placeholder="please enter..." />
      </a-form-item>
    </a-col>
    <a-col :span="8">
      <a-form-item field="effictiveDate" label="有效期">
        <a-date-picker
          v-model="airOrder.effictiveDate"
          show-time
          :time-picker-props="{ defaultValue: '09:09:06' }"
          format="YYYY-MM-DD HH:mm:ss"
        />
      </a-form-item>
    </a-col>
  </a-row>

  <a-form-item label="类型" label-col-flex="50px">
    <a-space>
      <a-radio-group v-model="airOrder.segmentType">
        <a-radio value="国内">国内</a-radio>
        <a-radio value="国际">国际</a-radio>
      </a-radio-group>
      <a-radio-group v-model="airOrder.category">
        <a-radio value="团队">团队</a-radio>
        <a-radio value="散客">散客</a-radio>
      </a-radio-group>
    </a-space>
  </a-form-item>

  <a-form-item label-col-flex="0px" :content-flex="false">
    <Journey ref="journeyData" />
  </a-form-item>
  <a-form-item label-col-flex="0px" :content-flex="false">
    <Passenger ref="pax" />
  </a-form-item>
  <a-form-item label-col-flex="0px" :content-flex="false">
    <AirlinePrice ref="price" />
  </a-form-item>
  <PnrAnalyzer ref="pnrAnalyzer"></PnrAnalyzer>
</template>

<script setup lang="ts">
  import { computed, reactive, ref, toRef, toRefs } from 'vue';
  import PnrAnalyzer from '@/components/airline/pnranalyzer/index.vue';
  import Journey from '@/components/airline/journey/index.vue';
  import Passenger from '@/components/airline/passenger/index.vue';
  import AirlinePrice from '@/components/airline/price/index.vue';
  import { listenerPnrAnalyzer } from '@/services/listenser/pnranalyzer';

  const airOrder = reactive<any>({});

  const pnrAnalyzer = ref<InstanceType<typeof PnrAnalyzer>>();
  const journeyData = ref<InstanceType<typeof Journey>>();
  const pax = ref<InstanceType<typeof Passenger>>();
  const price = ref<InstanceType<typeof AirlinePrice>>();

  const importPnr = () => {
    pnrAnalyzer.value?.display();
  };

  const GetOrder = () => {
    airOrder.journey = journeyData.value?.GetJourney();
    airOrder.pax = pax.value?.GetPax();
    airOrder.price = {
      payabler: price.value?.payabler,
      receiver: price.value?.receiver,
    };
    return airOrder;
  };

  listenerPnrAnalyzer((val: any) => {
    if (!val) return;
    airOrder.pnrCode = val.code;
  });

  defineExpose({
    airOrder,
    GetOrder,
  });
</script>
