 <template>
  <div>
    <base-table
      ref="baseTable"
      v-model="current"
      :row-header="rowHeader"
      :url="url"
      :show-functions="true"
      :show-query="true"
      @create="add"
      @update="update"
      @delete="del"
      @onuse="use(1,'启用')"
      @offuse="use(0,'停用')"
    />
    <add-or-update-dialog
      :show.sync="addOrUpdateDialogShow"
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
import AddOrUpdateDialog from './add-update-dialog.vue';
@Component({
  components: {
    AddOrUpdateDialog,
  },
})
export default class PushRtmpMt extends Mixins(BaseFormVue) {
  private addOrUpdateDialogShow = false;
  private get url() {
    return kysjApis.getRtmpDeviceList;
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
    this.addOrUpdateDialogShow = true;
  }
  private update() {
    this.checkCurrentNotNull().then(() => {
      this.addOrUpdateDialogShow = true;
    });
  }
  private use(type: number, name: string) {
    this.checkCurrentNotNull().then(() => {
      this.$confirm(`此操作将${status}该设备, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info',
      }).then(() => {
        this.http({
          url: type === 0 ? kysjApis.unableRtmpDevice : kysjApis.enableRtmpDevice,
          data: {
            deviceId: this.current.deviceId,
          },
        })
          .then(() => {
            this.$message({
              type: 'success',
              message: `设备${name}成功`,
            });
            this.getData();
          })
          .catch(() => {
            this.$message({
              type: 'error',
              message: `设备${name}失败`,
            });
          });
      });
    });
  }
  private del() {
    this.checkCurrentNotNull().then(() => {
      this.$confirm('此操作将删除该设备, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error',
      })
        .then(() => {
          this.http({
            url: kysjApis.delRtmpDevice,
            data: {
              deviceId: this.current.deviceId,
            },
          })
            .then(() => {
              this.$message({
                type: 'success',
                message: '设备删除成功',
              });
            })
            .catch(() => {
              this.$message({
                type: 'error',
                message: '设备删除失败',
              });
            });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          });
        });
    });
  }
}
</script>
