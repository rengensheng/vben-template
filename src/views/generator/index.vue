<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button v-if="selectedRows.length > 0" type="primary" @click="handleGenerateFront()">
          前端代码生成
        </a-button>
        <a-button v-if="selectedRows.length > 0" type="primary" @click="handleGenerateBack()">
          后端代码生成
        </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'ant-design:codepen-square-filled',
                tooltip: '生成前端代码',
                popConfirm: {
                  title: '是否确认生成前端代码',
                  placement: 'left',
                  confirm: handleGenerateFront.bind(null, record.name),
                },
              },
              {
                icon: 'ant-design:code-filled',
                tooltip: '生成后台代码',
                popConfirm: {
                  title: '是否确认生成后台代码',
                  placement: 'left',
                  confirm: handleGenerateBack.bind(null, record.name),
                },
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
  </div>
</template>
<script lang="ts" setup>
  import { ref, unref } from 'vue';
  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { getTableList, generateWeb, generateBack } from '@/api/generator/generator';
  import { columns } from './generator.data';
  import { message } from 'ant-design-vue';

  defineOptions({ name: 'CodeGenerator' });
  const selectedRows = ref<any>([]);
  const [registerTable] = useTable({
    title: '数据表列表',
    api: getTableList,
    columns,
    isTreeTable: true,
    pagination: false,
    striped: false,
    useSearchForm: false,
    showTableSetting: true,
    bordered: true,
    showIndexColumn: true,
    canResize: false,
    rowSelection: {
      onChange(_, selectedRow) {
        selectedRows.value = unref(selectedRow.map((item) => item.name));
      },
    },
    actionColumn: {
      width: 180,
      title: '操作',
      dataIndex: 'action',
      // slots: { customRender: 'action' },
      fixed: undefined,
    },
  });

  async function handleGenerateFront(tableName?: string) {
    let tableNames: string[] = [];
    if (tableName) {
      tableNames.push(tableName);
    } else {
      tableNames = unref(selectedRows);
    }
    try {
      await generateWeb(tableNames);
      message.success('生成成功');
    } catch (e) {
      message.error('生成失败');
    }
  }

  async function handleGenerateBack(tableName?: string) {
    let tableNames: string[] = [];
    if (tableName) {
      tableNames.push(tableName);
    } else {
      tableNames = unref(selectedRows);
    }
    console.log('tableNames', tableNames);
    try {
      await generateBack(tableNames);
      message.success('生成成功');
    } catch (e) {
      message.error('生成失败');
    }
  }
</script>
