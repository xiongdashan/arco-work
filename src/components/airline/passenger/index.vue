<template>
  <a-table
    :data="paxList"
    :pagination="false"
    :bordered="{ wrapper: true, cell: true }"
  >
    <template #columns>
      <a-table-column title="#">
        <template #cell="{ rowIndex }">
          {{ rowIndex + 1 }}
        </template>
      </a-table-column>
      <a-table-column title="姓名">
        <template #cell="{ rowIndex }">
          <a-input-group>
            <a-input
              v-model="paxList[rowIndex].name"
              :style="{ width: '150px' }"
              size="middle"
            />
            <a-select
              v-model="paxList[rowIndex].ptc"
              :style="{ width: '80px' }"
              size="middle"
              @change="genderChange"
            >
              <a-option>ADT</a-option>
              <a-option>CHD</a-option>
              <a-option>INF</a-option>
            </a-select>
          </a-input-group>
        </template>
      </a-table-column>

      <a-table-column title="生日">
        <template #cell="{ rowIndex }">
          <a-input
            v-model="paxList[rowIndex].birthdate"
            :style="{ width: '80px' }"
            size="middle"
          />
        </template>
      </a-table-column>

      <a-table-column title="证件">
        <template #cell="{ rowIndex }">
          <a-input-group>
            <a-select
              v-model="paxList[rowIndex].idType"
              :options="['NI', 'PP', 'ID']"
              :style="{ width: '80px' }"
            />
            <a-input
              v-model="paxList[rowIndex].idNumber"
              :style="{ width: '80' }"
              placeholder="second"
            />
          </a-input-group>
        </template>
      </a-table-column>

      <a-table-column title="签发国">
        <template #cell="{ rowIndex }">
          <a-input
            v-model="paxList[rowIndex].idIssue"
            :style="{ width: '80px' }"
            size="middle"
          />
        </template>
      </a-table-column>
      <a-table-column title="有效期">
        <template #cell="{ rowIndex }">
          <a-input
            v-model="paxList[rowIndex].expired"
            :style="{ width: '80px' }"
            size="middle"
          />
        </template>
      </a-table-column>
    </template>
    <template #footer>
      <div style="text-align: right">
        <a-space>
          <a-button type="primary" size="mini" @click="addOne">
            <template #icon>
              <icon-plus />
            </template>
          </a-button>
          <a-button type="primary" size="mini" @click="removeOne">
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
  import { Pax } from '@/services/airmodles';
  import { listenerPnrAnalyzer } from '@/services/listenser/pnranalyzer';
  import { setPaxEmitter } from '@/services/pricelib/paxlistener';
  import { reactive } from 'vue';

  const paxData = (): Pax => {
    return {
      ptc: 'ADT',
    } as Pax;
  };

  const paxList = reactive<Pax[]>([]);

  const emitChanged = () => {
    const paxTypes = paxList.map((pax) => pax.ptc);
    setPaxEmitter(paxTypes);
  };

  const addOne = () => {
    paxList.push(paxData());
    emitChanged();
  };

  const removeOne = () => {
    paxList.pop();
    emitChanged();
  };

  const genderChange = () => {
    emitChanged();
  };

  listenerPnrAnalyzer((val) => {
    if (!val) {
      return;
    }
    paxList.splice(0);
    paxList.push(...(val as any).pax);
    emitChanged();
  });

  const GetPax = () => {
    return paxList;
  };

  defineExpose({
    GetPax,
  });
</script>
