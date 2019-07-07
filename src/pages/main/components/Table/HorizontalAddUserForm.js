import React from 'react'
import 'antd/dist/antd.css';
import { connect } from 'dva';
import { Form, Icon, Input, Button } from 'antd';

const mapDispatchToProps = (dispatch) => {
  return {
    addUser(values){
      dispatch({
        type:`main/addUser`,
        payload: values
      })
    }
  }
};

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

export default @connect(null,mapDispatchToProps) class HorizontalUserAddForm extends React.Component {
  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('发送用户名和密码: ', values);
        this.props.addUser(values);
      }
    });
  };

  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    // Only show error after a field is touched.
    const usernameError = isFieldTouched('userName') && getFieldError('userName');
    const passwordError = isFieldTouched('userKey') && getFieldError('userKey');
    const privilegeError = isFieldTouched('userPrivilege') && getFieldError('userPrivilege');
    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
            添加
          </Button>
        </Form.Item>
        <Form.Item validateStatus={usernameError ? 'error' : ''} help={usernameError || ''}>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: '请输入用户名' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="用户名"
            />,
          )}
        </Form.Item>
        <Form.Item validateStatus={passwordError ? 'error' : ''} help={passwordError || ''}>
          {getFieldDecorator('userKey', {
            rules: [{ required: true, message: '请输入密码' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="密码"
            />,
          )}
        </Form.Item>
        <Form.Item validateStatus={privilegeError ? 'error' : ''} help={privilegeError || ''}>
          {getFieldDecorator('userPrivilege', {
            rules: [{ required: true, message: '请输入权限(1,2,3...)' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="number"
              placeholder="权限"
            />,
          )}
        </Form.Item>
      </Form>
    );
  }
}
//必须有create才有this.props.form
HorizontalUserAddForm = Form.create({name: 'horizontal_login'})(HorizontalUserAddForm);