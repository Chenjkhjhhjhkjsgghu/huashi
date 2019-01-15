

import React from 'react';
import axios from './../../axios'
import { Icon, Popconfirm, message, Button, Menu, Dropdown } from 'antd';

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
  function getDate(arr)
  {
    var time = new Date(arr)
   var s = '';
   s += time.getFullYear() + '-';          // 获取年份。
   if (time.getMonth() < 9) {
       s += '0' + (time.getMonth() + 1) + "-";         // 获取月份。
   } else {
       s += (time.getMonth() + 1) + "-";         // 获取月份。
   }
   if (time.getDate() < 10) {
       s += '0' + time.getDate()+' ';                 // 获取日。
   } else {
       s += time.getDate() +' ';                 // 获取日。
   }
   if (time.getHours() < 10) {
       s += '0' + time.getHours()+ ":";                 // 获取小时。
   } else {
       s += time.getHours()+ ":";                 // 获取小时。
   }
   if (time.getMinutes() < 10) {
       s += '0' + time.getMinutes()+ ":";                 // 获取分钟。
   } else {
       s += time.getMinutes()+ ":";                 // 获取分钟。
   }
   if (time.getSeconds() < 10) {
       s += '0' + time.getSeconds();                 // 获取秒。
   } else {
       s += time.getSeconds();                 // 获取秒。
   }
   return (s);                          // 返回时间。
  }

 var _this = null;
 var id_users = '';
    class Buttons extends React.Component{

    constructor(...args)
    {
        super(...args)
        _this = this;
        this.quanxian = this.props.data;
    }
    confirm() {
        axios.get(`/create_user_log_delete`,{id:id_users,sites:getUrl().sites}).then(res => {
            message.success('删除成功');
            _this.props.sss({current:1,sites:getUrl().sites})
        }).catch(error=>{console.log(error)})
    }
    setId(e)
    {
        id_users='';
        id_users=e.target.name
    }
    cancel()
    {
        message.error('取消操作');
    }
    serach_id()
    {
        this.props.serachId(this.props.idName)
    }
    seachCard()
    {
        let json = {};
        json.sites = getUrl().sites;
        json.userId = this.props.id.userId
        json.createTime = getDate(this.props.id.createTime);
        this.props.searchCard(json)
    }
    render()
    {
        const menu = (
            <Menu>
                {Object.keys(this.quanxian).map((i,index)=>{
                 return i === 'view_recharge' ? 
                    <Menu.Item key={index}>
                        <Button style={{ color: '#fff', border: 'none', background: "#40a9ff" , height:'25px',fontSize:'13px'}} onClick={this.seachCard.bind(this)}>
                        <Icon type="eye" />查看充卡量</Button>
                </Menu.Item>
               :
               i === 'create_user_log_delete'?
               <Menu.Item key   ={index++}>
                <Popconfirm 
                    title={`您确定要删除${this.props.idName}吗？
                    `} onConfirm={this.confirm} onCancel={this.cancel} okText="是" cancelText="否" >
                    <Button style={{ color: '#fff', border: 'none', background: "#40a9ff" , height:'25px',fontSize:'13px'}} name={`${this.props.idName}`}  onClick={this.setId.bind(this)}>
                    <Icon type="delete" />删除开号记录</Button>
                </Popconfirm>
                </Menu.Item>
                :false
            })
                }
                <Menu.Item>
                  <Button style={{ color: '#fff', border: 'none', background: "#40a9ff" , height:'25px',fontSize:'13px'}} onClick={this.serach_id.bind(this)} name={this.props.idName}><Icon type="search"/>查找账号</Button>
                </Menu.Item>      
                </Menu>
        );
        return(
                <div>
                <Dropdown overlay={menu} placement="bottomCenter">
                <Button style={{ height:'25px',fontSize:'13px'}}>
                    <span className="ant-dropdown-link" >
                    操作<Icon type="down" />
                    </span>
                    </Button>
                </Dropdown>
                </div>
        )
    }
}

export default Buttons;