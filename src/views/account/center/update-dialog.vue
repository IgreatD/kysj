<template>
  <base-dialog :visible.sync="syncShow" title="修改信息" v-if="syncShow">
    <template v-slot:footer>
      <el-button type="warning" :loading="updateLoading" @click="update">编辑</el-button>
    </template>
    <el-form label-width="150px" ref="formRef" :model="formModel" :rules="formRules">
      <el-form-item label="昵称" prop="Name">
        <el-input v-model="formModel.Name" placeholder="请输入昵称" />
      </el-form-item>
      <el-form-item label="手机号" prop="UserName">
        <el-input v-model="formModel.UserName" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="学段" prop="StageID">
        <stage-select v-model="formModel.StageID" />
      </el-form-item>
      <el-form-item label="地区">
        <location-select v-model="formModel.location" />
      </el-form-item>
      <template v-if="dialogData.MemberTypeID === '2'">
        <el-form-item label="科目" prop="CourseInfoID">
          <course-select v-model="formModel.CourseInfoID" />
        </el-form-item>
        <el-form-item label="教龄">
          <el-input v-model="formModel.WorkAge" placeholder="请输入教龄" />
        </el-form-item>
        <el-form-item label="职称">
          <el-input v-model="formModel.TeacherRankCode" placeholder="请输入职称" />
        </el-form-item>
        <el-form-item label="职称图片">
          <base-upload v-model="formModel.TeacherRankPhoto" />
        </el-form-item>
        <el-form-item label="教师资格证号码">
          <el-input v-model="formModel.TeacherCertifyCode" placeholder="请输入教师资格证号码" />
        </el-form-item>
        <el-form-item label="教师资格证正面照">
          <base-upload v-model="formModel.TeacherCertifyPhoto" />
        </el-form-item>
        <el-form-item label="身份证号码">
          <el-input v-model="formModel.IDCard" placeholder="请输入身份证号码" />
        </el-form-item>
        <el-form-item label="身份证正面照">
          <base-upload v-model="formModel.IDCardPhoto1" />
        </el-form-item>
        <el-form-item label="身份证背面照">
          <base-upload v-model="formModel.IDCardPhoto2" />
        </el-form-item>
      </template>
    </el-form>
  </base-dialog>
</template>

<script lang='ts'>
import { Vue, Component, Mixins, Watch } from 'vue-property-decorator';
import StageSelect from '@/components/BaseSelect/stage.vue';
import LocationSelect from '@/components/BaseSelect/location.vue';
import CourseSelect from '@/components/BaseSelect/course.vue';
import BaseDialogVue from '@/base/BaseDialogVue';
import BaseUpload from '@/components/BaseUpload/index.vue';
import { isEmpty } from '@/utils';
import kysjApis from '@/api/kysj';
@Component({
  components: {
    StageSelect,
    LocationSelect,
    CourseSelect,
    BaseUpload,
  },
})
export default class AccountUpdateDialog extends Mixins(BaseDialogVue) {
  private formModel: any = {};
  private formRules: any = {
    Name: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
    UserName: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
    StageID: [{ required: true, message: '请选择学段', trigger: 'change' }],
    CourseInfoID: [{ required: true, message: '请选择科目', trigger: 'change' }],
  };
  @Watch('dialogData')
  private initFormModel(val: any) {
    for (const key in val) {
      if (val.hasOwnProperty(key)) {
        const element = val[key];
        if (!isEmpty(val)) {
          this.$set(this.formModel, key, element);
        }
      }
    }
    this.$set(this.formModel, 'location', [
      this.formModel.ProvinceID,
      this.formModel.CityID,
      this.formModel.DistrictID,
    ]);
  }
  private update() {
    (this.$refs.formRef as any).validate((valid: boolean) => {
      if (valid) {
        this.updateLoading = true;
        const { location, ...otherForm } = this.formModel;
        this.http({
          url: kysjApis.updateUserInfo,
          data: {
            ...otherForm,
            ...this.formModel.location,
          },
        })
          .then(() => {
            this.$message.success('账户信息修改成功');
            this.syncShow = false;
            this.updateLoading = false;
            this.updateSuccess();
          })
          .catch((err) => {
            this.$message.error(err.message || '账户信息修改失败');
            this.updateLoading = false;
          });
      } else {
        return false;
      }
    });
  }
}
</script>
