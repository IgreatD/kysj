<template>
  <base-dialog :visible.sync="syncShow" title="账号审核">
    <template v-slot:footer>
      <el-button type="warning" :loading="updateLoading" @click="examine(0)">不通过</el-button>
      <el-button type="success" :loading="updateLoading" @click="examine(1)">通过</el-button>
    </template>
    <el-tabs v-model="name">
      <el-tab-pane label="教师身份信息审核" name="id" />
      <el-tab-pane label="教师资格证信息审核" name="certify" />
    </el-tabs>
    <el-form label-width="100px">
      <el-form-item label="审核状态">
        <el-tag
          :type="formatStatus(dialogData.IsRealName).type"
        >{{ formatStatus(dialogData.IsRealName).statusName }}</el-tag>
      </el-form-item>
      <el-form-item :label="idLabel">{{idValue}}</el-form-item>
      <el-form-item>
        <el-row :gutter="20">
          <el-col :span="12">
            <img
              :src="isId ? dialogData.IDCardPhoto1 : dialogData.TeacherCertifyPhoto"
              width="200"
              height="100"
            />
          </el-col>
          <el-col v-if="isId" :span="12">
            <img :src="dialogData.IDCardPhoto2" width="200" height="100" />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="remark" placeholder="请输入备注" />
      </el-form-item>
    </el-form>
  </base-dialog>
</template>

<script lang='ts'>
import { Vue, Component, Mixins } from 'vue-property-decorator';
import BaseDialogVue from '@/base/BaseDialogVue';
import kysjApis from '@/api/kysj';
@Component
export default class AccountExamineDialog extends Mixins(BaseDialogVue) {
  private name: 'certify' | 'id' = 'id';
  private remark = '';
  private get isId() {
    return this.name === 'id';
  }
  private get idLabel() {
    return this.isId ? '身份认证ID' : '资格证认证ID';
  }
  private get idValue() {
    return this.isId ? this.dialogData.IDCard : this.dialogData.TeacherCertifyCode;
  }
  private formatStatus(status: string) {
    let [type, statusName] = ['', ''];
    switch (status) {
      case '0':
        statusName = '未提交';
        type = 'warning';
        break;
      case '1':
        statusName = '提交待审核';
        type = '';
        break;
      case '2':
        statusName = '审核通过';
        type = 'success';
        break;
      case '3':
        statusName = '审核未通过';
        type = 'danger';
        break;
      default:
        statusName = '未提交';
        type = 'warning';
        break;
    }
    return { type, statusName };
  }
  private examine(isPass: number) {
    this.updateLoading = true;
    this.http({
      url: this.isId ? kysjApis.teacherIDExamine : kysjApis.teacherCertifyExamine,
      data: {
        isPass,
        remark: this.remark,
        teacherAccountID: this.dialogData.AccountID,
      },
    })
      .then(() => {
        this.$message.success('审核成功');
        this.syncShow = false;
        this.updateLoading = false;
        this.updateSuccess();
      })
      .catch((err) => {
        this.$message.error(err.message || '审核失败');
        this.updateLoading = false;
      });
  }
}
</script>
