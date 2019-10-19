import { IRowHeader } from '@/components/BaseTable';
import { isEmpty } from '@/utils';
import ExamineExpand from './examine-expand.vue';

export const rowHeader: IRowHeader[] = [
  {
    type: 'expand',
    width: 65,
    h: (h: any, { row }: any) => {
      return h(ExamineExpand, { attrs: { clz: row } });
    },
  },
  {
    label: '创建时间',
    prop: 'CreateDate',
    width: 150,
  },
  {
    label: '班级名称',
    prop: 'Name',
  },
  {
    label: '年级',
    prop: 'Stage',
    width: 120,
  },
  {
    label: '讲师',
    prop: 'TeacherName',
    width: 120,
  },
  {
    label: '班级封面',
    width: 80,
    prop: 'WithDrawBank',
    h: (h: any, { row }: any) => {
      return !isEmpty(row.CoverPath)
        ? h('el-button', {
            attrs: {
              circle: true,
              icon: 'el-icon-view',
            },
            on: {
              click: () => {
                window.open(row.CoverPath);
              },
            },
          })
        : h('i', { class: 'el-icon-error' });
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
            type: 'warning',
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
