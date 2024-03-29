import fetch from 'dva/fetch';
import {
  message
} from 'antd';
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    message.success('请求成功');
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  message.error('请求失败或网络异常，请检查···');
  throw error;
}
/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default async function request(url, options) {
  const response = await fetch(url, options);

  checkStatus(response);

  const data = await response.json();

  const ret = {
    data,
    headers: {},
  };

  if (response.headers.get('x-total-count')) {
    ret.headers['x-total-count'] = response.headers.get('x-total-count');
  }

  return ret;
}
