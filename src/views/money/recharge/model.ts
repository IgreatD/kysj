import { IRowHeader } from '@/components/BaseTable';

export const rowHeader: IRowHeader[] = [
  {
    label: '充值日期',
    prop: 'CreateDate',
    width: 150,
  },
  {
    label: '账户昵称',
    prop: 'Name',
  },
  {
    label: '账户手机号',
    prop: 'UserName',
    width: 120,
  },
  {
    label: '充值金额',
    prop: 'Amount',
    width: 120,
  },
  {
    label: '课鱼订单号',
    prop: 'out_trade_no',
  },
  {
    label: '第三方平台订单号',
    prop: 'trade_no',
  },
  {
    label: '充值类型',
    width: 120,
    h: (h: any, { row }: any) => {
      return h('div', [
        h('base-svg', {
          attrs: {
            'icon-class': row.Type === '1' ? 'weixin' : 'big-Pay',
          },
        }),
        h(
          'span',
          {
            style: {
              paddingLeft: '10px',
            },
          },
          row.Type === '1' ? '微信' : '支付宝',
        ),
      ]);
    },
  },
];
