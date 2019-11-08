<template>
  <base-dialog :visible.sync="syncShow" :title="title" @opened="opened">
    <template v-slot:footer>
      <el-button :type="confirmType" :loading="updateLoading" @click="update">{{confirmText}}</el-button>
    </template>
    <el-form ref="formRef" :model="poster" :rules="rulesPoster" status-icon label-width="200px">
      <el-form-item label="海报地址" prop="posterUrl">
        <el-input v-model="poster.posterUrl" placeholder="请输入海报地址" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Android程序内部跳转地址" prop="jumpActive_Android">
        <el-input
          v-model="poster.jumpActive_Android"
          placeholder="请输入Android程序内部跳转地址"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item label="IOS程序内部跳转地址" prop="jumpActive_IOS">
        <el-input v-model="poster.jumpActive_IOS" placeholder="请输入IOS程序内部跳转地址" autocomplete="off" />
      </el-form-item>
      <el-form-item label="海报序号" prop="sort">
        <el-input type="number" v-model="poster.sort" placeholder="请输入海报序号" autocomplete="off" />
      </el-form-item>
    </el-form>
  </base-dialog>
</template>

<script lang='ts'>
import { Vue, Component, Mixins } from 'vue-property-decorator';
import BaseDialogVue from '@/base/BaseDialogVue';
import { isEmpty } from '@/utils';
import kysjApis from '../../../api/kysj';
@Component
export default class AddUpdateDialog extends Mixins(BaseDialogVue) {
  private get title() {
    return `${this.confirmText}海报`;
  }
  private poster: any = {};
  private rulesPoster = {
    posterUrl: [{ required: true, message: '请输入海报图片地址', trigger: 'change' }],
    jumpActive_Android: [
      {
        required: true,
        message: '请输入Android程序内部跳转地址',
        trigger: 'change',
      },
    ],
    jumpActive_IOS: [
      {
        required: true,
        message: '请输入IOS程序内部跳转地址',
        trigger: 'change',
      },
    ],
    sort: [{ required: true, message: '请输入海报序号', trigger: 'change' }],
  };
  private opened() {
    this.poster = {};
    if (!isEmpty(this.dialogData)) {
      this.poster = Object.assign({}, this.dialogData);
    }
  }
  private update() {
    /*  */
    (this.$refs.formRef as any).validate((valid: boolean) => {
      if (valid) {
        this.updateLoading = true;
        this.http({
          url: kysjApis.addPoster,
          data: {
            posterId: '',
            ...this.poster,
          },
        })
          .then(() => {
            this.$message.success(`${this.confirmText}海报成功`);
            this.updateLoading = false;
            this.syncShow = false;
            this.updateSuccess();
          })
          .catch((err) => {
            this.$message.error(`${this.confirmText}海报失败`);
            this.updateLoading = false;
          });
      } else {
        return false;
      }
    });
  }
}
</script>
