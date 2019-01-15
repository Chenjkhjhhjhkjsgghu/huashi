import React from 'react';
import { Table, Button, Alert, message, Input, DatePicker, Select, Icon} from 'antd';
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

const columns = [{
  title: '代理id', 
  dataIndex: 'user_id',
}, {
  title: '交易号',
  dataIndex: 'order_id',
}, {
  title: '操作前余额',
  dataIndex: 'balance_before',
  render:(text)=>{
      return text/100
  }
},{
    title: '操作后余额',
    dataIndex: 'balance_after',
    render:(text)=>{
        return text/100
    }
},{
    title: '操作前欠款',
    dataIndex: 'debt_before',
    render:(text)=>{
        return text/100?text/100:''
    }
},{
    title: '操作后欠款',
    dataIndex: 'debt_after',
    render:(text)=>{
        return text/100?text/100:''
    }
},{
    title: '支付渠道',
    dataIndex: 'type',
}
,{
    title: '操作金额',
    dataIndex: 'amount',
    render:(text)=>{
        return text/100
    },
},{
    title: '现金进账',
    dataIndex: 'is_cash',
},{
    title: '创建时间',
    dataIndex: 'create_time',
},{
    title: '操作人',
    dataIndex: 'operation_id',
},{
    title: '备注',
    dataIndex: 'memo',
}
];


function isSs(arr)
{
    if(arr)
    {
        return '是'
    }
    else{
        return '否'
    }
}
function isS(arr)
{
    let str = '';
   switch(arr*1)
   {
       case 1:
       str = '借款'; 
       break;
       case 2:
       str = '后台借款'; 
       break;
       case 3:
       str = '还款'; 
       break;
       case 4:
       str = '后台还款'; 
       break;
       case 5:
       str = '后台打款'; 
       break; 
   }
   return str;   
}

var order_id = '';
var start_time = null;
var end_time = null;
var type = null;
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
class App extends React.Component{

    constructor(...args)
    {
        super(...args)
        this.state = {
            sum:{},
           id:'',
           order_id:'',
           user_id:'',
           balance_before:'',
           balance_after:'',
           debt_after:'',
           debt_before:'',
           amount:'',
           operation_id:'',
           type:1,
           create_time:'',
           is_cash:false,
           memo:'',
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
        if (i.order_id = order_id)
        {
           json.user_id = i.user_id;
           json.receive_memo = i.receive_memo;
           json.order_id = i.order_id
        }
    })

    axios.post('/confirm_receive',json).then(res=>{
            message.info('处理成功')
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
 }
fn(params={})
{
   params.sites = getUrl().sites;
    var datas = [];
    this.setState({
        loading:true
    })
    axios.get('/transfer_accounts_log',params).then(res=>{
        if(res.output.length===0)
        {
            this.setState({
                loading:false,
                data:[]
            })
        }
         res.output.map((i,index)=>{
             datas.push({
                key:index+i.order_id,
                order_id:i.order_id,
                user_id:i.user_id,
                balance_before:i.balance_before,
                balance_after:i.balance_after,
                amount:i.amount*1,
                debt_after:i.debt_after||'',
                debt_before:i.debt_before||'',
                operation_id:i.operation_id,
                type:isS(i.type),
                create_time:getDate(i.create_time),
                is_cash:isSs(i.is_cash),
                memo:i.memo
             })
             
         })
         this.setState({
             sum:res.sum,
            loading:false,
            data:datas,
            pagination:{
                current:res.page*1,
                total:res.count*1,
                pageSize:20
            }
        })
    }).catch(error=>{
        console.log(error)
    })
}

    handleChange(e)
    {
       type = e;
    }
    onChange(value, string) {
            start_time=string[0] ===''?'':string[0]+ '00:00:00';
            end_time=string[1] ===''?'':string[1]+ '23:59:59';
    }
    setId(e)
    {
        this.setState({
            id:e.target.value
        })
    }
    Submit()
    {
      var value = {
            sites:getUrl().sites,
            id:this.state.id,
            start_time:start_time,
            end_time:end_time,
            type:type,
            current:1
     }
        this.fn(value)
    }
    render()
    {
        return (
           <div className='get_add_log'>
             
               <div style={{margin:'20px 0'}}>
                    <Input placeholder="请输入用户ID" onChange={this.setId.bind(this)}  style={{width:'130px'}} onPressEnter={this.Submit.bind(this)}/>
                    <RangePicker
                        showTime
                        format="YYYY-MM-DD  "
                        placeholder={['开始时间', '结束时间']}
                        onChange={this.onChange.bind(this)}
                      style={{margin:'0 20px'}}/>
                    <Select defaultValue='' style={{ width: 120 }} onChange={this.handleChange.bind(this)}>
                        <Option value=''>全部</Option>
                        <Option value={1}>借款</Option>
                        <Option value={2}>后台借款</Option>
                        <Option value={3}>还款</Option>
                        <Option value={4}>后台还款</Option>
                        <Option value={5}>后台打款</Option>
                    </Select>
                    <Button style={{ marginLeft: '10px' }} onClick={this.Submit.bind(this)}><Icon type="search" />搜索</Button>
               </div>
               <Alert style={{margin:'20px 0'}} message={`总计还款:${this.state.sum.hk/100}，后台还款总计:${this.state.sum.hthk/100}，借款总计:${this.state.sum.jk/100}，后台借款${this.state.sum.htjk/100}.`} type="success" />
                <Table scroll={{x:true}} columns={columns} dataSource={this.state.data} bordered loading={this.state.loading} size="small" pagination={this.state.pagination}/>
           </div>
        )
    }
} 

export default App;