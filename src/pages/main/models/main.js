import {    
    getUserList,
    queryDeviceProp,
    selectChartDataByTime,
    setDeviceProperty,
    queryAlarmHistoryLogs,
    clearAlarm} from '../../../axios/index.js';
import { message } from 'antd';


export default {
    //储存model的state状态
    state: {
        userName: "",
        userSelectList: [],
        alarmCard: {
            state: true,
            recentAlarmTime: null
        },
        onlineCard: {
            state: "在线",
            recentOnlineTime: null
        },
        tempCard: {
            value: 22,
            threshold: 22
        },
        humiCard: {
            value: 43,
            sensor: "DHT11温湿度传感器"
        },
        updateTime: "待初始化",
        chart: {
            dataList: [],
        },
        table: {
            data:[]
        }
    },
    //Action处理器，处理同步动作，用来算出最新的state
    reducers: {
        update(state, { payload }) {
            let newState = payload;
            return {
                ...state,
                ...newState
            };
        },
    },
    //异步操作，通过reducers间接更新state，返回的结果先调用reducer
    effects: {
        *getUserList({ payload }, { call, put }) {
            //返回data
            let res = yield call(getUserList);
            console.log("用户列表：");
            console.log(res[0]["userName"]);
            yield put({
                type: 'update',
                payload: {
                    userName: res !== null ? res:"暂无用户",
                    table: {
                        data:res
                    }
                },
            });
        },
      //根据起止时间查询设备温湿度数据
        *selectChartDataByTime({ payload }, { call, put, select }) {
        let userName = yield select(state => state.main.userName);
        let res = yield call(selectChartDataByTime, { ...payload, deviceName: userName });
        yield put({
            type: 'update',
            payload: {
                chart: {
                    dataList: res.data
                },
            }
        });
        },
        //设定报警超限值
        * setAlarmThreshold({ payload }, { call, select }) {
            let userName = yield select(state => state.main.userName);
            let res = yield call(setDeviceProperty, { ...payload, userName: userName });
            if (res.data.isSuccess === true) {
                message.success('提交成功···');
            }
        },
    }
}