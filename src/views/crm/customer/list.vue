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
      <a-table :data="data.data" :pagination="false">
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
              {{ $filter.DateFormate(record.creation_time, 'yyyy-MM-DD') }}
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
            :total="data.count"
            show-total
            show-page-size
            @change="pageChange"
            @page-size-change="pageSizeChange"
          >
          </a-pagination>
        </div>
      </a-card>
    </a-space>
    <MgrPop ref="mgrpop" :type="1" @submited="pageChange(1)"></MgrPop>
    <OpSelect ref="opSlt" @opChanged="pageChange(1)"></OpSelect>
  </div>
</template>

<script lang="ts">

  import { defineComponent, onMounted, ref } from 'vue';
  import { customerDel, customerList } from '@/services/crm';
  import { Message, Modal } from '@arco-design/web-vue';
  import OpSelect from './components/opselector.vue';
  import MgrPop from './components/mgrpop.vue';

  export default defineComponent({
    name: 'CustomerList',
    components: {
      MgrPop,
      OpSelect,
    },

    setup() {
      const showPop = ref(false);
      const selectedRow = ref({});
      const mgrpop = ref();
      const opSlt = ref();
      const data = ref({
        count: 0,
        data: [],
      });
      const queryParam = ref({
        pageIndex: 1,
        pageSize: 10,
      });

      const toggle = (editData?: any) => {
        (mgrpop.value as any).show(editData);
      };

      const loadData =  () => {
        customerList({
          pageIndex: queryParam.value.pageIndex,
          pageSize: queryParam.value.pageSize,
        }).then((ret) => {
          data.value = ret.data;
        });
      };

      const pageChange =  (pageIndex: number) => {
        queryParam.value.pageIndex = pageIndex;
        loadData();
      };

      const pageSizeChange =  (pageSize: number) => {
        queryParam.value.pageIndex = 1;
        queryParam.value.pageSize = pageSize;
        loadData();
      };

      const edit =  (record: any) => {
        selectedRow.value = record;
        toggle(record);
      };

      const del =  (record: any) => {
        Modal.info({
          title: '警告',
          content: '确定要删除吗？',
          hideCancel: false,
          onOk: () => {
            customerDel({ id: record.PID }).then((ret) => {
              if (ret.code === 0) {
                Message.success('删除成功');
                pageChange(1);
              }
            });
          },
        });
      };

      const showOpSlt = (record: any) => {
        (opSlt.value as any).show(record);
      };

      onMounted(() => {
        loadData();
      });
      return {
        showPop,
        selectedRow,
        data,
        queryParam,
        pageChange,
        pageSizeChange,
        edit,
        del,
        toggle,
        mgrpop,
        showOpSlt,
        opSlt,
      };
    },
  });
</script>

<style lang="less" scoped>
  .paginate {
    display: flex;
    justify-content: flex-end;
  }
</style>
