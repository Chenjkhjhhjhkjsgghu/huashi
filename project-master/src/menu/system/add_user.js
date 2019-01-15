import React from 'react';
import { Form, Icon, Input, Button, Checkbox ,message} from 'antd';
import { Link } from 'react-router-dom';
import axios from './../../axios';
import crypto from 'crypto'

const CheckboxGroup = Checkbox.Group;
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
  function hash(obj){
    if(obj===''||typeof obj ==='undefined')
    {
        return ''
    }
    const hash = crypto.createHash('md5');
    hash.update(obj);
   return hash.digest('hex')
}
function randomWord(randomFlag, min, max){
  var str = "",
      range = min,
      arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  // 随机产生
  if(randomFlag){
      range = Math.round(Math.random() * (max-min)) + min;
  }
  for(var i=0; i<range; i++){
      var pos = Math.round(Math.random() * (arr.length-1));
      str += arr[pos];
  }
  return str;
}
  const options = [
    {'label':'游客','value':100},{'label':'注册用户','value':200},{'label':'VIP','value':1300},{'label':'终身VIP','value':1310},{'label':'大亨','value':1320},{'label':'超级大亨','value':1330},{'label':'财主','value':1340},{'label':'超级管理','value':1350},{'label':'紫尊','value':1360},{'label':'金尊','value':1370},{'label':'天尊','value':1380},{'label':'帝尊','value':1390},{'label':'天王','value':1391},{'label':'一星主持','value':1710},{'label':'二星主持','value':1720},{'label':'三星主持','value':1730},{'label':'四星主持','value':1740},{'label':'五星主持','value':1750},{'label':'超级主持','value':1760},{'label':'MC主持','value':1770},{'label':'代理','value':1780},{'label':'巡管','value':1900},{'label':'客服','value':1910},
  ];
class NormalLoginForm extends React.Component {
constructor(...args)
{
    super(...args)
    this.state={
      id:'',
      indeterminate:false,
      password:'',
     checked:false
    }
    this.json = {level:[]}
    
   this.arr =  JSON.parse(localStorage.getItem('users'))
}

onCheckAllChange(e)
    {
      this.json['level'] = e.target.checked ? options.map(i=>i.value) : []
      this.setState({
        
        indeterminate: false,
        checkAll: e.target.checked,
      });
    }

  componentDidMount()
  {
    document.onclick = ()=>this.props.push('/manage_admin')
    
    if(Object.keys(this.props.params).length>0)
    {
       this.setState({
         id:this.props.params.id
       })
         this.arr.forEach(i=>{
           return  i.user_id===this.props.params.id?this.json={user:i.user_id,name:i.name,section:i.section,job:i.job,level:JSON.parse(i.open_mark_level)}:[]
      })
    }
  }
  componentWillUnmount(){
    document.onclick = null;
  }
  componentWillReceiveProps()
  {
    if(Object.keys(this.props.params).length>0)
    {
       this.setState({
         id:this.props.params.id
       })
         this.arr.forEach(i=>{
           return  i.user_id===this.props.params.id?this.json={user:i.user_id,name:i.name,section:i.section,job:i.job,level:JSON.parse(i.open_mark_level)}:[]
      })
    }
  }


  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.level = this.json.level;
        values.password = hash(values.password)
        values.sites=getUrl().sites
        if(this.state.id!=='')
        {
            axios.post('/redact_admin',values).then((res)=>{
                message.info('编辑成功');
                window.history.back()
                this.props.onSubmit()
        }).catch(error=>console.log(error))
        }
        else{
            axios.post('/add_admin',values).then((res)=>{
                message.info('添加成功');
                this.props.onSubmit()
                window.history.back()
        }).catch(error=>console.log(error))
        }
       
      }
    });
  }
  onChange(e)
  {
    this.json.level = e;
  }
  set_pass(e)
  {
    var str = randomWord(true,8,8)
    this.setState({
      password:str
    })
  }
  set_password(e)
  {
    this.setState({
      password:e.target.value
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
     <div className='add_user_forms' onClick={(e)=>e.nativeEvent.stopImmediatePropagation()}>
          <h2 style={{textAlign:'center',marginTop:'20px',color:'#1890ff'}}>{this.state.id!==''?`编辑${this.state.id}信息`:'添加系统管理员'}</h2>    
          <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('id', {
            rules: [{ required: true, message: '请输入用户名！' }],
            initialValue: this.json.user
          })(
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} addonBefore="用户名" disabled={this.state.id!==''?true:false}/>
          )}
        </FormItem>
        <FormItem>
       
       {getFieldDecorator('password', {
          initialValue:this.state.password
       })(
               <div>
                 <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />}  addonBefore="密码" style={{width:'74%'}} value={this.state.password} onChange={this.set_password.bind(this)}/>
                 <Button onClick ={this.set_pass.bind(this)} style={{position:'absolute',top:'4px',left:'265px'}}>随机密码</Button>
               </div>
         
       )}
     </FormItem>
        <FormItem>
          {getFieldDecorator('name', {
            rules: [{ required: true, message: '请输入昵称!' }],
            initialValue: this.json.name
          })(
            <Input prefix={<Icon type="smile-o"  style={{ fontSize: 13 }}/>} addonBefore="名称" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('section', {
            rules: [{ required: true, message: '请输入部门' }],
            initialValue:this.json.section
          })(
            <Input prefix={<Icon type="inbox" style={{ fontSize: 13 }} />} addonBefore="部门" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('job', {
            rules: [{ required: true, message: '请输入职位!' }],
            initialValue:this.json.job
          })(
            <Input prefix={<Icon type="credit-card" style={{ fontSize: 13 }}/>} addonBefore="职位" />
          )}
        </FormItem>
        <h3>可开号等级:  <Checkbox
            indeterminate={this.state.indeterminate}
            onChange={this.onCheckAllChange.bind(this)}
            checked={this.state.checkAll}
          >
            全选
          </Checkbox></h3>
        <FormItem>
        {getFieldDecorator('level', {
            valuePropName: 'checked',
          })(
            <CheckboxGroup options={options}  onChange={this.onChange.bind(this)}  value={this.json.level}/>
          )}
          <Button type="primary" htmlType="submit" className="login-form-button">
            保存
          </Button>
          <Button type="primary" htmlType="submit" className="login-form-button">
            <Link to='/manage_admin'>关闭</Link>
          </Button>
        </FormItem>
      </Form>
     </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

export default  WrappedNormalLoginForm;