<template>
  <base-dialog :visible.sync="syncShow" :title="title" v-if="syncShow">
    <template v-slot:footer>
      <el-button type="warning" @click="update" :loading="updateLoading">编辑</el-button>
    </template>
    <el-form
      ref="form"
      :rules="formRules"
      :model="formModel"
      label-position="right"
      label-width="180px"
    >
      <el-form-item label="课时名称" prop="LessonTitle">
        <el-input v-model="formModel.LessonTitle" placeholder="请输入课时名称" />
      </el-form-item>
      <el-form-item label="课时描述">
        <el-input v-model="formModel.LessonDescription" placeholder="请输入课时描述" />
      </el-form-item>
      <el-form-item label="开始时间">
        <el-date-picker v-model="formModel.BeginDate" type="datetime" />
      </el-form-item>
      <el-form-item label="结束时间">
        <el-date-picker v-model="formModel.EndDate" type="datetime" />
      </el-form-item>
    </el-form>
  </base-dialog>
</template>

<script lang='ts'>
import { Vue, Component, Mixins, Watch, Ref } from 'vue-property-decorator';
import BaseDialogVue from '@/base/BaseDialogVue';
import { isEmpty } from '@/utils';
import kysjApis from '@/api/kysj';
import BaseUpload from '@/components/BaseUpload/index.vue';
import { ElForm } from 'element-ui/types/form';
@Component({
  components: {
    BaseUpload,
  },
})
export default class ClzUpdateDialog extends Mixins(BaseDialogVue) {
  @Ref() readonly form!: ElForm;
  private formModel: any = {};
  private formRules = {
    LessonTitle: [{ required: true, message: '请输入课时名称', trigger: 'blur' }],
  };
  private get title() {
    return this.dialogData.LessonTitle;
  }
  @Watch('dialogData')
  private initFormModel() {
    for (const key in this.dialogData) {
      if (this.dialogData.hasOwnProperty(key)) {
        const element = this.dialogData[key];
        if (!isEmpty(element)) {
          this.$set(this.formModel, key, element);
        }
      }
    }
  }
  private update() {
    this.form.validate((valid) => {
      if (valid) {
        this.updateLoading = true;
        this.http({
          url: kysjApis.classLessonEdit,
          data: {
            ...this.formModel,
          },
        })
          .then(() => {
            this.$message.success('课时信息修改成功');
            this.updateLoading = false;
            this.syncShow = false;
            this.updateSuccess();
          })
          .catch((err) => {
            this.$message.error(err.message || '课时信息修改失败');
            this.updateLoading = false;
          });
      } else {
        return false;
      }
    });
  }
}
</script>
