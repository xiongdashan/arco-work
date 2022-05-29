<template>
  <div class="main-container">
    <a-space direction="vertical" fill>
      <a-card>
        <a-row>
          <a-col :span="12">
            <a-button
              v-permission="'suplier:list:mgr'"
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
              v-model="queryParam.name"
              :style="{ width: '320px' }"
              placeholder="请输入编号或名称"
              search-button
              @search="loadData"
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
              {{ $dateFormator(record.creation_time, 'yyyy-MM-DD') }}
            </template>
          </a-table-column>
          <a-table-column title="">
            <template #cell="{ record }">
              <a-space size="middle">
                <a-popconfirm content="确认要删除吗?" @ok="del(record)">
                  <a-button
                    v-permission="'suplier:mgr:del'"
                    type="primary"
                    shape="circle"
                    size="mini"
                    title="删除"
                    :loading="$loader.loading"
                  >
                    <icon-minus />
                  </a-button>
                </a-popconfirm>
                <a-button
                  v-permission="'suplier:mgr:edit'"
                  type="primary"
                  shape="circle"
                  size="mini"
                  title="编辑"
                  @click="edit(record)"
                >
                  <icon-settings />
                </a-button>
              </a-space>
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
    <MgrModal ref="mgrCpt" @mgr-submited="loadData"></MgrModal>
  </div>
</template>

<script setup lang="ts">
  import { SuplierList, SuplierDel } from '@/services/suplier';
  import { reactive, ref } from 'vue';
  import MgrModal from './components/MgrModal.vue';

  const mgrCpt = ref<InstanceType<typeof MgrModal>>();

  const queryParam = reactive({
    pageIndex: 1,
    pageSize: 10,
    name: '',
  });
  const crmdata = ref({
    data: [],
    count: 0,
  });

  const loadData = () => {
    SuplierList(queryParam).then((ret) => {
      crmdata.value = ret as any;
    });
  };

  const toggle = () => {
    mgrCpt.value?.Display();
  };

  const pageChange = (num: number) => {
    queryParam.pageIndex = num;
    loadData();
  };

  const pageSizeChange = (num: number) => {
    queryParam.pageSize = num;
    queryParam.pageIndex = 1;
    loadData();
  };

  const del = async (record: any) => {
    await SuplierDel({ id: record.cid });
    loadData();
  };

  const edit = (record: any) => {
    mgrCpt.value?.Display(record);
  };

  loadData();
</script>

<style lang="less" scoped>
  .paginate {
    display: flex;
    justify-content: flex-end;
  }
</style>
