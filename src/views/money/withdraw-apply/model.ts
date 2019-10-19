import { IRowHeader } from '@/components/BaseTable';

export const rowHeader: IRowHeader[] = [
  {
    label: '账户类型',
    width: 120,
    h: (h: any, { row }: any) => {
      return h('span', getMemberType(row.MemberTypeID));
    },
  },
  {
    label: '申请日期',
    prop: 'CreateDate',
    width: 150,
  },
  {
    label: '账户昵称',
    prop: 'Name',
    width: 150,
  },
  {
    label: '账户手机号',
    prop: 'UserName',
    width: 120,
  },
  {
    label: '账户余额',
    prop: 'Balance',
    width: 120,
  },
  {
    label: '提现银行',
    prop: 'Bank',
    width: 100,
  },
  {
    label: '提现金额',
    prop: 'Amount',
    width: 100,
  },
  {
    label: '银行卡号',
    prop: 'BankNo',
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

function getMemberType(memberTypeID: string) {
  switch (memberTypeID) {
    case '1':
      return '学生';
    case '2':
      return '老师';
    case '6':
      return '推广员';
    default:
      return '未知';
  }
}
