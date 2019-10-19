import { IRowHeader } from '@/components/BaseTable';

export const tabs = [
  {
    label: '全部',
    name: '',
  },
  {
    label: '正常',
    name: '1',
  },
  {
    label: '已上课未结束',
    name: '2',
  },
  {
    label: '已下课',
    name: '3',
  },
];

export const rowHeader: IRowHeader[] = [
  {
    label: '课时序号',
    prop: 'Serial',
    width: 85,
  },
  {
    label: '课时名称',
    prop: 'LessonTitle',
  },
  {
    label: '课时价格',
    prop: 'LessonPrice',
    width: 120,
  },
  {
    label: '录像价格比例',
    width: 120,
    prop: 'DiscountRecord',
  },
  {
    label: '课时时长(分钟)',
    width: 120,
    prop: 'Duration',
  },
  {
    label: '课时授课时间',
    width: 360,
    h: (h: any, { row }: any) => {
      return h('span', `${row.BeginDate} —— ${row.EndDate}`);
    },
  },
  {
    label: '操作',
    width: 220,
    h: (h: any, { vm, row }: any) => {
      return h('div', [
        h(
          'el-button',
          {
            attrs: {
              type: 'warning',
              icon: 'el-icon-edit',
            },
            on: {
              click: () => {
                vm.$emit('update', row);
              },
            },
          },
          '编辑',
        ),
        h(
          'el-button',
          {
            attrs: {
              type: 'primary',
            },
            on: {
              click: () => {
                vm.$emit('update-price', row);
              },
            },
          },
          '修改价格',
        ),
      ]);
    },
  },
];
