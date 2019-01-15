import React from 'react';

import { Menu, Icon} from 'antd';

import { Link } from 'react-router-dom';


const { SubMenu } = Menu;


const menu_icon ={
  "system":{name:'系统设置',type:'setting'},
  "zoneRoom":{name:'分区房间管理',type:'home'},
  "agent": {name:'代理商管理',type:'shop'},
  "emcee":{name:'主持人管理',type:'smile'},
  "user":{name:'用户管理',type:'user'},
  "timeCard":{name:'点卡管理',type:'credit-card'},
  "sell":{name:'销售管理',type:'tag-o'},
  "money":{name:'财务管理',type:'pay-circle-o'},
  "admin":{name:'系统管理员',type:'team'}
}
class System extends React.Component{
 constructor(...args)
 {
     super(...args)
     this.state = {
         arr:[],
         index:'',
         name: this.props.name.authority
     }
 }
 fn(e)
 {
     
     let arr = [];
     arr.push(e.key)
     if(arr[0] == this.state.arr[0])
     {
         arr=[];
     }
     this.setState({
         arr:arr
     })
 }
 fnn(e)
 {
     this.setState({
        index:e.key
     })
 }
    render(){
    const str = 
     <Menu
    openKeys={this.state.arr}
    mode="inline"
    selectedKeys={[this.state.index]}
    onClick={this.fnn.bind(this)}
    style={{ height: '100%' }}
   >
    {Object.keys(this.state.name).length>0?Object.keys(this.state.name).map((index,keys)=>{
         return  <SubMenu onTitleClick={this.fn.bind(this)}  key={keys} title={<span><Icon type={menu_icon[index].type} />{menu_icon[index].name}</span>}>
           {
               this.state.name[index].map((i)=>{
           return  <Menu.Item  key={i.name}><Link to={i.src} style={{marginLeft:'-20px'}}>{this.state.index==i.name?<Icon type="caret-right" style={{fontSize:"12px"}}/>:<Icon type="caret-right" style={{fontSize:"12px",opacity:'0'}}/>}{i.name}</Link></Menu.Item>
               })
           }
       </SubMenu> 
           
    }):false}
    </Menu>
      return(
        <div>
         {str}
       </div>
        )
    }
}


export default  System;
