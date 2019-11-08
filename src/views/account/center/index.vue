 <template>
  <div>
    <base-table
      ref="baseTable"
      :row-header="rowHeader"
      :show-functions="true"
      :show-query="true"
      :url="url"
      v-model="current"
      @set-top="setTop"
      @change-stage="changeStage"
      @update="update"
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
export default class AccountCenter extends Mixins(BaseVue, BaseFormVue) {
  private updateDialogShow = false;
  private get url() {
    return kysjApis.getAccountList;
  }
  private get rowHeader() {
    return rowHeader;
  }
  private mounted() {
    this.getData();
  }
  private setTop({ isTopTeacher, data }: any) {
    this.http({
      url: kysjApis.setTeacherIsTop,
      data: {
        teacherAccountID: data.AccountID,
        isTopTeacher,
      },
    }).then(() => {
      data.IsTopTeacher = isTopTeacher;
    });
  }
  private changeStage({ stageId, row }: any) {
    this.http({
      url: kysjApis.changeAccountStage,
      data: {
        accountID: row.AccountID,
        memberTypeID: row.MemberTypeID,
        stageID: stageId,
      },
    });
  }
  private update() {
    this.checkCurrentNotNull().then(() => {
      this.updateDialogShow = true;
    });
  }
}
</script>
