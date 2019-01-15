import React from 'react';
import { Table, Icon ,Button , Input ,Popconfirm , message} from 'antd';
import axios from './../../axios'; 
import {Route, Link } from 'react-router-dom';

function getDate(arr)
{
    if(arr===''||arr===null)
    {
        return '';
    }
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
  title: '主持id',
  dataIndex: 'user_id',                              
},{
  title: '房间号',
  dataIndex: 'belong',
},{
  title: '名字',
  dataIndex: 'name',
},{
    title: '身份证',
    dataIndex: 'id_card',
},{
    title: '电话',
    dataIndex: 'mobile',
},{
    title: '银行名',
    dataIndex: 'bank_name',
},{
    title: '银行卡号',
    dataIndex: 'bank_card',
},{
    title: '银行地址',
    dataIndex: 'bank_addr',
},{
    title: '创建时间',
    dataIndex: 'create_time',
},{
    title: '支付宝',
    dataIndex: 'alipay',
},{
  title: '操作',
  dataIndex: 'todo',
}];

class App extends React.Component{
   constructor(...args){
       super(...args)
       this.data_json = '';
       this.search={
        sites:getUrl().sites,
        name:'',
        belong:'',
        current:1
       }
   }
   state ={
       id:'',
       loading:false,
       data:[],
       display:{display:'none'},
       pagination:{
       },
       get_data:{},
   }
   setId(e)
   {
       this.setState({
           id:e.target.name
       })
   }
   confirm()
   {
       let value = {};
       value.id = this.state.id;
       value.sites =getUrl().sites;
      axios.post('/delete_host_info',value).then(res=>{
              message.info('删除成功')
              this.fn(this.search)
      })
   }
   cancel()
   {
    message.error('取消操作')
   }
   search_id(e)
   {
       this.state.data.forEach(i=>{
           if(i.user_id ===e.target.name )
           {
               this.setState({
                   get_data:Object.assign({},i),
                   display:{display:'block'}
               })
           }
       })
   }
   componentDidMount()
   {
       this.fn(this.search)
   }
   fn(params={}){
       this.setState({
           loading:true
       })
    axios.get('/get_host_info',params).then(res=>{
        
        let authority = {sh:false,delete:false};

        if(Object.keys(res.authority.redact_host_info).length>0)
        {
            authority.sh = true;
        }
        if(Object.keys(res.authority.delete_host_info).length>0)
        {
            authority.delete = true;
        }
        if(res.output.length===0)
        {
            this.setState({
                loading:false,
                data:[]
            })
        }
        res.output.forEach((i,index)=>{
           i.key = index;
           i.create_time = getDate(i.create_time)
           i.todo = (
               <div>
                   {
                     authority.sh?<Link to={`/get_host_info/${i.user_id}`}><Button type="primary" style={{ height:'25px',fontSize:'13px'}} ><Icon type="edit" />编辑</Button></Link>:false
                   }
                   { 
                     authority.delete?
                   <Popconfirm title={`您确定要删除ID${i.user_id}吗?`} onConfirm={this.confirm.bind(this)} onCancel={this.cancel.bind(this)} okText="Yes" cancelText="No">
                   <Button style={{marginLeft:'5px', height:'25px',fontSize:'13px'}} onClick={this.setId.bind(this)} name={i.user_id}><Icon type="delete" />删除</Button>
                   </Popconfirm>:false
                   }
               </div>
           )
        })
        let pagination ={}
        pagination.total = res.count*1;
        pagination.pageSize = 20;
        pagination.current = res.page*1;
        this.setState({
            loading:false,
            data:res.output,
            pagination:pagination
        })
    }).catch(error=>{
        console.log(error)
    })
   }
   searchs(e)
   {
       this.search[e.target.name] = e.target.value;
   }
   current(e)
   {
       let value = this.search;
       value.current = e.current;
       this.fn(value)
   }
   searchBar()
   {
       this.search.current = 1;
       this.fn(this.search)
   }
   Submit(values)
   {
       values.sites = getUrl().sites;
       var str = true;
       Object.keys(values).forEach(i=>{
           if(values[i]==='')
           {
               str = false;
           }
       })
       if(!str)
       {
        message.error('以下都为必填项')
          return;
       }
       axios.post('/redact_host_info',values).then(res=>{
               message.info('编辑成功')
              this.fn(this.search)
              this.props.history.push('/get_host_info')
       }).catch(error=>console.log(error))
   }
    render(){
        return(
            <div>
                <Route path='/get_host_info/:id' component={({match,history})=>{return <Inputs onSubmit = {this.Submit.bind(this)} {...match} {...history} datas={this.state.data}/>}} />
                <div style={{margin:'20px 0'}}>
                <Input placeholder='房间号' style={{width:'200px'}} name='belong' onChange={this.searchs.bind(this)} onPressEnter={this.searchBar.bind(this)}/>
                <Input placeholder='主持ID' style={{width:'200px',margin:'0 5px'}} name='id' onChange={this.searchs.bind(this)} onPressEnter={this.searchBar.bind(this)}/>
                <Input placeholder='姓名' style={{width:'200px'}} name='name' onChange={this.searchs.bind(this)} onPressEnter={this.searchBar.bind(this)}/>
                <Button onClick={this.searchBar.bind(this)} style={{marginLeft:'5px'}}><Icon type="search"/>搜索</Button>
                </div>
                <Table scroll={{x:true}} columns={columns} dataSource={this.state.data} loading={this.state.loading} bordered pagination={this.state.pagination} onChange={this.current.bind(this)}/>
            </div>
        )
    }
}

class Inputs extends React.Component{

    state = {
        get_data:{}
    }
    
    componentDidMount()
    {
        this.props.datas.forEach(i=>{
            if(i.user_id ===this.props.params.id)
            {
                var json = Object.assign({},i)
                delete json.todo
                this.setState({
                    get_data:json
                })
            }
        })
    }

    componentWillReceiveProps()
    {
        this.props.datas.forEach(i=>{
            if(i.user_id ===this.props.params.id)
            {
                this.setState({
                    get_data:i
                })
            }
        })
    }
    Submit()
    {
        this.props.onSubmit(this.state.get_data)
    }

    setDates(e)
    {
        let json = this.state.get_data;
        json[e.target.name]=e.target.value;
         this.setState({
             get_data:json
         })
    }
    render(){
        return(
            <div className='host_info'>
            <h2 style={{fontSize:'16px',textAlign:'center'}}>您当前正在修改ID为<span style={{color:'#6fb3e0'}}>{this.state.get_data.user_id}</span>的用户信息</h2>
            <div style={{textAlign:'center'}}>(以下都为<b style={{color:'red'}}>必填</b>项)</div>
           <Input addonBefore='主持ID' placeholder={this.state.get_data.user_id}  name='user_id' onChange={this.setDates.bind(this)}  value={this.state.get_data.user_id} disabled/>
           <Input addonBefore='名字' placeholder={this.state.get_data.name} name='name' onChange={this.setDates.bind(this)} value={this.state.get_data.name}/>
           <Input addonBefore='手机号' placeholder={this.state.get_data.mobile} name='mobile' onChange={this.setDates.bind(this)} value={this.state.get_data.mobile}/>
           <Input addonBefore='银行' placeholder={this.state.get_data.bank_name} name='bank_name' onChange={this.setDates.bind(this)} value={this.state.get_data.bank_name}/>
           <Input addonBefore='银行卡号' placeholder={this.state.get_data.bank_card} name='bank_card' onChange={this.setDates.bind(this)} value={this.state.get_data.bank_card}/>
           <Input addonBefore='银行地址' placeholder={this.state.get_data.bank_addr} name='bank_addr' onChange={this.setDates.bind(this)} value={this.state.get_data.bank_addr}/>
           <Input addonBefore='身份证' placeholder={this.state.get_data.id_card} name='id_card' onChange={this.setDates.bind(this)} value={this.state.get_data.id_card}/>
           <Input addonBefore='支付宝' placeholder={this.state.get_data.alipay} name='alipay' onChange={this.setDates.bind(this)} value={this.state.get_data.alipay}/>
           <Input addonBefore='房间号' placeholder={this.state.get_data.belong} name='belong' onChange={this.setDates.bind(this)} value={this.state.get_data.belong}/>
            <Button type="primary" onClick={this.Submit.bind(this)}>提交</Button>
            <Button onClick={()=>{this.props.push('/get_host_info')}} style={{marginLeft:"10px"}}>关闭</Button>
           </div>
        )
    }
}

export default App; 