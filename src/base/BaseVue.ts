import { Vue, Component } from 'vue-property-decorator';
import { AxiosRequestConfig } from 'axios';
import { ICommonModel } from '@/types/modles/models';
@Component
export default class BaseVue extends Vue implements IBaseVue {
  loading: boolean = false;
  public async http<T>(config: AxiosRequestConfig) {
    return await this.$http.create<ICommonModel<T>>(config);
  }
  public async loadData<T>(apiRequestOptions: AxiosRequestConfig): Promise<ICommonModel<T>> {
    this.loading = true;
    const resp = await this.http<T>(apiRequestOptions)
      .then((res) => res.data)
      .catch((error) => {
        if (error.message || error.Message) {
          this.$message.error(error.message || error.Message);
        }
        this.loadError(error);
        this.loading = false;
        return Promise.reject(error);
      });
    this.loading = false;
    return resp;
  }
  // tslint:disable-next-line: no-empty
  loadError(error: any) {}
}

export interface IBaseVue {
  loading: boolean;
  loadData: <T>(apiRequestOptions: AxiosRequestConfig) => Promise<ICommonModel<T> | undefined>;
  loadError: (error: any) => void;
}
