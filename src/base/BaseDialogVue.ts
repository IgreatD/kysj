import { PropSync, Component, Emit, Prop, Mixins, Ref } from 'vue-property-decorator';
import BaseVue from './BaseVue';
import { isEmpty } from '@/utils';
import { ElForm } from 'element-ui/types/form';
@Component
export default class BaseDialogVue extends Mixins(BaseVue) {
  formRef: ElForm | null = null;
  @Ref() readonly form!: ElForm;
  @PropSync('show', { type: Boolean, default: false }) public syncShow!: boolean;
  @Prop({
    default: () => {
      return {};
    },
  })
  protected dialogData!: any;
  protected updateLoading = false;
  protected get confirmType() {
    return !isEmpty(this.dialogData) ? 'warning' : 'primary';
  }
  protected get confirmText() {
    return !isEmpty(this.dialogData) ? '修改' : '添加';
  }
  @Emit('update-success')
  public updateSuccess(val?: any) {
    return val;
  }
  public cancel() {
    this.syncShow = false;
    this.$emit('update:dialogData', {});
    const self = this as any;
    if (self.close) {
      self.close();
    }
    if (self.formModel) {
      self.formModel = {};
    }
    if (this.formRef) {
      this.formRef.resetFields();
    }
    if (this.form) {
      this.form.resetFields();
    }
  }
  public created() {
    this.$on('cancel', () => {
      this.cancel();
    });
  }
  public destroyed() {
    this.$off('cancel', () => {
      this.cancel();
    });
  }
}
