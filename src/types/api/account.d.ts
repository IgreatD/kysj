/*
 * @Author: IgreatD
 * @Date: 2019-06-28 10:43:38
 * @Last Modified by: IgreatD
 * @Last Modified time: 2019-07-01 09:33:05
 */

import { IPageType } from './api.d';

/**
 * 获取员工类型
 *
 * @export
 * @interface IUserAccount
 * @extends {IPageType}
 */
export interface IUserAccount extends IPageType {
  /**
   * 分校id
   *
   * @type {string}
   * @memberof IUserAccount
   */
  campusId: string;

  [parmas: string]: any;
}

/**
 * 重置密码
 *
 * @export
 * @interface IResetPassword
 */
export interface IResetPassword {
  /**
   * 账号Id
   *
   * @type {string}
   * @memberof IResetPassword
   */
  accountId: string;
}
