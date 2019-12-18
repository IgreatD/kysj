import { PropSync, Component, Emit, Prop, Mixins } from 'vue-property-decorator';
import BaseVue from './BaseVue';
import { isEmpty } from '@/utils';
import { ElForm } from 'element-ui/types/form';
@Component
export default class BaseDialogVue extends Mixins(BaseVue) {
  formRef: ElForm | null = null;
  @PropSync('show', { type: Boolean, default: false }) syncShow!: boolean;
  @Prop({
    default: () => {
      return {};
    },
  })
  dialogData!: any;
  updateLoading = false;
  get confirmType() {
    return !isEmpty(this.dialogData) ? 'warning' : 'primary';
  }
  get confirmText() {
    return !isEmpty(this.dialogData) ? '修改' : '添加';
  }
  @Emit('update-success')
  updateSuccess(val?: any) {
    return val;
  }
  close() {
    Object.assign(this.$data, (this.$options as any).data.call(this));
    this.$emit('update:dialogData', {});
  }
}
