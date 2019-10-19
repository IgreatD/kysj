 <template>
  <div>
    <base-table ref="baseTable" :row-header="rowHeader" :url="url" />
  </div>
</template>
 
<script lang='ts'>
import { Vue, Component, Provide, Mixins, Watch } from 'vue-property-decorator';
import kysjApis from '@/api/kysj';
import { rowHeader } from './model';
import BaseVue from '@/base/BaseVue';
import BaseFormVue from '@/base/BaseFormVue';
@Component
export default class MoneyRecharge extends Mixins(BaseVue, BaseFormVue) {
  private get url() {
    return kysjApis.getRechargeList;
  }
  private get rowHeader() {
    return rowHeader;
  }
  private mounted() {
    this.baseTable.getData();
  }
}
</script>
