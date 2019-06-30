import React from 'react'
import 'antd/dist/antd.css';
import { connect } from 'dva';
import { Table, DatePicker, Button } from 'antd';
import moment from 'moment';

const { RangePicker } = DatePicker;
const dateFormat = "MM-DD HH:mm:ss"

const columns = [{
  title: '用户名',
  dataIndex: 'userName',
}, {
  title: '权限等级',
  dataIndex: 'userPrivilege',
}, {
  title: '创建时间',
  dataIndex: 'userCreate',
}];

//连接绑定model的state到组件的props
const mapStateToProps = (state) => {
  const tableContent = state.main.table;
  const userName = state.main.userName;
  return {
    tableContent,
    userName
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getUserList() {
      dispatch({
        type: `main/getUserList`,
      });
    }
  }
};


export default @connect(mapStateToProps, mapDispatchToProps) class HistoricalAlarmTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      beginTime: moment().startOf('month').format('YYYY-MM-DD HH:mm:ss'),
      endTime: moment().format('YYYY-MM-DD HH:mm:ss'),
    }
  }

  async componentDidMount() {
    await this.props.getUserList();
  }

  //store的state发生变化触发，在选择deviceName后触发数据的重新请求
  async componentWillReceiveProps(nextProps) {
    // if (this.props.userName !== nextProps.userName) {
    //   console.info("componentWillReceiveProps");
    //   console.info(this.props.userName);
    //   console.info(nextProps.userName);
    //   await this.props.getUserList();
    // }
  }

  //Tab之间切换
  render() {
    const datePickerOnOk = (dates) => {
      this.setState({
        beginTime: dates[0].format('YYYY-MM-DD HH:mm:ss'),
        endTime: dates[1].format('YYYY-MM-DD HH:mm:ss'),
      });
    }

    const rangerOnClick = () => this.props.getUserList();

    return (
      <div>
        <div style={{ paddingBottom: 20 }}>
          选择查询时间 &nbsp;
          <RangePicker
            defaultValue={[moment().startOf('month'), moment()]}
            ranges={{ '今天': [moment().startOf('day'), moment()], '本周': [moment().startOf('week'), moment()] }}
            onOk={datePickerOnOk}
            format={dateFormat}
            showTime={true}
          />
          &nbsp;
          <Button type="primary" style={{ display: 'abslute', top: 0 }} onClick={rangerOnClick}>
            查询
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={this.props.tableContent.data}
          pagination={{ pageSize: 10 }}
        />
      </div>
    )
  }
}