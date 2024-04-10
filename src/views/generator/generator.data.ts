import { BasicColumn, FormSchema } from '@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '数据表名称',
    dataIndex: 'name',
  },
  {
    title: '备注',
    dataIndex: 'comment',
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'projectPath',
    label: '生成路径（项目存放路径）',
    component: 'Input',
    required: true,
  },
];
