 <template>
  <div>
    <el-tabs v-model="status" @tab-click="getData">
      <el-tab-pane label="班级未完成" name="2"></el-tab-pane>
      <el-tab-pane label="班级已结束" name="4"></el-tab-pane>
    </el-tabs>
    <base-table
      ref="baseTable"
      :row-header="rowHeader"
      :url="url"
      :show-functions="false"
      :show-query="true"
      :request-data="requestData"
      @update="update"
      @look-lesson="lookLesson"
    />
    <update-dialog
      :show.sync="updateDialogShow"
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
import UpdateDialog from './update-dialog.vue';
@Component({
  components: {
    UpdateDialog,
  },
})
export default class ClassList extends Mixins(BaseVue, BaseFormVue) {
  private updateDialogShow = false;
  private status = '2';
  private get url() {
    return kysjApis.getTargetClassList;
  }
  private get rowHeader() {
    return rowHeader;
  }
  private get requestData() {
    return {
      status: this.status,
    };
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
  private lookLesson(data: any) {
    this.$router.push({
      name: 'ClassLessonList',
      params: {
        classId: data.ClassID,
      },
    });
  }
}
</script>
