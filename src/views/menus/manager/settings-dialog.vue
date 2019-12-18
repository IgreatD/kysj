<template>
  <base-dialog :visible.sync="syncShow" title="功能设置" @opened="open" v-if="syncShow">
    <template v-slot:footer>
      <el-button type="primary" @click="settings" :loading="updateLoading">设置</el-button>
    </template>
    <el-form v-if="dialogData" label-width="100px">
      <el-form-item label="菜单名称">
        <span>{{dialogData.name}}</span>
      </el-form-item>
      <el-form-item label="菜单功能">
        <el-checkbox-group v-model="menuIds" v-loading="loading">
          <el-checkbox v-for="(item, index) in menus" :key="index" :label="item.id">{{item.name}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
  </base-dialog>
</template>

<script lang='ts'>
import { Vue, Component, Mixins } from 'vue-property-decorator';
import BaseDialogVue from '@/base/BaseDialogVue';
import BaseFormVue from '@/base/BaseFormVue';
import { ICommonModel } from '@/types/modles/models';
import kysjApis from '@/api/kysj';
@Component
export default class ManagerSettingsDialog extends Mixins(BaseDialogVue, BaseFormVue) {
  private menuIds: string[] = [];
  private menus: any[] = [];
  private open() {
    this.getMenusByMenuId();
  }
  private getMenusByMenuId() {
    this.loading = true;
    this.http({
      url: kysjApis.getFunctionsByMenuId,
      data: {
        menuId: this.dialogData.menuId,
      },
    })
      .then((res: any) => {
        this.menus = res.data.data;
        this.loading = false;
        this.menuIds = res.data.keys ? res.data.keys.split(',') : [];
      })
      .catch((err) => {
        this.loading = false;
      });
  }
  private settings() {
    this.updateLoading = true;
    this.http({
      url: kysjApis.setFunctionsByMenuId,
      data: {
        menuId: this.dialogData.menuId,
        functionIDs: this.menuIds.join(','),
      },
    })
      .then((res) => {
        this.$message.success('功能设置成功');
        this.updateLoading = false;
        this.syncShow = false;
      })
      .catch((err) => {
        this.updateLoading = false;
      });
  }
}
</script>
