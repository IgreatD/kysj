<template>
  <base-dialog :visible.sync="syncShow" title="班级审核">
    <template v-slot:footer>
      <el-button type="warning" @click="examine" :loading="updateLoading">审核</el-button>
    </template>
    <el-form label-position="right" label-width="120px">
      <el-form-item label="待审核班级名称">
        <span class="text-secondary">{{ formModel.Name }}</span>
      </el-form-item>
      <el-form-item label="审核是否通过">
        <el-radio-group v-model="isPass">
          <el-radio label="0" border>不通过</el-radio>
          <el-radio label="1" border>通过</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="isPass === '0'" label="审核不通过原因">
        <el-input v-model="noPassReason" placeholder="请输入审核不通过的原因" />
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
  private noPassReason = '';
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
      url: kysjApis.classExamine,
      data: {
        teacherAccountid: this.formModel.AccountID,
        classID: this.formModel.ClassID,
        className: this.formModel.Name,
        isPass: this.isPass,
        noPassReason: this.noPassReason,
      },
    })
      .then(() => {
        this.$message.success('班级审核成功');
        this.syncShow = false;
        this.updateLoading = false;
        this.updateSuccess();
      })
      .catch(() => {
        this.$message.error('班级审核失败');
        this.updateLoading = false;
      });
  }
}
</script>
