import { IRowHeader } from '@/components/BaseTable';

export const rowHeader: IRowHeader[] = [
  {
    type: 'selection',
    width: 65,
  },
  {
    label: '角色',
    prop: 'roleName',
  },
  {
    label: '角色备注',
    prop: 'roleRemark',
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
