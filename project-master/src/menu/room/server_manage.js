import React from 'react';
import { Table, Icon ,Button , Input ,message , Alert ,Radio,Tag} from 'antd';
import axios from './../../axios'; 
import Qrcode from 'qrcode.react';
import { Route, Link } from 'react-router-dom';

const RadioGroup = Radio.Group;

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
var types = ['','技术服务费','服务器']
const columns = [{
  title: '编号',
  dataIndex: 'id',                              
},{
  title: '类型',
  dataIndex: 'type',
  render:(text)=>{
    return types[text]
  }
},{
  title: '过期时间',
  dataIndex: 'timeout',
  render:(text)=>{
      return getDate(text)
  }
},{
  title: '状态',
  dataIndex: 'status',
  render:(text)=>{
     return  text?<Tag color="green-inverse">未过期</Tag>:<Tag color="red-inverse">已过期</Tag>
    }
},{
  title: '最后续费时间',
   dataIndex: 'last_time',
   render:(text)=>{
        return getDate(text)
    }
},{
  title: '操作',
  dataIndex: 'todo',
  render:(text,record)=>{
   return (
       <div>
           <Link to={`/server_manage/renew_server/${record.id}`}>
           <Button style={{ height:'25px',fontSize:'13px'}} type="primary">续费</Button>
           </Link>
           <Link to={`/server_order_manage/${record.id}`} style={{marginLeft:"10px"}}>
           <Button style={{ height:'25px',fontSize:'13px'}} type="primary">查看续费记录</Button>
           </Link>
       </div>
   )
  }
}];

class App extends React.Component{
 
    state ={
     order_list:[],
      loading:false,
      pagination: {},
      table_head:[],
      server_cost:'',
      num:[],
       params:{
        sites:getUrl().sites,
        current:1
       },
       data:[],
   }

   current(params)
   {
        var value = this.state.params;

        value.current = params.current
         this.fn(value)
   }
   componentDidMount()
   {
       this.fn(this.state.params)
   }
   searchBar()
   {
       let value = this.state.params;
       value.current = 1;
       this.fn(value)
   }
   fn(params={}){
       this.setState({
           loading:true,
   })
    axios.get('/server_manage',params).then(res=>{
        if(res.output.length===0)
        {
            this.setState({
                loading:false,
                data:[]
            })
        }
        res.output.forEach((i,index)=>{
           i.key = index;
        })
        let pagination ={};
        pagination.total = res.count*1;
        pagination.current = res.page*1;
        pagination.pageSize = 20;
        this.setState({
            loading:false,
            data:res.output,
            server_cost:res.server_cost,
            table_head:res.user_on_line.split('@'),
            num:res.using_info[0],
            pagination:pagination
        })
    }).catch(error=>console.log(error))
   }
   
    render(){
        return(
            <div>
                <Route path='/server_manage/buy_server' component={(props)=>{
                    return <Buttons {...props} count={this.state.server_cost} onSubmit={this.searchBar.bind(this)}/>
                }}/>
                <Route path='/server_manage/renew_server/:id' component={(props)=>{
                    return <Buttons {...props} count={this.state.server_cost} onSubmit={this.searchBar.bind(this)}/>
                }}/>
                <Alert message="注：技术服务费超过3日，服务器将全部关闭" type="warning" />
                <Alert style={{margin:'20px 0'}} message={this.state.table_head.length>0?`截至${this.state.table_head[0].split('.')[0]},当前所有房间的真实用户数（不包括普通机器人和VIP机器人）为:${this.state.table_head[4]}人,最多可容纳人数:${this.state.table_head[1]}人,房间总数为:${this.state.table_head[3]},当前可用服务器:${this.state.num.count}台`:false} type="success" />
                <Link to="/server_manage/buy_server"><Button style={{margin:'0 0 20px 0'}}><Icon type="shopping-cart" />购买服务器</Button></Link>
                <Table scroll={{x:true}} pagination={this.state.pagination} columns={columns} loading={this.state.loading} dataSource={this.state.data} bordered  size='small' onChange={this.current.bind(this)}/>
            </div>
        )
    }
}
var timer = '';

class Buttons extends React.Component{
    constructor(...args)
    {
        super(...args)
    }
    state={
        sites:getUrl().sites,
        number:1,
        server_id:'',
        pay_type:1,
        server_type:1,
        weixin:false,
        mount:'',
        server_cost:0,
        Loading:false,
        order:'',
        url:''
    }
    
   componentDidMount(){
    if(Object.keys(this.props.match.params).length>0)
    {
        this.setState({
         server_id:this.props.match.params.id
        })
    }
       if(this.props.count!=0)
       {
           this.setState({
            server_type:2
           })
       }
   }


    setType(e)
    {
      this.setState({
        pay_type:e.target.value
      })
    }
  
    setNumber(e)
    {
        this.setState({
            number:e.target.value
        })
    }
    onSubmit()
    {
        let Url = this.state.server_id===''?'/buy_server':'/renew_server'
        var str = '';
        clearInterval(timer)
        if(this.state.pay_type!==2)
        {
             str = window.open()
        }
        axios.post(Url,this.state).then(res=>{ 
        if(this.state.pay_type===2)
        {
          this.setState({
              weixin:true,
              mount:res.amount,
              order:res.order_id,
              url:res.code_url
          })
        }
        else{
            message.info('正在为您跳转到支付宝')
                str.location = res.code_url
        }
        this.setState({
            Loading:true
        })
         timer = setInterval(()=>{
            axios.post('/get_server_order_info',{sites:getUrl().sites,order_id:res.order_id}).then(res=>{
            if(res){
            message.info('支付成功');
            this.props.onSubmit();
            this.props.history.goBack()
            clearInterval(timer)
            this.setState({
                Loading:false
            })
            }
            else{
              return;
            }
          })
       setTimeout(()=>{
           clearInterval(timer)
       },1000*60*1)     
            },3000) 
        }).catch(error=>console.log(error))
    }
    render(){
        
        return (
            <div className='buy_server_button'>
              <h2>{this.state.server_id===''?'购买服务器':<div>
              续费服务器 <br/>
              <span style={{fontSize:"13px"}}>({this.state.server_id})</span>
              </div>}</h2>
             {this.state.server_id===''?<Input addonBefore='购买数量' onChange={this.setNumber.bind(this)} defaultValue={this.state.number}/>:'' }
             <h4>购买类型</h4>
             <RadioGroup value={this.state.server_type} >
                <Radio value={1} ref='radio1' disabled>技术服务费</Radio>
                <Radio value={2} ref='radio2' disabled>服务器</Radio>
             </RadioGroup>
             <h4>支付方式</h4>
             <RadioGroup defaultValue={this.state.pay_type}  onChange={this.setType.bind(this)}>
                <Radio value={1}>支付宝</Radio>
                <Radio value={2}>微信</Radio>
             </RadioGroup>
             <br/>
            {this.state.weixin?
            <div>
            <h4>订单号:<span>{this.state.order}</span></h4>
            <h4>支付金额为:<span style={{color:'red'}}>{this.state.mount}</span></h4>
            <Qrcode value={this.state.url} style={{width:'150px',height:'150px',margin:'0 auto'}}/>
            </div>
            :''}
            <Button type="primary" loading={this.state.Loading}  style={{margin:'20px 20px 0 0'}} onClick={this.onSubmit.bind(this)}>{this.state.Loading?'支付中':'提交'}</Button><Button onClick={()=>this.props.history.push('/server_manage')}>关闭</Button>
            </div>
        )
    }
} 


export default App; 