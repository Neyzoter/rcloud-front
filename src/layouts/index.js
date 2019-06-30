import React from 'react';
import 'antd/dist/antd.css';
import { Layout, Select } from 'antd';
const Option = Select.Option;
const { Header, Footer, Content } = Layout;
class BasicLayout extends React.Component {
	render() {
		//Select组件的选择回调函数
		const onSelect = (value) => {
			console.log("选中: " + value);
		}
		return (
			<div>
				<Layout>
					<Header style={{ display: 'flex', justifyContent: 'space-between'}}>
						<div style={{ color: "white", fontSize: '24px', fontWeight:
						'bold', float: 'left' }}>R-Cloud | 浙大-瑞立物联网云平台</div>
						<div style={{ display: 'flex', justifyContent: 'space-between',
						alignItems: 'center', color: 'white' }}>测试名称:
						&nbsp;
						<Select style={{ width: '300px', float: 'left' }}
						placeholder="当前返回无设备" //当默认没有Option或者未选中Option(注释defaultValue)时显示
						onChange={onSelect} //Select组件的选择回调，输出选中Option的value属性，参见Select组件API文档
						defaultValue={"默认测试名称"} //默认选中的选项，应填充设备
						>
						<Option value={"device1"}>TEST1/2019-05-10T12:00:00</Option>
						</Select>
						</div>
					</Header>
					<Content>
					{this.props.children}
					</Content>
					<Footer style={{ textAlign: 'center', backgroundColor: '#001529'}}>
					<div style={{ color: "white" }}>
					footer
					</div>
					</Footer>
				</Layout>
			</div>
		);
	}
}
export default BasicLayout;