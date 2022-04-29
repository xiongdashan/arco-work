<template>
  <div class="main-container">
    <a-space direction="vertical" fill>
      <a-card>
        <a-row>
          <a-col :span="12">
            <a-button
              v-permission="'crm:list:mgr'"
              type="primary"
              @click="toggle()"
            >
              <template #icon>
                <icon-plus />
              </template>
              <template #default>添加</template>
            </a-button>
          </a-col>
          <a-col :span="12" align="right">
            <a-input-search
              :style="{ width: '320px' }"
              placeholder="请输入编号或名称"
              search-button
            />
          </a-col>
        </a-row>
      </a-card>
      <a-table :data="crmdata.data" :pagination="false">
        <template #columns>
          <a-table-column title="名称" data-index="name"></a-table-column>
          <a-table-column title="创建人">
            <template #cell="{ record }">
              {{ record.show_data.department_name }}/{{
                record.show_data.user_name
              }}
            </template>
          </a-table-column>
          <a-table-column title="创建时间">
            <template #cell="{ record }">
              {{ $filter(record.creation_time, 'yyyy-MM-DD') }}
            </template>
          </a-table-column>
          <a-table-column title="">
            <template #cell="{ record }">
              <a-dropdown>
                <a href="javascript:void(0)">操作</a>
                <template #content>
                  <a-doption @click.prevent="edit(record)">编辑</a-doption>
                  <a-doption @click.prevent="del(record)">
                    <template #default> 删除 </template>
                  </a-doption>
                  <a-doption @click="showOpSlt(record)">分配操作</a-doption>
                </template>
              </a-dropdown>
            </template>
          </a-table-column>
        </template>
      </a-table>
      <a-card>
        <div class="paginate">
          <a-pagination
            :current="queryParam.pageIndex"
            :page-size="queryParam.pageSize"
            :total="crmdata.count"
            show-total
            show-page-size
            @change="pageChange"
            @page-size-change="pageSizeChange"
          >
          </a-pagination>
        </div>
      </a-card>
    </a-space>
    <MgrModal ref="mgrCpt"></MgrModal>
  </div>
</template>

<script setup lang="ts">
  import { customerList } from '@/services/crm';
  import { DefineComponent, ref } from 'vue';
  import MgrModal from './components/MgrModal.vue';

  const mgrCpt = ref<InstanceType<typeof MgrModal>>();

  const toggle = () => {
    mgrCpt.value?.Display();
  };

  const pageChange = (num: number) => {};

  const crmdata = ref({
    data: [],
    count: 0,
  });

  const del = (record: any) => {};

  const edit = (record: any) => {};

  const showOpSlt = (record: any) => {};

  const pageSizeChange = (num: number) => {};

  const queryParam = {
    pageIndex: 1,
    pageSize: 10,
  };

  const loadData = () => {
    customerList(queryParam).then((ret) => {
      crmdata.value = ret.data;
    });
  };

  loadData();
</script>

<style lang="less" scoped>
  .paginate {
    display: flex;
    justify-content: flex-end;
  }
</style>
