import { AxiosError } from 'axios';
export default (error: AxiosError) => {
  switch (error.response && error.response.status) {
    case 400:
      error.message = '请求错误';
      break;
    case 401:
      error.message = '未授权，请登录';
      break;
    case 403:
      error.message = '拒绝访问';
      break;
    case 404:
      error.message = `请求地址不存在: ${error.config.url}`;
      break;
    case 405:
      error.message = `方法不允许: ${error.config.method}`;
      break;
    case 408:
      error.message = '请求超时';
      break;
    case 500:
      error.message = '服务器内部错误';
      break;
    case 501:
      error.message = '服务未实现';
      break;
    case 502:
      error.message = '网关错误';
      break;
    case 503:
      error.message = '服务不可用';
      break;
    case 504:
      error.message = '网关超时';
      break;
    case 505:
      error.message = 'HTTP版本不受支持';
      break;
    default:
      error.message = '请求错误，请重试~';
  }
  if (error.message) {
    if (error.message.startsWith('timeout')) {
      error.message = '请求超时';
    }
    return;
  }
  if (!error.response) {
    error.message = '请求错误';
    return;
  }
};
