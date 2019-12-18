<template>
  <header-back :title="title">
    <base-table
      ref="baseTable"
      :url="url"
      :row-header="rowHeader"
      :show-functions="false"
      :show-form="false"
      :request-data="requestData"
    ></base-table>
  </header-back>
</template>

<script lang='ts'>
import { Vue, Component, Mixins, Prop } from 'vue-property-decorator';
import BaseFormVue from '@/base/BaseFormVue';
import { IRowHeader } from '@/components/BaseTable';
import { secondToDate } from '@/utils';
import HeaderBack from '@/components/HeaderBack/index.vue';
@Component({
  components: {
    HeaderBack,
  },
})
export default class RecordStatiDialog extends Mixins(BaseFormVue) {
  private get title() {
    return this.$route.query.title || '';
  }
  private get accountId() {
    return this.$route.query.accountId;
  }
  private get classLessonId() {
    return this.$route.query.classLessonId;
  }
  private get requestData() {
    const data: any = {};
    if (this.accountId) {
      data.accountId = this.accountId;
    }
    if (this.classLessonId) {
      data.classLessonId = this.classLessonId;
    }
    return data;
  }
  private get url() {
    return this.$route.query.url;
  }
  private get rowHeader() {
    const rowHeader: IRowHeader[] = this.accountId
      ? [
          {
            label: '课时标题',
            prop: 'LessonTitle',
          },
          {
            label: '班级名称',
            prop: 'ClassName',
          },
          {
            label: '老师昵称',
            prop: 'TeacherName',
            width: 150,
          },
        ]
      : [
          {
            label: '学生名称',
            prop: 'StudentUserName',
            width: 150,
          },
          {
            label: '学生昵称',
            prop: 'StudentName',
            width: 150,
          },
        ];
    rowHeader.push({
      label: '观看次数',
      prop: 'WatchTimes',
      width: 150,
    });
    rowHeader.push({
      label: '观看总时长',
      width: 150,
      h: (h: any, { row }: any) => h('span', secondToDate(row.WatchLength)),
    });
    return rowHeader;
  }
  private mounted() {
    this.getData();
  }
}
</script>
