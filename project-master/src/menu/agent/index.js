
import React from 'react';
import axios from './../../axios'
import { Table, Button , Icon,message,Input,Switch,Radio} from 'antd';
import Buttons from './Button'

const RadioGroup = Radio.Group;
const columns = [{
  title: '用户ID',                              
  dataIndex: 'userId',
}, {
  title: '代理ID',
  dataIndex: 'agentId',
}, {
  title: '房间ID',
  dataIndex: 'belong',
},{
  title: '创建时间',
  dataIndex: 'create_time', 
  render:(text)=>{
    return getDate(text)
  }
},{
    title: '真实姓名',
    dataIndex: 'true_name',
},{
    title: '银行卡号',
    dataIndex: 'bank_account',
},{
    title: '开户地址',
    dataIndex: 'bank_address', 
},{
    title: '支付宝',
    dataIndex: 'alipay', 
},{
    title: '电话',
    dataIndex: 'phone', 
},{
    title: '省',
    dataIndex: 'provinces', 
},{
    title: '可用余额',
    dataIndex: 'balance', 
},{
    title: '欠钱',
    dataIndex: 'debt', 
},
{
    title: '操作',
    dataIndex: 'doto'
}
];
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
var data = [];
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
var id_users = '';
class App extends React.Component {
  constructor(...args){
    super(...args)
    this.edu= {
      sites:getUrl().sites,
      amount:'',
      memo:'',
    }
    this.search={
      sites:getUrl().sites,
      id:'',
      roomId:'',
      alipay:'',
      current:1
      }
  }
  state = {
    name:'借还款',
    amount:'',
    edu:{
    id:'',
    massage:'可借额度为',
    true_name:'',
    debt:'',
    borrowing:0,
    },
    display:{
      display:'none'
    },
    houtai:false,
    huankuan:false,
    type:1,
    is_cash:true,
    is_receive:false,
    data:[],
    pagination: 
    {
      pageSize:20,
      total:1
    },
    loading: true,
  };
  componentDidMount()
  {
    this.sss(this.search);
  }
confirm() {
    axios.get(`/delete_admin?`,{id:id_users,sites:getUrl().sites}).then(res=>{
        message.success('删除成功');
        this.sss(this.search)
    }).catch(error=>{
      console.log(error)
    })
  }
  Search()
  {
    this.search.current = 1;
    this.sss(this.search)
  }
  sss(params){
    data = [];
    this.setState({
      loading:true
    })
    axios.get(`/agent_manage`,params).then((res) =>{
      if(res.output.length===0)
      {
          this.setState({
              loading:false
          })
          return;
      }
      res.output.map(i=>{
         data.push({
          key: i.userId,
          userId:i.userId,
          belong:i.belong,
          alipay:i.alipay,
          true_name:i.true_name,
          bank_account:i.bank_account,
          bank_address:i.bank_address,
          phone:i.phone,
          provinces:i.provinces,
          balance:(i.balance)/100,
          debt:i.debt/100,
          create_time:i.create_time,
          doto: <Buttons status={i.status} id={i.userId} message={this.sss.bind(this)} datas={data} set_edu={this.set_edu.bind(this)} dis={this.dis.bind(this)}/>
        })
         })
      this.setState({
        pagination: {
          pageSize:20,
          page:res.page*1,
          total:res.count*1
        },
        loading:false,
        data:data
      })
    }).catch(function (error) {
    console.log(error);
    });
  }
  change_id(e)
  {
    this.search.id = e.target.value
  }
  change_room(e)
  {
    this.search.roomId = e.target.value
  }
  xianjin(e)
  {
      this.setState({
        is_cash:e
      })
  }
  change_edu(e)
  {
     this.edu.amount=e.target.value
  
  }
  change_memo(e)
  {
        this.edu.memo=e.target.value
  }
  set_edu(id,name)
  {
      axios.get('/get_agent_info',{id:id,sites:getUrl().sites}).then(res=>{
        if(res==='')
        {
          message.error('没有此用户的信息')
        }
        this.edu = {
        sites:getUrl().sites,
        type:1,
        is_cash:true,
        is_receive:false,
        amount:'',
        memo:'',
        id:res.userId,
        massage:'当前代理可借金额为',
        true_name:res.true_name,
        balance:res.balance/100,
        debt:res.debt/100,
        borrowing:res.borrowing/100+res.debt/100
      }
        this.setState({
          display:{
            display:'block'
          }
        })
      }).catch(error=>{
        console.log(error)
      })
      if(name*1===7)
      {
        this.setState({
          name:'后台还款',
          huankuan:true
        })
        return;
      }  
    if(name*1===4)
    {
      this.setState({
        name:'后台打款',
        houtai:true
      })
    }
    else{
      this.setState({
        name:'借还款',
        houtai:false,
        huankuan:false
      })
    }

  }
  set_edus(e)
  {
    let name = ''
    this.state.houtai?name=4:name=3
    this.set_edu(e.target.value,name)
  }
  jiehuan(e)
  {
        this.setState({
          type:e.target.value
        })
  }
  dis()
  {
    this.setState({
      display:{
        display:'none'
      }
    })
  }
  Submit()
  {
    if(this.edu.amount==='')
    {
      message.error('金额不能为空')
      return;
    }
    if(this.edu.id==='')
    {
      message.error('ID不能为空')
      return;
    }
    if(this.edu.memo==='')
    {
      message.error('备注不能为空')
      return;
    }
    if(this.state.huankuan){
      this.edu.is_cash = this.state.is_cash;
      this.edu.is_receive = this.state.is_receive;
      this.edu.type = this.state.type;
      axios.post('/agnet_ht_refund',this.edu).then(res=>{
          this.refs['tx1'].value=''
          this.refs['tx2'].value=''
          this.setState({
            display:{
               display:'none'
             },
          })
          this.edu= {
            sites:getUrl().sites,
            amount:'',
            memo:''
          }
          message.info("提交成功")
          this.sss({current:1,sites:getUrl().sites})
      }).catch(error=>{
        console.log(error)
      })
      return;
    }
    if(this.state.houtai)
    {
      this.edu.is_cash = this.state.is_cash;
      this.edu.is_receive = this.state.is_receive;
      this.edu.type = this.state.type;
      axios.post('/add_agent_balance',this.edu).then(res=>{
          this.refs['tx1'].value=''
          this.refs['tx2'].value=''
          this.setState({
            display:{
               display:'none'
             }
          })
          message.info("提交成功")
          this.sss({current:1,sites:getUrl().sites})
      }).catch(error=>{
        console.log(error)
      })
    }
    else{
      this.edu.is_cash = this.state.is_cash;
      this.edu.is_receive = this.state.is_receive;
      this.edu.type = this.state.type;
      axios.post('/manage_debt',this.edu).then(res=>{
        this.refs['tx1'].value=''
        this.refs['tx2'].value=''
        message.info("提交成功")
        this.edu= {
          sites:getUrl().sites,
          amount:'',
          memo:''
        }
        this.setState({
          display:{
             display:'none'
           },
           
        })
        this.sss({current:1,sites:getUrl().sites})
    }).catch(error=>{
      console.log(error)
    })
    }
  }
  daili(e)
  {
     this.setState({
       is_receive:e
     })
  }
  current(e)
  {
   this.search.current = e.current;
    this.sss(this.search)
  }
  render() {
    return (
      <div>
     <div className='is_show' style={this.state.display}>
     <h2 style={{textAlign:'center',color:'rgba(0,160,233,.7)',margin:'20px 0'}}>{this.state.name}</h2>
     <div><span>用户ID:</span><Input defaultValue={this.edu.id}  onBlur={this.set_edus.bind(this)}/></div>
     <div><span>代理商姓名:</span><Input disabled value={this.edu.true_name}/></div>
     <div><span>当前代理帐户余额:</span><Input disabled value={isNaN(this.edu.balance)?0:this.edu.balance}/></div>  
     <div><span>当前代理已欠金额:</span><Input disabled value={isNaN(this.edu.debt)?0:this.edu.debt}/></div>
      {this.state.huankuan?<div><span>当前代理可借金额:</span><Input disabled value={isNaN(this.edu.borrowing)?0:this.edu.borrowing}/></div>:false} 
     <div><span>是否现金进账:</span><Switch checked={this.state.is_cash} onChange={this.xianjin.bind(this)} /></div>
     {this.state.houtai?<div><span>代理打款是否已到账:</span><Switch defaultChecked={this.state.is_receive} onChange={this.daili.bind(this)} /></div>:false}
     {this.state.houtai?false:this.state.huankuan?false:
     <div>
    <RadioGroup value={this.state.type}  onChange={this.jiehuan.bind(this)}>
        <Radio value={0}>借款</Radio>
        <Radio value={1}>还款</Radio>
      </RadioGroup>
     </div>}
     <div><span>金额:</span><input className='ant-input' ref='tx1' onChange={this.change_edu.bind(this)}/></div>
     <div><span>备注:</span><input className='ant-input' ref='tx2' onChange={this.change_memo.bind(this)}/>  </div>
     <Button type="primary" onClick={this.Submit.bind(this)}>提交</Button>
     <Icon className='Close' type="close-circle" onClick={this.dis.bind(this)}/>
     </div>
       <div style={{margin:"10px 0"}}> 
        <Input placeholder="用户ID" style={{width:'200px'}} defaultValue={this.edu.userId} onChange={this.change_id.bind(this)} onPressEnter={this.Search.bind(this)}/>
        <Input placeholder="房间ID" style={{width:'200px',margin:'0 10px'}} defaultValue={this.edu.roomId} onChange={this.change_room.bind(this)} onPressEnter={this.Search.bind(this)}/>
        <Button onClick={this.Search.bind(this)}><Icon type="search" />搜索</Button>
       </div>
        <Table scroll={{x:true}} columns={columns} dataSource={data} bordered  pagination={this.state.pagination} onChange={this.current.bind(this)} loading={this.state.loading}/>
      </div>
    );
  }
}

export default App;