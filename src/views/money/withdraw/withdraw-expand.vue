<template>
  <el-form label-position="left" inline align="left" class="table-expand">
    <el-form-item label="转账金额">
      <span>{{ withdraw.TransferAmount }}</span>
    </el-form-item>
    <el-form-item label="转账实际名">
      <span>{{ withdraw.TransferName }}</span>
    </el-form-item>
    <el-form-item label="转账银行">
      <span>{{ withdraw.TransferBank }}</span>
    </el-form-item>
    <el-form-item label="转账支付账号">
      <span>{{ withdraw.TransferBankNo }}</span>
    </el-form-item>
    <el-form-item label="转账备注">
      <span>{{ withdraw.TransferRemark }}</span>
    </el-form-item>
    <el-form-item label="转账创建日期">
      <span>{{ withdraw.TransferCreateDate }}</span>
    </el-form-item>
    <el-form-item label="转账结果">
      <span>{{ withdraw.SubMsg }}</span>
    </el-form-item>
    <el-form-item label="转账人">
      <span>{{ withdraw.BursarName }}</span>
    </el-form-item>
  </el-form>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from 'vue-property-decorator';
@Component
export default class WithdrawExpand extends Vue {
  @Prop() readonly withdraw!: any;
}
</script>
