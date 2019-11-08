import { IRowHeader } from '@/components/BaseTable';

export const rowHeader: IRowHeader[] = [
  {
    type: 'selection',
    width: 65,
  },
  {
    label: '班级名称',
    prop: 'className',
  },
  {
    label: '地区',
    width: 200,
    h: (h: any, { row }: any) => h('span', `${row.province} - ${row.city} -${row.district}`),
  },
  {
    label: '学校',
    prop: 'school',
    width: 180,
  },
  {
    label: '学段',
    prop: 'stage',
    width: 120,
  },
  {
    label: '年级',
    prop: 'grade',
    width: 120,
  },
  {
    label: '操作',
    width: 150,
    h: (h: any, { row }: any) =>
      h('el-button', {
        attrs: {
          circle: true,
          icon: 'el-icon-view',
        },
        on: {
          click: () => {
            window.open(row.qrcode);
          },
        },
      }),
  },
];

export const stages: any[] = [
  {
    label: '小学',
    value: '1',
    children: [
      {
        label: '一年级',
        value: '1',
      },
      {
        label: '二年级',
        value: '2',
      },
      {
        label: '三年级',
        value: '3',
      },
      {
        label: '四年级',
        value: '4',
      },
      {
        label: '五年级',
        value: '5',
      },
      {
        label: '六年级',
        value: '6',
      },
    ],
  },
  {
    label: '初中',
    value: '2',
    children: [
      {
        label: '七年级',
        value: '7',
      },
      {
        label: '八年级',
        value: '8',
      },
      {
        label: '九年级',
        value: '9',
      },
    ],
  },
  {
    label: '高中',
    value: '3',
    children: [
      {
        label: '高一',
        value: '10',
      },
      {
        label: '高二',
        value: '11',
      },
      {
        label: '高三',
        value: '12',
      },
    ],
  },
];

export const qrcodeSize: any[] = [
  {
    size: 32,
    label: '32 X 32',
  },
  {
    size: 64,
    label: '64 X 64',
  },
  {
    size: 128,
    label: '128 X 128',
  },
  {
    size: 256,
    label: '256 X 256',
  },
];
