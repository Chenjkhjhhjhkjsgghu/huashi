import React from 'react';
import { Table, Icon ,Button , Input ,DatePicker } from 'antd';
import axios from './../../axios'; 
import { Link } from 'react-router-dom';
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
var types = ['普通兑换','积分兑换']
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
  title: '房间号',
  dataIndex: 'belong',                              
},{
  title: '兑换总金额',
  dataIndex: 'sum',
  render:(text)=>{
    return text/100
}
},{
  title: '兑换总次数',
  dataIndex: 'count',
},{
  title: '操作',
  dataIndex: 'todo',
}];

class App extends React.Component{
   constructor(...args){
       super(...args)
   }
    state ={
     order_list:[],
      loading:false,
      pagination: {},
       params:{
        sites:getUrl().sites,
        belong:'',
        start_time:'',
        end_time:'',
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
   fn(params={}){
       this.setState({
           loading:true,
       })
    axios.get('/get_score_exchange_by_belong',params).then(res=>{
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
           i.exchange_type =types[i.exchange_type]
           i.create_time = getDate(i.create_time)
           i.todo = (
               <div>
                   <Link to={`is_pay_score_exchange/${i.belong}`}><Button type="primary" style={{marginLeft:'5px', height:'25px',fontSize:'13px'}} >查看明细</Button></Link>
               </div>
           )
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
                <Input placeholder='房间号' style={{width:'200px',margin:'0 5px 0 0'}} name='belong' onChange={this.setType1.bind(this)} onPressEnter={this.searchBar.bind(this)} />
                <RangePicker format="YYYY-MM-DD  " onChange={this.setType2.bind(this)}  placeholder={['开始时间','结束时间']} name='time'/>
                <Button onClick={this.searchBar.bind(this)} style={{marginLeft:'5px'}}><Icon type="search"/>搜索</Button>
                </div>
                <Table scroll={{x:true}} pagination={this.state.pagination} columns={columns} loading={this.state.loading} dataSource={this.state.data} bordered rowSelection={{onChange:this.changes.bind(this)}} size='small' onChange={this.current.bind(this)}/>
            </div>
        )
    }
}

export default App; 