<template>
  <base-dialog :visible.sync="syncShow" :title="title" @opened="open" v-if="syncShow">
    <template v-slot:footer>
      <el-button :type="confirmType" :loading="updateLoading" @click="addOrUpdate">{{confirmText}}</el-button>
    </template>
    <el-form ref="formRef" :model="formModel" :rules="formRules" label-width="100px">
      <el-form-item label="用户名称" prop="roleName">
        <el-input v-model="formModel.userName" placeholder="请输入用户名称" />
      </el-form-item>
      <el-form-item label="用户昵称" prop="name">
        <el-input v-model="formModel.name" placeholder="请输入用户昵称" />
      </el-form-item>
      <el-form-item label="用户密码" prop="passWord">
        <el-input v-model="formModel.passWord" placeholder="请输入用户密码" />
      </el-form-item>
      <el-form-item label="所属用户" prop="roleId">
        <el-select v-model="formModel.roleId" placeholder="请选择所属用户">
          <el-option
            v-for="item in roles"
            :key="item.roleId"
            :label="item.roleName"
            :disabled="item.roleId === '1' || item.status === '-1'"
            :value="item.roleId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="用户状态" prop="status">
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
import { isEmpty, isArray } from '@/utils';
@Component
export default class AddOrUpdateDialog extends Mixins(BaseDialogVue) {
  private roles: any[] = [];
  private formModel: any = {};
  private formRules = {
    roleName: [{ required: true, message: '请输入用户名称', trigger: 'blur' }],
    name: [{ required: true, message: '请输入用户昵称', trigger: 'blur' }],
    passWord: [{ required: true, message: '请输入用户密码', trigger: 'blur' }],
    roleId: [{ required: true, message: '请选择所属用户', trigger: 'change' }],
    status: [{ required: true, message: '请选择用户状态', trigger: 'change' }],
  };
  @Watch('dialogData')
  private initFormModel(val: any) {
    for (const key in val) {
      if (val.hasOwnProperty(key)) {
        const element = val[key];
        if (!isEmpty(val)) {
          this.$set(this.formModel, key, element);
        }
      }
    }
  }
  private get title() {
    return `${this.confirmText}用户`;
  }
  private open() {
    if (isArray(this.roles) && !isEmpty(this.roles)) {
      return;
    }
    this.getRoles();
  }
  private getRoles() {
    this.http({
      url: kysjApis.getRoles,
      data: {},
    }).then(({ data }: any) => {
      this.roles = data.data;
    });
  }
  private addOrUpdate() {
    (this.$refs.formRef as any).validate((valid: boolean) => {
      if (valid) {
        this.updateLoading = true;
        this.http({
          url: kysjApis.addUser,
          data: {
            ...this.formModel,
            mobile: '',
            userId: this.formModel.userId || '',
          },
        })
          .then(() => {
            this.$message.success('用户添加成功');
            this.syncShow = false;
            this.updateLoading = false;
            this.updateSuccess();
          })
          .catch((err) => {
            this.$message.error(err.message || '用户添加失败');
            this.updateLoading = false;
          });
      } else {
        return false;
      }
    });
  }
}
</script>
