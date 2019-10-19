<template>
  <base-dialog :visible.sync="syncShow" :title="title">
    <template v-slot:footer>
      <el-button :type="confirmType" @click="addOrUpdate" :loading="updateLoading">{{confirmText}}</el-button>
    </template>
    <el-form ref="form" label-width="100px" :model="formModel" :rules="formRules">
      <el-form-item label="设备编号" prop="deviceCode">
        <el-input v-model="formModel.deviceCode" placeholder="请输入设备编号" />
      </el-form-item>
      <el-form-item label="设备名称" prop="deviceName">
        <el-input v-model="formModel.deviceName" placeholder="请输入设备名称" />
      </el-form-item>
      <el-form-item label="设备用户名">
        <el-input v-model="formModel.deviceUser" placeholder="请输入设备用户名" />
      </el-form-item>
      <el-form-item label="设备密码">
        <el-input v-model="formModel.devicePwd" placeholder="请输入设备密码" />
      </el-form-item>
      <el-form-item label="设备IP">
        <el-input v-model="formModel.deviceIP" placeholder="请输入设备IP" />
      </el-form-item>
      <el-form-item label="推流域名">
        <el-input v-model="formModel.domainName" placeholder="请输入推流域名" />
      </el-form-item>
      <el-form-item label="串流码">
        <el-input v-model="formModel.streamName" placeholder="请输入串流码" />
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="formModel.memo" placeholder="请输入备注" />
      </el-form-item>
    </el-form>
  </base-dialog>
</template>

<script lang='ts'>
import { Vue, Component, Mixins, Watch, Ref } from 'vue-property-decorator';
import BaseDialogVue from '@/base/BaseDialogVue';
import { isEmpty } from '@/utils';
import { ElForm } from 'element-ui/types/form';
import kysjApis from '@/api/kysj';
@Component
export default class AddOrUpdateDialog extends Mixins(BaseDialogVue) {
  private formModel: any = {
    deviceCode: '',
    deviceName: '',
    deviceUser: '',
    devicePwd: '',
    deviceIP: '',
    domainName: '',
    streamName: '',
    memo: '',
  };
  private formRules = {
    deviceCode: { required: true, message: '请输入设备编号', trigger: 'blur' },
    deviceName: { required: true, message: '请输入设备名称', trigger: 'blur' },
  };
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
  private get title() {
    return `${this.confirmText}设备`;
  }

  private addOrUpdate() {
    this.form.validate((valid) => {
      if (valid) {
        this.updateLoading = true;
        this.http({
          url: this.formModel.deviceId ? kysjApis.editRtmpDevice : kysjApis.addRtmpDevice,
          data: {
            ...this.formModel,
          },
        })
          .then(() => {
            this.$message.success('设备添加成功');
            this.syncShow = false;
            this.updateLoading = false;
            this.updateSuccess();
          })
          .catch(() => {
            this.$message.error('设备添加失败');
            this.updateLoading = false;
          });
      } else {
        return false;
      }
    });
  }
}
</script>
