
import React from 'react';

import axios from './../../axios'
import Buttons from './set_button'
import SearchBar from './serch_bar'
import {Route} from 'react-router-dom';
import { Table, Icon, Popconfirm, message, Button} from 'antd';

import Setority from './set_ority';

const options = [
  { 'label': '游客', 'value': 100 }, { 'label': '注册用户', 'value': 200 }, { 'label': 'VIP', 'value': 1300 }, { 'label': '终身VIP', 'value': 1310 }, { 'label': '大亨', 'value': 1320 }, { 'label': '超级大亨', 'value': 1330 }, { 'label': '财主', 'value': 1340 }, { 'label': '超级管理', 'value': 1350 }, { 'label': '紫尊', 'value': 1360 }, { 'label': '金尊', 'value': 1370 }, { 'label': '天尊', 'value': 1380 }, { 'label': '帝尊', 'value': 1390 }, { 'label': '天王', 'value': 1391 }, { 'label': '一星主持', 'value': 1710 }, { 'label': '二星主持', 'value': 1720 }, { 'label': '三星主持', 'value': 1730 }, { 'label': '四星主持', 'value': 1740 }, { 'label': '五星主持', 'value': 1750 }, { 'label': '超级主持', 'value': 1760 }, { 'label': 'MC主持', 'value': 1770 }, { 'label': '代理', 'value': 1780 }, { 'label': '巡管', 'value': 1900 }, { 'label': '客服', 'value': 1910 },
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

function set_dengji(str)
{
  str = parseInt(str)
  return options.map(i=>{
    if(i.value === str)
    {
      return i.label;
    }
  })
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
  title: '用户ID',
  dataIndex: 'id',
}, {
  title: '账号',
  dataIndex: 'accounts',
}, {
  title: '昵称',
  dataIndex: 'nickname',
}, {
    title: '等级',
    dataIndex: 'level',
},{
    title: '注册时间',
    dataIndex: 'reg_time',
    render:(text)=>{
      return getDate(text)
    }
},{
    title: '最后登录ip',
    dataIndex: 'last_login_ip', 
},{
  title: '最后登录时间',
  dataIndex:'last_login_time', 
  render:(text)=>{
    return text===''?'':getDate(text)
  }
},{
    title: '所属房间',
    dataIndex: 'belong', 
},{
    title: '币',
    dataIndex: 'coin',
},{
  title: '积分',
  dataIndex: 'score',
},{
  title: '银行币',
  dataIndex: 'coin_bank',
},{
  title: '欢乐豆',
  dataIndex: 'bean',
},{
  title: '银行欢乐豆',
  dataIndex: 'bean_bank',
},{
  title: '备注',
  dataIndex: 'memo'
},{
  title: '操作',
  dataIndex: 'todo'
}
];
function cancel(e) {
  message.error('取消操作');
}
var data = [];
var userIdList = [];
var quanxian = '';
class App extends React.Component {
  constructor(...args)
  {
    super(...args)
    console.log(this.props)
    this.id = '';
    this.state={
    pagination: {
    pageSize:20,
    total:1
    },
    search:{
    sites:getUrl().sites,
    current:1,
    id:'',
    level:'',
    roomId:'',
    number:'',
    nickName:'',
    interval:'', 
    },
    loading:true,
    }
    this.urls = {};
  }
confirm() {
      var values = {
        userIdList:userIdList,
        sites:getUrl().sites
      }
      axios.post(`/user_manage_delete`,values).then(res=>{
          this.setState({
            selectedRowKeys:[]
          })
          message.success('删除成功');
          setTimeout(()=>{
          this.sss({current:1,sites:getUrl().sites})
          },500)
      }).catch(error=>console.log(error))
      }
      state = {
      data:[],
      pagination: {
        pageSize:20,
        total:1
      },
      selectedRowKeys: [],  // Check here to configure the default column
      loading: true,
      };

  componentDidMount()
  {
    this.sss(this.state.search);
  }
  current(e)
  {
    let value = this.state.search;
    value.current = e.current;
    this.sss(value)
  }
sss(params){
  this.setState({
    loading:true
  })
data = [];
axios.get(`/user_manage`,params).then((res) =>{
  if(res.output.record.length===0)
  {
      this.setState({
          loading:false
      })
      return;
  }
this.datas = res.output.record;
this.quanxian = res.authority;
quanxian = Object.keys(this.quanxian.user_manage_delete);
for(let i of this.datas)
{
        data.push({
        key:i.id,
        id:i.id,
        accounts:i.accounts,
        nickname:i.nickname,
        level: set_dengji(i.level*1),
        reg_time:i.reg_time,
        last_login_ip:i.last_login_ip,
        last_login_time:i.last_login_time,
        belong:i.belong,
        coin:i.coin,
        score:i.score,
        coin_bank:i.coin_bank,
        bean:i.bean,
        bean_bank:i.bean_bank,
        memo:i.memo,
        todo: <Buttons data={this.quanxian} id={i.id} sss={this.search.bind(this)} status={i.status} set_id={this.set_id.bind(this)} />
})
}
       this.setState({
        pagination: {
          pageSize:20,
          current:res.output.page_num*1+1,
          total:res.output.record_count*1
        },
        loading:false,
        data:data
        })
        }).catch(error=>console.log(error))
        }
      onSubmit(values)
      {
          data = [];
          this.setState({
            search:values
          })
          this.sss(values)
       }
       search()
       {
         this.sss(this.state.search)
       }
        onSelectChange = (selectedRowKeys) => {
        userIdList=[];

        for(let i of selectedRowKeys)
        {
          userIdList.push(i)
        }

        this.setState({ selectedRowKeys });
        }
        set_id(id)
        {
          this.id = id;
        }
        Setority = ({history})=>{
          return <Setority id={this.id} onSubmit = {this.sss.bind(this)} {...history}/>
        }
render() {
if(quanxian.length>0)
{
  var aaa = <Popconfirm title='你确定要进行批量删除吗？' onConfirm={this.confirm.bind(this)} onCancel={cancel} okText="是" cancelText="否" >
    <Button style={{ color: '#fff', border: 'none', background: 'red', margin: '20px 0', lineHeight: '30px', width: '120px', fontSize: '13px' }} ><Icon type="delete" />批量删除</Button>
  </Popconfirm>
}
const { selectedRowKeys } = this.state;
const rowSelection = {
selectedRowKeys,
onChange: this.onSelectChange,
}
    return (
     <div>
        <Route path='/user_manage/set_ority/:name' component={this.Setority} />
        <SearchBar onSubmit={this.onSubmit.bind(this)}/>
        {aaa}
        <Table scroll={{x:true}} rowSelection={rowSelection} columns={columns} dataSource={this.state.data} bordered size="small" onChange={this.current.bind(this)} loading={this.state.loading} pagination={this.state.pagination}/>
     </div>
    );
  }
}
export default App;