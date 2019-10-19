import { IRowHeader } from '@/components/BaseTable';

export const rowHeader: IRowHeader[] = [
  {
    label: '创建日期',
    prop: 'CreateDate',
    width: 150,
  },
  {
    label: '姓名',
    prop: 'Name',
    width: 120,
  },
  {
    label: '手机号',
    prop: 'UserName',
    width: 120,
  },
  {
    label: '学校',
    prop: 'School',
    width: 120,
  },
  {
    label: '地址',
    width: 220,
    h: (h: any, params: any) => {
      const { Province, City, District } = params.row;
      return h('span', `${Province}-${City}-${District}`);
    },
  },
  {
    label: '操作',
    width: 120,
    h: (h: any, { vm, row }: any) => {
      return h(
        'el-button',
        {
          attrs: {
            type: 'primary',
          },
          on: {
            click: () => {
              vm.$emit('examine', row);
            },
          },
        },
        '审核',
      );
    },
  },
];
