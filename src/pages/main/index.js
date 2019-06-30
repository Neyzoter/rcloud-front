import React from 'react'
import 'antd/dist/antd.css';
import { Card, Icon, Tooltip } from 'antd';
//引入自定义class组件
import OnlineStatusCard from './components/Card/OnlineStatus.js';
import AlarmStatusCard from './components/Card/AlarmStatus.js';
import HumiStatusCard from './components/Card/HumiStatus.js';
import TempStatusCard from './components/Card/TempStatus.js';
import HistoricalAlarmTable from './components/Table/index.js';
import HistoricalChart from './components/Chart/index.js';

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        //记录当前选中的Tab
        this.state = {
            key: 'tab1',
        }
    }
    //Tab之间切换
    onTabChange = (key, type) => {
        this.setState({ [type]: key });
    }
    render() {
        //显示设备历史状态的TabList
        const tabList = [{
            key: 'tab1',
            tab: (
            <Tooltip title="设备历史温湿度数据查询">
            设备历史状态
            </Tooltip>
            ),
        }, {
            key: 'tab2',
            tab: (
            <Tooltip title="设备历史温度报警记录查询">
            用户信息管理
            </Tooltip>
            ),
        }];
        const contentList = {
            tab1: (
                <div>
                <HistoricalChart/>
                </div>),
            tab2: (
                <div>
                <HistoricalAlarmTable/>
                </div>),
        };
        //第一Row的Style内容
        const gridStyle = {
            width: '25%',
            height: '200px',
            textAlign: 'center',
            padding: '10px'
        };
        return (
            <div style={{backgroundRepeat:'no-repeat',backgroundSize:'100% 100%'}}>
                <div style={{ padding: '30px' }}>
                    <Card
                        title={
                        <div>
                        <Tooltip title="显示设备当前的运行状态">
                        设备当前状态
                        </Tooltip>
                        </div>}
                        extra={
                            <div>
                            <Icon type="reload" style={{ paddingRight: '5px' }} />
                            <Tooltip style={{ fontSize: '12px' }} title="设备最新一次上报属性
                            的时间">
                            最新一次上报时间 : 这里待填充设备最新一次上报时间
                            </Tooltip>
                            </div>
                        }
                        style={{ width: '100%' }}
                    >

                    <Card.Grid style={gridStyle}>
                    <OnlineStatusCard/>
                    </Card.Grid>

                    <Card.Grid style={gridStyle}>
                    <AlarmStatusCard/>
                    </Card.Grid>

                    <Card.Grid style={gridStyle}>
                    <TempStatusCard/>
                    </Card.Grid>

                    <Card.Grid style={gridStyle}>
                    <HumiStatusCard/>
                    </Card.Grid>

                    </Card>
                </div>
                <div style={{ padding: '30px', paddingTop: 0 }}>
                    <Card
                    style={{ width: '100%' }}
                    tabList={tabList}
                    activeTabKey={this.state.key}
                    onTabChange={(key) => { this.onTabChange(key, 'key'); }}
                    >
                    {contentList[this.state.key]}
                    </Card>
                </div>
            </div>
        )
    }
}