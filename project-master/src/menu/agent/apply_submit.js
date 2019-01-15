import React from 'react'
import { Form,  Input, Button,message} from 'antd'
import axios from './../../axios'
import { Link} from 'react-router-dom';

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
    axios.get('/agent_apply_manage',{id:this.props.id,sites:getUrl().sites})
    .then((res)=>{
     this.setState({
       data:res.output[0]
     })
    }).catch(error=>{
      console.log(error)
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      values.sites=getUrl().sites;
      values.id = this.props.id;
      if (!err) {
        axios.post('/redact_agent_apply',values).then(res=>{
                message.info('提交成功')
                window.history.back();
                this.props.upDate({current:1,sites:getUrl().sites})
        }).catch(error=>{
          console.log(error)
        })
        
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form apply_submit">
        <h3 style={{textAlign:'center'}}>您当前正在编辑代理<span style={{color:"#07a"}}>{this.props.id}</span>的信息</h3>
        <FormItem >
          {getFieldDecorator('id_card', {
            rules: [{ required: true, message: '请输入你的身份证号码!' }],
            initialValue:Object.keys(this.state.data).length>0?this.state.data.id_card:false
          })(
            <Input addonBefore='身份证'  placeholder="输入你的身份证号码!" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('true_name', {
            rules: [{ required: true, message: '请输入您的姓名!' }],
            initialValue:Object.keys(this.state.data).length>0?this.state.data.true_name:false
          })(
            <Input addonBefore='姓名' type="text" placeholder="真实姓名" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('bank_account', {
            rules: [{ required: true, message: '请输入您的银行卡号!' }],
            initialValue:Object.keys(this.state.data).length>0?this.state.data.bank_account:false
          })(
            <Input addonBefore='银行卡'  type="text" placeholder="银行卡号" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('bank_address', {
            rules: [{ required: true, message: '请输入您的开户地址!' }],
            initialValue:Object.keys(this.state.data).length>0?this.state.data.bank_address:false
          })(
           <div>
            <Input addonBefore='开户地址'  type="text" placeholder="地址"  defaultValue={this.state.data.bank_address}/>
           </div>
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: 'Please input your text!' }],
            initialValue:Object.keys(this.state.data).length>0?this.state.data.phone:false
          })(
            <Input addonBefore='电话'  type="text" placeholder="电话" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('provinces', {
            rules: [{ required: true, message: 'Please input your text!' }],
            initialValue:Object.keys(this.state.data).length>0?this.state.data.provinces:false
          })(
            <Input addonBefore='省份'  type="text" placeholder="省" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('qq', {
            rules: [{ required: true, message: 'Please input your text!' }],
            initialValue:Object.keys(this.state.data).length>0?this.state.data.qq:false
          })(
            <Input addonBefore='QQ'  type="text" placeholder="qq" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('alipay', {
            rules: [{ required: true, message: 'Please input your text!' }],
            initialValue:Object.keys(this.state.data).length>0?this.state.data.alipay:false
          })(
            <Input addonBefore='支付宝'  type="text" placeholder="支付宝" />
          )}
        </FormItem>
        
        <FormItem>
          <Button type="primary" htmlType="submit" className="login-form-button">
           提交
          </Button>
          <Button type="primary" htmlType="submit" className="login-form-button">
           <Link to="/agent_apply_manage">关闭</Link>
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

export default  WrappedNormalLoginForm ;