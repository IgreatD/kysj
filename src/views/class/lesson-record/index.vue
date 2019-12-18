<template>
  <div>
    <base-table
      ref="baseTable"
      :url="url"
      :row-header="rowHeader"
      :forms="forms"
      :show-functions="false"
      :show-query="true"
      :show-form="true"
      :check-must="false"
      @look-up="lookUp"
    ></base-table>
    <record-dialog
      :show.sync="showRecordDialog"
      :dialog-data.sync="current"
      @update-success="clipSuccess"
    />
  </div>
</template>

<script lang='ts'>
import { Vue, Component, Mixins } from 'vue-property-decorator';
import BaseFormVue from '@/base/BaseFormVue';
import kysjApis from '@/api/kysj';
import { forms, rowHeader } from './model';
import RecordDialog from './record-dialog.vue';
@Component({
  components: {
    RecordDialog,
  },
})
export default class LessonRecord extends Mixins(BaseFormVue) {
  private url = kysjApis.getClassLessonRecordList;
  private forms = forms;
  private rowHeader = rowHeader;
  private showRecordDialog = false;
  private mounted() {
    this.getData();
  }
  private lookUp(data: any) {
    this.current = data;
    this.showRecordDialog = true;
  }
  private clipSuccess() {
    setTimeout(() => {
      this.getData();
    }, 5000);
  }
}
</script>
