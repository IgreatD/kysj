import Vue, { VNode } from 'vue';
import HttpRequest from './utils/http/request';
declare global {
  interface Window {
    tinymce: any;
    COS: any;
    TcPlayer: any;
    echarts: any;
  }
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $http: HttpRequest;
  }
}

declare module 'element-ui' {
  export const Scrollbar: any;
}
