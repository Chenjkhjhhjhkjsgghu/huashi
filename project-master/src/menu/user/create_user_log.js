
import React from 'react';

import axios from './../../axios'
import Buttons from './create_button'

import { Table, message ,Icon,Input,Select,Button, DatePicker} from 'antd';
const Option = Select.Option;
const { RangePicker } = DatePicker;
const options = [
  { 'label': '游客', 'value': 100 }, { 'label': '注册用户', 'value': 200 }, { 'label': 'VIP', 'value': 1300 }, { 'label': '终身VIP', 'value': 1310 }, { 'label': '大亨', 'value': 1320 }, { 'label': '超级大亨', 'value': 1330 }, { 'label': '财主', 'value': 1340 }, { 'label': '超级管理', 'value': 1350 }, { 'label': '紫尊', 'value': 1360 }, { 'label': '金尊', 'value': 1370 }, { 'label': '天尊', 'value': 1380 }, { 'label': '帝尊', 'value': 1390 }, { 'label': '天王', 'value': 1391 }, { 'label': '一星主持', 'value': 1710 }, { 'label': '二星主持', 'value': 1720 }, { 'label': '三星主持', 'value': 1730 }, { 'label': '四星主持', 'value': 1740 }, { 'label': '五星主持', 'value': 1750 }, { 'label': '超级主持', 'value': 1760 }, { 'label': 'MC主持', 'value': 1770 }, { 'label': '代理', 'value': 1780 }, { 'label': '巡管', 'value': 1900 }, { 'label': '客服', 'value': 1910 },
];

function ser_dengji(str)
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

 function getDate(arr)
 {
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
function isOrno(str)
{
   return str?'成功':'失败'
}

const columnss = [{
  title: '用户ID',
  dataIndex: 'adminId',
}, {
  title: '昵称',
  dataIndex: 'userId',
}, {
  title: '等级',
  dataIndex: 'level',
}, {
    title: '所属房间',
    dataIndex: 'belong',
},{
    title: '备注',
    dataIndex: 'memo',
},{
    title: '创建时间',
    dataIndex: 'createTime', 
}
,{
  title: '开号结果',
  dataIndex: 'result', 
}]
const columns = [{
  title: '管理员',
  dataIndex: 'adminId',
}, {
  title: '用户id',
  dataIndex: 'userId',
}, {
  title: '用户级别',
  dataIndex: 'level',
}, {
    title: '所属房间',
    dataIndex: 'belong',
},{
    title: '备注',
    dataIndex: 'memo',
},{
    title: '创建时间',
    dataIndex: 'createTime', 
},{
    title: '开号结果',
    dataIndex: 'result', 
},{
  title: '操作',
  dataIndex: 'todo'
}
];
var datas = [];
var data = [];
var id_users = [];
var _this = null;
class App extends React.Component {
  constructor(...args)
  {
    super(...args)
    this.state={
      params:{
        current:1,
        sites:getUrl().sites
      },
      display:{display:'none'},
      loading:false,
      serch:{}
    }
    _this = this;
    this.urls = {};
    this.search = {
      sites:getUrl().sites,
      id:'',
      result:'',
      start_time:'',
      end_time:'',
      level:'',
      belong:'',
    }
  }
confirm() {
    var values = {
      userIdList:id_users,
      sites:getUrl().sites
    }
    axios.post(`/user_manage_delete`,values).then(res=>{
        message.success('删除成功');
        values.userIdList=[];
        _this.sss({current:1,sites:getUrl().sites})
    }).catch(error=>{
      console.log(error)
    })
  }
  state = {
    data:[],
    pagination: {
      pageSize :20,
      total:1
    },
    selectedRowKeys: [],  // Check here to configure the default column
    loading: true,
  };

  componentWillMount()
  {
    this.sss(this.state.params);
  }
sss(params={}){
//params 获取点击按钮的crunt
data = [];
this.setState({
  loading:true
})
axios.get(`/create_user_log`,params).then((res) =>{
this.datas = res.output;
this.quanxian = res.authority;
for(let i of this.datas)
{
        data.push({
        key:i.id,
        adminId:i.adminId,
        userId:i.userId,
        level:ser_dengji(i.level),
        belong:i.belong,
        memo:i.memo,
        createTime:getDate(i.createTime),
        result:isOrno(i.result),
        todo: <Buttons data={this.quanxian}  id={i} sss={this.sss.bind(this)} idName={i.id} cloes ={this.cloess.bind(this)} serachId={this.serachId.bind(this)} searchCard={this.searChcard.bind(this)}/>
})
}
this.setState({
pagination: {
 pageSize:20,
 page:res.page*1,
 total:res.count*1
},
loading:false,
data:data
})
})
.catch(function (error) {
console.log(error);
});
}
onSubmit(values)
  {
    data = [];
    this.urls = values;
    this.sss()
  }
searChcard
onSelectChange = (selectedRowKeys) => {
id_users=[];

for(let i of selectedRowKeys)
{
   id_users.push(i)
}

this.setState({ selectedRowKeys });
}

searChcard(value)
{
  axios.get(`/view_recharge`,value).then(res=>{
        message.info(`冲卡量为${res}`)
  }).catch(err=>{
    console.log(err)
  })
}

serachId(userId)
{
  this.setState({
    display:{display:'block'}
  })
  datas = [];
  axios.get(`/user_manage`,{id:userId,sites:getUrl().sites}).then(res=>{
    res.output.record.map((i)=>{
      datas.push({

         key:i.id,

        'adminId':i.id,

        'userId':i.nickname,

        'level':ser_dengji(i.level),

        'belong':i.belong,

        'memo':i.memo,

        'result':i.reg_time, 
      })
        this.setState
        ({
        datas:datas
        })
    })
  }).catch(err=>{
    console.log(err)
  })
}

cloess()
{
  this.setState({
    display:{display:'none'}
  })
}

set_Level(e)
{
  this.search.level = e;
}
set_result(e)
{
   this.search.result = e;
}
setDate(e)
{
  this.search[e.target.name]=e.target.value;
}
searchBar()
{
  this.search.current = 1;
  this.sss(this.search)
}
current(e)
{
  let value =Object.assign(this.state.params,this.search);
  if(Object.keys(e).length ===3)
  {
    value.current = e.current;
  }
  else{
    value.current = 1;
  }
  this.sss(value)
}
setType2(e,string)
{
  this.search.start_time = string[0] ===''?'':string[0]+ '00:00:00';
  
  this.search.end_time = string[1] ===''?'':string[1]+ '23:59:59';
}
render() {

    return (
     <div>
         <div className='user_log_search'>
           <Input addonBefore='ID' name='id' onChange={this.setDate.bind(this)} onPressEnter={this.current.bind(this)}/>
           <Input addonBefore='归属房间' style={{margin:'0 10px'}} name='belong' onChange={this.setDate.bind(this)} onPressEnter={this.current.bind(this)}/>
           <span>等级:</span>
           <Select defaultValue={this.search.level} style={{ width: 120,marginRight:'10px' }} onChange={this.set_Level.bind(this)}> 

                             <Option value={''} >全部</Option>

                        {
                            options.map(i => {
                                return <Option value={i.value} key={i.value}>{i.label}</Option>
                            })
                        }
              </Select>
              
              <span>开号结果:</span>
           <Select defaultValue={0} style={{ width: 120,marginRight:'10px'}} onChange={this.set_result.bind(this)}> 
                             <Option value={0} >全部</Option>
                             <Option value='true' >成功</Option>
                             <Option value='false' >失败</Option>
                   
           </Select>
           <RangePicker format="YYYY-MM-DD  " onChange={this.setType2.bind(this)}  placeholder={['开始时间', '结束时间']} name='time'/>
           <Button onClick={this.searchBar.bind(this)} style={{marginLeft:'20px'}}><Icon type="search" />搜索</Button>
         </div>
         <div className='user_box' style={this.state.display}>
         <Icon type="close" style={{position:'absolute',top:'10px',right:'10px',zIndex:9999,cursor:'pointer'}} onClick={this.cloess.bind(this)}/>
         <Table scroll={{x:true}} columns={columnss} dataSource={datas} bordered/>
        </div>
        <Table scroll={{x:true}} columns={columns} dataSource={data} bordered size="middle" onChange={this.current.bind(this)} loading={this.state.loading} pagination={this.state.pagination}/>
     </div>
    );
  }
}
export default App;