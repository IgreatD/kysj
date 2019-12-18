import { IRowHeader } from '@/components/BaseTable';
import { IForm } from '@/types/form';
import { IFormType } from '@/types/formType';
import { courseTypes, stages } from '@/utils/const';
import RecordTransferExpand from './record-transfer-expand.vue';
stages.unshift({
  label: '全部',
  value: '',
});
courseTypes.unshift({
  label: '全部',
  value: '',
});
export const forms: IForm[] = [
  {
    type: IFormType.SELECT,
    form: {
      label: '请选择学段',
      value: '',
      options: stages,
      key: 'stageId',
    },
  },
  {
    type: IFormType.SELECT,
    form: {
      label: '请选择科目',
      value: '',
      options: courseTypes,
      key: 'courseInfoID',
    },
  },
];

export const rowHeader: IRowHeader[] = [
  {
    label: '课时标题',
    prop: 'lessonTitle',
  },
  {
    label: '班级名称',
    prop: 'className',
  },
  {
    label: '教师昵称',
    prop: 'name',
    width: 150,
  },
  {
    label: '教师账号',
    prop: 'userName',
    width: 150,
  },
  {
    label: '操作',
    width: 120,
    h: (h: any, { vm, row }: any) =>
      h(
        'el-button',
        {
          attrs: {
            type: 'primary',
            disabled: row.data.length === 0,
          },
          on: {
            click: () => {
              vm.$emit('look-up', row);
            },
          },
        },
        '查看录像',
      ),
  },
];

export const transferRowHeader = (recordId: string): IRowHeader[] => {
  return [
    {
      type: 'expand',
      width: 65,
      h: (h: any, { row }: any) =>
        h(RecordTransferExpand, { attrs: { classId: row.ClassID, recordId } }),
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
  ];
};
