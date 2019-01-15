import React from 'react';

import { Menu, Icon} from 'antd';

import { BrowserRouter, Route, Link } from 'react-router-dom';


const { SubMenu } = Menu;
class System extends React.Component{
 constructor(...args)
 {
     super(...args)

     this.name = this.props.name.authority;
 }
    render(){
       const str = 
       Object.keys(this.name).map(index=>{
      return  index==='admin'?<SubMenu key="sub1" title={<span><Icon type="user" />系统管理员</span>}>
       { this.name.admin.map(index=>{
         return  <Menu.Item key={index.id}><Link to={index.src}>{index.name}</Link></Menu.Item>
       })}
      </SubMenu>:false
       })
      return(
        <div>
         <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%' }}
        >
          {str}
          
        </Menu>
            </div>
        )
    }
}


export default  System;
