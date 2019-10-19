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
      <el-form-item label="课时名称">{{formModel.LessonTitle}}</el-form-item>
      <el-form-item label="课时价格" prop="LessonPrice">
        <el-input v-model="formModel.LessonPrice" placeholder="请输入课时价格" />
      </el-form-item>
      <el-form-item label="录像价格比例" prop="DiscountRecord">
        <el-input v-model="formModel.DiscountRecord" placeholder="请输入录像价格比例" />
      </el-form-item>
      <el-form-item label="调整原因">
        <el-input v-model="formModel.remark" placeholder="请输入调整原因" />
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
    LessonPrice: [{ required: true, message: '请输入课时价格', trigger: 'blur' }],
    DiscountRecord: [{ required: true, message: '请输入录像价格比例', trigger: 'blur' }],
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
          url: kysjApis.classLessonChangePrice,
          data: {
            ClassLessonID: this.formModel.ClassLessonID,
            LessonPrice: this.formModel.LessonPrice,
            Remark: this.formModel.remark,
            DiscountRecord: this.formModel.DiscountRecord,
          },
        })
          .then(() => {
            this.$message.success('课时价格修改成功');
            this.updateLoading = false;
            this.syncShow = false;
            this.updateSuccess();
          })
          .catch((err) => {
            this.$message.error(err.message || '课时价格修改失败');
            this.updateLoading = false;
          });
      } else {
        return false;
      }
    });
  }
}
</script>
