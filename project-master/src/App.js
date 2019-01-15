import React from 'react';

import {Route, Link } from 'react-router-dom';

import Login from './login'

import axios from './axios'

import Axios from 'axios'

import Menus from './components/menu'

import System from './menu/system/index'

import System2 from './menu/system/get_operation_log'

import User from './menu/user/index'

import User2 from './menu/user/getUserInfo'

import User3 from './menu/user/auto_demotioneing_run'

import CreatUser from './menu/user/create_user'

import CreateUserLog from './menu/user/create_user_log'

import UserDemotioneingRun from './menu/user/user_demotioneing_run'

import Agent from './menu/system/agent'

import AgentIndex from './menu/agent/index'

import BalanceLog from './menu/agent/get_add_balance_log'

import Jifen from './menu/system/set_score_config'

import AgentS from './menu/agent/agent_apply_manage'

import Account from './menu/agent/transfer_accounts_log'

import Zhuchi from './menu/zhuchi/get_host_info'

import Zhuchi1 from './menu/zhuchi/get_to_audit_score_exchange'

import Zhuchi2 from './menu/zhuchi/to_pay_score_exchange'

import Zhuchi3 from './menu/zhuchi/get_score_exchange_by_belong'

import Zhuchi4 from './menu/zhuchi/is_pay_score_exchange'

import Zhuchi5 from './menu/zhuchi/is_cancel_score_exchange'

import AgentS2 from './menu/agent/agent_balance_excheng_log'

import AgentS3 from './menu/agent/agent_sell_total'

import Agents5 from './menu/agent/ht_add_agent_balance'

import AgentS4 from './menu/agent/ht_refund'

import Sale from './menu/xiaoshou/exchange_coin'

import Sale2 from './menu/xiaoshou/exchange_score'

import Sale3 from './menu/xiaoshou/user_transform_coin'

import Sale4 from './menu/xiaoshou/user_transform_score'

import Sale5 from './menu/xiaoshou/coin_detail'

import Room from './menu/room/get_zone_info'

import Room2 from './menu/room/get_room_info'

import Room3 from './menu/room/get_room_admin'

import Room4 from './menu/room/get_black_list'

import Room5 from './menu/room/server_manage'

import Card from './menu/card/point_card_manage'

import Recharge from './menu/Recharge/recharge_manage'

import Room6 from './menu/room/server_order_manage'

import { Layout, Menu, Breadcrumb, Icon, Row, Col, Dropdown,message,Input,Button} from 'antd';
import './style.css'
import crypto from 'crypto'
import moment from 'moment';

import 'moment/locale/zh-cn';

moment.locale('zh-cn');

function hash(obj){
  if(obj===''||typeof obj ==='undefined')
  {
      return ''
  }
  const hash = crypto.createHash('md5');
  hash.update(obj);
 return hash.digest('hex')
}

var Web = JSON.parse(sessionStorage.Web)
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

const { Header, Content, Sider } = Layout;




var styles = false;
function logout(){
  axios.get('/logout',{sites:getUrl().sites}).then(res=>{
    message.info('退出成功')
    window.location.href = `/?sites=${getUrl().sites}#/login`;
  }).catch(error=>console.log(error))
}
class App extends React.Component {
  constructor(...args)
  {
    
    super(...args)
    this.user = {
      sites:getUrl().sites,
      user_id:'',
      name:'',
      password:'',
      section:'',
      job:'',
    }
    this.state = {
      sites:Web,
      display:{display:'none'},
     overflow:{span:'0'},
     data:{
     }
    };
  }
 componentDidMount()
 {
   document.title = this.state.sites[getUrl().sites].name +'--多人视频后台管理系统'
   this.getAuthority()
 }


 

getAuthority()
{
  Axios({url:'/get_my_info',baseURL:this.state.sites[getUrl().sites].url,params:{sites:getUrl().sites}}).then(res=>{
    if(res.data.code===100)
    {
      window.location.href = `/?sites=${getUrl().sites}#/login`;
      return;
    }
    if(res.data.code!==200)
    {
      message.error(res.data.msg)
      return;
    }
    sessionStorage.setItem('id',res.data.msg.user_id)
    this.user.user_id=res.data.msg.user_id
    this.user.name=res.data.msg.name
    this.user.section=res.data.msg.section
    this.user.job=res.data.msg.job
    axios.get('/getAuthority',{sites:getUrl().sites}).then((res) =>{
      this.setState ({
        data:res
      });
      localStorage.authority = JSON.stringify(res.authority);
   }).catch(error=>console.log(error))
   }).catch(error=>console.log(error))

}

 hidden()
 {
  styles = !styles
  if(styles)
  {
    this.setState({
      overflow:{
        span:'2'
      }
    })
  }
  else{
    this.setState({
      overflow:{
        span:'0'
      }
    })
  }
 }

 setUser(e)
 {
     this.user[e.target.name]=e.target.value;
 }
 setPass()
 {
   this.setState({
     display:{display:'block'}
   })
 }
 Submit()
 {
   if(this.user.password==='')
   {
      delete this.user.password
   }
   
   this.user.password = hash(this.user.password)
   axios.post('/redact_my_info',this.user).then(res=>{
        message.info('修改成功')
        this.setState({
          display:{display:'none'}
        })
   }).catch(error=>console.log(error))

 }
  render() {

    return (
      <Layout>
        <div className='get_my_info' style={this.state.display}>
           <h3 style={{textAlign:'center'}}>编辑个人信息</h3>
           <form>
           <Input addonBefore='用户名' name='user_id' value={this.user.user_id} onChange={ this.setUser.bind(this)} disabled/>
           <Input addonBefore='姓名' name='name' defaultValue={this.user.name} onChange={ this.setUser.bind(this)}/>
           <Input addonBefore='密码' name='password' defaultValue={this.user.password} onChange={ this.setUser.bind(this)} type='password'/>
           <Input addonBefore='部门' name='section' defaultValue={this.user.section} onChange={ this.setUser.bind(this)}/>
           <Input addonBefore='职务' name='job' defaultValue={this.user.job} onChange={ this.setUser.bind(this)}/>
           <Button type='primary' onClick={this.Submit.bind(this)}>提交</Button>
           <Button style={{marginLeft:'20px'}} onClick={()=>{this.setState({display:{display:'none'}})}}>关闭</Button>
           </form>
        </div>
        <Header className="header">
                <Row style={{color:'#fff'}}>
             <Col  md={10} lg={10} xl={10} xs={{ span:0}}><Icon type="global" style={{color:'#fff',marginLeft:'15px'}}/> {this.state.sites[getUrl().sites].name}--多人视频后台管理系统</Col>
             <Col onClick={this.hidden.bind(this)} md={0} lg={0} xl={0}  xs={{ span:3}} style={{color:'black'}}><Icon type="bars" style={{color:'#fff',marginLeft:'15px'}} /></Col>
             <Col md={{span:4,offset:10}}  xs={{ span:3, offset:17}} style={{fontSize:"15px",textAlign:'center'}}><Icon type="user" />
              <Dropdown overlay={ <Menu>
    <Menu.Item key="0" onClick={this.setPass.bind(this)}>
      <span ><Icon type="lock" />修改密码</span>
    </Menu.Item>
    <Menu.Item key="1" onClick={logout}>
      <span  ><Icon type="poweroff" />退出</span>
    </Menu.Item>

  </Menu>} placement="bottomCenter">
                <span className="ant-dropdown-link" >
                {Object.keys(this.state.data).length?this.state.data.user.user_id:<a href={`/#/login?sites=${getUrl().sites}`}>登陆</a>}<Icon type="down" />
                </span>
              </Dropdown>
            </Col>
              </Row>
        </Header>
       
        <Layout style={{marginTop:'10px'}}>
        <Row>
        <Col md={5} lg={5} xl={5} xs={this.state.overflow} >
          <Sider width={189} style={{background:'#fff',fontSize:'13px',color:'black',fontWeight:'blod'}}>
          {Object.keys(this.state.data).length?<Menus name={this.state.data}/>:false}
          </Sider>
         </Col>
          </Row>
          <Layout style={{ padding: '10px',paddingTop:'0',overflowX:'scroll'}}>
            <Breadcrumb style={{ margin: '2px 0' }}>
              <Breadcrumb.Item><Link style={{fontSize:'14px',lineHeight:'30px',color:'block'}} to='/'>首页</Link></Breadcrumb.Item>
            </Breadcrumb>
            <Content style={{ background: '#fff', padding:12, margin: 0, minHeight: 280 }}>
            <Route path='/manage_admin' component={System} />
            <Route path='/user_manage' component={User} />
            <Route path='/login' component={Login} />
            <Route path='/create_user' component={CreatUser} />
            <Route path='/create_user_log' component={CreateUserLog} />
            <Route path='/user_demotioneing_run' component={UserDemotioneingRun} />
            <Route path='/agent_config_getDate' component={Agent} />
            <Route path='/agent_manage' component={AgentIndex}/>
            <Route path='/get_add_balance_log' component={BalanceLog} />
            <Route path='/set_score_config' component={Jifen} />
            <Route path='/ht_refund' component={AgentS4} />
            <Route path='/agent_apply_manage' component={AgentS} />
            <Route path='/ht_add_agent_balance' component={Agents5} />
            <Route path='/transfer_accounts_log' component={Account} /> 
            <Route path='/update_user_password' component={User2} />
            <Route path='/get_host_info' component={Zhuchi} />
            <Route path='/get_to_audit_score_exchange' component={Zhuchi1} />
            <Route path='/to_pay_score_exchange' component={Zhuchi2} />
            <Route path='/get_score_exchange_by_belong' component={Zhuchi3} />
            <Route exact path='/is_pay_score_exchange' component={Zhuchi4} />
            <Route path='/is_pay_score_exchange/:name' component={Zhuchi4} />
            <Route path='/is_cancel_score_exchange' component={Zhuchi5} />
            <Route path='/agent_balance_excheng_log' component={AgentS2} />
            <Route path='/agent_sell_total' component={AgentS3} />
            <Route path='/exchange_coin' component={Sale} />
            <Route path='/exchange_score' component={Sale2} />
            <Route path='/user_transform_coin' component={Sale3} />
            <Route path='/user_transform_score' component={Sale4} />
            <Route path='/coin_detail' component={Sale5} />
            <Route path='/get_zone_info' component={Room} />
            <Route path='/get_room_info' component={Room2} />
            <Route path='/get_room_admin' component={Room3} />
            <Route path='/get_black_list' component={Room4} />
            <Route path='/point_card_manage' component={Card} />
            <Route path='/get_operation_log' component={System2} />
            <Route path='/auto_demotioneing_run' component={User3}/>
            <Route path='/recharge_manage' component={Recharge}/>
            <Route path='/server_manage' component={Room5}/>
            <Route exact path='/server_order_manage' component={Room6}/>
            <Route path='/server_order_manage/:id' component={Room6}/>
        </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}
export default App;