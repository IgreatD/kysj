<template>
  <base-dialog :visible.sync="syncShow" :title="title" @opened="opened" v-if="syncShow">
    <template v-slot:footer>
      <el-button :type="confirmType" :loading="updateLoading" @click="update">{{confirmText}}</el-button>
    </template>
    <el-form ref="formRef" :model="help" :rules="rulesHelp" status-icon label-width="130px">
      <el-form-item
        v-for="({form}, index) in forms"
        :key="index"
        :label="form.label"
        :prop="form.key"
      >
        <el-select v-model="help[form.key]" :placeholder="'请选择' + form.label">
          <el-option
            v-for="(optionItem, optionIndex) in form.options"
            :key="optionIndex"
            :value="optionItem.value"
            :label="optionItem.label"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="modular" label="模块功能">
        <el-input v-model="help.modular" placeholder="请输入模块功能" />
      </el-form-item>
      <el-form-item prop="helpContent" label="帮助内容">
        <tinymce v-model="help.helpContent" placeholder="请输入帮助内容" />
      </el-form-item>
    </el-form>
  </base-dialog>
</template>

<script lang='ts'>
import { Vue, Component, Mixins, Prop } from 'vue-property-decorator';
import BaseDialogVue from '@/base/BaseDialogVue';
import { isEmpty } from '@/utils';
import kysjApis from '@/api/kysj';
import convertHtml from '@/utils/htmlFormat';
import Tinymce from '@/components/Tinymce/index.vue';
@Component({
  components: {
    Tinymce,
  },
})
export default class AddUpdateDialog extends Mixins(BaseDialogVue) {
  @Prop() readonly forms!: any[];
  private get title() {
    return `${this.confirmText}帮助`;
  }
  private help: any = {};
  private rulesHelp = {
    modular: [{ required: true, message: '请输入模块功能', trigger: 'blur' }],
    helpContent: [{ required: true, message: '请输入帮助内容', trigger: 'blur' }],
    deviceTypeId: [{ required: true, message: '请选择客户端信息', trigger: 'change' }],
    appTypeId: [{ required: true, message: '请选择设备类型', trigger: 'change' }],
  };
  private opened() {
    this.help = {};
    if (!isEmpty(this.dialogData)) {
      this.help = Object.assign({}, this.dialogData);
    }
  }
  private update() {
    /*  */
    (this.$refs.formRef as any).validate((valid: boolean) => {
      if (valid) {
        this.updateLoading = true;
        const { helpContent, ...otherHelps } = this.help;
        this.http({
          url: kysjApis.addHelp,
          data: {
            helpContent: convertHtml(helpContent),
            ...otherHelps,
          },
        })
          .then(() => {
            this.$message.success(`${this.confirmText}帮助成功`);
            this.updateLoading = false;
            this.syncShow = false;
            this.updateSuccess();
          })
          .catch((err) => {
            this.$message.error(`${this.confirmText}帮助失败`);
            this.updateLoading = false;
          });
      } else {
        return false;
      }
    });
  }
}
</script>
