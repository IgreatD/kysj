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
      @preview="preview"
      :show-page="false"
    />
    <add-update-dialog
      :show.sync="addUpdateDialogShow"
      :dialog-data="current"
      @update-success="getData"
    />
    <preview-dialog ref="previewDialog" :show.sync="previewDialogShow" />
  </div>
</template>

<script lang='ts'>
import { Vue, Component, Mixins } from 'vue-property-decorator';
import kysjApis from '@/api/kysj';
import BaseFormVue from '@/base/BaseFormVue';
import { rowHeader } from './model';
import AddUpdateDialog from './add-update-dialog.vue';
import PreviewDialog from '@/components/Tinymce/preview-dialog.vue';
@Component({
  components: {
    AddUpdateDialog,
    PreviewDialog,
  },
})
export default class MaintainNotice extends Mixins(BaseFormVue) {
  private url = kysjApis.getNoticeList;
  private rowHeader = rowHeader;
  private addUpdateDialogShow = false;
  private previewDialogShow = false;
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
    this.$confirm(`此操作将删除公告, 是否继续?`, {
      confirmButtonText: '删除',
      confirmButtonClass: 'el-button--danger el-icon-delete',
      cancelButtonText: '取消',
      type: 'error',
    })
      .then(() => {
        this.http({
          url: kysjApis.deleteNotice,
          data: {
            noticeId: this.current.NoticeID,
          },
        })
          .then(() => {
            this.$message.success('公告删除成功');
            this.getData();
          })
          .catch(() => {
            this.$message.error('公告删除失败');
          });
      })
      .catch(() => {
        console.log();
      });
  }
  private posterOnOff(statusText: string, status: string) {
    this.$confirm(`此操作将${statusText}公告, 是否继续?`, {
      confirmButtonText: `${statusText}`,
      cancelButtonText: '取消',
      type: 'warning',
    })
      .then(() => {
        this.http({
          url: kysjApis.noticeExamine,
          data: {
            noticeId: this.current.NoticeID,
            enable: status,
          },
        })
          .then(() => {
            this.$message.success(`${statusText}公告成功`);
            this.getData();
          })
          .catch(() => {
            this.$message.error(`${statusText}公告失败`);
          });
      })
      .catch(() => {
        console.log();
      });
  }
  private preview({ Title, Content }: any) {
    this.previewDialogShow = true;
    (this.$refs.previewDialog as any).setContent(Title, Content);
  }
}
</script>
