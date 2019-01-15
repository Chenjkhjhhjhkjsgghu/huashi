import React from 'react';
import { Table, Icon ,Button , Input ,Popconfirm , message } from 'antd';
import axios from './../../axios'; 
import Edit from './editRoom'
import Addroom from './addroom'
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
var isShow = ['否','是']
const columns = [{
  title: '区间ID',
  dataIndex: 'id',                              
},{
  title: '排序',
  dataIndex: 'sorder',
},{
  title: '分区名称',
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
    title: '是否显示',
    dataIndex: 'show',
},{
    title: '网址',
    dataIndex: 'url',
},{
  title: '操作',
  dataIndex: 'todo',
}];

class App extends React.Component{
   constructor(...args){
       super(...args)
       this.params = {
        sites:getUrl().sites,
        id:'',
        current:1
       }
   }
  
   state ={
    loading:false,
    value:{
        sites:getUrl().sites,
        id:''
    },
    sortDate:[],
    Edit:{
        id:'',
    },
    type:1,
    data:[],
   }
   setId(e)
   {
       let value = this.state.value;
       value.id = e.target.name;
       this.setState({
        value:value
       })
   }
   confirms()
   {
       let value = this.state.value;
       value.redname = 1;
      axios.post('/change_zone_redname',value).then(res=>{
              message.info('操作成功')
              setTimeout(()=>{this.fn({sites:getUrl().sites})},500)
      }).catch(error=>console.log(error))
   }
   confirm()
   {
       let value = this.state.value;
       value.redname = 0;
      axios.post('/change_zone_redname',value).then(res=>{
              message.info('操作成功')
              setTimeout(()=>{this.fn({sites:getUrl().sites})},500)
      }).catch(error=>console.log(error))
   }
   cancel()
   {
       message.error('取消操作')
   }

   componentDidMount(){
    this.fn(this.params)
   }
  
   sort(arr)
   {
      arr.sort((a,b)=>a.sorder-b.sorder)
     return arr
   }
   confirmss()
   {
    let value = this.state.value;
   axios.post('/delete_zone',value).then(res=>{
           message.info('删除成功')
           setTimeout(()=>{this.fn({site:getUrl().sites})},500)
   }).catch(error=>console.log(error))
   }
   expandedRowRender(record)
   {
       let index = record.id;
       let arr = this.state.sortDate;
       let data = [];
       this.sort(arr)
       arr.forEach((i,j)=>{
           if(i.parent===index)
           {
            i.key =j; 
            if(i.redname)
           {
            
            i.todo = (
                <div>
                <Button style={{ height:'25px',fontSize:'13px'}} type="primary"><Link to={`/get_zone_info/edit`} name={i.id} onClick={this.setEdit.bind(this)} ><Icon type="edit" />编辑</Link></Button>
                <Popconfirm title={`取消${i.name}的红名吗?`} onConfirm={this.confirm.bind(this)} onCancel={this.cancel.bind(this)} okText="是" cancelText="否">
                <Button style={{ height:'25px',fontSize:'13px'}} style={{marginLeft:'5px'}} onClick={this.setId.bind(this)} name={i.id}><Icon type="frown-o" />取消红名</Button>
                </Popconfirm>
                <Popconfirm title={`删除${i.name}分区房间吗?`} onConfirm={this.confirmss.bind(this)} onCancel={this.cancel.bind(this)} okText="是" cancelText="否">
                <Button style={{ height:'25px',fontSize:'13px'}} style={{marginLeft:'5px'}} onClick={this.setId.bind(this)} name={i.id}><Icon type="delete" />删除</Button>
                </Popconfirm>
                </div>
            )
            data.push(i)
           }
           else{
            i.todo = (
                <div>
                <Button style={{ height:'25px',fontSize:'13px'}} type="primary"><Link to={`/get_zone_info/edit`} name={i.id} onClick={this.setEdit.bind(this)} ><Icon type="edit" />编辑</Link></Button>
                <Popconfirm title={`设置${i.name}为红名吗?`} onConfirm={this.confirms.bind(this)} onCancel={this.cancel.bind(this)} okText="是" cancelText="否">
                <Button style={{ height:'25px',fontSize:'13px'}} style={{marginLeft:'5px'}} onClick={this.setId.bind(this)} name={i.id}><Icon type="smile-o" />设置红名</Button>
                </Popconfirm>
                <Popconfirm title={`删除${i.name}分区房间吗?`} onConfirm={this.confirmss.bind(this)} onCancel={this.cancel.bind(this)} okText="是" cancelText="否">
                <Button style={{ height:'25px',fontSize:'13px'}} style={{marginLeft:'5px'}} onClick={this.setId.bind(this)} name={i.id}><Icon type="delete" />删除</Button>
                </Popconfirm>
                </div>
            )
            data.push(i)
           }
           }
       })
       return (
        <Table scroll={{x:true}}
        columns={columns}
        dataSource={data}
        pagination={false}
      />
       )
       
   }
   
   fn(params){
       this.setState({
           loading:true
       })
    axios.get('/get_zone_info',params).then(res=>{
        if(res.output.record.length===0)
        {
            this.setState({
                loading:false,
                data:[]
            })
        }
        var array = [];
        let sss = [];
        res.output.record.map(i=>{
            if(!i.parent)
            {
              array.push(i)
            }
            else{
                sss.push(i)
            }
        })
        this.setState({
            sortDate:sss,
            
        })
      
        array.map((i,index)=>{
           if(i.redname)
           {
            i.todo = (
                <div>
                <Button style={{ height:'25px',fontSize:'13px'}} type="primary"><Link to={`/get_zone_info/edit`} name={i.id} onClick={this.setEdit.bind(this)} ><Icon type="edit" />编辑</Link></Button>
                <Popconfirm title={`取消${i.name}的红名吗?`} onConfirm={this.confirm.bind(this)} onCancel={this.cancel.bind(this)} okText="是" cancelText="否">
                <Button style={{ height:'25px',fontSize:'13px'}} style={{marginLeft:'5px'}} onClick={this.setId.bind(this)} name={i.id}><Icon type="frown-o" />取消红名</Button>
                </Popconfirm>
                <Popconfirm title={`删除${i.name}分区房间吗?`} onConfirm={this.confirmss.bind(this)} onCancel={this.cancel.bind(this)} okText="是" cancelText="否">
                <Button style={{ height:'25px',fontSize:'13px'}} style={{marginLeft:'5px'}} onClick={this.setId.bind(this)} name={i.id}><Icon type="delete" />删除</Button>
                </Popconfirm>
                </div>
            )
           
           }
           else{
            i.todo = (
                <div>
                <Button style={{ height:'25px',fontSize:'13px'}} type="primary"><Link to={`/get_zone_info/edit`} name={i.id} onClick={this.setEdit.bind(this)} ><Icon type="edit" />编辑</Link></Button>
                <Popconfirm title={`设置${i.name}为红名吗?`} onConfirm={this.confirms.bind(this)} onCancel={this.cancel.bind(this)} okText="是" cancelText="否">
                <Button style={{ height:'25px',fontSize:'13px'}} style={{marginLeft:'5px'}} onClick={this.setId.bind(this)} name={i.id}><Icon type="smile-o" />设置红名</Button>
                </Popconfirm>
                <Popconfirm title={`删除${i.name}分区房间吗?`} onConfirm={this.confirmss.bind(this)} onCancel={this.cancel.bind(this)} okText="是" cancelText="否">
                <Button style={{ height:'25px',fontSize:'13px'}} style={{marginLeft:'5px'}} onClick={this.setId.bind(this)} name={i.id}><Icon type="delete" />删除</Button>
                </Popconfirm>
                </div>
            )
           }
           i.key = index;
          
           i.show = isShow[i.show]
        })
        this.setState({
            data:this.sort(array),
            loading:false
        })
    }).catch(error=>console.log(error))
   }
   searchBar()
   {
       this.params.current = 1;
       this.fn(this.params)
   }
   setType1(e)
   {
    this.params[e.target.name] = e.target.value;
   }
   setEdit(e)
   {
        let edit = this.state.Edit;
        edit.id = e.target.name;
        this.setState({
            Edit:edit
        })
   }
    render(){
        return(
            <div>
                 <Route path='/get_zone_info/add' component={()=>{
                     return <Addroom date={this.state.data} onSubmit={this.searchBar.bind(this)} />
                 }}/>
                 <Route path='/get_zone_info/edit' component={()=>{
                   return  <Edit id={this.state.Edit} onSubmit={this.searchBar.bind(this)} />
                 }}/>
                <div style={{margin:'20px 0'}}>
                <Input placeholder='区间ID' style={{width:'200px',margin:'0 0px 0 5px'}} name='belong' onChange={this.setType1.bind(this)} name='id' onPressEnter={this.searchBar.bind(this)}/>
                <Button onClick={this.searchBar.bind(this)} style={{marginLeft:'5px'}}><Icon type="search"/>搜索</Button>
                <Link to="/get_zone_info/add" ><Button style={{margin:'0 20px'}}><Icon type="plus" />新增房间分区</Button></Link>
                </div>
                <Table scroll={{x:true}} columns={columns} dataSource={this.state.data} bordered loading={this.state.loading}  size='small' pagination={false} expandedRowRender={this.expandedRowRender.bind(this)}/>
            </div>
        )
    }
}

export default App; 