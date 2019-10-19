import { IRowHeader } from '@/components/BaseTable';

export const rowHeader: IRowHeader[] = [
  {
    type: 'selection',
    width: 65,
  },
  {
    label: '用户名',
    prop: 'userName',
    width: 150,
  },
  {
    label: '昵称',
    prop: 'name',
    width: 150,
  },
  {
    label: '角色',
    prop: 'roleName',
    width: 150,
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
