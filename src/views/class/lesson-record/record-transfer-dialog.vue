<template>
  <base-dialog :visible.sync="syncShow" v-if="syncShow" title="课时录像转让" append-to-body>
    <el-tabs v-model="status" @tab-click="getData">
      <el-tab-pane label="班级未完成" name="2"></el-tab-pane>
      <el-tab-pane label="班级已结束" name="4"></el-tab-pane>
    </el-tabs>
    <base-table
      ref="baseTable"
      :row-header="rowHeader"
      :url="url"
      :show-functions="false"
      :show-query="true"
      :request-data="requestData"
    />
  </base-dialog>
</template>

<script lang='ts'>
import { Vue, Component, Mixins, Provide } from 'vue-property-decorator';
import BaseDialogVue from '@/base/BaseDialogVue';
import kysjApis from '@/api/kysj';
import { transferRowHeader } from './model';
import BaseFormVue from '@/base/BaseFormVue';
@Component
export default class RecordTransferDialog extends Mixins(BaseFormVue, BaseDialogVue) {
  private className = '';
  private status = '2';
  private get url() {
    return kysjApis.getTargetClassList;
  }
  private get rowHeader() {
    return transferRowHeader(this.dialogData.recordId);
  }
  private get requestData() {
    return {
      status: this.status,
    };
  }
}
</script>
