import { Component, Mixins, Prop } from 'vue-property-decorator';
import { AxiosRequestConfig } from 'axios';
import BaseVue from './BaseVue';
@Component
export default class BaseListVue extends Mixins(BaseVue) {
  loading: boolean = false;
  tableData: any[] = [];
  pageIndex: number = 1;
  pageSize: number = 10;
  total: number = 0;
  queryText = '';
  @Prop({ default: false }) readonly upperPage!: boolean;

  get fileName() {
    return this.$route.meta.title || '表单';
  }

  pageData() {
    const page = { pageSize: this.pageSize, pageIndex: this.pageIndex - 1 };
    return page;
  }

  upperPageData() {
    const page = { PageSize: this.pageSize, PageIndex: this.pageIndex - 1 };
    return page;
  }

  async loadListData(apiRequestOptions: AxiosRequestConfig) {
    this.loading = true;
    this.tableData = [];
    const resp = await this.http<any[]>(apiRequestOptions)
      .then((res) => res.data)
      .catch((error) => {
        if (error.message || error.Message) {
          this.$message.error(error.message || error.Message);
        }
        console.log(error);
        this.loadError(error);
        return {} as any;
      });

    this.loading = false;
    this.total = resp.rowsCount || resp.TotalCount || 0;
    return (this.tableData = resp.data || resp.ReturnValue || []);
  }

  // tslint:disable-next-line: no-empty
  loadError(error: any) {}

  getParams(forms: any) {
    const params: any = {};
    forms.map(({ form }: any) => {
      if (form.key) {
        params[form.key] = form.value || '';
      }
    });
    return params;
  }
}
