
import React from 'react';

import axios from './../../axios'
import {Route, Link } from 'react-router-dom';
import { Table, Button , Icon,Popconfirm,message} from 'antd';

import Add_user from './add_user'

import Setority from './set_ority';
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
const columns = [{
  title: '登录用户名',
  width:100,
  dataIndex: 'user_id',
}, {
  title: '姓名',
  width:100,
  dataIndex: 'name',
}, {
  title: '部门',
  width:100,
  dataIndex: 'section',
}, {
    title: '职务',
    width:100,
    dataIndex: 'job',
},{
    title: '所属管理员	',
    width:100,
    dataIndex: 'parent_admin',
},{
    title: '权限级别',
    width:100,
    dataIndex: 'power_level', 
},{
    title: '可用余额	',
    width:100,
    dataIndex: 'balance', 
},{
    title: '操作',
    width:150,
    dataIndex: 'doto'
}
];
var data = [];


function cancel(e) {
  message.error('取消操作');
}
class App extends React.Component {
  constructor(...args)
  {
    super(...args)
    this.id_users = ''
  }
  state = {
    data:[],
    pagination: {
      pageSize:20,
      total:1
    },
    loading: true,
  };

  set_id(e)
  {
    this.id_users='';
    this.id_users = e.target.name;
  }
  componentWillMount()
  {
    this.sss();
  }

confirm() {
    axios.get(`/delete_admin`,{id:this.id_users,sites:getUrl().sites}).then(res=>{
        message.success('删除成功');
        this.sss()
    }).catch(error=>console.log(error))
  }
  sss(params={}){
    data = [];
    const api = params.current?params.current:1;
    axios.get(`/manage_admin`,{page:api,sites:getUrl().sites}).then((res) =>{
      const quanxian = res.authority;
      var datas =  res.admin_list;
      localStorage.users=JSON.stringify(datas);
       for(let i of datas)
       {
         let ids = i.user_id;
         data.push({
           key: i.user_id,
          user_id:i.user_id,
          name:i.name,
          section:i.section,
          job:i.job,
          parent_admin:i.parent_admin,
          power_level:i.power_level,
          balance:i.balance,
          doto: <div>
           {Object.keys(quanxian).map((i)=>{
            if(quanxian[i].id=='11')
            {
              return <Link style={{color:'#fff'}} key={quanxian[i].id} to={`/manage_admin/set_ority/${ids}`}><Button  style={{height:'25px',fontSize:'13px'}}  type="primary"><Icon type="edit"/>设置权限</Button></Link>
            }
            if(quanxian[i].id=='12')
            {
              return <Link style={{color:'#fff'}} key={quanxian[i].id} to={`/manage_admin/edit_user/${ids}`}><Button  style={{height:'25px',fontSize:'13px',margin:'0 5px'}} type="primary" ><Icon type="exception" />编辑</Button></Link>
            } 
            if(quanxian[i].id=='13')
            {
              return <Popconfirm  key={quanxian[i].id} title={`您确定要删除${ids}吗？
              `} onConfirm={this.confirm.bind(this)} onCancel={cancel} okText="是" cancelText="否" >
                 <Button key={`${ids}`} style={{height:'25px',fontSize:'13px'}} name={`${ids}`} onClick={this.set_id.bind(this)}><Icon type="delete" />删除</Button>  
                 </Popconfirm>
            }
          })}
          </div>
         })
       }
      this.setState({
        pagination: {
          pageSize:20,
          current:res.page*1,
          total:res.count*1
        },
        loading:false,
        data:data
      })
    })
    .catch(function (error) {
    console.log(error);
    });
  }
current()
{
    let json = {sites:getUrl().sites}
    this.sss(json)
  }
 addUser = ({match,history})=>{
   return <Add_user id='' onSubmit={this.current.bind(this)} {...match} {...history}/>
 }
 addUser_s = ({match,history})=>{
   return <Add_user   onSubmit={this.current.bind(this)} {...match} {...history}/>
 }
 Setoritys = ({match,history})=>{
   return <Setority  onSubmit={this.current.bind(this)} {...match} {...history}/>
 }
  render() {
    return (
      <div>
        <div style={{ margin:'16px 0',position:'relative' }}>
          {this.state.name}
          <Button type="primary" className="editable-add-btn" onClick={this.handleAdd} style={{position:'absolute',right:'250px',top:"-15px",lineHeight:"40px",height:'40px'}}>
          <Link to="/manage_admin/add_user"><Icon type='plus'/>添加管理员</Link></Button>
          <Button style={{background:"red",color:"#fff",position:'absolute',right:'40px',top:'-15px',lineHeight:"40px",height:'40px'}}>
          <Icon type='exclamation'/>意见建议Bug提交</Button>
          <span style={{ marginLeft: 8,marginTop:'20px' }}></span>
        </div>
        <Table scroll={{x:true}} columns={columns} dataSource={data} bordered  pagination={this.state.pagination} onChange={this.sss.bind(this)} loading={this.state.loading}/>
        <Route path='/manage_admin/add_user' component={this.addUser} />
        <Route path='/manage_admin/edit_user/:id' component={this.addUser_s} />
        <Route path='/manage_admin/set_ority/:id' component={this.Setoritys} />
      </div>
    );
  }
}

export default App;