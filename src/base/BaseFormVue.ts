import { Component, Ref, Mixins } from 'vue-property-decorator';
import { isEmpty } from '@/utils';
import BaseVue from './BaseVue';
@Component
export default class BaseFormVue extends Mixins(BaseVue) {
  @Ref() readonly baseTable!: any;
  formModel: any = {};
  current: any = {};
  checkCurrentNotNull() {
    return new Promise((res) => {
      if (!isEmpty(this.current)) {
        res(this.current);
      } else {
        this.$message.warning('请选择需要操作的表格');
      }
    });
  }
  async getData() {
    await this.$nextTick();
    await this.baseTable.getData();
  }
}
