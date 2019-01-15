import React from 'react';
import { Table, Icon ,Button , Input ,Popconfirm , message , DatePicker ,Select,Alert} from 'antd';
import axios from './../../axios'; 


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




const order_status = ['未支付','已支付','已到账']
const type = ['','网银','支付宝','微信','点卡']
const order_type = ['','自助充值','代理充值','点卡充值']
const columns = [{
  title: '订单号',
  dataIndex: 'order_num',                              
},{
  title: '用户id',
  dataIndex: 'userid',
},{
  title: '代理',
  dataIndex: 'agent',
},{
    title: '充值金额',
    dataIndex: 'order_money',
    render:(text)=>{
        return text/100
    }
},{
    title: '对应币值',
    dataIndex: 'coin',
    render:(text)=>{
        return text/100
    }
},{
    title: '订单状态',
    dataIndex: 'order_status',
    render:(text)=>{
    return order_status[text]
    }
},{
    title: '付款方式',
    dataIndex: 'type',
    render:(text)=>{
        return type[text]
    }
},{
    title: '下单时间',
    dataIndex: 'order_time',
    render:(text)=>{
        return getDate(text)
    }
},{
    title: '支付时间',
    dataIndex: 'pay_time',
    render:(text)=>{
        return getDate(text)
    }
},{
    title: '充值类型',
    dataIndex: 'order_type',
    render:(text)=>{
        return order_type[text]
    }
},{
  title: '操作',
  dataIndex: 'todo'
}];

var names = '';
class App extends React.Component{
   constructor(...args){
       super(...args)
       this.order_list = [];
   }
   state ={
    pagination:{},
    id:'',
    loading:false,
    selectedRowKeys:[],
    num:'0',
       params:{
        sites:getUrl().sites,
        user_id:'',
        agent_id:'',
        order_id:'',
        start_time:'',
        end_time:'',
        order_type:'',
        order_status:'',
        current:1
       },
       data:[]
   }
   confirm(e)
   {
      let value = {};
      value.sites =getUrl().sites;
      value.order_list = this.order_list;
      axios.post('/pass_audit_score_exchange',value).then(res=>{
              message.info('操作成功')
              this.searchBar()
              this.setState({
                  selectedRowKeys:[]
              })
      }).catch(error=>console.log(error))
   }
   confirms(e)
   {
    let value = {};
    value.sites = getUrl().sites;
    value.order_list = this.order_list;
    axios.post('/cancel_audit_score_exchange',value).then(res=>{
            message.info('取消成功')
            this.searchBar()
    }).catch(error=>console.log(error))
   }
   cancel(e)
   {
       message.error('取消操作')
   }
   setId(e)
   {
    this.order_list = [];
    this.order_list.push(e.target.name)
   }
   componentDidMount()
   {
       this.fn(this.state.params)
   }
   cancel()
   {
       message.error('取消操作')
   }
   confirm()
   {
       axios.post('/verify_order',{order_id:this.state.id,sites:getUrl().sites}).then(res=>{
          message.info('对账成功')
          this.searchBar()
       }).catch(err=>console.log(err))
   }
   setId(e)
   {
        this.setState({
            id:e.target.name
        })
   }
   fn(params={}){
       this.setState({
           loading:true
       })
    axios.get('/recharge_manage',params).then(res=>{
        if(res.output.length===0)
        {
            this.setState({
                loading:false,
                data:[]
            })
        }
        res.output.map((i,index)=>{
           i.key = index;
           i.todo = i.order_status===0?<Popconfirm  title={`是否对订单${i.order_num}进行对账操作？
           `} onConfirm={this.confirm.bind(this)} onCancel={this.cancel} okText="是" cancelText="否" ><Button name={i.order_num} onClick={this.setId.bind(this)} type="primary" style={{ height:'25px',lineHeight:'25px',fontSize:'13px'}}>对账</Button></Popconfirm>:''
        })
        let pagination = {};
        pagination.total = res.count*1;
        pagination.pageSize = 20;
        pagination.current = res.page*1;
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
       let value = this.state.params;
       value.current = 1;
       this.fn(value)
   }
   setType(e)
   {
     let date =this.state.params;
     date.order_type = e;
     this.setState({
         params:date
     })
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
   setType3(e,)
   {
    let date =this.state.params;
     date.order_status = e;
     this.setState({
         params:date
     })
   }
   current(e)
   {
       let value = this.state.params;
       value.current = e.current;
       this.fn(value)
   }
   changes(arr)
   {
    this.order_list = [];
    arr.map(i=>{
        this.order_list.push(this.state.data[i].order_id)  
    })
    this.setState({
        selectedRowKeys:arr
    })
   }
    render(){
        return(
            <div>
                <div style={{margin:'20px 0'}}>
                <Input placeholder='充值用户' style={{width:'200px',margin:'0 0px 0 5px'}} name='user_id' onChange={this.setType1.bind(this)} onPressEnter={this.searchBar.bind(this)}/>
                <Input placeholder='收款代理' style={{width:'200px',margin:'0 0px 0 5px'}} name='agent_id' onChange={this.setType1.bind(this)} onPressEnter={this.searchBar.bind(this)}/>
                <Input placeholder='订单号' style={{width:'200px',margin:'0 5px'}} name='order_id' onChange={this.setType1.bind(this)} onPressEnter={this.searchBar.bind(this)}/>
                <RangePicker format="YYYY-MM-DD  " onChange={this.setType2.bind(this)}  placeholder={['开始时间','结束时间']} name='time'/>
                <span>充值类型:</span>
                <Select defaultValue="" style={{ width: 120 }} onChange={this.setType.bind(this)} name='order_type'>
                <Option value=''>全部</Option>
                <Option value={1}>自助充值</Option>
                <Option value={2}>代理充值</Option>
                <Option value={3} >点卡充值</Option>
                </Select>
                <span>订单状态:</span>
                <Select defaultValue="" style={{ width: 120 }} onChange={this.setType3.bind(this)} name='order_status'>
                <Option value=''>全部</Option>
                <Option value={0}>未支付</Option>
                <Option value={1}>已支付</Option>
                <Option value={2} >已到账</Option>
                </Select>
                <Button onClick={this.searchBar.bind(this)} style={{marginLeft:'5px'}}><Icon type="search"/>搜索</Button>
                
                </div>
                <Alert style={{margin:'20px 0'}} message={`支付金额总计：${this.state.num/100}`} type='success'/>
                <Table scroll={{x:true}} columns={columns} dataSource={this.state.data} bordered loading={this.state.loading} rowSelection={{selectedRowKeys:this.state.selectedRowKeys,onChange:this.changes.bind(this)}} size='small' pagination={this.state.pagination} onChange={this.current.bind(this)}/>
            </div>
        )
    }
}

export default App; 