import { IRowHeader } from '@/components/BaseTable';
import WithdrawExpand from './withdraw-expand.vue';

export const rowHeader: IRowHeader[] = [
  {
    type: 'expand',
    width: 65,
    h: (h: any, { row }: any) => {
      return h(WithdrawExpand, { attrs: { withdraw: row } });
    },
  },
  {
    label: '转账账户类型',
    width: 120,
    h: (h: any, { row }: any) => {
      return h('span', getMemberType(row.MemberTypeID));
    },
  },
  {
    label: '转账申请时间',
    prop: 'DrawCreateDate',
    width: 150,
  },
  {
    label: '转账审核时间',
    prop: 'CheckDate',
    width: 150,
  },
  {
    label: '转账账户手机号',
    prop: 'UserName',
    width: 120,
  },
  {
    label: '提现申请审核人',
    prop: 'CheckUserName',
    width: 120,
  },
  {
    label: '提现银行',
    prop: 'WithDrawBank',
    width: 100,
  },
  {
    label: '提现金额',
    prop: 'WithDrawAmount',
    width: 100,
  },
  {
    label: '提现状态',
    width: 100,
    h: (h: any, { row }: any) => {
      const { type, typeText } = formatWithDrawStatus(row.WithDrawStatus);
      return h('el-tag', { attrs: { type } }, typeText);
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

function formatWithDrawStatus(status: string) {
  let [typeText, type] = ['', ''];
  switch (status) {
    case '1':
      typeText = '提交审核';
      type = 'Warning';
      break;
    case '2':
      typeText = '审核通过';
      type = 'primary';
      break;
    case '3':
      typeText = '审核不通过';
      type = 'danger';
      break;
    case '4':
      typeText = '已转账';
      type = 'success';
      break;
  }
  return {
    type,
    typeText,
  };
}
