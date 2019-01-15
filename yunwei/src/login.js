import React from 'react'
import './login.css'
import { Form, Icon, Input, Button,message} from 'antd';
import axios from 'axios'
const FormItem = Form.Item;
class NormalLoginForm extends React.Component {
  constructor(...args){
    super(...args)
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        axios.post('/agent_login',values).then(res=>{
        message.info('登陆成功')
        window.location.href = '/'
        }).catch(error=>console.log(error))
      }
    });
  }
  fn()
  {
    const oParent = document.createElement('div');
    oParent.style.width="100%";
    oParent.style.height="100%";
    oParent.style.position='absolute';
    oParent.style.top="0";
    oParent.style.background = '#6fb3e0';
    document.body.append(oParent); 
  }
  render() {

    const { getFieldDecorator } = this.props.form;
    return (
      <div className="data_bj">
      <div className="login_box">
      <Form onSubmit={this.handleSubmit} className="login-form">
          <h2 style={{textAlign:"center",color:"black"}}>运维登陆系统</h2>
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: '请输入您的用户名!' }],
          })(
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入您的密码!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" className="login-form-button">
            登陆
          </Button>
        </FormItem>
      </Form>
          </div> 
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);


export default WrappedNormalLoginForm;