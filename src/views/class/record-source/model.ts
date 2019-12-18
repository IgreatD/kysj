import { IRowHeader } from '@/components/BaseTable';
export const rowHeader = (type: string): IRowHeader[] => [
  ...formatType(type),
  {
    label: '操作',
    width: 120,
    h: (h: any, { vm, row }: any) =>
      h(
        'el-button',
        {
          attrs: {
            type: 'primary',
          },
          on: {
            click: () => {
              vm.$emit('look-up', row);
            },
          },
        },
        '查看统计',
      ),
  },
];

function formatType(type: string) {
  return type === '1'
    ? [
        {
          label: '课时标题',
          prop: 'lessonTitle',
        },
        {
          label: '班级名称',
          prop: 'className',
        },
        {
          label: '老师昵称',
          prop: 'teacherName',
          width: 150,
        },
      ]
    : [
        {
          label: '学生昵称',
          prop: 'studentName',
          width: 150,
        },
        {
          label: '学生名称',
          prop: 'studentUserName',
          width: 150,
        },
      ];
}
