import http from './tools.js';
import {
  message
} from 'antd';
import request from '../utils/request.js';
const url = 'http://192.168.3.5:8080/api/v1';
// const url = 'http://localhost:9099/api/v1/device';

const checkStatus = (res) => {
  if (res.status !== 200) {
    message.error('请求失败或网络异常，请检查···');
  } else {
    message.success('请求成功');
  }
}

//查询用户的列表
export const getUserList = async () => {
  //得到原始输出
  let res = await http.get(url + '/database/getUser', null);
  checkStatus(res);
  return res.data;
};

export const deleteUser = async (userName) => {
  return request(url + `/database/delete_user_name?userName=${userName}`, {
    method: 'DELETE',
  });
};
export const addUser = async (values) => {
  return request(url + `/database/addUser?userName=${values.userName}&userKey=${values.userKey}&userPrivilege=${values.userPrivilege}`, {
    method: 'POST',
  });
};
//查询设备的属性
export const queryDeviceProp = async (params) => {
  // let res = await http.get(url + '/queryDeviceProp', params);
  let res = await http.get(url + '/database/getUser', null);
  checkStatus(res);
  console.info("queryDeviceProp");
  return res.data;
}

//查询设备的属性
export const selectChartDataByTime = async (params) => {
  // let res = await http.get(url + '/queryDevicePropHistoryLogs', params);
  let res = await http.get(url + '/database/getUser', null);
  console.info(res);
  checkStatus(res);
  console.info("selectChartDataByTime");
  return res.data;
}

//设置报警阈值
export const setDeviceProperty = async (params) => {
  // let res = await http.get(url + '/setDeviceProperty', params);
  let res = await http.get(url + '/database/getUser', null);
  checkStatus(res);
  console.info("setDeviceProperty");
  return res.data
}

//查询历史报警记录
export const queryAlarmHistoryLogs = async (params) => {
  // let res = await http.get(url + '/queryAlarmHistoryLogs', params);
  let res = await http.get(url + '/database/getUser', null);
  
  checkStatus(res);
  console.info("queryAlarmHistoryLogs");
  return res.data
}

//清除报警效果
export const clearAlarm = async (params) => {
  // let res = await http.get(url + '/clearAlarm', params);
  let res = await http.get(url + '/database/getUser', null);
  checkStatus(res);
  console.info("clearAlarm");
  return res.data
}
