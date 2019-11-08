import { IRowHeader } from '@/components/BaseTable';

export const rowHeader: IRowHeader[] = [
  {
    type: 'selection',
    width: 65,
  },
  {
    prop: 'Title',
    label: '公告名称',
    width: 240,
  },
  {
    label: '操作',
    width: 120,
    h: (h: any, { vm, row }: any) =>
      h(
        'el-button',
        {
          attrs: {
            type: 'text',
          },
          on: {
            click: () => {
              vm.$emit('preview', row);
            },
          },
        },
        '公告详情',
      ),
  },
  {
    label: '状态',
    width: 120,
    h: (h: any, { row }: any) =>
      h(
        'el-tag',
        {
          attrs: {
            type: row.Status === '1' ? 'success' : 'info',
          },
        },
        row.Status === '1' ? '启用' : '停用',
      ),
  },
];
