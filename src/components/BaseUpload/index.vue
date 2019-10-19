<template>
  <el-upload
    :multiple="false"
    :before-remove="beforeRemove"
    :before-upload="beforeUpload"
    :http-request="uploadPhoto"
    :file-list="fileList"
    :class="{disabled}"
    action="/"
    list-type="picture-card"
    :limit="1"
  >
    <i class="el-icon-plus" v-loading="uploadLoading"></i>
  </el-upload>
</template>

<script lang='ts'>
import { Vue, Component, Mixins, Prop, Watch } from 'vue-property-decorator';
import upload from '@/utils/http/cos';
import { ISucessData } from '@/types';
import { isEmpty } from '@/utils';
@Component
export default class BaseUpload extends Vue {
  @Prop({ default: '' }) readonly value!: string;

  private fileList: any[] = [];

  private uploadLoading = false;

  @Watch('value', { immediate: true })
  private onFileInit(val: any) {
    if (!isEmpty(val) && this.fileList.length !== 1) {
      this.fileList.push({
        url: val,
      });
    }
  }

  private get disabled() {
    return this.fileList.length === 1;
  }

  private isImage(fileName: string) {
    if (fileName) {
      const suffixIndex = fileName.lastIndexOf('.');
      const suffix = fileName.substring(suffixIndex + 1, fileName.length).toLowerCase();
      return /\.bmp|png|jpg|jpeg$/.test(suffix);
    } else {
      this.$message.warning('请选择图片');
      return false;
    }
  }

  private beforeRemove() {
    this.fileList = [];
    this.$emit('input', '');
  }
  private beforeUpload(file: File) {
    return this.isImage(file.name);
  }
  private uploadPhoto({ file }: any) {
    const self = this;
    upload(file, {
      onReady() {
        self.uploadLoading = true;
      },
      onSuccess(data: ISucessData) {
        self.uploadLoading = false;
        const location = `https://${data.Location}`;
        self.fileList.push({
          url: location,
        });
        self.$emit('input', location);
      },
      onError(err) {
        self.uploadLoading = false;
        self.$message.error('图片上传失败，请重试');
      },
    });
  }
}
</script>

<style lang="scss" scoped>
.disabled /deep/ .el-upload--picture-card {
  display: none;
}
</style>
