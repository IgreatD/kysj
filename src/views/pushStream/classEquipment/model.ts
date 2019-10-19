import { IRowHeader } from '@/components/BaseTable';
import { isEmpty } from '@/utils';

export const rowHeader: IRowHeader[] = [
  {
    label: '名称',
    prop: 'Name',
  },
  {
    label: '描述',
    prop: 'Describe',
  },
  {
    label: '老师',
    prop: 'TeacherName',
  },
  {
    label: '创建时间',
    prop: 'CreateDate',
    width: 150,
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
              vm.$emit('bind', row);
            },
          },
        },
        '绑定',
      );
    },
  },
];
