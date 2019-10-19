/*
 * @Author: IgreatD
 * @Date: 2019-05-07 10:27:08
 * @Last Modified by: IgreatD
 * @Last Modified time: 2019-10-15 15:21:42
 *
 *  axios封装
 */

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosPromise } from 'axios';
import { IBaseModel } from '@/types/modles/models';
import NProgress from 'nprogress';
import user from '@/store/user';

import { MessageBox } from 'element-ui';

import errorMessage from '@/utils/http/res.message';
import settings from '@/config/settings';

interface IAxiosHeader {
  [prop: string]: string;
}

interface IQueue {
  [prop: string]: boolean;
}

const axiosConfig: IAxiosHeader = {
  'Content-type': 'application/json',
};

/**
 * axios请求类
 *
 * @class HttpRequest
 */
class HttpRequest {
  public static getInstance(): HttpRequest {
    if (this.instance == null) {
      this.instance = new HttpRequest();
    }
    return this.instance;
  }
  private static instance?: HttpRequest;

  private isAlreadyFetchingAccessToken = false;

  private subscribers: any[] = [];

  constructor(private queue: IQueue = {}) {}

  public create<T>(options: AxiosRequestConfig) {
    const instance = axios.create(this.getInsideConfig());
    this.interceptors(instance, options.url!);
    return instance.request<T>(options);
  }

  /**
   * 请求结束
   *
   * @param {string} url 请求地址
   * @memberof HttpRequest
   */
  public destroy(url: string) {
    delete this.queue[url];
    if (!Object.keys(this.queue).length) {
      // hide
      this.showDialog(false);
    }
  }

  /**
   * @description axios内部配置
   *
   * @returns axios配置
   * @memberof HttpRequest
   */
  private getInsideConfig() {
    return {
      method: 'POST',
      headers: axiosConfig,
      timeout: settings.timeout,
    };
  }

  /**
   * 请求、响应拦截
   *
   * @param {AxiosInstance} instance axios实例
   * @param {string} url 请求地址
   * @memberof HttpRequest
   */
  private interceptors(instance: AxiosInstance, url: string) {
    // 请求拦截
    instance.interceptors.request.use(
      (config) => {
        // 添加全局 loading
        if (!Object.keys(this.queue).length) {
          // show
          this.showDialog(true);
        }
        // 添加全局token
        if (user.auth) {
          config.headers.Token = user.auth.token;
        }
        // config.transformResponse = (res: AxiosResponse<IBaseModel<any>>) => res;
        this.queue[url] = true;
        console.log(
          '请求地址url: ',
          url,
          '\n请求参数params: \n',
          JSON.stringify(config.data, null, 2),
        );
        return config;
      },
      (error) => Promise.reject(error),
    );
    instance.interceptors.response.use(
      (res) => {
        res.request.transformResponse = (r: IBaseModel<any>) => r;
        this.destroy(url);
        const { data } = res;
        console.log(
          '请求地址url: ',
          res.config.url,
          '\n请求参数params: \n',
          res.config.data,
          '\n请求结果data: \n',
          data,
        );
        switch (data.code || data.Code) {
          case 1:
          case 2:
            return res;
          case -6:
          case -7:
          case -8:
          case -9:
            return this.refreshToken(res);
          default:
            this.destroy(url);
            return Promise.reject(data);
        }
      },
      (error) => {
        this.destroy(url);
        errorMessage(error);
        return Promise.reject(error);
      },
    );
  }

  private onAccessTokenFetched(accessToken: string) {
    this.subscribers = this.subscribers.filter((callback) => callback(accessToken));
  }

  private addSubscriber(callback: (callback: string) => void) {
    this.subscribers.push(callback);
  }

  /**
   * @description token错误，重新刷新token
   * @private
   * @param {AxiosResponse} res
   * @returns
   * @memberof HttpRequest
   */
  private refreshToken(res: AxiosResponse) {
    if (!this.isAlreadyFetchingAccessToken) {
      this.isAlreadyFetchingAccessToken = true;
      user
        .getUserToken()
        .then((accessToken) => {
          this.isAlreadyFetchingAccessToken = false;
          this.onAccessTokenFetched(accessToken);
        })
        .catch(() => {
          errorMessage(res.request);
          this.confirmLogout();
        });
    }
    const retryOriginalRequest = new Promise((resolve) => {
      this.addSubscriber((accessToken) => {
        resolve(this.create(res.config));
      });
    });
    return retryOriginalRequest as AxiosPromise;
  }

  private showDialog(flag: boolean) {
    flag ? NProgress.start() : NProgress.done();
  }

  // 登出前确认
  private confirmLogout() {
    MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
      confirmButtonText: '重新登录',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(() => {
      this.logOut();
    });
  }
  // 登出系统
  private logOut() {
    user.logOut().then(() => {
      location.reload();
    });
  }
}

export default HttpRequest;
