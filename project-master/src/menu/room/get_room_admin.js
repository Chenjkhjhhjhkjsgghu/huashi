import React from 'react';
import { Table, Icon ,Button , Input ,Popconfirm , message } from 'antd';
import axios from './../../axios'; 

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
  var level = ['','管理员','副室主']
const columns = [{
  title: '房间号',
  dataIndex: 'room',                              
},{
  title: '管理员ID',
  dataIndex: 'client',
},{
  title: '级别',
  dataIndex: 'type',
  render:(text)=>{
      return level[text*1]
  }
},{
    title:'操作',
    dataIndex: 'todo',
}
];
class App extends React.Component{
   constructor(...args){
       super(...args)
   }
   state ={
       pagination:{},
       loading:false,
       params:{
        sites:getUrl().sites,
        id:'',
        user_id:'',
        current:1,
       },
       data:[],
   }
  
   componentDidMount()
   {
       this.fn(this.state.params)
   }
   confirms()
   {

    this.json.sites = getUrl().sites;
    axios.post('/delete_room_admin',this.json).then(res=>{
            message.info('删除成功')
            setTimeout(()=>{
                this.searchBar()
            },500)
    }).catch(error=>console.log(error))
   }
   cancel()
   {
     message.error('取消操作')
   }
   setId(e)
   {
      this.json = this.state.data[e.target.name*1];
   }
   fn(params={}){
       this.setState({
           loading:true
       })
    axios.get('/get_room_admin',params).then(res=>{
        if(res.output.record.length===0)
        {
            this.setState({
                loading:false,
                data:[]
            })
        }
        let authority = res.authority;
        res.output.record.map((i,index)=>{
           i.key = index;
           i.todo = (
               <div>
                   {Object.keys(authority.delete_room_admin).length>0?<Popconfirm title={`确定要删除房间管理员吗?`} onConfirm={this.confirms.bind(this)} onCancel={this.cancel.bind(this)} okText="Yes" cancelText="No">
                   <Button style={{marginLeft:'5px'}} onClick={this.setId.bind(this)} name={index}>删除</Button>
                   </Popconfirm>:false}
               </div>
           )
        })
        let pagination = {};
        pagination.total = res.output.record_count*1;
        pagination.current = res.output.page_num*1+1;
        pagination.pageSize = 20;
        this.setState({
            data:res.output.record,
            pagination:pagination,
            loading:false
        })
    }).catch(error=>console.log(error))
   }
   searchBar()
   {
       let value = this.state.params;
       value.current = 1;
       this.fn(value)
   }
   setType1(e)
   {
     let data = this.state.params;
     data[e.target.name] = e.target.value;
     this.setState({
         params:data
     })
   }
   current(e)
   {
       let value = this.state.params;
       value.current = e.current;
       this.fn(value)
   }
    render(){
        return(
            <div>
                <div style={{margin:'20px 0'}}>
                <Input placeholder='管理员id' style={{width:'200px',margin:'0 0px 0 5px'}} onChange={this.setType1.bind(this)} name='user_id' onPressEnter={this.searchBar.bind(this)}/>
                <Input placeholder='房间id' style={{width:'200px',margin:'0 5px'}} name='id' onChange={this.setType1.bind(this)} onPressEnter={this.searchBar.bind(this)}/>
                <Button onClick={this.searchBar.bind(this)} style={{marginLeft:'5px'}}><Icon type="search"/>搜索</Button>
                </div>
                <Table scroll={{x:true}} columns={columns} dataSource={this.state.data} bordered  size='small' loading={this.state.loading} pagination={this.state.pagination} onChange={this.current.bind(this)}/>
            </div>
        )
    }
}

export default App; 