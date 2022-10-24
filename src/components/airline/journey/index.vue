<template>
  <a-table
    :data="journeyData"
    title="行程信息"
    :pagination="false"
    :bordered="{ wrapper: true, cell: true }"
  >
    <template #columns>
      <a-table-column title="#">
        <template #cell="{ rowIndex }">
          {{ rowIndex + 1 }}
        </template>
      </a-table-column>

      <a-table-column title="航班号">
        <template #cell="{ rowIndex }">
          <a-input
            v-model="journeyData[rowIndex].flightNumber"
            :style="{ width: '80px' }"
            size="medium"
          />
        </template>
      </a-table-column>
      <a-table-column title="舱位">
        <template #cell="{ rowIndex }">
          <a-input
            v-model="journeyData[rowIndex].cabinClass"
            :style="{ width: '80px' }"
            size="medium"
          />
        </template>
      </a-table-column>
      <a-table-column title="出发地-目的地">
        <template #cell="{ rowIndex }">
          <a-input-group>
            <a-input
              v-if="isNotArnk(rowIndex)"
              v-model="journeyData[rowIndex].dep.iataLocationCode"
              :style="{ width: '80px' }"
              size="medium"
            />
            <a-input
              v-if="isNotArnk(rowIndex)"
              v-model="journeyData[rowIndex].arrival.iataLocationCode"
              :style="{ width: '80px' }"
              size="medium"
            />
          </a-input-group>
        </template>
      </a-table-column>

      <a-table-column title="出发时间">
        <template #cell="{ rowIndex }">
          <a-input
            v-if="isNotArnk(rowIndex)"
            v-model="journeyData[rowIndex].dep.aircraftScheduledDateTime"
            v-displaydate
            :style="{ width: '150px' }"
            size="medium"
          />
        </template>
      </a-table-column>

      <a-table-column title="到达时间">
        <template #cell="{ rowIndex }">
          <a-input
            v-if="isNotArnk(rowIndex)"
            v-model="journeyData[rowIndex].arrival.aircraftScheduledDateTime"
            v-displaydate
            :style="{ width: '150px' }"
            size="medium"
          />
        </template>
      </a-table-column>

      <a-table-column title="航站楼">
        <template #cell="{ rowIndex }">
          <a-input
            v-if="isNotArnk(rowIndex)"
            v-model="journeyData[rowIndex].arrival.terminalName"
            :style="{ width: '80px' }"
            size="medium"
          />
        </template>
      </a-table-column>
    </template>
    <template #footer>
      <div style="text-align: right">
        <a-space>
          <a-button type="primary" size="mini" @click="addJourney">
            <template #icon>
              <icon-plus />
            </template>
          </a-button>
          <a-button type="primary" size="mini" @click="removeJourney">
            <template #icon>
              <icon-minus />
            </template>
          </a-button>
        </a-space>
      </div>
    </template>
  </a-table>
</template>

<script setup lang="ts">
  import { Journey } from '@/services/airmodles';
  import { listenerPnrAnalyzer } from '@/services/listenser/pnranalyzer';
  import { computed, reactive } from 'vue';

  const defaultJourney: Journey = {
    arrival: {},
    dep: {},
  } as Journey;

  const journeyData = reactive<Journey[]>([]);

  const addJourney = () => {
    journeyData.push(defaultJourney);
  };

  const removeJourney = () => {
    journeyData.splice(0, 1);
  };

  listenerPnrAnalyzer((val) => {
    if (!val) {
      return;
    }
    journeyData.splice(0);
    journeyData.push(...(val as any).journey);
  });

  const isNotArnk = (idx: number) => {
    const fltNum = journeyData[idx].flightNumber;
    return fltNum !== 'ARNK';
  };

  const GetJourney = () => {
    return journeyData;
  };

  defineExpose({
    journeyData,
    GetJourney,
  });
</script>
