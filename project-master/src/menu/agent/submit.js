import React from 'react'
import { Form, Icon, Input, Button,message} from 'antd'
import axios from './../../axios'

const FormItem = Form.Item;
function getUrl()
  {
      var json = {}
      var url = window.location.href;
      if(url.match(/\?/gi)===null)
      {
          alert('找不到网站标识符')
          return false;
      }
      var nUrl = url.split('?')[1].split('&');
      for(var i = 0;i<nUrl.length;i++)
      {
        let arr = [];
        arr = nUrl[i].split('=')
        arr[1] = arr[1].split('#')[0]
        json[arr[0]] = arr[1]
      }
     return json;
  }
class NormalLoginForm extends React.Component {
  
   constructor(...args)
   {
     super(...args)
     this.state = {
      data:{}
    }
   }

 componentWillMount()
 {
   this.fn()
 }

  fn()
  {
    axios.get('/get_agent_info',{id:this.props.id,sites:getUrl().sites})
    .then((res)=>{
     this.setState({
       data:res
     })
    }).catch(error=>{
      console.log(error)
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      values.sites=getUrl().sites
      values.id = this.props.id;
      if (!err) {
        axios.post('/redact_agent',values).then(res=>{
                message.info('提交成功')
                this.props.upDate({current:1,sites:getUrl().sites})
            }
        ).catch(error=>{
          console.log(error)
        })
        
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-forms">
        <FormItem
        label="身份证"
        >
          {getFieldDecorator('id_card', {
            rules: [{ required: true, message: '请输入你的身份证号码!' }],
            initialValue:Object.keys(this.state.data).length>0?this.state.data.id_card:false
          })(
            <Input prefix={<Icon type="credit-card"  style={{ fontSize: 13 }} />} placeholder="输入你的身份证号码!" />
          )}
        </FormItem>
        <FormItem label="姓名">
          {getFieldDecorator('true_name', {
            rules: [{ required: true, message: '请输入您的姓名!' }],
            initialValue:Object.keys(this.state.data).length>0?this.state.data.true_name:false
          })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="text" placeholder="真实姓名" />
          )}
        </FormItem>
        <FormItem label="银行卡号">
          {getFieldDecorator('bank_account', {
            rules: [{ required: true, message: '请输入您的银行卡号!' }],
            initialValue:Object.keys(this.state.data).length>0?this.state.data.bank_account:false
          })(
            <Input prefix={<Icon type="bank" style={{ fontSize: 13 }} />} type="text" placeholder="银行卡号" />
          )}
        </FormItem>
        <FormItem label="开户地址">
          {getFieldDecorator('bank_address', {
            rules: [{ required: true, message: '请输入您的开户地址!' }],
            initialValue:Object.keys(this.state.data).length>0?this.state.data.bank_address:false
          })(
           <div>
            <Input prefix={<Icon type="environment" style={{ fontSize: 13 }} />} type="text" placeholder="地址"  defaultValue={this.state.data.bank_address}/>
           </div>
          )}
        </FormItem>
        <FormItem label="电话号码">
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: '请输入您的电话号码!' }],
            initialValue:Object.keys(this.state.data).length>0?this.state.data.phone:false
          })(
            <Input prefix={<Icon type="phone" style={{ fontSize: 13 }} />} type="text" placeholder="电话" />
          )}
        </FormItem>
        <FormItem label="省份">
          {getFieldDecorator('provinces', {
            rules: [{ required: true, message: '请输入您的省份!' }],
            initialValue:Object.keys(this.state.data).length>0?this.state.data.provinces:false
          })(
            <Input prefix={<Icon type="environment-o" style={{ fontSize: 13 }} />} type="text" placeholder="省" />
          )}
        </FormItem>
        <FormItem label="支付宝">
          {getFieldDecorator('alipay', {
            rules: [{ required: true, message: '请输入您的支付宝账号!' }],
            initialValue:Object.keys(this.state.data).length>0?this.state.data.alipay:false
          })(
            <Input prefix={<Icon type="pay-circle" style={{ fontSize: 13 }} />} type="text" placeholder="支付宝" />
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" className="login-form-button">
           提交
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

export default  WrappedNormalLoginForm ;