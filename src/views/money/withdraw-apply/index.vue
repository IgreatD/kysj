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
      :dialog-data.sync="current"
      :show.sync="examineDialogShow"
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
import examineDialog from './examine-dialog.vue';
@Component({
  components: {
    examineDialog,
  },
})
export default class MoneyRecharge extends Mixins(BaseVue, BaseFormVue) {
  private examineDialogShow = false;
  private get url() {
    return kysjApis.getWithdrawList;
  }
  private get rowHeader() {
    return rowHeader;
  }
  private mounted() {
    this.getData();
  }
  private getData() {
    this.baseTable.getData();
  }
  private examine(data: any) {
    this.current = data;
    this.examineDialogShow = true;
  }
}
</script>
