import { IRowHeader } from '@/components/BaseTable';
import MtExpand from './mt-expand.vue';

export const rowHeader: IRowHeader[] = [
  {
    type: 'selection',
    width: 65,
  },
  {
    type: 'expand',
    width: 65,
    h: (h: any, { row }: any) => {
      return h(MtExpand, { attrs: { live: row } });
    },
  },
  {
    label: '设备编号',
    prop: 'deviceCode',
  },
  {
    label: '设备名称',
    prop: 'deviceName',
  },
  {
    label: '推流域名',
    prop: 'domainName',
  },
  {
    label: '串流码',
    prop: 'streamName',
  },
  {
    label: '状态',
    width: 100,
    h: (h: any, { row }: any) => {
      const { type, typeText } = formatStatus(row.status);
      return h(
        'el-tag',
        {
          attrs: {
            type,
          },
        },
        typeText,
      );
    },
  },
];

function formatStatus(status: string) {
  let [type, typeText] = ['', ''];
  switch (status) {
    case '0':
      type = 'warning';
      typeText = '禁用';
      break;
    case '1':
      type = 'success';
      typeText = '开启';
      break;
    case '-1':
      type = 'danger';
      typeText = '删除';
      break;
  }
  return {
    type,
    typeText,
  };
}
