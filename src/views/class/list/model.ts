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
    label: '中创课堂',
    width: 120,
    h: (h: any, { row }: any) => {
      return h(
        'el-tag',
        { attrs: { type: row.isStudentCulture === '1' ? 'primary' : 'info' } },
        row.isStudentCulture === '1' ? '是' : '不是',
      );
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
                vm.$emit('look-lesson', row);
              },
            },
          },
          '查看课时',
        ),
      ]);
    },
  },
];
