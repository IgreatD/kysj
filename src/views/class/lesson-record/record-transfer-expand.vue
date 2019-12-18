 <template>
  <base-table
    ref="baseTable"
    :row-header="rowHeader"
    :url="url"
    :show-functions="false"
    :request-data="requestData"
    :upper-page="true"
  />
</template>
 
<script lang='ts'>
import { Vue, Component, Provide, Mixins, Watch, Prop, Inject } from 'vue-property-decorator';
import kysjApis from '@/api/kysj';
import { rowHeader } from './model';
import BaseVue from '@/base/BaseVue';
import BaseFormVue from '@/base/BaseFormVue';
import { IRowHeader } from '@/components/BaseTable';
@Component
export default class ClassList extends Mixins(BaseVue, BaseFormVue) {
  @Prop() readonly classId!: string;
  @Prop() readonly recordId!: string;
  private updateDialogShow = false;
  private updatePriceDialogShow = false;
  private rowHeader: IRowHeader[] = [
    {
      label: '课时序号',
      prop: 'Serial',
      width: 85,
    },
    {
      label: '课时名称',
      prop: 'LessonTitle',
    },
    {
      label: '操作',
      width: 120,
      h: (h: any, { row }: any) =>
        h(
          'el-button',
          {
            attrs: {
              type: 'primary',
            },
            on: {
              click: () => {
                this.copyLessonRecord(row);
              },
            },
          },
          '转让录像',
        ),
    },
  ];
  private url = kysjApis.getClassLessonList;
  private get requestData() {
    return {
      ClassID: this.classId,
      Status: '',
    };
  }
  private mounted() {
    this.getData();
  }
  private copyLessonRecord(data: any) {
    this.$confirm('是否将录像转让给这个课时', '录像转让', {
      confirmButtonText: '转让',
      cancelButtonText: '取消',
      type: 'warning',
    })
      .then(() => {
        this.http({
          url: kysjApis.copyLessonRecord,
          data: {
            sourceRecordId: this.recordId,
            targetLessonId: data.ClassLessonID,
          },
        })
          .then(() => {
            this.$message.success('录像转让成功');
          })
          .catch((err) => {
            this.$message.error(err.message || '录像转让失败');
          });
      })
      .catch(() => {
        console.log();
      });
  }
}
</script>
