import React from 'react';
import { Table, Icon ,Button , Input ,message , Alert ,Radio,Tag,Select,Popconfirm} from 'antd';
import axios from './../../axios'; 
import Qrcode from 'qrcode.react';
import { Route, Link } from 'react-router-dom';
const Option = Select.Option;
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
var pays=['','支付宝','微信','手动添加']
var _status=['','未支付','已支付','已生效']
//  
// 
const columns = [{
  title: '订单id',
  dataIndex: 'order_id',                              
},{
    title: '服务器编号',
    dataIndex: 'server_id',                              
},{
    title: '类型',
    dataIndex: 'type',  
    render:(text)=>{
        return types[text]
    }                            
},{
    title: '金额',
    dataIndex: 'amount',
    render:(text)=>{
        return text/100
    }                              
},{
    title: '创建时间',
    dataIndex: 'create_time',     
    render:(text)=>{
        return getDate(text)
    }                         
},{
    title: '支付方式',
    dataIndex: 'pay_type',   
    render:(text)=>{
        return pays[text]
    }                           
},{
    title: '支付时间',
    dataIndex: 'pay_time',        
    render:(text)=>{
        return getDate(text)
    }                      
},{
    title: '订单状态',
    dataIndex: 'status',   
    render:(text)=>{
        return _status[text]
    }                           
},{
    title: '操作',
    dataIndex: 'todo'
}
];

class App extends React.Component{
    constructor(...args)
    {
        super(...args)
        this.params={
        sites:getUrl().sites,
        server_id:"",
        order_id:"",
        status:'',
        current:1
        }
    }
    state = {
      order_id:'',
      loading:false,
      pagination: {},
      data:[],
   }

   current(params)
   {
         this.params.current = params.current
         this.fn(this.params)
   }
   componentDidMount()
   {
       console.log(this.props.match.params.id)
    if(Object.keys(this.props.match.params).length>0)
    {
        this.params.server_id=this.props.match.params.id
    }
       this.fn(this.params)
   }
   fn(params={}){
       this.setState({
           loading:true,
   })
    axios.get('/server_order_manage',this.params).then(res=>{
        if(res.output.length===0)
        {
            this.setState({
                loading:false,
                data:[]
            })
        }
        res.output.forEach((i,index)=>{
           i.key = index;
           i.todo = i.status!==3?<Popconfirm title={`是否对订单号(${i.order_id})进行对账?`} onConfirm={this.confirms.bind(this)} onCancel={this.cancel.bind(this)} okText="是" cancelText="否">
           <Button type="primary" style={{marginLeft:'5px',height: '25px', fontSize: '13px'}} onClick={this.setId.bind(this)} name={i.order_id}>对账</Button>
           </Popconfirm>:''
        })
        let pagination ={};
        pagination.total = res.count*1;
        pagination.current = res.page*1;
        pagination.pageSize = 20;
        this.setState({
            loading:false,
            data:res.output,
            pagination:pagination
        })
    }).catch(error=>console.log(error))
   }
   confirms()
   {
       axios.get('/verify_server_order',{sites:getUrl().sites,order_id:this.state.order_id}).then(res=>{
           message.info('对账成功')
           this.searchBar()
       }).catch(error=>console.log(error))
   }
   cancel()
   {
       message.error('取消对账')
   }
   setId(e)
   {
       this.setState({
           order_id:e.target.name
       })
   }
   searchBar()
   {
       this.params.current = 1;
       
       this.fn(this.params)
   }
   setType(e)
   {
       this.params.status=e;
   }
   setDate(e)
   {
       this.params[e.target.name]=e.target.value
   }
    render(){
        return(
            <div>
               <div style={{margin:'10px 0'}}>
               <Input  name='server_id'placeholder='服务器编号' onChange={this.setDate.bind(this)} style={{width:"200px"}}/>
                <Input name='order_id' placeholder='订单号' onChange={this.setDate.bind(this)} style={{width:"200px",margin:'0 10px'}}/>
                <span>订单状态:</span>
                <Select defaultValue="" style={{ width: 120,margin:'0 10px' }} onChange={this.setType.bind(this)}>
                <Option value={1}>未支付</Option>
                <Option value={2}>已支付</Option>
                <Option value={3}>已生效</Option>
                <Option value="" >全部</Option>
                </Select>
                <Button icon="search" onClick={this.searchBar.bind(this)}>搜索</Button>
               </div>
                <Table scroll={{x:true}} pagination={this.state.pagination} columns={columns} loading={this.state.loading} dataSource={this.state.data} bordered  size='small' onChange={this.current.bind(this)}/>
            </div>
        )
    }
}
export default App; 