import React from 'react';
import { Table, Icon ,Button , Input, DatePicker ,Cascader,message} from 'antd';
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
const columns = [{
  title: '管理员id',
  dataIndex: 'adminId'
},{
  title: '操作对象',
  dataIndex: 'object'
},{
  title: '操作时间',
  dataIndex: 'operationTime',
  render:(text)=>{
      return getDate(text)
  }
},{
    title: '操作名词',
    dataIndex: 'codeName'
},{
    title: '备注',
    dataIndex: 'remark',
    width:'50%'
  }
];
const menu_icon ={
    "system":{name:'系统设置',type:'setting'},
    "zoneRoom":{name:'分区房间管理',type:'home'},
    "agent": {name:'代理商管理',type:'shop'},
    "emcee":{name:'主持人管理',type:'smile'},
    "user":{name:'用户管理',type:'user'},
    "timeCard":{name:'点卡管理',type:'credit-card'},
    "sell":{name:'销售管理',type:'tag-o'},
    "money":{name:'财务管理',type:'pay-circle-o'},
    "admin":{name:'系统管理员',type:'team'},
    "special":{name:'系统日志',type:'special'}
  }
class App extends React.Component{
   constructor(...args){
       super(...args)
       this.Options = []
       this.search = {};
       this.params={
        sites:getUrl().sites,
        object:'',
        parentCode:'',
        adminId:'',
        start_time:'',
        getAuthority:0,
        code:'',
        end_time:'',
        current:1
       }
       this.changess=this.changess.bind(this)
   }
    state ={
      Options:[],
      loading:false,
      dom:[],
      search:{},
      pagination: {},
      data:[]
   }
   current(value)
   {
         this.params.getAuthority = 0;
         this.params.current = value.current
         this.fn(this.params)
   }
   componentDidMount()
   {
      this.params.getAuthority = 1;
      this.fn(this.params)
   }
   fn(params){
       this.setState({
           loading:true,
       })
    axios.get('/get_operation_log',params).then(res=>{
        res.operation_log.map((i,index)=>{
           i.key = index;
           return false;
        })
        let pagination ={};
        pagination.total = res.count*1;
        pagination.current = res.page*1;
        pagination.pageSize = 20;
        this.setState({
            loading:false,
            data:res.operation_log,
            pagination:pagination
        })
        this.search = res.authorityList
        this.setState({
            Options:this.changess(this.search)
        })
    }).catch(error=>console.log(error))

   }
   setType1(e)
   {
       this.params[e.target.name] = e.target.value;
   }
   searchBar()
   {

       this.params.getAuthority = 0
       this.params.current = 1;
       this.fn(this.params)

   }
   setType2(e,string)
   {

    this.parans.end_time = string[1]  ===''?'':string[1]+ '23:59:59';

    this.parans.start_time = string[0]  ===''?'':string[0]+ '00:00:00';

   }
 
   onChanges(e)
   {
       if(e[1] ===e[2])
       {
        this.params.parentCode = e[1] 
        this.params.code='';
        return;
       }
        this.params.parentCode = e[1] 
        this.params.code = e[2] 
   }

   changess(arr)
   {

    this.Options = [];

     Object.keys(arr).map((i)=>{

        this.Options.push({
         
             label:menu_icon[i].name,

             value:i,

             'children':

               Object.keys(arr[i]).map((j)=>{

                arr[i][j].son[j] = {

                    name:'全部'

                }
               return {

                  value:j,

                  label:arr[i][j].name,

                  'children':

                  Object.keys(arr[i][j].son).length>0?Object.keys(arr[i][j].son).map(

                    (k)=>{ 

                        return {value:k,label:arr[i][j].son[k].name}

                     }):false

                }
                
             }) 
            
         })
     })
                return this.Options
  
   }
    render(){
       
        return(
            <div>
                <div style={{margin:'20px 0'}}>
                <Cascader options={this.state.Options.length>0?this.state.Options:[]}  onChange={this.onChanges.bind(this)} placeholder='菜单查询'/>
                <Input placeholder='管理员id' style={{width:'150px',margin:'0 0 0 5px'}} name='adminId' onChange={this.setType1.bind(this)} onPressEnter={this.searchBar.bind(this)}/>
                <Input placeholder='操作对象' style={{width:'150px',margin:'0 5px'}} name='object' onChange={this.setType1.bind(this)}  onPressEnter={this.searchBar.bind(this)}/>
                <RangePicker format="YYYY-MM-DD  " onChange={this.setType2.bind(this)}  placeholder={['开始时间','结束时间']} name='time'/>
                <Button onClick={this.searchBar.bind(this)} style={{marginLeft:'5px'}}><Icon type="search"/>搜索</Button>
                </div>
                <Table scroll={{x:true}} pagination={this.state.pagination} columns={columns}  loading={this.state.loading} dataSource={this.state.data} bordered  size='small' onChange={this.current.bind(this)}/>
            </div>
        )
    }
}

export default App; 