<template>
  <base-dialog :visible.sync="syncShow" title="班级信息修改" v-if="syncShow">
    <template v-slot:footer>
      <el-button type="warning" @click="update" :loading="updateLoading">编辑</el-button>
    </template>
    <el-form
      ref="form"
      :rules="clzRules"
      :model="formModel"
      label-position="right"
      label-width="180px"
    >
      <el-form-item label="班级名称" prop="Name">
        <el-input v-model="formModel.Name" placeholder="请输入班级名称" />
      </el-form-item>
      <el-form-item label="班级描述">
        <el-input v-model="formModel.Describe" placeholder="请输入班级描述" />
      </el-form-item>
      <el-form-item label="可报名的学生数目" prop="StudentNumber">
        <el-input v-model="formModel.StudentNumber" placeholder="请输入可报名的学生数目" />
      </el-form-item>
      <el-form-item label="课时价格">
        <el-input v-model="formModel.LessonPrice" placeholder="请输入课时价格" />
      </el-form-item>
      <el-form-item label="录像价格比例">
        <el-input v-model="formModel.DiscountRecord" placeholder="请输入录像价格比例[0~1]" />
      </el-form-item>
      <el-form-item label="强制退班扣除费用比例">
        <el-input v-model="formModel.exitClassBackRate" placeholder="请输入课时价格" />
      </el-form-item>
      <el-form-item label="购买单个课时" prop="canBuySingleLesson">
        <el-radio-group v-model="formModel.canBuySingleLesson">
          <el-radio label="0">不可以</el-radio>
          <el-radio label="1">可以</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="中创课堂" prop="isStudentCulture">
        <el-radio-group v-model="formModel.isStudentCulture">
          <el-radio label="0">不是</el-radio>
          <el-radio label="1">是</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="课堂封面" prop="coverPath">
        <base-upload v-model="formModel.CoverPath" />
      </el-form-item>
    </el-form>
  </base-dialog>
</template>

<script lang='ts'>
import { Vue, Component, Mixins, Watch } from 'vue-property-decorator';
import BaseDialogVue from '@/base/BaseDialogVue';
import { isEmpty } from '@/utils';
import kysjApis from '@/api/kysj';
import BaseUpload from '@/components/BaseUpload/index.vue';
@Component({
  components: {
    BaseUpload,
  },
})
export default class ClzUpdateDialog extends Mixins(BaseDialogVue) {
  private formModel: any = {};
  private isPass = '1';
  private clzRules = {
    Name: [{ required: true, message: '请输入班级名称', trigger: 'blur' }],
    isStudentCulture: [{ required: true, message: '请选择是否是中创课堂', trigger: 'change' }],
    canBuySingleLesson: [
      {
        required: true,
        message: '请选择是否可以购买单个课时',
        trigger: 'change',
      },
    ],
  };
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
    this.updateLoading = true;
    this.http({
      url: kysjApis.updateClassInfo,
      data: {
        classID: this.formModel.ClassID,
        className: this.formModel.Name,
        studentNumber: this.formModel.StudentNumber,
        lessonPrice: this.formModel.LessonPrice,
        isStudentCulture: this.formModel.isStudentCulture,
        coverPath: this.formModel.CoverPath,
        exitClassBackRate: this.formModel.exitClassBackRate,
        canBuySingleLesson: this.formModel.canBuySingleLesson,
        disCountRecord: this.formModel.DiscountRecord,
      },
    })
      .then(() => {
        this.$message.success('班级信息修改成功');
        this.syncShow = false;
        this.updateLoading = false;
        this.updateSuccess();
      })
      .catch(() => {
        this.$message.error('班级信息修改失败');
        this.updateLoading = false;
      });
  }
}
</script>
