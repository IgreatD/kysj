<template>
  <div>
    <base-table
      ref="baseTable"
      :url="url"
      :row-header="rowHeader"
      :show-functions="false"
      :show-query="true"
      :show-form="false"
      :check-must="false"
      @look-up="lookUp"
      :request-data="requestData"
    >
      <template slot="tab">
        <el-tabs v-model="type" @tab-click="handleClick">
          <el-tab-pane label="课时" name="1"></el-tab-pane>
          <el-tab-pane label="学生" name="2"></el-tab-pane>
        </el-tabs>
      </template>
    </base-table>
  </div>
</template>

<script lang='ts'>
import { Vue, Component, Mixins } from 'vue-property-decorator';
import BaseFormVue from '@/base/BaseFormVue';
import kysjApis from '@/api/kysj';
import { rowHeader } from './model';
import { IFormType } from '@/types/formType';
@Component({
  name: 'LessonRecordSource',
})
export default class LessonRecordSource extends Mixins(BaseFormVue) {
  private url = kysjApis.getLessonRecordSource;
  private type = '1';
  private get rowHeader() {
    return rowHeader(this.type);
  }
  private get requestData() {
    return {
      type: this.type,
    };
  }
  private showRecordDialog = false;
  private mounted() {
    this.getData();
  }
  private lookUp(data: any) {
    const query: any = {};
    if (data.studentAccountId) {
      query.accountId = data.studentAccountId;
      query.url = kysjApis.getRecordStatisticsByAccountID;
      query.title = data.studentName;
    }
    if (data.classLessonId) {
      query.classLessonId = data.classLessonId;
      query.url = kysjApis.getRecordStatisticsByClassLessonID;
      query.title = data.lessonTitle;
    }
    console.log(data);
    console.log(query);
    this.$router.push({
      name: 'RecordStati',
      query: {
        ...query,
      },
    });
  }
  private handleClick() {
    this.baseTable.reset();
    this.getData();
  }
}
</script>
