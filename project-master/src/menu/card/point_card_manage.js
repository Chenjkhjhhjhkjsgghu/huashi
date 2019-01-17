import React from 'react';
import { Table, Icon ,Button , Input ,message , DatePicker,Alert } from 'antd';
import axios from './../../axios'; 


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
var type = ['','代客直充','第三方充值','后台生成']
const columns = [{
  title: '卡号',
  dataIndex: 'card_number',                              
},{
  title: '卡密',
  dataIndex: 'password',
},{
  title: '代理商',
  dataIndex: 'agent',
},{
  title: '充卡会员',
  dataIndex: 'user_id',
},{
  title: '价值',
  dataIndex: 'amount',
  render:(text)=>{
      return text*1/100
  }
},{
  title: '币',
  dataIndex: 'coin',
  render:(text)=>{
      return text*1/100
  }
},{
  title:'使用状态',
  dataIndex: 'use_status',
  render:(text)=>{
      if(text)
      {
          return '使用'
      }
      else{
          return '未使用'
      }
  }
},{
  title: '创建时间',
  dataIndex: 'create_time',
  render:(text)=>{
     return getDate(text)
  }
},{
    title: '类型',
    dataIndex: 'type',
    render:(text)=>{
        return type[text*1]
    }
  }
,{
  title: '备注',
  dataIndex: 'memo',
}
];

class App extends React.Component{
  
    state ={
      loading:false,
      sum:'',
      pagination: {},
       params:{
        sites:getUrl().sites,
        id:'',
        agent:'',
        start_time:'',
        end_time:'',
        current:1
       },
       data:[],
   }
   confirm()
   {
      let value = {};
      value.sites = getUrl().sites;
      axios.post('/pass_audit_score_exchange',value).then(res=>{
              message.info('操作成功')
              this.searchBar()
      }).catch(error=>{
          console.log(error)
      })
   }
   confirms(e)
   {
    let value = {};
    value.sites = getUrl().sites;
    value.order_list = this.state.order_list;
    axios.post('/cancel_audit_score_exchange',value).then(res=>{
            message.info('取消成功')
            this.searchBar()
    }).catch(error=>{
        console.log(error)
    })
   }
   cancel(e)
   {
       message.error('取消操作')
   }
   setId(e)
   {
    let arr = [];
    arr.push(e.target.name)
    this.setState({
        order_list:arr
    })
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
   fn(params={}){
       this.setState({
           loading:true,
       })
    axios.get('/point_card_manage',params).then(res=>{
        if(res.output.length===0)
        {
            this.setState({
                loading:false,
                data:[]
            })
        }
        res.output.map((i,index)=>{
           i.key = index;
        })
        let pagination ={};
        pagination.total = res.count*1;
        pagination.pageSize = 20;
        pagination.current = res.page*1;
        this.setState({
            loading:false,
            sum:res.sum,
            data:res.output,
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
   changes(e)
   {

   }
    render(){
        return(
            <div>
                <div style={{margin:'20px 0'}}>
                <Input placeholder='会员查询' style={{width:'200px',margin:'0 5px 0 0'}} name='id' onChange={this.setType1.bind(this)} onPressEnter={this.searchBar.bind(this)}/>
                <Input placeholder='代理商查询' style={{width:'200px',margin:'0 5px 0 0'}} name='agent' onChange={this.setType1.bind(this)} onPressEnter={this.searchBar.bind(this)}/>
                <RangePicker format="YYYY-MM-DD  " onChange={this.setType2.bind(this)}  placeholder={['开始时间','结束时间']} name='time'/>
                <Button onClick={this.searchBar.bind(this)} style={{marginLeft:'5px'}}><Icon type="search"/>搜索</Button>
                </div>
                <Alert style={{margin:'20px 0'}} message={`${this.state.params.start_time}至${this.state.params.end_time} 总共销售（代理加大厅）充卡 ${this.state.pagination.total} 张，总金额 ${this.state.sum===null?'0':this.state.sum/100} 元.`} type="info" />
                <Table scroll={{x:true}} pagination={this.state.pagination} columns={columns} loading={this.state.loading} dataSource={this.state.data} bordered rowSelection={{onChange:this.changes.bind(this)}} size='small' onChange={this.current.bind(this)}/>
            </div>
        )
    }
}

export default App; 