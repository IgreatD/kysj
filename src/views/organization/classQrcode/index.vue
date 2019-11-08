 <template>
  <div>
    <base-table
      ref="baseTable"
      :row-header="rowHeader"
      :url="url"
      :request-data="requestData"
      :show-functions="true"
      :show-search="false"
      :show-form="false"
      @create="add"
      @update="update"
      @delete="del"
      v-model="current"
    />
    <add-update-dialog
      :show.sync="addUpdateDialogShow"
      :dialog-data="current"
      @update-success="getData"
    />
  </div>
</template>
 
<script lang='ts'>
import { Vue, Component, Provide, Mixins, Watch } from 'vue-property-decorator';
import kysjApis from '@/api/kysj';
import { rowHeader } from './model';
import BaseFormVue from '@/base/BaseFormVue';
import user from '@/store/user';
import AddUpdateDialog from './add-update-dialog.vue';
@Component({
  components: {
    AddUpdateDialog,
  },
})
export default class ClassQrCode extends Mixins(BaseFormVue) {
  private url = kysjApis.getOrganizationParametersList;
  private rowHeader = rowHeader;
  private addUpdateDialogShow = false;
  private get requestData() {
    return {
      organizationCode: user.auth.organizationCode,
    };
  }
  private mounted() {
    this.getData();
  }
  private add() {
    this.current = {};
    this.addUpdateDialogShow = true;
  }
  private async update() {
    await this.checkCurrentNotNull();
    this.addUpdateDialogShow = true;
  }
  private async del() {
    await this.checkCurrentNotNull();
    this.$confirm(`此操作将删除：${this.current.className}, 是否继续?`, `删除班级`, {
      confirmButtonText: '删除',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(() => {
      this.http({
        url: kysjApis.deleteOrganizationParameters,
        data: {
          organizationParametersId: this.current.organizationParametersId,
        },
      }).then(() => {
        this.$message.success('班级删除成功');
        this.getData();
      });
    });
  }
}
</script>
