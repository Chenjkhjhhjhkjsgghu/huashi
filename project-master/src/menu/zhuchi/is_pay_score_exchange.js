import React from 'react';
import { Table, Icon ,Button , Input , DatePicker ,Select,Alert} from 'antd';
import axios from './../../axios'; 
import immutable from 'immutable' 
const Option = Select.Option;

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
var types = ['','普通兑换','积分换卡']
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
  title: '订单号',
  dataIndex: 'order_id',                              
},{
  title: '用户id',
  dataIndex: 'user_id',
},{
  title: '房间号',
  dataIndex: 'belong',
},{
    title: '昵称',
    dataIndex: 'nickname',
},{
    title: '姓名',
    dataIndex: 'name',
},{
    title: '积分',
    dataIndex: 'socre',
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
    title: '银行',
    dataIndex: 'bank_name',
},{
    title: '银行卡号',
    dataIndex: 'bank_card',
},{
    title: '开户地址',
    dataIndex: 'bank_addr',
},{
    title: '手机号',
    dataIndex: 'mobile',
},{
    title: '创建时间',
    dataIndex: 'create_time',
},{
    title: '状态',
    dataIndex: 'pay_status',
},{
    title: '类型',
    dataIndex: 'exchange_type',
    render:(text)=>
    {
        return types[text*1]
    }
},{
    title: '支付宝',
    dataIndex: 'alipay',
},{
    title: '兑换代理',
    dataIndex: 'exchange_agent',
},{
    title: '备注',
    dataIndex: 'memo',
}];

class App extends React.Component{
   constructor(...args){
       super(...args)
       this.params={
        sites:getUrl().sites,
        id:'',
        type:'',
        belong:'',
        num:'0',
        start_time:'',
        end_time:'',
        current:1
       }
   }
   state ={
    loading:false,
    pagination:{},
    order_list:[],
       data:[],
   }
   componentDidMount()
   {
       if(this.props.match.params.name!=="undefined")
       {
        this.params.belong=this.props.match.params.name
       }
       
       this.fn(this.params)
   }

   showshouldComponentUpdate(nextProps,nextState)
   {
       if(nextProps===this.props)
       {
           return false;
       }
   }
   fn(params={}){
       this.setState({
           loading:true
       })
    axios.get('/is_pay_score_exchange',params).then(res=>{
        if(res.output.length===0)
        {
            this.setState({
                loading:false,
                data:[]
            })
        }
        res.output.forEach((i,index)=>{
           i.key = index;
           i.pay_status = status(i.pay_status)
           i.create_time = getDate(i.create_time)
        })
        let pagination = {};
        pagination.total = res.count*1;
        pagination.current = res.page*1;
        pagination.pageSize = 20;
        this.setState({
            loading:false,
            num:res.sum,
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
     this.params.type = e;
   }
   setType1(e)
   {
     this.params[e.target.name] = e.target.value;
   }
   setType2(e,string)
   {
    this.params.end_time = string[1] ===''?'':string[1]+ '23:59:59';
    this.params.start_time = string[0]  ===''?'':string[0]+ '00:00:00';
   }
  current(e)
  {
      this.params.current = e.current;
      this.fn(this.params)
  }
    render(){
        return(
            <div>
                <div style={{margin:'20px 0'}}>
                <Select defaultValue="" style={{ width: 120 }} onChange={this.setType.bind(this)} name='type'>
                <Option value="1">普通兑换</Option>
                <Option value="2">积分换卡</Option>
                <Option value="" >全部</Option>
                </Select>
                <Input placeholder='房间号' style={{width:'200px',margin:'0 0px 0 5px'}} name='belong' onChange={this.setType1.bind(this)} onPressEnter={this.searchBar.bind(this)}/>
                <Input placeholder='主持ID' style={{width:'200px',margin:'0 5px'}} name='id' onChange={this.setType1.bind(this)} onPressEnter={this.searchBar.bind(this)}/>
                <RangePicker format="YYYY-MM-DD  " onChange={this.setType2.bind(this)}  placeholder={['开始时间','结束时间']} name='time'/>
                <Button onClick={this.searchBar.bind(this)} style={{marginLeft:'5px'}}><Icon type="search"/>搜索</Button>
                </div>
                 <Alert style={{margin:'20px 0'}} message={`总计已支付主持兑点清单金额 :${this.state.num/100}.`} type='success'/>
                <Table scroll={{x:true}} columns={columns} dataSource={this.state.data} bordered size='small' loading={this.state.loading} pagination={this.state.pagination} onChange = {this.current.bind(this)}/>
            </div>
        )
    }
}

export default App; 