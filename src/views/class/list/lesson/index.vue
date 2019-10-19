 <template>
  <div>
    <el-page-header @back="$router.back()"></el-page-header>
    <el-tabs v-model="status" @tab-click="getData">
      <el-tab-pane v-for="(item, index) in tabs" :key="index" :name="item.name" :label="item.label"></el-tab-pane>
    </el-tabs>
    <base-table
      ref="baseTable"
      :row-header="rowHeader"
      :url="url"
      :show-functions="false"
      :request-data="requestData"
      :upper-page="true"
      @update="update"
      @update-price="updatePrice"
    />
    <update-dialog
      :show.sync="updateDialogShow"
      :dialog-data.sync="current"
      @update-success="getData"
    />
    <update-price-dialog
      :show.sync="updatePriceDialogShow"
      :dialog-data.sync="current"
      @update-success="getData"
    />
  </div>
</template>
 
<script lang='ts'>
import { Vue, Component, Provide, Mixins, Watch } from 'vue-property-decorator';
import kysjApis from '@/api/kysj';
import { rowHeader, tabs } from './model';
import BaseVue from '@/base/BaseVue';
import BaseFormVue from '@/base/BaseFormVue';
import UpdateDialog from './update-dialog.vue';
import UpdatePriceDialog from './update-price-dialog.vue';
@Component({
  components: {
    UpdateDialog,
    UpdatePriceDialog,
  },
})
export default class ClassList extends Mixins(BaseVue, BaseFormVue) {
  private tabs = tabs;
  private status = '';
  private classId = '';
  private updateDialogShow = false;
  private updatePriceDialogShow = false;
  private get url() {
    return kysjApis.getClassLessonList;
  }
  private get rowHeader() {
    return rowHeader;
  }
  private get requestData() {
    return {
      ClassID: this.classId,
      Status: this.status,
    };
  }
  private created() {
    this.classId = this.$route.params.classId as string;
    if (!this.classId) {
      this.$router.back();
    }
  }
  private mounted() {
    this.getData();
  }
  private getData() {
    this.baseTable.getData();
  }
  private update(data: any) {
    this.current = data;
    this.updateDialogShow = true;
  }
  private updatePrice(data: any) {
    this.current = data;
    this.updatePriceDialogShow = true;
  }
}
</script>
