import { IRowHeader } from '@/components/BaseTable';

export const rowHeader: IRowHeader[] = [
  {
    type: 'selection',
    width: 65,
  },
  {
    prop: 'sort',
    label: '序号',
    width: 120,
  },
  {
    prop: 'jumpActive_Android',
    label: 'Android端跳转界面',
    width: 150,
  },
  {
    prop: 'jumpActive_IOS',
    label: 'IOS端跳转界面',
    width: 150,
  },
  {
    label: '预览',
    width: 120,
    h: (h: any, { row }: any) =>
      h('el-button', {
        attrs: {
          icon: 'el-icon-view',
          circle: true,
        },
        on: {
          click: () => {
            window.open(row.posterUrl);
          },
        },
      }),
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
