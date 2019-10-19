 <template>
  <div>
    <base-table
      ref="baseTable"
      :row-header="rowHeader"
      :show-query="false"
      :show-functions="true"
      :url="url"
      v-model="current"
      @create="add"
      @update="update"
      @onuse="roleOnOff('1','启用')"
      @offuse="roleOnOff('-1','停用')"
    />
    <add-update-dialog
      :show.sync="addUpdateDialogShow"
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
import AddUpdateDialog from './add-update-dialog.vue';
@Component({
  components: {
    AddUpdateDialog,
  },
})
export default class RolesEditUser extends Mixins(BaseVue, BaseFormVue) {
  private addUpdateDialogShow = false;
  private get url() {
    return kysjApis.getUsers;
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
  private add() {
    this.current = {};
    this.addUpdateDialogShow = true;
  }
  private update() {
    this.checkCurrentNotNull().then(() => {
      this.addUpdateDialogShow = true;
    });
  }
  private async roleOnOff(status: string, statusText: string) {
    await this.checkCurrentNotNull();
    this.$confirm(
      `此操作将${statusText}：${this.current.roleName}, 是否继续?`,
      `${statusText}用户`,
      {
        confirmButtonText: `${statusText}`,
        cancelButtonText: '取消',
        type: 'warning',
      },
    ).then(() => {
      this.http({
        url: kysjApis.roleOnOff,
        data: {
          roleId: this.current.roleId,
          status,
        },
      }).then(() => {
        this.$message.success(`用户${statusText}成功`);
        this.getData();
      });
    });
  }
}
</script>
