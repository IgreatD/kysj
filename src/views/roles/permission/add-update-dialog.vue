<template>
  <base-dialog :visible.sync="syncShow" :title="title">
    <template v-slot:footer>
      <el-button :type="confirmType" :loading="updateLoading" @click="addOrUpdate">{{confirmText}}</el-button>
    </template>
    <el-form ref="form" :model="formModel" :rules="formRules" label-width="100px">
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="formModel.roleName" placeholder="请输入角色名称" />
      </el-form-item>
      <el-form-item label="角色状态" prop="status">
        <el-radio-group v-model="formModel.status">
          <el-radio label="1">正常</el-radio>
          <el-radio label="2">停用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="formModel.remark" placeholder="请输入备注" />
      </el-form-item>
    </el-form>
  </base-dialog>
</template>

<script lang='ts'>
import { Vue, Component, Mixins, Watch } from 'vue-property-decorator';
import BaseDialogVue from '@/base/BaseDialogVue';
import kysjApis from '@/api/kysj';
@Component
export default class AddOrUpdateDialog extends Mixins(BaseDialogVue) {
  private formModel: any = {};
  private formRules = {
    roleName: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
    status: [{ required: true, message: '请选择角色状态', trigger: 'change' }],
  };
  @Watch('dialogData')
  private initFormModel(val: any) {
    this.formModel = {
      roleId: val.roleId,
      roleName: val.roleName,
      remark: val.roleRemark,
      status: val.status,
    };
  }
  private get title() {
    return `${this.confirmText}角色`;
  }
  private addOrUpdate() {
    this.form.validate((valid) => {
      if (valid) {
        this.updateLoading = true;
        this.http({
          url: kysjApis.addRole,
          data: {
            ...this.formModel,
          },
        })
          .then(() => {
            this.$message.success('角色添加成功');
            this.syncShow = false;
            this.updateLoading = false;
            this.updateSuccess();
          })
          .catch((err) => {
            this.$message.error(err.message || '角色添加失败');
            this.updateLoading = false;
          });
      } else {
        return false;
      }
    });
  }
}
</script>
