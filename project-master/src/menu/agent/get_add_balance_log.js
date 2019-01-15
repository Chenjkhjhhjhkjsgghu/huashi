import React from 'react';
import { Table, Button,  message, Input, DatePicker, Select, Icon,Alert} from 'antd';
import axios from './../../axios';

const { RangePicker } = DatePicker;
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
const columns = [{
  title: '用户id',
  dataIndex: 'user_id',
}, {
  title: '交易号',
  dataIndex: 'order_id',
}, {
  title: '打款前余额',
  dataIndex: 'balance_before',
  render:(text)=>{
      return text/100
  }
},{
    title: '打款后余额',
    dataIndex: 'balance_after',
    render:(text)=>{
        return text/100
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
    title: '操作人',
    dataIndex: 'operation_id',
},{
    title: '备注',
    dataIndex: 'memo',
},{
    title: '到账时间',
    dataIndex: 'receive_time',
    render:(text)=>{
        return getDate(text)
    }
},{
    title: '到账操作人',
    dataIndex: 'receive_user',
},{
    title: '到账备注',
    dataIndex: 'receive_memo',
},{
    title: '是否已到账',
    dataIndex: 'is_receive',
},{
    title: '操作',
    dataIndex: 'todo',
}
];


function isS(arr)
{
    if(arr)
    {
        return '已到账'
    }
    else{
        return '未到账'
    }
}
var order_id = '';
class App extends React.Component{

    constructor(...args)
    {
        super(...args)
        this.json = {};
        this.id = {
            sites:getUrl().sites,
            id:'',
            end_time:'',
            start_time:'',
            current:1,
            is_receive:'',
        };
        this.state = {
            sum:{
                false:0,
                true:0
            },
            display:{display:'none'},
            loading:false,
            data:[],
            pagination:{
                total:10
            }
        }
    }


    componentDidMount()
    {
        this.fn({current:1,sites:getUrl().sites})
    }

 confirm(e)
 {
     var json = {
         sites:getUrl().sites
     };
    this.state.data.map(i=>{
        if (i.order_id === order_id)
        {
           json.user_id = i.user_id;
           json.order_id = i.order_id
        }
    })

    json.receive_memo = this.json.receive_memo

    axios.post('/confirm_receive',json).then(res=>{
            message.info('处理成功')
            this.setState({
                display:{display:'none'}
            })
            this.fn({current:1,sites:getUrl().sites})
    }).catch(error=>{
        console.log(error)
    })
 }   
 cancel(e)
 {
     message.error('取消操作')
 }
 setUser(e)
 {
     order_id = e.target.name;
     this.setState({
         display:{display:'block'}
     })
 }
fn(params={})
{
   params.sites = getUrl().sites;
    var datas = [];
    this.setState({
        loading:true
    })
    axios.get('/get_add_balance_log',params).then(res=>{
        if(res.output.length===0)
        {
            this.setState({
                loading:false,
                data:[]
            })
        }
         res.output.map((i,index)=>{
             datas.push({
                key:index,
                user_id :i.user_id,
                order_id:i.order_id,
                balance_before:i.balance_before,
                balance_after:i.balance_after,
                amount:i.amount,
                 create_time:i.create_time,
                operation_id:i.operation_id,
                memo:i.memo,
                receive_time: i.receive_time,
                receive_user:i.receive_user,
                receive_memo:i.receive_memo,
                is_receive:isS(i.is_receive),
                todo:i.is_receive?false: 
                <Button name={i.order_id} onClick={this.setUser.bind(this)} type="primary" style={{ height:'25px',fontSize:'13px'}}>
                    确认到账
                </Button>
             })
             
         })
         this.setState({
            loading:false,
            data:datas,
            sum:res.sum,
            pagination:{
                pageSize:20,
                current:res.page*1,
                total:res.count*1
            }
        })
    }).catch(error=>{
        console.log(error)
    })
}

    handleChange(e)
    {
       
        this.id.is_receive=e
       
    }
    onChange(value, string) { 
           this.id.start_time= string[0] ===''?'':string[0]+ '00:00:00';
           this.id.end_time= string[1] ===''?'':string[1]+ '23:59:59';
    }
    current(e)
    {
       this.id.current = e.current;
       this.fn(this.id)
    }
    setId(e)
    {
        this.id.id = e.target.value
    }
    change_memo(e)
    {
        
        this.json.receive_memo = e.target.value;
        console.log(this.json.receive_memo)
    }
    Submit(){
        this.id.current = 1;
        this.fn(this.id)
    }
    render()
    {
        return (
           <div className='get_add_log'>
               <div className='get_add_dialog' style={this.state.display}>
                   <input className='ant-input' placeholder='请输入到账备注' onChange={this.change_memo.bind(this)}/>
                   <Button type="primary" style={{margin:'0 10px'}} onClick={this.confirm.bind(this)}>确认提交</Button>
                   <Button onClick={()=>{this.setState({display:{display:'none'}})}}>取消</Button>
               </div>
               <div style={{margin:'20px 0'}}>
                    <Input placeholder="请输入用户ID" onChange={this.setId.bind(this)}  style={{width:'130px'}} name='user_id' onPressEnter={this.Submit.bind(this)}/>
                    <RangePicker
                        showTime
                        format="YYYY-MM-DD  "
                        placeholder={['开始时间', '结束时间']}
                        onChange={this.onChange.bind(this)}
                      style={{margin:'0 20px'}}/>
                    <Select defaultValue='' style={{ width: 120 }} onChange={this.handleChange.bind(this)}>
                        <Option value=''>全部</Option>
                        <Option value='true'>已到账</Option>
                        <Option value='false'>未到账</Option>
                    </Select>
                    <Button style={{ marginLeft: '10px' }} onClick={this.Submit.bind(this)}><Icon type="search" />搜索</Button>
               </div> 
                <Alert style={{margin:'20px 0'}} message={`总计金额为：${(this.state.sum.false+this.state.sum.true)/100},其中,未到账金额为：${this.state.sum.false},已到账金额为:${this.state.sum.true}`} type="success" />
                <Table scroll={{x:true}} columns={columns} dataSource={this.state.data} pagination={this.state.pagination} bordered loading={this.state.loading} size="small" onChange={this.current.bind(this)}/>
           </div>
        )
    }
} 

export default App;