/**
 * @description 公共分页数据参数类型
 * @export
 * @interface IPageType
 */
export interface IPageType {
  /**
   * @description
   * @type {number}
   * @memberof IPageType
   */
  pageIndex: number;

  /**
   * @description
   * @type {number}
   * @memberof IPageType
   */
  pageSize: number;
}
/**
 * @description 用户登录参数类型
 * @export
 * @interface ILoginTypes
 */
export interface ILoginTypes {
  /**
   * @description 用户名
   * @type {string}
   * @memberof ILoginTypes
   */
  userName: string;

  /**
   * @description 密码
   * @type {string}
   * @memberof ILoginTypes
   */
  passWord: string;

  /**
   * @description 时间戳
   * @type {number}
   * @memberof ILoginTypes
   */
  timeSpan: number;
}
