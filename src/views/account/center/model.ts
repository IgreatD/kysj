import { IRowHeader } from '@/components/BaseTable';
import StageSelect from '@/components/BaseSelect/stage.vue';

export const rowHeader: IRowHeader[] = [
  {
    type: 'selection',
    width: 65,
  },
  {
    label: '身份',
    width: 100,
    h: (h: any, { row }: any) => {
      return h('span', formatMemberType(row.MemberTypeID));
    },
  },
  {
    label: '姓名',
    width: 120,
    h: (h: any, { row }: any) => {
      return h('div', [
        h('span', row.Name),
        row.MemberTypeID === '2' && row.IsTopTeacher === '1' && h('el-tag', '名师'),
      ]);
    },
  },
  {
    label: '手机号',
    prop: 'UserName',
    width: 120,
  },
  {
    label: '邀请码',
    prop: 'InvitationCode',
    width: 120,
  },
  {
    label: '账户余额',
    prop: 'Balance',
    width: 120,
  },
  {
    label: '学段',
    width: 220,
    h: (h: any, { vm, row }: any) => {
      return h(StageSelect, {
        attrs: {
          value: row.StageID,
        },
        on: {
          input: (event: any) => {
            vm.$parent.$emit('input', event.target.value);
          },
          change: (val: string) => {
            vm.$emit('change-stage', {
              stageId: val,
              row,
            });
          },
        },
      });
    },
  },
  {
    label: '操作',
    width: 120,
    h: (h: any, { vm, row }: any) => {
      return (
        row.MemberTypeID === '2' &&
        h('el-switch', {
          attrs: {
            type: 'primary',
            activeText: '名师',
            activeValue: '1',
            inactiveValue: '0',
            value: row.IsTopTeacher,
          },
          on: {
            change: (val: string) => {
              vm.$emit('set-top', {
                isTopTeacher: val,
                data: row,
              });
            },
          },
        })
      );
    },
  },
];

function formatMemberType(memberType: string) {
  let type = '未知';
  switch (memberType) {
    case '1':
      type = '学生';
      break;
    case '2':
      type = '老师';
      break;
    case '6':
      type = '业务员';
      break;
  }
  return type;
}
