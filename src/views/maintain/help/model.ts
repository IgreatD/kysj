import { IRowHeader } from '@/components/BaseTable';

export const rowHeader: IRowHeader[] = [
  {
    type: 'selection',
    width: 65,
  },
  {
    prop: 'modular',
    label: '模块功能',
    width: 240,
  },
  {
    label: '帮助内容',
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
        '点击查看',
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
            type: row.status === '1' ? 'success' : 'info',
          },
        },
        row.status === '1' ? '启用' : '停用',
      ),
  },
];
