<template>
  <div v-if="pc.HasType()">
    <a-table
      :data="payabler"
      :pagination="false"
      :span-method="priceTypeCount"
      :bordered="{ wrapper: true, cell: true }"
    >
      <template #columns>
        <a-table-column title="#" width="65">
          <template #cell> 应付 </template>
        </a-table-column>

        <a-table-column title="类型" width="70">
          <template #cell="{ rowIndex }">
            {{ payabler[rowIndex].ptc }}
          </template>
        </a-table-column>

        <a-table-column title="票面价">
          <template #cell="{ rowIndex }">
            <a-input-number
              v-model="payabler[rowIndex].baseAmount"
              :style="{ width: '60' }"
              placeholder="second"
              @change="priceChange"
            />
          </template>
        </a-table-column>
        <a-table-column title="税">
          <template #cell="{ rowIndex }">
            <a-input-number
              v-model="payabler[rowIndex].tax"
              :style="{ width: '60' }"
              placeholder="second"
              @change="priceChange"
            />
          </template>
        </a-table-column>

        <a-table-column title="代理费">
          <template #cell="{ rowIndex }">
            <a-input-number
              v-model="payabler[rowIndex].surchargeAmount"
              :style="{ width: '60' }"
              placeholder="second"
              @change="priceChange"
            />
          </template>
        </a-table-column>

        <a-table-column title="返钱">
          <template #cell="{ rowIndex }">
            <a-input-number
              v-model="payabler[rowIndex].commission"
              :style="{ width: '60' }"
              placeholder="second"
              @change="priceChange"
            />
          </template>
        </a-table-column>

        <a-table-column title="返点">
          <template #cell="{ rowIndex }">
            <a-input-number
              v-model="payabler[rowIndex].commissionPercent"
              :style="{ width: '60' }"
              placeholder="second"
              @change="priceChange"
            />
          </template>
        </a-table-column>

        <a-table-column title="人数" width="70">
          <template #cell="{ rowIndex }">
            {{ payabler[rowIndex].paxCount }}
          </template>
        </a-table-column>
        <a-table-column title="小计" width="150">
          <template #cell="{ rowIndex }">
            {{ payabler[rowIndex].totalAmount.toFixed(2) }}
          </template>
        </a-table-column>
      </template>
    </a-table>
    <a-table
      :data="receiver"
      :pagination="false"
      :span-method="priceTypeCount"
      :bordered="{ wrapper: true, cell: true }"
    >
      <template #columns>
        <a-table-column title="#" width="65">
          <template #cell> 应收 </template>
        </a-table-column>

        <a-table-column title="类型" width="70">
          <template #cell="{ rowIndex }">
            {{ receiver[rowIndex].ptc }}
          </template>
        </a-table-column>

        <a-table-column title="票面价">
          <template #cell="{ rowIndex }">
            <a-input-number
              v-model="receiver[rowIndex].baseAmount"
              :style="{ width: '60' }"
              placeholder="second"
              @change="priceChange"
            />
          </template>
        </a-table-column>
        <a-table-column title="税">
          <template #cell="{ rowIndex }">
            <a-input-number
              v-model="receiver[rowIndex].tax"
              :style="{ width: '60' }"
              placeholder="second"
              @change="priceChange"
            />
          </template>
        </a-table-column>

        <a-table-column title="服务费">
          <template #cell="{ rowIndex }">
            <a-input-number
              v-model="receiver[rowIndex].fee"
              :style="{ width: '60' }"
              placeholder="second"
              @change="priceChange"
            />
          </template>
        </a-table-column>
        <a-table-column title="人数" width="70">
          <template #cell="{ rowIndex }">
            {{ receiver[rowIndex].paxCount }}
          </template>
        </a-table-column>
        <a-table-column title="小计" width="150">
          <template #cell="{ rowIndex }">
            {{ receiver[rowIndex].totalAmount.toFixed(2) }}
          </template>
        </a-table-column>
      </template>
      <template #footer>
        <div style="font-weight: bold; text-align: right">
          <a-space>
            <a-typography-text>总计:</a-typography-text>
            <a-typography-text
              >(应收）{{ pc.ReceiveablePrice.toFixed(2) }}</a-typography-text
            >
            <a-typography-text>-</a-typography-text>
            <a-typography-text
              >(应付）{{ pc.PayablePrice.toFixed(2) }}</a-typography-text
            >
            <a-typograpthy-text>=</a-typograpthy-text>
            <a-typography-text
              >(利润){{ pc.Profit.toFixed(2) }}</a-typography-text
            >
          </a-space>
        </div>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
  import { listenerPnrAnalyzer } from '@/services/listenser/pnranalyzer';
  import { listenerPaxChange } from '@/services/pricelib/paxlistener';
  import PriceCalculator from '@/services/pricelib/pricecalculator';
  import PriceGroup from '@/services/pricelib/pricegroup';
  import PriceItem from '@/services/pricelib/priceitem';
  import { reactive } from 'vue';

  const payabler = reactive<PriceItem[]>([]);
  const receiver = reactive<PriceItem[]>([]);
  const payerGroup = new PriceGroup(payabler);
  const receiverGroup = new PriceGroup(receiver);

  const pc = reactive(new PriceCalculator(receiverGroup, payerGroup));

  const priceTypeCount = ({
    rowIndex,
    columnIndex,
  }: {
    rowIndex: number;
    columnIndex: number;
  }) => {
    if (rowIndex === 0 && columnIndex === 0) {
      return { rowspan: receiverGroup.PaxTypeCount + 1 };
    }
    if (rowIndex === receiverGroup.PaxTypeCount && columnIndex === 1) {
      return { colspan: 4 };
    }
    return null;
  };

  const priceChange = () => {
    pc.calculator();
  };

  listenerPaxChange((px) => {
    pc.Set(px as string[]);
  });

  listenerPnrAnalyzer((pnr: any) => {
    if (!pnr.price || !Array.isArray(pnr.price)) {
      return;
    }

    pnr.price.forEach((p: any) => {
      const paxItemIdx = payabler.findIndex((item) => item.ptc === p.ptc);
      if (paxItemIdx === -1) {
        return;
      }
      payabler[paxItemIdx].baseAmount = p.baseAmount;
      payabler[paxItemIdx].tax = p.tax;
      payabler[paxItemIdx].agencyFee = p.agencyFee;
    });
  });

  defineExpose({
    payabler,
    receiver,
  });
</script>
