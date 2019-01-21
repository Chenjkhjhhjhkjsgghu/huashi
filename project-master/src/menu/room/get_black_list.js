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
const columns = [{
  title: '房间号',
  dataIndex: 'room',                              
},{
  title: '用户ID',
  dataIndex: 'client',
},{
    title:'操作',
    dataIndex: 'todo',
}
];
class App extends React.Component{
   constructor(...args){
       super(...args)
       this.json ={}
   }
   state ={
       loading:false,
       display:{display:'none'},
       pagination:{},
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
    axios.post('/delete_black_list',this.json).then(res=>{

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
    axios.get('/get_black_list',params).then(res=>{
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
                   {Object.keys(authority.delete_black_list).length>0?<Popconfirm title={`确定要要将房间${i.room}内ID为${i.client}的用户移出黑名单吗?`} onConfirm={this.confirms.bind(this)} onCancel={this.cancel.bind(this)} okText="是" cancelText="否">
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
            loading:false,
            pagination:pagination
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
   addBlack(e)
   {
       this.setState({
           display:{display:'block'}
       })
   }
   setType2(e)
   {
       this.json[e.target.name]=e.target.value;
   }
   add_submit()
   {
       this.json.sites=getUrl().sites;
       axios.post('/add_black_list',this.json).then(res=>{
               message.info('添加成功')
               setTimeout(()=>{
                this.fn(this.state.params)
               },500)
               this.coloes()
       }).catch(error=>console.log(error))
   }
   coloes()
   {
    this.setState({
        display:{display:'none'}
    })
   }
    render(){
        return(
            <div style={{position:'relative'}}>
                <div className='black_dialog' style={this.state.display}>
                 <h2 style={{textAlign:'center'}}>添加黑名单</h2>
                <Input placeholder='房间号' style={{width:'220px',margin:'10px 0'}} name='room' onChange={this.setType2.bind(this)}/>
                <Input placeholder='用户id' style={{width:'220px',margin:'20px 0'}} name='client' onChange={this.setType2.bind(this)}/>
                <br/>
                <Button onClick={this.add_submit.bind(this)} style={{marginRight:'20px'}}>确定</Button>
                <Button onClick={this.coloes.bind(this)}> 关闭</Button>
                </div>
                <div style={{margin:'20px 0'}}>
                <Input placeholder='用户id' style={{width:'200px',margin:'0 0px 0 5px'}} onChange={this.setType1.bind(this)} name='user_id' onPressEnter={this.searchBar.bind(this)}/>
                <Input placeholder='房间id' style={{width:'200px',margin:'0 5px'}} name='id' onChange={this.setType1.bind(this)} onPressEnter={this.searchBar.bind(this)}/>
                <Button onClick={this.searchBar.bind(this)} style={{marginLeft:'5px'}}><Icon type="search"/>搜索</Button>
                <Button style={{marginLeft:'20px'}} onClick={this.addBlack.bind(this)}><Icon type="plus" />添加黑名单</Button>
                </div>
                <Table scroll={{x:true}} columns={columns} dataSource={this.state.data} bordered  size='small' loading={this.state.loading} pagination={this.state.pagination} onChange={this.current.bind(this)}/>
            </div>
        )
    }
}

export default App; 