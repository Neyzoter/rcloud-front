import React from 'react'
import 'antd/dist/antd.css';
import { Icon, Divider, Tooltip } from 'antd';

const alarmCard = {
    state:false,
    recentAlarmTime:'2019-04-04 00:00:01'
}
export default class AlarmStatusCard extends React.Component {

    render() {
        //清除警报点击事件回调
        const clearAlarm = () => console.log("点击了清除警报 ");
        return (
            <div style={{ display: 'flex', alignItems: 'center', paddingTop:
            '5%', justifyContent: 'center', height: '100%', width: '100%' }}>
            <div style={{
                position: 'relative',
                border: '1px solid #e8e8e8',
                borderRadius: '4px',
                height: "100%", width: "100%",
            }}>
            <div style={{
                position: 'absolute', top: -20, left: 40,
                height: '100px', width: '100px',
                backgroundColor: '#e25858',
                borderRadius: '4px',
                boxShadow: '0 0 10px grey',
                display: 'flex', alignItems: 'center',
                justifyContent: 'center',
            }}
            >
            {
                alarmCard.state === true ? (
                //发生报警
                <Tooltip title="点击按钮即可清除警报">
                <Icon
                    onClick={clearAlarm} //点击后的回调函数
                    spin={true} //转动
                    type={"exclamation-circle"}
                    style={{ color: 'white', fontSize:
                    '60px' }}
                />
                </Tooltip>
                )
                : (
                <Icon
                type={"check-circle"}
                style={{ color: 'white', fontSize:
                '60px' }}
                />
                )
            }
            </div>
            <div style={{ textAlign: 'right', paddingRight: '50px'
            }}>
            <div style={{ fontSize: '16px', marginTop: '0px' }}>
            设备报警状态</div>
            &nbsp;
            &nbsp;
            <div style={{ fontSize: '30px', fontWeight: 'bold'
            }}>{alarmCard.state === true ? "报警" : "正常"}</div>
            </div>
            &nbsp;
            &nbsp;
            <Divider
            style={{
            marginTop: 0,
            marginBottom: 0,
            fontSize: '12px',
            padding: '10px 5px 0 5px'
            }}
            >最近报警时间</Divider>
            <div style={{ fontSize: '12px' }}>
            {alarmCard.recentAlarmTime ? alarmCard.recentAlarmTime : "暂未报警"}</div>
            </div>
            </div>
            );
    }
}
