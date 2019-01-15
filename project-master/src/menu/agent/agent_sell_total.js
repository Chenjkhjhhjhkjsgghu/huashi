import React from 'react';
import { Table, Icon ,Button , Input ,DatePicker,Alert,message} from 'antd';
import axios from './../../axios'; 
import moment from 'moment';
import 'moment/locale/zh-cn';
const { RangePicker } = DatePicker;
moment.locale('zh-cn')

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
  title: '代理',
  dataIndex: 'userId',                              
},{
  title: '姓名',
  dataIndex: 'true_name',
},{
  title: '房间号',
  dataIndex: 'belong',
},{
    title: '电话',
    dataIndex: 'phone',
},{
    title: '银行卡号',
    dataIndex: 'bank_account',
},{
    title: '开户地址',
    dataIndex: 'bank_address',
},{
    title: '提卡数',
    dataIndex: 'sell_card',
},{
    title: '销售额',
    dataIndex: 'sell',
    render:(text)=>{
        return text/100
    }
},{
    title: '提成',
    dataIndex: 'reward',
    render:(text)=>{
        return text/100
    }
},{
    title: '现金进账',
    dataIndex: 'cash',
    render:(text)=>{
        return text/100
    }
},{
    title: '已支付兑换额',
    dataIndex: 'is_pay',
    render:(text)=>{
        return text/100
    }
},{
    title: '待支付兑换额',
    dataIndex: 'to_pay',
    render:(text)=>{
        return text/100
    }
},{
    title: '待审核兑换额',
    dataIndex: 'to_audit',
    render:(text)=>{
        return text/100
    }
},{
    title: '利润',
    dataIndex: 'audit',
    render:(text,record)=>{
        return (record.sell-record.reward-record.is_pay)/100
    }
}
,{
    title: '未确定利润',
    dataIndex: 'wei_audit',
    render:(text,record)=>{
        return (record.sell-record.reward-record.is_pay-record.to_pay-record.to_audit)/100
    }
}];


class App extends React.Component{
   constructor(...args){
       super(...args)
   }
   state ={
    loading:false,
    pagination:{},
    sum:{
        sell_card:0,// 提卡数
        sell:0,// 销售额
        reward:0,// 提成
        cash:0,// 现金进账
        is_pay:0,// 已支付兑换额
        to_pay:0,// 待支付兑换额
        to_audit:0 // 待审核兑换额
    },
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
   fn(params){
    this.setState({
        loading:true
    })
    axios.get('/agent_sell_total',params).then(res=>{
        if(res.output.length===0)
        {
            this.setState({
                loading:false,
                data:[]
            })
        }
        var sum = this.state.sum;
        res.output.map((i,index)=>{
            sum.cash+=i.cash*1
            sum.sell_card+=i.sell_card*1
            sum.reward+=i.reward*1
            sum.sell+=i.sell*1
            sum.is_pay+=i.is_pay*1
            sum.to_pay+=i.to_pay*1
            sum.to_audit+=i.to_audit*1
           i.key = index;
           i.pay_status = status(i.pay_status)
           i.type=types[i.type*1]
           i.create_time = getDate(i.create_time)
        })
        let pagination = {};
        pagination.total = res.count*1;
        pagination.pageSize = 20;
        pagination.current = res.page*1;
        this.setState({
            sum:sum,
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
                <Alert message={<h3>计算公式</h3>}
                description={<pre>
    利润 = 销售额 - 提成 - 已支付兑换金额 <br />
    未确定利润 = 销售额 - 提成 - 已支付兑换金额 - 待支付兑换金额 - 待审核兑换金额<br />
    现金进账= 勾选了现金进账的后台打款 + 第三方充值（不包含大厅充值）<br />
    提成比例请到系统设置--代理设置项设置
                    </pre>
                    }
                type="success"
                closable

                />
                <Alert
                style={{marginTop:'20px'}}
                message={`${this.state.params.start_time}至${this.state.params.end_time} 
                总计提卡数 : ${this.state.sum.sell_card} , 总销售额 :${this.state.sum.sell/100} ，总提成：${this.state.sum.reward/100}，已支付总兑换：${this.state.sum.is_pay/100}，待支付总兑换：${this.state.sum.to_pay/100}，
                待审核总兑换：${this.state.sum.to_audit/100}，总利润：${(this.state.sum.sell-this.state.sum.reward-this.state.sum.is_pay)/100}，未确定总利润:${(this.state.sum.sell-this.state.sum.reward-this.state.sum.to_audit-this.state.sum.is_pay-this.state.sum.to_pay)/100} 总现金进账：${this.state.sum.cash/100}`}
                type="info"
                closable
                />
                <div style={{margin:'20px 0'}}>
                <Input placeholder='代理ID' style={{width:'200px',margin:'0 5px'}} name='agent_id' onChange={this.setType1.bind(this)} onPressEnter={this.searchBar.bind(this)}/>
                <RangePicker format="YYYY-MM-DD  " onChange={this.setType2.bind(this)}  placeholder={['开始时间','结束时间']} name='time' showTime/>
                <Button onClick={this.searchBar.bind(this)} style={{marginLeft:'5px'}}><Icon type="search"/>搜索</Button>
                </div>
                <Table scroll={{x:true}} columns={columns} dataSource={this.state.data} bordered size='small' loading={this.state.loading} pagination={this.state.pagination} onChange = {this.current.bind(this)}/>
            </div>
        )
    }
}

export default App; 