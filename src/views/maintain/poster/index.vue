<template>
  <div>
    <base-table
      ref="baseTable"
      :url="url"
      :row-header="rowHeader"
      v-model="current"
      @create="add"
      @update="update"
      @delete="del"
      @onuse="posterOnOff('启用','1')"
      @offuse="posterOnOff('停用','-1')"
      :show-page="false"
    />
    <add-update-dialog
      :show.sync="addUpdateDialogShow"
      :dialog-data="current"
      @update-success="getData"
    />
  </div>
</template>

<script lang='ts'>
import { Vue, Component, Mixins } from 'vue-property-decorator';
import kysjApis from '@/api/kysj';
import BaseFormVue from '@/base/BaseFormVue';
import { rowHeader } from './model';
import AddUpdateDialog from './add-update-dialog.vue';
@Component({
  components: {
    AddUpdateDialog,
  },
})
export default class MaintainPoster extends Mixins(BaseFormVue) {
  private url = kysjApis.getPosterList;
  private rowHeader = rowHeader;
  private addUpdateDialogShow = false;
  private created() {
    this.getData();
  }
  private add() {
    this.current = {};
    this.addUpdateDialogShow = true;
  }
  private async update() {
    await this.checkCurrentNotNull();
    this.addUpdateDialogShow = true;
  }
  private del() {
    this.$confirm(`此操作将删除海报, 是否继续?`, {
      confirmButtonText: '删除',
      confirmButtonClass: 'el-button--danger el-icon-delete',
      cancelButtonText: '取消',
      type: 'error',
    })
      .then(() => {
        this.http({
          url: kysjApis.deletePoster,
          data: {
            posterId: this.current.posterId,
          },
        })
          .then(() => {
            this.$message.success('海报删除成功');
            this.getData();
          })
          .catch(() => {
            this.$message.error('海报删除失败');
          });
      })
      .catch(() => {
        console.log();
      });
  }
  private posterOnOff(statusText: string, status: string) {
    this.$confirm(`此操作将${statusText}海报, 是否继续?`, {
      confirmButtonText: `${statusText}`,
      cancelButtonText: '取消',
      type: 'warning',
    })
      .then(() => {
        this.http({
          url: kysjApis.posterExamine,
          data: {
            posterId: this.current.posterId,
            enable: status,
          },
        })
          .then(() => {
            this.$message.success(`${statusText}海报成功`);
            this.getData();
          })
          .catch(() => {
            this.$message.error(`${statusText}海报失败`);
          });
      })
      .catch(() => {
        console.log();
      });
  }
}
</script>
