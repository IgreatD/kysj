/**
 * @description transform axios data
 * @export
 * @interface IBaseModel
 */
export interface IBaseModel<T> {
  data: ICommonModel<T>;
}

/**
 * @description 数据共同的类型
 * @export
 * @interface ICommonModel
 */
export interface ICommonModel<T> {
  code?: number;
  Code?: number;
  message?: string;
  Message?: string;
  pageCount?: number;
  rowsCount?: number;
  TotalCount?: number;
  data: T;
  ReturnValue?: T;
  keys?: string;
}
