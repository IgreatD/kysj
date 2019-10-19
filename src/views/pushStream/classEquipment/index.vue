 <template>
  <div>
    <base-table
      ref="baseTable"
      :row-header="rowHeader"
      :url="url"
      :show-functions="false"
      :show-query="true"
      :show-page="false"
      @bind="bind"
    />
    <bind-dialog
      :show.sync="bindDialogShow"
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
import BindDialog from './bind-dialog.vue';
@Component({
  components: { BindDialog },
})
export default class PushStreamClass extends Mixins(BaseVue, BaseFormVue) {
  private bindDialogShow = false;
  private get url() {
    return kysjApis.getRtmpClassList;
  }
  private get rowHeader() {
    return rowHeader;
  }
  private getData() {
    this.baseTable.getData();
  }
  private bind(data: any) {
    this.current = data;
    this.bindDialogShow = true;
  }
}
</script>
