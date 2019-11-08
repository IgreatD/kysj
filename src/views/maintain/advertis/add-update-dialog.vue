<template>
  <base-dialog :visible.sync="syncShow" :title="title" @opened="opened">
    <template v-slot:footer>
      <el-button :type="confirmType" :loading="updateLoading" @click="update">{{confirmText}}</el-button>
    </template>
    <el-form ref="formRef" :model="advertis" :rules="rulesAdvertis" status-icon label-width="130px">
      <el-form-item label="轮播图类型">
        <el-radio-group v-model="advertis.Type">
          <el-radio label="1">学生端</el-radio>
          <el-radio label="2">教师端</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="TypeName" label="轮播图名称">
        <el-input v-model="advertis.TypeName" placeholder="请输入轮播图名称" />
      </el-form-item>
      <el-form-item prop="Sort" label="轮播图序号">
        <el-input v-model="advertis.Sort" placeholder="请输入轮播图序号" />
      </el-form-item>
      <el-form-item prop="JumpMessage" label="轮播图跳转信息">
        <el-input v-model="advertis.JumpMessage" placeholder="请输入轮播图跳转信息" />
      </el-form-item>
      <el-form-item label="轮播图上传" prop="Image">
        <base-upload v-model="advertis.Image" />
      </el-form-item>
    </el-form>
  </base-dialog>
</template>

<script lang='ts'>
import { Vue, Component, Mixins } from 'vue-property-decorator';
import BaseDialogVue from '@/base/BaseDialogVue';
import { isEmpty } from '@/utils';
import kysjApis from '@/api/kysj';
import convertHtml from '@/utils/htmlFormat';
import BaseUpload from '@/components/BaseUpload/index.vue';
@Component({
  components: {
    BaseUpload,
  },
})
export default class AddUpdateDialog extends Mixins(BaseDialogVue) {
  private get title() {
    return `${this.confirmText}轮播图`;
  }
  private advertis: any = {};
  private rulesAdvertis = {
    Image: [{ required: true, message: '请选择要上传的图片', trigger: 'blur' }],
    TypeName: [{ required: true, message: '请输入轮播图名称', trigger: 'blur' }],
    Sort: [{ required: true, message: '请输入轮播图序号', trigger: 'blur' }],
    JumpMessage: [{ required: true, message: '请输入轮播图跳转信息', trigger: 'blur' }],
  };
  private opened() {
    this.advertis = {};
    if (!isEmpty(this.dialogData)) {
      this.advertis = Object.assign({}, this.dialogData);
    }
  }
  private update() {
    /*  */
    (this.$refs.formRef as any).validate((valid: boolean) => {
      if (valid) {
        this.updateLoading = true;
        this.http({
          url: kysjApis.addAdvertis,
          data: {
            ...this.advertis,
          },
        })
          .then(() => {
            this.$message.success(`${this.confirmText}轮播图成功`);
            this.updateLoading = false;
            this.syncShow = false;
            this.updateSuccess();
          })
          .catch((err) => {
            this.$message.error(`${this.confirmText}轮播图失败`);
            this.updateLoading = false;
          });
      } else {
        return false;
      }
    });
  }
}
</script>
