<template>
  <div>
    <el-page-header @back="$router.back()" />
    <el-tabs v-model="name" @tab-click="getData">
      <el-tab-pane label="报名" name="sign" />
      <el-tab-pane label="支付" name="pay" />
    </el-tabs>
    <base-table ref="baseTable" :row-header="rowHeader" :url="url" />
  </div>
</template>

<script lang='ts'>
import { Vue, Component, Mixins } from 'vue-property-decorator';
import { IRowHeader } from '@/components/BaseTable';
import BaseFormVue from '@/base/BaseFormVue';
@Component
export default class LmSignPay extends Mixins(BaseFormVue) {
  private name: 'sign' | 'pay' = 'sign';
  private url = '';
  private rowHeader: IRowHeader[] = [
    {
      label: '报名班级',
      prop: 'ClassName',
    },
    {
      label: '报名时间',
      prop: 'JoinDate',
      width: 150,
    },
    {
      label: '姓名',
      prop: 'Name',
      width: 150,
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
      prop: 'Stage',
      width: 120,
    },
    {
      label: '地址',
      width: 220,
      h: (h: any, params: any) => {
        const { Province, City, District } = params.row;
        return h('span', `${Province}-${City}-${District}`);
      },
    },
  ];
  private mounted() {
    const query = this.$route.query;
    const { url, name }: any = query;
    if (!url) {
      this.back();
      return;
    }
    this.url = url;
    this.name = name || 'sign';
    this.getData();
  }
  private back() {
    this.$router.back();
  }
}
</script>
