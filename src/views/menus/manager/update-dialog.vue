<template>
  <base-dialog :visible.sync="syncShow" title="修改菜单">
    <template v-slot:footer>
      <el-button type="warning" :loading="updateLoading" @click="update">修改</el-button>
    </template>
    <el-form ref="form" :model="formModel" label-width="120px">
      <el-form-item label="菜单名称">
        <el-input v-model="formModel.name" placeholder="请输入菜单名称" />
      </el-form-item>
      <el-form-item label="菜单图标">
        <el-input v-model="formModel.icon" placeholder="请输入菜单图标" />
      </el-form-item>
      <el-form-item label="菜单别名">
        <el-input v-model="formModel.otherName" placeholder="请输入菜单别名" />
      </el-form-item>
      <el-form-item label="菜单url">
        <el-input v-model="formModel.url" placeholder="请输入菜单url" />
      </el-form-item>
    </el-form>
  </base-dialog>
</template>

<script lang='ts'>
import { Vue, Component, Mixins, Watch } from 'vue-property-decorator';
import BaseDialogVue from '@/base/BaseDialogVue';
import { ICommonModel } from '@/types/modles/models';
import { isEmpty } from '@/utils';
import kysjApis from '@/api/kysj';
@Component
export default class UpdateDialog extends Mixins(BaseDialogVue) {
  private formModel: any = {};
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
  private update() {
    this.updateLoading = true;
    this.http({
      url: kysjApis.addMenu,
      data: {
        menuName: this.formModel.name,
        menuUrl: this.formModel.url,
        menuOtherName: this.formModel.otherName || '',
        menuIcon: this.formModel.icon,
        menuId: this.formModel.menuId,
        menuPid: this.formModel.menuPid,
        menuSort: this.formModel.sort || '1',
        menuRemark: '',
      },
    })
      .then(() => {
        this.$message.success('菜单修改成功');
        this.syncShow = false;
        this.updateLoading = false;
        this.updateSuccess();
      })
      .catch((err) => {
        this.$message.error(err.message || '菜单修改失败');
        this.updateLoading = false;
      });
  }
}
</script>
