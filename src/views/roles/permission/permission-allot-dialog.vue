<template>
  <base-dialog :visible.sync="syncShow" title="角色权限分配" @opened="open" v-if="syncShow">
    <template v-slot:footer>
      <el-button type="primary" :loading="updateLoading" @click="allot">分配</el-button>
    </template>
    <el-tree
      v-loading="loading"
      ref="tree"
      :data="data"
      :props="defaultProps"
      :default-checked-keys="keys"
      show-checkbox
      node-key="menuFunctionId"
    />
  </base-dialog>
</template>

<script lang='ts'>
import { Vue, Component, Mixins } from 'vue-property-decorator';
import BaseDialogVue from '@/base/BaseDialogVue';
import kysjApis from '@/api/kysj';
import { isEmpty } from '@/utils';
@Component
export default class PermissionAllotDialog extends Mixins(BaseDialogVue) {
  private defaultProps = { children: 'childList', label: 'name' };
  private data: any[] = [];
  private keys: string[] = [];
  private open() {
    this.getData();
  }
  private getData() {
    this.loading = true;
    this.http({
      url: kysjApis.getMenuFunction,
      data: {
        roleId: this.dialogData.roleId,
      },
    })
      .then(({ data }: any) => {
        this.data = data.data;
        this.keys = data.keys.split(',');
        this.loading = false;
      })
      .catch(() => {
        this.loading = false;
      });
  }
  private allot() {
    const keys = (this.$refs.tree as any).getCheckedKeys();
    this.keys = keys.filter((key: any) => !isEmpty(key));
    this.updateLoading = true;
    this.http({
      url: kysjApis.setMenuFunction,
      data: {
        roleId: this.dialogData.roleId,
        keys: this.keys.join(','),
      },
    })
      .then(() => {
        this.$message.success('角色权限分配成功');
        this.syncShow = false;
        this.updateLoading = false;
        this.updateSuccess();
      })
      .catch((err) => {
        this.$message.error(err.message || '角色权限分配失败');
        this.updateLoading = false;
      });
  }
}
</script>
