 <template>
  <div>
    <base-table
      ref="baseTable"
      :row-header="rowHeader"
      :show-query="false"
      :show-functions="true"
      :url="url"
      v-model="current"
    />
  </div>
</template>
 
<script lang='ts'>
import { Vue, Component, Provide, Mixins, Watch } from 'vue-property-decorator';
import kysjApis from '@/api/kysj';
import { rowHeader } from './model';
import BaseFormVue from '@/base/BaseFormVue';
@Component
export default class MenuFunction extends Mixins(BaseFormVue) {
  private get url() {
    return kysjApis.getFunctions;
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
}
</script>
