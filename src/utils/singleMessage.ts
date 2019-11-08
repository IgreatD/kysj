import { Message } from 'element-ui';
const showMessage = Symbol('showMessage');
const Msg = Message as any;
export default class SingleMessage {
  success(options: any, single = true) {
    this[showMessage]('success', options, single);
  }
  warning(options: any, single = true) {
    this[showMessage]('warning', options, single);
  }
  info(options: any, single = true) {
    this[showMessage]('info', options, single);
  }
  error(options: any, single = true) {
    this[showMessage]('error', options, single);
  }
  [showMessage](type: string, options: any, single: boolean) {
    if (single) {
      Msg.closeAll();
      Msg[type](options);
    } else {
      Msg[type](options);
    }
  }
}
