
import React from 'react';
import { Checkbox,Button,message} from 'antd';
import { Link } from 'react-router-dom';
import axios from './../../axios';

const CheckboxGroup = Checkbox.Group;

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

var options =[

];


class Setority extends React.Component{
  constructor(...args)
  {
    super(...args)
     
    this.str = localStorage.authority ? JSON.parse(localStorage.authority) : [];
    this.users = localStorage.users ? JSON.parse(localStorage.users) : [];
    this.users.map(i =>{
     if(i.user_id === this.props.params.id)
     {
       this.state={
         data:JSON.parse(i.authority)
       }
       return false;
     }
    })
    for (let i in this.str) {
      options[i] = [];
      this.str[i] = Array.from(new Set(this.str[i]))
      options[i].push(this.str[i].map(j => {
        return { label: j.name, value: j.id }
      }))
    }

    this.state={
      options:options
    }
    
  }
  
componentDidMount(){
  this.users.map(i =>{
    if(i.user_id === this.props.params.id)
    {
      this.setState({
        data:JSON.parse(i.authority)
      })
      return false;
    }
   })
   for (let i in this.str) {
     options[i] = [];
     this.str[i] = Array.from(new Set(this.str[i]))
     options[i].push(this.str[i].map(j => {
       return { label: j.name, value: j.id }
     }))
   }

   this.setState({
     options:options
   })
  document.onclick= ()=>{
    this.props.push('/manage_admin')
  }
}
componentWillUnmount()
{
  document.onclick = null;
}
  componentWillReceiveProps()
  {
    this.users.map(i =>{
      if(i.user_id === this.props.params.id)
      {
        this.setState({
          data:JSON.parse(i.authority)
        })
        return false;
      }
     })
     for (let i in this.str) {
       options[i] = [];
       this.str[i] = Array.from(new Set(this.str[i]))
       options[i].push(this.str[i].map(j => {
         return { label: j.name, value: j.id }
       }))
     }
 
     this.setState({
       options:options
     })
  }

  setData(values)
  {
    this.defaultValues=[];
     for(let i in values)
     {
       this.defaultValues.push(values[i])
     }
     this.setState({
       data:this.defaultValues
     })
  }

biuldDate(){
  axios.post('/set_admin', { id: this.props.params.id,authorityList:this.state.data,sites:getUrl().sites}).then((res)=>{
          message.info('设置成功');
          this.props.onSubmit()
          window.history.back();
        }).catch(error=>console.log(error))
     }
    render()
    {
       return(
        <div className='set_ority' onClick={(e)=>e.nativeEvent.stopImmediatePropagation()}>
        <form>
        <h2 style={{textAlign:'center',marginTop:'20px',color:'#1890ff'}}>您当前正在修改{this.props.params.id}的权限</h2>    
          <div>
          <h3 style={{textAlign:"left"}}>系统管理员</h3>
          <CheckboxGroup options={this.state.options['admin'][0]} value={this.state.data} onChange={this.setData.bind(this)}/>
          <h3 style={{ textAlign: "left" }}>代理商管理</h3>
          <CheckboxGroup options={this.state.options['agent'][0]} value={this.state.data} onChange={this.setData.bind(this)}/>
          <h3 style={{ textAlign: "left" }}>主持人管理</h3>
          <CheckboxGroup options={this.state.options['emcee'][0]}  value={this.state.data} onChange={this.setData.bind(this)}/>
          <h3 style={{ textAlign: "left" }}>财务管理</h3>
          <CheckboxGroup options={this.state.options['money'][0]} value={this.state.data} onChange={this.setData.bind(this)} />
          <h3 style={{ textAlign: "left" }}>销售管理</h3>
          <CheckboxGroup options={this.state.options['sell'][0]} value={this.state.data} onChange={this.setData.bind(this)}/>
          <h3 style={{ textAlign: "left" }}>点卡管理</h3>
          <CheckboxGroup options={this.state.options['timeCard'][0]} value={this.state.data} onChange={this.setData.bind(this)}/>
          <h3 style={{ textAlign: "left" }}>用户管理</h3>
          <CheckboxGroup options={this.state.options['user'][0]} value={this.state.data} onChange={this.setData.bind(this)} />
          <h3 style={{ textAlign: "left" }}>分区房间管理</h3>
          <CheckboxGroup options={this.state.options['zoneRoom'][0]} value={this.state.data} onChange={this.setData.bind(this)}/>
          <h3 style={{ textAlign: "left" }}>系统权限</h3>
          <CheckboxGroup options={this.state.options.system[0]} value={this.state.data} onChange={this.setData.bind(this)} />
          </div>
        <Button type="primary" style={{width:'300px',margin:'10px auto',display:'block'}}  className="login-form-button" onClick={this.biuldDate.bind(this)}>
          保存
        </Button>
               <Button type="primary" style={{ width: '300px', margin: '0 auto', display: 'block' }}  className="login-form-button">
          <Link to='/manage_admin'>关闭</Link>
        </Button>
           </form>
   </div>
      )
    }
}
export default Setority;