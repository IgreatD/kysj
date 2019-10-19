<template>
  <base-dialog :visible.sync="syncShow" title="提现审核">
    <template v-slot:footer>
      <el-button type="warning" @click="examine" :loading="updateLoading">审核</el-button>
    </template>
    <el-form label-position="right" label-width="120px">
      <el-form-item label="待审核手机号">
        <span class="text-secondary">{{ formModel.UserName }}</span>
      </el-form-item>
      <el-form-item label="提现金额">
        <span class="text-secondary">{{ formModel.Amount }}</span>
      </el-form-item>
      <el-form-item label="银行名称">
        <span class="text-secondary">{{ formModel.Bank }}</span>
      </el-form-item>
      <el-form-item label="银行卡号">
        <span class="text-secondary">{{ formModel.BankNo }}</span>
      </el-form-item>
      <el-form-item label="审核是否通过">
        <el-radio-group v-model="isPass">
          <el-radio label="0" border>不通过</el-radio>
          <el-radio label="1" border>通过</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="formModel.Remark" />
      </el-form-item>
    </el-form>
  </base-dialog>
</template>

<script lang='ts'>
import { Vue, Component, Mixins, Watch } from 'vue-property-decorator';
import BaseDialogVue from '@/base/BaseDialogVue';
import { isEmpty } from '@/utils';
import kysjApis from '@/api/kysj';
@Component
export default class WithdrawExamineDialog extends Mixins(BaseDialogVue) {
  private formModel: any = {};
  private isPass = '1';
  @Watch('dialogData')
  private initFormModel() {
    for (const key in this.dialogData) {
      if (this.dialogData.hasOwnProperty(key)) {
        const element = this.dialogData[key];
        if (!isEmpty(element)) {
          this.$set(this.formModel, key, element);
        }
      }
    }
  }
  private examine() {
    this.updateLoading = true;
    this.http({
      url: kysjApis.withdrawExamine,
      data: {
        withDrawID: this.formModel.WithDrawID,
        isPass: this.isPass,
        remark: this.formModel.Remark,
      },
    })
      .then(() => {
        this.$message.success('提现申请审核成功');
        this.syncShow = false;
        this.updateLoading = false;
        this.updateSuccess();
      })
      .catch(() => {
        this.$message.error('提现申请审核失败');
        this.updateLoading = false;
      });
  }
}
</script>
