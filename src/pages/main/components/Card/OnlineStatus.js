import React from 'react'
import 'antd/dist/antd.css';
import { Icon, Divider } from 'antd';

//组件所需数据
const onlineCard = {
    state: "在线",
    recontOnlineTime: "2019-05-06 00:00:01"
}
export default class OnlineStatusCard extends React.Component {
    render() {
        return (
            <div style={{ display: 'flex', alignItems: 'center', paddingTop:
            '5%', justifyContent: 'center', height: '100%', width: '100%' }}>

            <div style={{ position: 'relative', border: '1px solid #e8e8e8', height: "100%", width: "100%", borderRadius: '4px', }}>

            <div style={{
            position: 'absolute', top: -20, left: 40,
            height: '100px', width: '100px',
            backgroundColor: '#ed7010', borderRadius: '4px',
            boxShadow: '0 0 10px grey',
            display: 'flex', alignItems: 'center',
            justifyContent: 'center',
            }}
            >
            <Icon
            type={onlineCard.state === "在线" ? "link" :
            "disconnect"}
            style={{ color: 'white', fontSize: '60px' }}
            />
            </div>
            
            <div style={{ textAlign: 'right', paddingRight: '50px'}}>

            <div style={{ fontSize: '16px', marginTop: '0px' }}>
            设备在线状态</div>
            &nbsp;
            &nbsp;
            <div style={{ fontSize: '30px', fontWeight: 'bold'
            }}>{onlineCard.state}</div>
            </div>
            &nbsp;
            &nbsp;
            <Divider style={{ marginTop: 0, marginBottom: 0,
                fontSize: '12px', padding: '10px 5px 0 5px' }}>最近上线时间</Divider>
            <div style={{ fontSize: '12px' }}>
            {onlineCard.recentOnlineTime ? onlineCard.recentOnlineTime : "暂未上线"}
            </div>
            </div>
            </div>
            );
    }
}