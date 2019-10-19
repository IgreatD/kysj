import Vue from 'vue';
import { IFormType } from './formType';

export interface IFormOptions {
  label?: string;
  value?: string;
}

export interface ISelectIds {
  campusId?: string;
  teacherId?: string;
  templateId?: string;
  classId?: string;
  studentId?: string;
  groupId?: string;
  [val: string]: string | undefined;
}

export interface IBaseForm {
  label: string;
  value: string | string[];
  key?: string;
  change?: (val: any) => void;
  hidden?: boolean;
  notMust?: boolean;
}

export interface IInputForm extends IBaseForm {
  type?: string;
  append?: (h: typeof Vue.prototype.$createElement, params: any) => any;
}

export interface ISelectForm extends IBaseForm {
  multiple: boolean;
  options: IFormOptions[];
  searchAble?: boolean;
  h?: (h: typeof Vue.prototype.$createElement, params: any) => any;
  endH?: (h: typeof Vue.prototype.$createElement, params: any) => any;
}

export interface IDateForm extends IBaseForm {
  valueFormat?: string;
  format?: string;
  type?: string;
}

export interface IRadioForm extends IBaseForm {
  options: IFormOptions[];
}

export interface ICheckboxFrom extends IBaseForm {
  options: IFormOptions[];
}

export interface ITimeForm extends IBaseForm {
  valueFormat?: string;
  format?: string;
}

export interface ICustomForm extends IBaseForm {
  slotName: string;
}

export interface IForm {
  type: IFormType;
  form: IInputForm | ISelectForm | IDateForm | IRadioForm | ICheckboxFrom | ITimeForm | ICustomForm;
}
