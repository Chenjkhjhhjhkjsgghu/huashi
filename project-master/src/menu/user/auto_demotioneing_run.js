import React from 'react';
import { Table, Icon ,Button , Input ,Select ,Popconfirm} from 'antd';
import axios from './../../axios'; 

import { message } from 'antd';
const Option = Select.Option;
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
  
//    
//  
//  
//  
//  
//  
// is_open 是否开启，true为开启
const columns = [{
  title: '用户id',
  dataIndex: 'userid',                              
},{
  title: '充卡要求天数',
  dataIndex: 'recharge_day'
},{
  title: '充卡要求金额',
  dataIndex: 'recharge_money',
},{
  title: '系统上次验证时间',
  dataIndex: 'last_judge_time',
  render:(text)=>{
      return getDate(text)
  }
},{
    title: '创建时间',
    dataIndex: 'create_time',
    render:(text)=>{
        return getDate(text)
    }
},{
    title: '违规次数',
    dataIndex: 'illegal_time',
},{
    title: '编辑',
    dataIndex: 'todo'
}];
function cancel()
{
    message.error('取消操作')
}

class App extends React.Component{
   constructor(...args){
       super(...args)
       this.addUser={
        sites:getUrl().sites,
        userid:'',
        name:'添加会员',
        recharge_day:'',
        recharge_money:'',
        is_open:'true'
       }
       this.params={
        sites:getUrl().sites,
        userid:'',
        is_open:'',
        illegal_time:''
       }
       this.setId  = this.setId.bind(this)
   }
    state ={
        display:{display:'none'},
        authority:{
            auto_demotioneing_run_add:{}
        },
        disabled:false,
        addUser:{
            sites:getUrl().sites,
            userid:'',
            name:'添加会员',
            recharge_day:'',
            recharge_money:'',
            is_open:'true'
           },
        order_list:[],
        loading:false,
        pagination: {},
        data:[],
   }
   current(params)
   {
        var value = this.params;

        value.current = params.current
         this.fn(value)
   }
   componentDidMount()
   {
       this.fn(this.params)
   }
   setId(e)
   {
       this.params.userid = e.target.name
   }
   confirm()
   {
      let {sites,userid} = this.params;
       let json = {
           sites:sites,
           userid:userid
       }
      axios.post('/auto_demotioneing_run_delete',json).then(()=>{
        this.params.userid='';
        message.info("删除成功")
        this.fn(this.params)
      }).catch(error=>console.log(error))

   }   
   fn(params){
       this.setState({
           loading:true,
       })
      
   
    axios.get('/auto_demotioneing_run',params).then(res=>{
        if(res.output.length===0)
        {
            this.setState({
                loading:false,
                data:[]
            })
        }
        res.output.forEach((i,index)=>{
           i.key = i.userid;
           i.todo = <div>
               {Object.keys(res.authority.auto_demotioneing_run_redact).length>0?<Button type="primary"  style={{height:'25px' , lineHeight:'25px'}} type="primary" name = {i.userid} onClick={this.addUsers.bind(this)}><Icon type="edit" />编辑</Button>:false}
               {Object.keys(res.authority.auto_demotioneing_run_delete).length>0?
               <Popconfirm title={`你确定要删除${i.userid}？`} onConfirm={this.confirm.bind(this)} onCancel={cancel} okText="是" cancelText="否" >
               <Button style={{marginLeft:'10px',height:'25px' , lineHeight:'25px'}}  name={i.userid} onClick={this.setId}><Icon type="delete" />删除</Button>
               </Popconfirm>:false}
               
           </div>
        })
        let pagination ={};
        pagination.total = res.count*1;
        pagination.pageSize = 20;
        pagination.current = res.page*1;
        this.setState({
            loading:false,
            authority:res.authority,
            data:res.output,
            pagination:pagination
        })
    }).catch(error=>console.log(error))
   }
   searchBar()
   {
       this.params.current = 1;
       this.fn(this.params)
   }
   
   setType(e)
   {
        this.params[e.target.name] = e.target.value
   }
   is_open(e)
   {
       this.params.is_open = e;
   }
   addUsers(e)
   {
    this.setState({
        display:{display:'block'}
    })
    if(e.target.name!==''){
       let json ={
           sites:getUrl().sites,
           userid:e.target.name
       }
       axios.get('/auto_demotioneing_run',json).then(res=>{
        res.output[0].name=`编辑${res.output[0].userid}的信息`;
        res.output[0].sites=getUrl().sites;
        res.output[0].is_open = res.output[0].is_open.toString()
       this.setState({
        addUser:res.output[0],
        disabled:true,
        display:{display:'block'}
       })
       }).catch(error=>console.log(error))
    }
   }
   Change_recharge_day(e)
   {
    let json = this.state.addUser
    json.recharge_day = e;
    this.setState({
    addUser:json
    })
   }
   addUser_is_open(e)
   {
       let json = this.state.addUser
       json.is_open = e;
       this.setState({
           addUser:json
       })
   }
   addUser_type(e)
   {
        let json = this.state.addUser
        json[e.target.name] = e.target.value;
        this.setState({
        addUser:json
        })
   }
   addSubmit()
   {
       let urls = true;
       this.state.disabled?urls=false:urls=true;
     let nUrl = null;
      urls? nUrl='/auto_demotioneing_run_add':nUrl='/auto_demotioneing_run_redact'
     axios.post(nUrl,this.state.addUser).then(()=>{
        urls?message.info('添加成功'):message.info('编辑成功')
        this.fn(this.params)
        this.setState({
            addUser:{
               sites:getUrl().sites,
               userid:'',
               name:'添加会员',
               recharge_day:'',
               recharge_money:'',
               is_open:'true'
            },
            display:{display:"none"}
        })
    }).catch(error=>console.log(error))
   }
   coloes()
   {
       this.setState({
           display:{display:'none'},
           disabled:false,
           addUser:{
            sites:getUrl().sites,
            userid:'',
            name:'添加会员',
            recharge_day:'',
            recharge_money:'',
            is_open:'true'
         }
       })
   }
    render(){
        return(
            <div>
                <div className='add_user_run' style={this.state.display}>
                <h2 style={{color:"#1890ff",textAlign:'center'}} >{this.state.addUser.name}</h2>
                
                <Input name='userid' onChange={this.addUser_type.bind(this)} addonBefore='用户id:' value={this.state.addUser.userid} disabled={this.state.disabled}/>
                <span>充卡要求：</span>
                <Select value={this.state.addUser.recharge_day} style={{ width:100 }} onChange={this.Change_recharge_day.bind(this)}>
                    <Option value=''>无要求</Option>
                    <Option value={3}>3天</Option>
                    <Option value={5}>5天</Option>
                    <Option value={7}>7天</Option>
                    <Option value={15}>15天</Option>
                    <Option value={20}>20天</Option>
                    <Option value={30}>1个月</Option>
                    <Option value={60}>2个月</Option>
                    <Option value={90}>3个月</Option>
                    <Option value={183}>半年</Option>
                    <Option value={365}>一年</Option>
                </Select>
                <span>是否开启:</span>
                <Select value={this.state.addUser.is_open} style={{ width: 100 }} onChange={this.addUser_is_open.bind(this)} >
                        <Option value=''>全部</Option>
                        <Option value='true'>是</Option>
                        <Option value='false'>否</Option>
                    </Select>
                    <br />
                <Input placeholder='元' name='recharge_money' onChange={this.addUser_type.bind(this)}  addonBefore='金额不得少于：' value={this.state.addUser.recharge_money}/>
                <Button type='primary' style={{marginRight:'10px'}} onClick={this.addSubmit.bind(this)}>提交</Button>
                <Button onClick={this.coloes.bind(this)}>关闭</Button>
                </div>
                <div style={{margin:'20px 0'}}>
                <Input placeholder='用户id' style={{width:'200px',margin:'0 5px 0 0'}} name='userid' onChange={this.setType.bind(this)} onPressEnter={this.searchBar.bind(this)} />
                <span>是否开启:</span>
                <Select defaultValue='' style={{ width: 120 }} onChange={this.is_open.bind(this)} >
                        <Option value=''>全部</Option>
                        <Option value='true'>是</Option>
                        <Option value='false'>否</Option>
                    </Select>
                <Input placeholder='违规次数' style={{width:'200px',margin:'0 5px 0 5px'}} name='illegal_time' onChange={this.setType.bind(this)} onPressEnter={this.searchBar.bind(this)} />
                <Button onClick={this.searchBar.bind(this)} style={{marginLeft:'5px'}}><Icon type="search"/>搜索</Button>
                </div>
               {Object.keys(this.state.authority.auto_demotioneing_run_add).length>0? <Button style={{  lineHeight: '30px', fontSize: '13px' ,margin:'-10px 0 10px 0'}} onClick={this.addUsers.bind(this)} name=''><Icon type="plus" />添加</Button>:''}
   
                <Table scroll={{x:true}} pagination={this.state.pagination} columns={columns} loading={this.state.loading} dataSource={this.state.data} bordered  size='small' onChange={this.current.bind(this)}/>
            </div>
        )
    }
}

export default App; 