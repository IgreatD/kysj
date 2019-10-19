<template>
  <div>
    <template v-if="showForm">
      <base-form :forms="forms" v-model="formModel" @query="getData" />
    </template>
    <base-functions
      v-on="$listeners"
      @query="query"
      :show-query="showQuery"
      :show-functions="showFunctions"
    />
    <base-table
      v-on="$listeners"
      v-bind="$attrs"
      v-loading="$attrs.loading ? $attrs.loading: loading"
      :table-data="$attrs.tableData ? $attrs.tableData:  localPagination ? localTableData : tableData"
      :row-header="rowHeader"
    />
    <template v-if="showPage">
      <base-pagination
        :page-size.sync="pageSize"
        :total="total"
        :page-index.sync="pageIndex"
        @page-change="localPagination ? getLocalData() : getData()"
      />
    </template>
  </div>
</template>

<script lang='ts'>
import { Vue, Component, Mixins, Prop, Watch } from 'vue-property-decorator';
import BaseListVue from '@/base/BaseListVue';
import BasePagination from '@/components/BasePagination/index.vue';
import BaseForm from '@/components/BaseForm/_index.vue';
import BaseTable from '@/components/BaseTable/_index.vue';
import BaseFunctions from '@/components/BaseFunctions/_index.vue';
import { IRowHeader } from '.';
import { isEmpty } from '@/utils';
import { IFormType } from '@/types/formType';
import user from '@/store/user';
@Component({
  components: {
    BasePagination,
    BaseTable,
    BaseForm,
    BaseFunctions,
  },
})
export default class BaseTableList extends Mixins(BaseListVue) {
  @Prop({ default: true }) readonly showPage!: boolean;
  @Prop({ default: false }) readonly showForm!: boolean;
  @Prop({ default: true }) readonly showFunctions!: boolean;
  @Prop({ default: false }) readonly showQuery!: boolean;
  @Prop({ default: true }) readonly checkMust!: boolean;
  @Prop({ default: false }) readonly localPagination!: boolean;
  @Prop({ default: 'queryText' }) readonly queryKey!: string;
  @Prop({
    default: () => {
      return {};
    },
  })
  readonly form!: any;
  @Prop({
    default: () => {
      return {};
    },
  })
  readonly rowHeader!: IRowHeader[];
  @Prop({
    default: () => {
      return [];
    },
  })
  readonly forms!: any[];
  @Prop({ default: '' }) readonly url!: string;
  @Prop({
    default: () => {
      return {};
    },
  })
  readonly requestData!: any;
  private localTableData: any[] = [];
  private formModel: any = {};
  @Watch('formModel')
  private onFormChange(val: any) {
    this.$emit('update:form', val);
  }
  private query(queryText: string) {
    this.pageIndex = 1;
    this.queryText = queryText;
    this.getData();
  }
  private async getData() {
    let data: any = {};
    if (this.showPage) {
      if (this.upperPage) {
        data = {
          ...this.upperPageData(),
        };
      } else {
        data = {
          ...this.pageData(),
        };
      }
    }
    if (!isEmpty(this.queryText)) {
      data[this.queryKey] = this.queryText;
    }
    if (this.checkMust) {
      await this.checkForms();
      await this.request(data);
    } else {
      await this.request(data);
    }
  }
  private async request(data: any) {
    await this.loadListData({
      url: this.url,
      data: {
        ...this.formModel,
        ...data,
        ...this.requestData,
      },
    }).then(() => {
      if (this.localPagination) {
        this.total = this.tableData.length;
        this.getLocalData();
      }
    });
  }
  private getLocalData() {
    this.localTableData = this.tableData.slice(
      (this.pageIndex - 1) * this.pageSize,
      this.pageIndex * this.pageSize,
    );
  }
  private checkForms() {
    return new Promise((resolve, reject) => {
      if (!isEmpty(this.forms)) {
        const forms = this.forms as any;
        let hasAllInput = true;
        let tip = '请完善查询条件';
        let len = 0;
        while (hasAllInput && len < forms.length) {
          const form = forms[len].form;
          if (!form.notMust && isEmpty(this.formModel[form.key])) {
            tip = (forms[len].type === IFormType.INPUT ? '请输入' : '请选择') + form.label;
            hasAllInput = false;
          }
          len++;
        }
        if (hasAllInput) {
          resolve();
        } else {
          this.$message.warning(tip);
        }
      } else {
        resolve();
      }
    });
  }
}
</script>
