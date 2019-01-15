import React from 'react';
import { Table, Icon ,Button , Input ,Popconfirm , message,Menu, Dropdown} from 'antd';
import axios from './../../axios'; 
import Edit from './editRoom2'
import Addroom from './addroom2'
import { Route, Link } from 'react-router-dom';

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

var lock = ['正常','锁定','冻结']
const columns = [
{
  title: '房间ID',
  dataIndex:'id',       
},{
    title: '房间名称',
    dataIndex: 'name',
    render:(a,b)=>{
     if(b.redname)
     {
       return <span className='redName'>{a}</span>
     }
    else{
      return a
    }
}
},{
  title: '所在分区',
  dataIndex: 'kinds',
                  
},{
  title: '代理id',
  dataIndex: 'agent',
},{
    title: '室主id',
    dataIndex: 'owner',
},{
    title: '锁定状态',
    dataIndex: 'lock',
    render:(text=>{
        return lock[text*1]
    })
},{
  title: '当前在线客户',
  dataIndex: 'online_client',
},{
    title: '最大人数',
    dataIndex:'maxclient',
},{
    title: '房间密码',
    dataIndex: 'pass',
},{
    title: '当前在线机器人',
    dataIndex: 'online_robot',
},{
    title: '普通机器人',  //（这个应该是设置值）
    dataIndex: 'robot_nor',
},{
    title: '会员机器人',
    dataIndex: 'robot_client',
},{
    title: '置顶',
    dataIndex: 'top',
},{
    title: '主页推荐',
    dataIndex: 'recommend',
    render:(text=>{
        if(text)
        {
            return '是'
        }
        return '否'
    })
},
{
    title: '操作',
    dataIndex: 'todo'
}
];
var json = {};
class App extends React.Component{
   constructor(...args){
       super(...args)
       this.json={
        sites:getUrl().sites,
        id:'',
        current:1
       }
    this.state={
        id:'',
        loading:false,
        params:{
         sites:getUrl().sites,
         id:'',
         current:1
        },
        arr:{},
        data:[],
    }
       
   }

   componentDidMount()
   {
      
    this.fn(this.state.params)
   }
   setid(e)
   {
    this.id = e.target.name
    json.id = this.id;
   }
  
   cancel()
   {
       message.error('取消操作')
   }
   confirm()
   {
       let value = this.state.params;
       value.id = this.id;
      axios.post('/delete_room',value).then(res=>{
              value.id = '';
              value.current=1;
              message.info('删除成功')
              this.fn(value)
      }).catch(error=>console.log(error))
   }
   
   current(e)
   {
       let value = this.state.params;
       value.current = e.current;
       this.fn(value)
   }


   fn(params={}){
    this.setState({
        loading:true
    })
    axios.get('/get_room_info',params).then(res=>{
        if(res.output.record_count===0)
        {
            message.error('没有查询到该数据')
            this.setState({
                loading:false,
                data:[]
            })
        }
        let jsons = {}
        res.zoomInfo.map((i)=>{
          jsons[i.id]=i.name;
          return true;
        })      
        let json = {};
        let arr = res.output.record;
        json.total = res.output.record_count;
        arr.map((i,index)=>{
            i.key = index+'s'
            let attr = i.kinds.split(',')       
            i.kinds = 
            <Dropdown placement='bottomCenter' overlay={
            <Menu>
                {attr.map((j,index)=>{
                return  <Menu.Item key={j+index}>{jsons[j]}</Menu.Item>
                })}
            
            </Menu>}>
            <span><Icon type="home" />选择查看分区</span>
            </Dropdown>
            i.todo = (
                <div>
                    <Button type="primary" style={{ height:'25px',fontSize:'13px'}}><Link to={`/get_room_info/edit`}  name={i.id} onClick={this.setEdit.bind(this)}><Icon type="edit" />编辑</Link></Button>
                <Popconfirm title={`删除${i.id}房间吗?`} onConfirm={this.confirm.bind(this)} onCancel={this.cancel.bind(this)} okText="是" cancelText="否">
                <Button style={{marginLeft:'5px'}} style={{ height:'25px',fontSize:'13px',marginLeft:'10px'}} onClick={this.setid.bind(this)} name={i.id}><Icon type="delete" />删除</Button>
                </Popconfirm>
                </div>
            )
            return true;
      })
      json.pageSize = 20;
      json.current = res.output.page_num*1+1;
      this.setState({
          loading:false,
          data:arr,
          pagination:json
      })
    }).catch(error=>console.log(error))
   }
   searchBar()
   {
       this.json.current = 1;
       this.fn(this.json)
   }
   searchBars(value)
   {
       this.props.history.goBack();
       this.fn(value)
   }
   setType1(e)
   {
    this.json = this.state.params;
    this.json.id = e.target.value
   }
   addComponent=()=>{
       return <Addroom onSubmit = {this.searchBars.bind(this)}/>
   }
   editComponent=({history})=>{
    return <Edit  ids={this.state.id} onSubmit={this.searchBars.bind(this)} {...history}/>
}
   setEdit(e)
   {
     this.json = this.state.params;
      this.setState({
          id:e.target.name
      })
   }
    render(){
        return(
            <div>
                
                 <Route path='/get_room_info/add' component={this.addComponent}/>
                 <Route path='/get_room_info/edit' component={this.editComponent}/>
                <div style={{margin:'20px 0'}}>
                <Input placeholder='房间ID' style={{width:'200px',margin:'0 0px 0 5px'}} name='belong' onChange={this.setType1.bind(this)} name='id' onPressEnter={this.searchBar.bind(this)}/>
                <Button onClick={this.searchBar.bind(this)} style={{marginLeft:'5px'}}><Icon type="search"/>搜索</Button>
                <Link to="/get_room_info/add" ><Button style={{margin:'0 20px'}}><Icon type="plus" />新开房间</Button></Link>
                </div>
                <Table scroll={{x:true}} columns={columns} dataSource={this.state.data} bordered  size='small' loading={this.state.loading}  onChange={this.current.bind(this)}/>
            </div>
        )
    }
}

export default App; 