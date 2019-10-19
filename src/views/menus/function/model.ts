import { IRowHeader } from '@/components/BaseTable';

export const rowHeader: IRowHeader[] = [
  {
    type: 'selection',
    width: 65,
  },
  {
    label: '图标',
    width: 90,
    h: (h: any, { row }: any) => {
      return (
        row.icon &&
        h('base-svg', {
          attrs: {
            iconClass: row.icon.replace('el-icon-dl-', ''),
          },
        })
      );
    },
  },
  {
    label: '名称',
    prop: 'name',
  },
  {
    label: '别名',
    prop: 'otherName',
  },
  {
    label: '状态',
    width: 120,
    h: (h: any, { row }: any) => {
      const status = row.status === '1';
      return h(
        'el-tag',
        { attrs: { type: status ? 'primary' : 'info' } },
        status ? '启用' : '停用',
      );
    },
  },
];
