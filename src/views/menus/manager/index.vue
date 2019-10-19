 <template>
  <div>
    <base-table
      ref="baseTable"
      :row-header="rowHeader"
      :show-query="false"
      :show-functions="true"
      :url="url"
      v-model="current"
      @delete="del"
      @update="update"
      @create="add"
      @functionset="functionSet"
    />
    <setting-dialog
      :show.sync="settingDialogShow"
      :dialog-data.sync="current"
      @update-success="getData"
    />
    <add-dialog :show.sync="addDialogShow" :p-menus="pMenus" @update-success="getData" />
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
import BaseFormVue from '@/base/BaseFormVue';
import SettingDialog from './settings-dialog.vue';
import AddDialog from './add-dialog.vue';
import UpdateDialog from './update-dialog.vue';
@Component({
  components: {
    SettingDialog,
    AddDialog,
    UpdateDialog,
  },
})
export default class MenuManager extends Mixins(BaseFormVue) {
  private settingDialogShow = false;
  private addDialogShow = false;
  private updateDialogShow = false;
  private pMenus: any[] = [];
  private get url() {
    return kysjApis.getMenus;
  }
  private get rowHeader() {
    return rowHeader;
  }
  private mounted() {
    this.getData();
  }
  private async getData() {
    await this.baseTable.getData();
    this.pMenus = this.baseTable.tableData.filter((data: any) => !data.pname);
  }
  private async functionSet() {
    await this.checkCurrentNotNull();
    this.settingDialogShow = true;
  }
  private add() {
    this.addDialogShow = true;
  }
  private async update() {
    await this.checkCurrentNotNull();
    this.updateDialogShow = true;
  }
  private del() {
    this.checkCurrentNotNull().then(() => {
      this.$confirm(`此操作将删除：${this.current.name}, 是否继续?`, '删除菜单', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.http({
          url: kysjApis.deleteMenu,
          data: {
            menuIds: this.current.menuId,
          },
        })
          .then(() => {
            this.$message.success('菜单删除成功');
            this.getData();
          })
          .catch((err) => {
            this.$message.error(err.message || '菜单删除失败');
          });
      });
    });
  }
}
</script>
