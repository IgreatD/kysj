import { IRowHeader } from '@/components/BaseTable';

export const rowHeader: IRowHeader[] = [
  {
    type: 'selection',
    width: 65,
  },
  {
    prop: 'Sort',
    label: '序号',
    width: 80,
  },
  {
    label: '类型',
    width: 240,
    h: (h: any, { row }: any) => h('span', row.Type === '1' ? '学生端' : '教师端'),
  },
  {
    prop: 'TypeName',
    label: '名称',
    width: 240,
  },
  {
    prop: 'JumpMessage',
    label: '跳转信息',
  },
  {
    label: '预览',
    width: 120,
    h: (h: any, { vm, row }: any) =>
      h('el-button', {
        attrs: {
          icon: 'el-icon-view',
          circle: true,
        },
        on: {
          click: () => {
            window.open(row.Image);
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
            type: row.Status === '1' ? 'success' : 'info',
          },
        },
        row.Status === '1' ? '启用' : '停用',
      ),
  },
];
