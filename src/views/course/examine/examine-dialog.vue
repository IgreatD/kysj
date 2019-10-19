<template>
  <base-dialog :visible.sync="syncShow" title="视频审核" v-if="syncShow">
    <template v-slot:footer>
      <el-button type="warning" @click="examine" :loading="updateLoading">审核</el-button>
    </template>
    <el-form ref="form" :model="formModel" label-position="right" label-width="180px">
      <el-form-item label="待审核视频名称">{{dialogData.Name}}</el-form-item>
      <el-form-item label="是否通过">
        <el-radio-group v-model="formModel.isPass">
          <el-radio label="0">不是</el-radio>
          <el-radio label="1">是</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="formModel.isPass === '0'" label="审核不通过原因">
        <el-input v-model="formModel.noPassReason" placeholder="请输入审核不通过的原因" />
      </el-form-item>
    </el-form>
  </base-dialog>
</template>

<script lang='ts'>
import { Vue, Component, Mixins, Watch } from 'vue-property-decorator';
import BaseDialogVue from '@/base/BaseDialogVue';
import { isEmpty } from '@/utils';
import kysjApis from '@/api/kysj';
@Component
export default class CourseExamineDialog extends Mixins(BaseDialogVue) {
  private formModel: any = {
    isPass: '1',
    noPassReason: '',
  };
  private examine() {
    this.updateLoading = true;
    this.http({
      url: kysjApis.courseExamine,
      data: {
        teacherAccountid: this.dialogData.AccountID,
        courseID: this.dialogData.CourseID,
        courseName: this.dialogData.Name,
        ...this.formModel,
      },
    })
      .then(() => {
        this.$message.success('视频审核成功');
        this.syncShow = false;
        this.updateLoading = false;
        this.updateSuccess();
      })
      .catch(() => {
        this.$message.error('视频审核失败');
        this.updateLoading = false;
      });
  }
}
</script>
