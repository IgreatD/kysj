<template>
  <base-dialog :visible.sync="syncShow" :title="title" @opened="opened">
    <template v-slot:footer>
      <el-button :type="confirmType" :loading="updateLoading" @click="update">{{confirmText}}</el-button>
    </template>
    <el-form ref="formRef" :model="notice" :rules="rulesNotice" status-icon label-width="80px">
      <el-form-item prop="Title" label="公告名称">
        <el-input v-model="notice.Title" placeholder="请输入公告名称" />
      </el-form-item>
      <el-form-item label="公告内容" prop="Content">
        <tinymce ref="tinymce" v-model="notice.Content" />
      </el-form-item>
    </el-form>
  </base-dialog>
</template>

<script lang='ts'>
import { Vue, Component, Mixins } from 'vue-property-decorator';
import BaseDialogVue from '@/base/BaseDialogVue';
import { isEmpty } from '@/utils';
import kysjApis from '@/api/kysj';
import Tinymce from '@/components/Tinymce/index.vue';
import convertHtml from '@/utils/htmlFormat';
@Component({
  components: {
    Tinymce,
  },
})
export default class AddUpdateDialog extends Mixins(BaseDialogVue) {
  private get title() {
    return `${this.confirmText}公告`;
  }
  private notice: any = {};
  private rulesNotice = {
    Title: [
      {
        required: true,
        message: '请输入公告名称',
        trigger: 'blur',
      },
    ],
    Content: [
      {
        required: true,
        message: '请输入公告内容',
        trigger: 'blur',
      },
    ],
  };
  private opened() {
    this.notice = {};
    if (!isEmpty(this.dialogData)) {
      this.notice = Object.assign({}, this.dialogData);
    }
  }
  private update() {
    /*  */
    (this.$refs.formRef as any).validate((valid: boolean) => {
      if (valid) {
        this.updateLoading = true;
        this.http({
          url: kysjApis.addNotice,
          data: {
            NoticeID: '',
            ...this.notice,
            Content: convertHtml(this.notice.Content),
          },
        })
          .then(() => {
            this.$message.success(`${this.confirmText}公告成功`);
            this.updateLoading = false;
            this.syncShow = false;
            this.updateSuccess();
          })
          .catch((err) => {
            this.$message.error(`${this.confirmText}公告失败`);
            this.updateLoading = false;
          });
      } else {
        return false;
      }
    });
  }
}
</script>
