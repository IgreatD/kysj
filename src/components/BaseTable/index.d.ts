import Vue from 'vue';

export interface IRowHeader {
  prop?: string | number;
  label?: string;
  width?: number;
  type?: 'index' | 'selection' | 'expand';
  link?: boolean;
  to?: (item: any) => object;
  custom?: boolean;
  fixed?: string;
  h?: (h: typeof Vue.prototype.$createElement, params: any) => any;
}
