import React from 'react';
import { Table, Icon ,Button , Input ,Popconfirm , message , DatePicker ,Select,Alert} from 'antd';
import axios from './../../axios'; 


const Option = Select.Option;

const { MonthPicker, RangePicker } = DatePicker;
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
var types = ['','普通兑换','积分兑换']
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
},{
    title: '兑换代理',
    dataIndex: 'exchange_agent',
},{
    title: '备注',
    dataIndex: 'memo',
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
       this.order_list = [];
   }
   state ={
    loading:false,
    selectedRowKeys:[],
    pagination:{
    },
    num:'0',
    order_list:[],
       params:{
        sites:getUrl().sites,
        id:'',
        type:'',
        belong:'',
        start_time:'',
        end_time:'',
        current:1
       },
       data:[],
   }
   confirm(e)
   {
      let value = {};
      value.sites = getUrl().sites;
      value.order_list = this.order_list;
      axios.post('/pass_to_pay_score_exchange',value).then(res=>{
              message.info('操作成功')
              this.searchBar()
              this.setState({
                selectedRowKeys:[]
              })
      }).catch(error=>console.log(error))
   }
   cancel(e)
   {
       message.error('取消操作')
   }
   componentDidMount()
   {
       this.fn(this.state.params)
   }
   setId(e)
   {
    this.order_list = [];
    this.order_list.push(e.target.name)
    
   }
   fn(params={}){
       this.setState({
           loading:true
       })
    axios.get('/get_to_pay_score_exchange',params).then(res=>{
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
           i.exchange_type =types[i.exchange_type]
           i.create_time = getDate(i.create_time)
           i.todo = (
               <div>
                  <Popconfirm title={`确定让ID${i.user_id}通过审核吗?`} onConfirm={this.confirm.bind(this)} onCancel={this.cancel.bind(this)} okText="Yes" cancelText="No">
                   <Button style={{marginLeft:'5px'}} onClick={this.setId.bind(this)} name={i.order_id}>通过</Button>
                   </Popconfirm>
               </div>
           )
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
       let value = this.state.params;
       value.current = 1;
       this.fn(value)
   }
   setType(e)
   {
     let date =this.state.params;
     date.type = e;
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
                <Select defaultValue={this.state.params.type} style={{ width: 120 }} onChange={this.setType.bind(this)} name='type'>
                <Option value="1">普通兑换</Option>
                <Option value="2">积分换卡</Option>
                <Option value="" >全部</Option>
                </Select>
                <Input placeholder='房间号' style={{width:'200px',margin:'0 0px 0 5px'}} name='belong' onChange={this.setType1.bind(this)} onPressEnter={this.searchBar.bind(this)}/>
                <Input placeholder='主持ID' style={{width:'200px',margin:'0 5px'}} name='id' onChange={this.setType1.bind(this)} onPressEnter={this.searchBar.bind(this)}/>
                <RangePicker format="YYYY-MM-DD  " onChange={this.setType2.bind(this)}  placeholder={['开始时间','结束时间']} name='time'/>
                <Button onClick={this.searchBar.bind(this)} style={{marginLeft:'5px'}}><Icon type="search"/>搜索</Button>
                </div>
                <div style={{margin:'20px 0'}}>
                <Popconfirm title='确定要批量审核通过吗？' onConfirm={this.confirm.bind(this)} onCancel={this.cancel.bind(this)} okText="是" cancelText="否">
                <Button style={{background:'#108ee9',color:'#fff'}}><Icon type="check" />批量通过</Button>
                </Popconfirm>
                </div>
                <Alert style={{margin:'20px 0'}} message={`总计待支付主持兑点清单金额 :${this.state.num/100}`} type='success'/>
                <Table scroll={{x:true}} columns={columns} dataSource={this.state.data} bordered rowSelection={{selectedRowKeys:this.state.selectedRowKeys,onChange:this.changes.bind(this)}}  loading={this.state.loading} size='small' pagination={this.state.pagination} onChange={this.current.bind(this)}/>
            </div>
        )
    }
}

export default App; 