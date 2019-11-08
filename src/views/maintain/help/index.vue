<template>
  <div>
    <base-table
      ref="baseTable"
      :url="url"
      :row-header="rowHeader"
      :forms="forms"
      v-model="current"
      @create="add"
      @update="update"
      @delete="del"
      @onuse="posterOnOff('启用','1')"
      @offuse="posterOnOff('停用','-1')"
      @preview="preview"
      :show-page="false"
      :show-form="true"
      :show-query="false"
    />
    <add-update-dialog
      :show.sync="addUpdateDialogShow"
      :dialog-data="current"
      @update-success="getData"
      :forms="forms"
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
import { IForm } from '@/types/form';
import { IFormType } from '@/types/formType';
@Component({
  components: {
    AddUpdateDialog,
    PreviewDialog,
  },
})
export default class MaintainHelp extends Mixins(BaseFormVue) {
  private url = kysjApis.getHelpList;
  private rowHeader = rowHeader;
  private addUpdateDialogShow = false;
  private previewDialogShow = false;
  private deviceTypes: any[] = [];
  private appTypes: any[] = [];
  private get forms(): IForm[] {
    return [
      {
        type: IFormType.SELECT,
        form: {
          label: '客户端',
          value: '0',
          key: 'deviceTypeId',
          options: this.deviceTypes,
        },
      },
      {
        type: IFormType.SELECT,
        form: {
          label: '设备',
          value: '0',
          key: 'appTypeId',
          options: [
            {
              value: '0',
              label: '全部',
            },
            {
              value: '1',
              label: 'Android',
            },
            {
              value: '2',
              label: 'PC',
            },
            {
              value: '3',
              label: 'IOS',
            },
          ],
        },
      },
    ];
  }
  private created() {
    this.getData();
    this.getSelects();
  }
  private getSelects() {
    this.http({
      url: kysjApis.getDeviceTypeList,
      data: {},
    }).then(({ data }: any) => {
      this.deviceTypes = data.data.map((item: any) => {
        return {
          label: item.deviceTypeName,
          value: item.deviceTypeId,
        };
      });
      this.deviceTypes.unshift({
        label: '全部',
        value: '0',
      });
    });
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
    this.$confirm(`此操作将删除帮助, 是否继续?`, {
      confirmButtonText: '删除',
      confirmButtonClass: 'el-button--danger el-icon-delete',
      cancelButtonText: '取消',
      type: 'error',
    })
      .then(() => {
        this.http({
          url: kysjApis.deleteHelp,
          data: {
            helpId: this.current.helpId,
          },
        })
          .then(() => {
            this.$message.success('帮助删除成功');
            this.getData();
          })
          .catch(() => {
            this.$message.error('帮助删除失败');
          });
      })
      .catch(() => {
        console.log();
      });
  }
  private posterOnOff(statusText: string, status: string) {
    this.$confirm(`此操作将${statusText}帮助, 是否继续?`, {
      confirmButtonText: `${statusText}`,
      cancelButtonText: '取消',
      type: 'warning',
    })
      .then(() => {
        this.http({
          url: kysjApis.advertisExamine,
          data: {
            advertisId: this.current.AdvertisID,
            enable: status,
          },
        })
          .then(() => {
            this.$message.success(`${statusText}帮助成功`);
            this.getData();
          })
          .catch(() => {
            this.$message.error(`${statusText}帮助失败`);
          });
      })
      .catch(() => {
        console.log();
      });
  }
  private preview({ modular, helpContent }: any) {
    this.previewDialogShow = true;
    (this.$refs.previewDialog as any).setContent(modular, helpContent);
  }
}
</script>
