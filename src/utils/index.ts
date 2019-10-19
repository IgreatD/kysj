export function isDef(value: any): boolean {
  return value !== undefined && value !== null;
}

export function isObj(x: any): boolean {
  const type = typeof x;
  return x !== null && (type === 'object' || type === 'function');
}

/**
 * 判断传入的参数是否为字符串
 * @param {any} obj
 *
 * @return {Boolean} 传入的参数是否为字符串
 */
export function isString(obj: any): boolean {
  return Object.prototype.toString.call(obj) === '[object String]';
}
/**
 * 判断传入的参数是否为数组对象
 * @param {any} obj
 *
 * @return {Boolean} 传入的参数是否为数组对象
 */
export function isArray(obj: any): boolean {
  console.log(Object.prototype.toString.call(obj));
  return Object.prototype.toString.call(obj) === '[object Array]';
}
/**
 * 判断传入的参数是否为对象
 * @param {any} obj
 *
 * @return {Boolean} 传入的参数是否为对象
 */
export function isObject(obj: any): boolean {
  return Object.prototype.toString.call(obj) === '[object Object]';
}
/**
 * 判断传入的参数是否为Html元素
 * @param {HTMLElement} node
 *
 * @return {Boolean} 传入的参数是否为Html元素
 */
export function isHtmlElement(node: HTMLElement): boolean {
  return node && node.nodeType === Node.ELEMENT_NODE;
}
/**
 * 判断传入的参数是否为函数
 * @param {any} functionToCheck
 *
 * @return {Boolean} 传入的参数是否为函数
 */
export const isFunction = (functionToCheck: any): boolean => {
  const getType = {};
  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
};
/**
 * 判断传入的参数是否未定义
 * @param {any} val
 *
 * @return {Boolean} 传入的参数是否未定义
 */
export const isUndefined = (val: any): boolean => {
  return val === void 0;
};
/**
 * 判断传入的参数是否已定义
 * @param {any} val
 *
 * @return {Boolean} 传入的参数是否已定义
 */
export const isDefined = (val: any): boolean => {
  return val !== undefined && val !== null;
};

/**
 * 验证手机号
 * @param {String} value 手机号
 *
 * @return {Boolean} 是否为手机号
 */
export function isMobile(value: string): boolean {
  value = value.replace(/[^-|\d]/g, '');
  return /^((\+86)|(86))?(1)\d{10}$/.test(value) || /^0[0-9-]{10,13}$/.test(value);
}
/**
 * 验证邮箱
 * @param {String} value 邮箱
 *
 * @return {Boolean} 是否为邮箱
 */
export function isEmail(value: string): boolean {
  // tslint:disable max-line-length
  const reg = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
  return reg.test(value);
}

/**
 * 检测传入的参数是否为空
 * @param {null|undefined|String|Number|Boolean|Map|Set|Object|Error} val 检测的参数
 *
 * @return {Boolean} 传入的参数是否为空
 */
export const isEmpty = (val: any): boolean => {
  if (val === null) {
    return true;
  }

  if (typeof val === 'boolean') {
    return false;
  }

  if (typeof val === 'number') {
    return !val;
  }

  if (val instanceof Error) {
    return val.message === '';
  }

  switch (Object.prototype.toString.call(val)) {
    // String or Array
    case '[object String]':
    case '[object Array]':
      return !val.length;

    // Map or Set
    case '[object Map]':
    case '[object Set]': {
      return !val.size;
    }
    // Plain Object
    case '[object Object]': {
      return !Object.keys(val).length;
    }
  }

  return false;
};

export const kebabCase = (str: string) => {
  const hyphenateRE = /([^-])([A-Z])/g;
  return str
    .replace(hyphenateRE, '$1-$2')
    .replace(hyphenateRE, '$1-$2')
    .toLowerCase();
};

export const capitalize = (str: string) => {
  if (!isString(str)) {
    return str;
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
};

