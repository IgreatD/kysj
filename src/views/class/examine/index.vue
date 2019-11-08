 <template>
  <div>
    <base-table
      ref="baseTable"
      :row-header="rowHeader"
      :url="url"
      :show-functions="false"
      @examine="examine"
    />
    <examine-dialog
      :show.sync="examineDialogShow"
      :dialog-data.sync="current"
      @update-success="getData"
    />
  </div>
</template>
 
<script lang='ts'>
import { Vue, Component, Provide, Mixins, Watch } from 'vue-property-decorator';
import kysjApis from '@/api/kysj';
import { rowHeader } from './model';
import BaseVue from '@/base/BaseVue';
import BaseFormVue from '@/base/BaseFormVue';
import ExamineDialog from './examine-dialog.vue';
@Component({
  components: {
    ExamineDialog,
  },
})
export default class MoneyRecharge extends Mixins(BaseVue, BaseFormVue) {
  private examineDialogShow = false;
  private get url() {
    return kysjApis.getClassList;
  }
  private get rowHeader() {
    return rowHeader;
  }
  private mounted() {
    this.getData();
  }
  private examine(data: any) {
    this.current = data;
    this.examineDialogShow = true;
  }
}
</script>
