import React from 'react';
import { Table, Icon ,Button , Input ,DatePicker,message} from 'antd';
import axios from './../../axios'; 
import moment from 'moment';

import 'moment/locale/zh-cn';
 
const { RangePicker } = DatePicker;
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
var types = ['代客直冲','借款','后台借款','还款','后台还款','后台打款','积分换卡']
function status(arr)
{
    let tx = '';
    switch(arr){
        case 1:
        tx = '待审核'
        break;
        case 2:
        tx = '审核通过—待支付'
        break;
        case 3:
        tx = '已支付'
        break;
        case -1:
        tx = '已取消'
        break;
    }
    return tx;
}
const columns = [{
  title: '订单id',
  dataIndex: 'order_id',                              
},{
  title: '代理id',
  dataIndex: 'agent_id',
},{
    title: '用户id',
    dataIndex: 'user_id',
},{
  title: '原金额',
  dataIndex: 'balance_before',
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
    title: '变化后金额',
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
    title: '创建时间',
    dataIndex: 'create_time',
},{
    title: '类型',
    dataIndex: 'type',
},{
    title: '操作人',
    dataIndex: 'operation_id',
},{
    title: '备注',
    dataIndex: 'memo',
}];

class App extends React.Component{
   constructor(...args){
       super(...args)
   }
   state ={
    loading:false,
    pagination:{},
    order_list:[],
       params:{
        sites:getUrl().sites,
        agent_id:'',
        start_time:'',
        end_time:'',
        current:1
       },
       data:[],
   }
   componentWillMount()
   {
       this.fn(this.state.params)
   }
   fn(params={}){
       this.setState({
        loading:true
       })
    axios.get('/agent_balance_excheng_log',params).then(res=>{
        if(res.output.length===0)
        {
            this.setState({
                loading:false,
                data:[]
            })
        }
        res.output.map((i,index)=>{
           i.key = index;
           i.pay_status = status(i.pay_status)
           i.type=types[i.type*1]
           i.create_time = getDate(i.create_time)
        })
        let pagination = {};
        pagination.total = res.count*1;
        pagination.current = res.page*1;
        pagination.pageSize = 20;
        this.setState({
            data:res.output,
            loading:false,
            pagination:pagination
        })
    }).catch(error=>{
        console.log(error)
    })
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
   setType2(e,string)
   {
    let data = this.state.params;
    console.log(string)
    data.end_time = string[1] ===''?'':string[1]+ '23:59:59';
    data.start_time = string[0]===''?'':string[0]+ '00:00:00';
    

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
                <Input placeholder='代理ID' style={{width:'200px',margin:'0 5px'}} name='agent_id' onChange={this.setType1.bind(this)} onPressEnter={this.searchBar.bind(this)}/>
                <RangePicker  format="YYYY-MM-DD  " onChange={this.setType2.bind(this)}  placeholder={['开始时间','结束时间']} name='time'/>
                <Button onClick={this.searchBar.bind(this)} style={{marginLeft:'5px'}}><Icon type="search"/>搜索</Button>
                </div>
                <Table scroll={{x:true}} columns={columns} dataSource={this.state.data} bordered size='small' loading={this.state.loading} pagination={this.state.pagination} onChange = {this.current.bind(this)}/>
            </div>
        )
    }
}

export default App; 