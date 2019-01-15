import React from 'react';

import axios from './../../axios';

import {Button , Input ,message,Switch,Select,Checkbox} from 'antd';

import { Link } from 'react-router-dom';
const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;


function num_str(num){
    var str = ''
    num = num*1
    str = str + num % 2
    while(num != 1){
        num = Math.floor(num / 2)
        str = str + num % 2
    }
    if(str.length<32){
        var i=0
        var stop = 32 - str.length
        while(i != stop){
            str = str + '0' 
            i += 1
        }
    }
    return str
}
function str_num(str){
    var num = 0

    for(let i =0;i<str.length;i++){

        if(str.substring(i,i+1) * 1 == 1){

            num += Math.pow(2,i)
    }

    }
    return num
}
function data_nums(number)
{
    let arr = []
    let str = num_str(number*1).slice(0,8)
    console.log(str)
    for(var i= 0;i<str.length;i++)
    {
        if(str[i]!=0)
        {
            arr.push(i+1)
        }
    }
    return arr;
}
function set_num(number)
{
    let str = [0,0,0];
    
    number.map((i)=>{
     str[i-1]=1;
    })
    str = `${str}`.replace(/,/gi,'')
   return str_num(str);
}

function set_nums(number)
{
    let str = [0,0,0,0,0,0,0,0];
    
    number.map((i)=>{
     str[i-1]=1;
    })
   str = `${str}`.replace(/,/gi,'')
   return str_num(str);
}

function data_num(number)
{
    let arr = []
    let str = num_str(number*1).slice(0,3)
    if(str[0])
    {
        arr.push(1)
    }
    if(str[1])
    {
        arr.push(2)
    }
    if(str[2])
    {
        arr.push(3)
    }
    return arr;
}

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

class App extends React.Component{

    constructor(...args)
    {
        super(...args)
        
        this. state ={
            build:{
                sites:getUrl().sites,    
                id:'',  //字符型，15字节，ID *
                name:'', //房间名 *
                kinds:'0001', //归属房间 *（这个一样可以调用区间的接口去生成下拉）
                owner:'',  //室主
                maxclient:'', //最大人数
                robot_nor:'150', //一般机器人数量
                robot_client:'',    //会员机器人数量
                online_robot:'',  //当前在线机器人
                online_client:'', //当前在线客户 不可修改
                top:0,     //是否置顶 0-999
                redname:0, //是否红名
                recommend:0,//推荐 0-1 
                lock:0, //锁 1关闭 2冻结
                pass:'0',
                roomtype:0, //房间标识 默认0无标识、1生日房、2开业房、3晚会房、4结婚房、5优胜房、6鹊桥房、7人气王、8整蛊王
                welcom:'', // 欢迎信息
                notice1:'',// 公告1 
                notice2:'',// 公告2
                opt_room:[0],// 房间设置 默认全选位域值为7 多选项 1游客与注册用户 2会员与主持 3站务
                opt_chat:[0]// 聊天设置  默认不选位域值为0 多选项 1关闭聊天室 2屏蔽公聊 3屏蔽彩条 4自由排麦 5屏蔽进出信息 6屏蔽私聊 7禁止私麦主持 8禁止个人麦主 持
                },
                arr:[]
        } 
    }
    componentDidMount()
    {
       document.onclick=()=>{
           this.props.push('/get_room_info')
       }
        this.fn(this.state.build)
        this.getArr()
    }
   componentWillUnmount()
   {
       document.onclick = null;
   }
   getArr()
   {
    axios.get('/get_zone_info',{sites:getUrl().sites}).then(res=>{
        let arr = [];
            res.output.record.map((i)=>{
                let json = {};
              json.label = i.name;
              json.value = i.id;
              arr.push(json)
            })       
            this.setState({
                arr:arr
            })
    }).catch(error=>{
        console.log(error)
    })
   }

   componentWillReceiveProps()
   {
       this.fn(this.state.build)
   }


  fn()
  {
      axios.get('/get_room_info',{id:this.props.ids,sites:getUrl().sites}).then(res=>{
           let value = Object.assign(this.state.build,res.output.record[0])
           value.opt_chat = value.opt_chat>0?data_nums(value.opt_chat):[]
           value.opt_room = value.opt_room>0?data_num(value.opt_room):[]
           this.setState({
               build:value
           })
       }).catch(error=>{
           console.log(error)
       })
  }

   onChange(e)
   {
       this.setState({
           show:e
       })
   }
   
   setDate(e)
   {
       let value = this.state.build;
       value[e.target.name] = e.target.value;
      
       this.setState(
           {
               build:value
            }
       )
   }

   onSumit()
   {
       let value = this.state.build;
       value.opt_room = set_num(value.opt_room)
       value.opt_chat = set_nums(value.opt_chat)
       value.maxclient = value.maxclient*1;
       value.top = value.top*1;
       axios.post('/redact_room_info',{sites:getUrl().sites,id:value.id,record:value}).then(res=>{
               message.info('提交成功')
               setTimeout(()=>{
                this.props.onSubmit({sites:getUrl().sites,current:1})
            },400)
       }).catch(error=>{
           console.log(error)
       })
   }
   onCheck(values)
   {
        let value = this.state.build;
        value.kinds = `${values}`;

        this.setState({
            build:value
        })
   }
   onCheck_rom(values)
   {
    let value = this.state.build;
    value.opt_room =values;
    this.setState({
        build:value
    })
   }
   onCheck_chat(values)
   {
    let value = this.state.build;
    value.opt_chat =values;
    this.setState({
        build:value
    })
   }
   onChange_lock(data)
   {
    let value = this.state.build;
    value.lock = data;

    this.setState({
        build:value
    })
   }
   onChange_recom(data)
   {
    let value = this.state.build;
    value.recommend = data?1:0;

    this.setState({
        build:value
    })
   }

   onChange_rname(data)
   {
    let value = this.state.build;
    value.redname = data?1:0;
    this.setState({
        build:value
    })
   }

   onChange_type(data)
   {
    let value = this.state.build;
    value.roomtype = data;
    this.setState({
        build:value
    })
   }
    render()
    {
        const options = [
            {label:'游客与注册用户',value:1},
            {label:'会员与主持',value:2},
            {label:'站务',value:3}
        ]
        const options2 = [
            {label:'关闭聊天室',value:1},
            {label:'屏蔽公聊',value:2},
            {label:'屏蔽彩条',value:3},
            {label:'自由排麦',value:4},
            {label:'屏蔽进出信息',value:5},
            {label:'屏蔽私聊',value:6},
            {label:'禁止私麦主持',value:7},
            {label:'禁止个人麦主持',value:8},
        ]
        return (
         <div  className="Edit_room_parent" onClick={(e)=>e.nativeEvent.stopImmediatePropagation()}>
                <div className="Edit_room_children">
                <h3 style={{textAlign:'center',borderBottom:'1px solid #ccc'}}>{this.state.build.id}的房间信息</h3>
                 <Input addonBefore={<div><span style={{color:'red',lineHeight:'100%'}}>*</span>房间ID:</div>}  name='id' onChange={this.setDate.bind(this)} value={this.state.build.id}/>
                 <Input addonBefore={<div><span style={{color:'red',lineHeight:'100%'}}>*</span>房间名称:</div>} name='name' onChange={this.setDate.bind(this)} value={this.state.build.name}/> 
                 <Input addonBefore={<div><span style={{color:'red',lineHeight:'100%'}}></span>代理ID:</div>}  name='agent' onChange={this.setDate.bind(this)} value={this.state.build.agent}/>   
                 <Input addonBefore="室主ID:" name='owner' onChange={this.setDate.bind(this)} value={this.state.build.owner}/>
                 <Input  addonBefore={<div><span style={{color:'red',lineHeight:'100%'}}>*</span>最大人数:</div>} name='maxclient' onChange={this.setDate.bind(this)} value={this.state.build.maxclient} placeholder='请输入0-9999内的数字范围'/>
                 <Input addonBefore="一般机器人数量:"	name='robot_nor' onChange={this.setDate.bind(this)} placeholder={this.state.build.robot_nor} value={this.state.build.robot_nor}/>
                 <h3 style={{textAlign:'center',borderBottom:'1px solid #ccc'}}>修改房间所在分区</h3>
                 <CheckboxGroup options={this.state.arr} onChange={this.onCheck.bind(this)} value={this.state.build.kinds.split(',')}/>
                 </div>
                 <div className="Edit_room_children" style={{right:'0'}}>
                <h3 style={{textAlign:'center',borderBottom:'1px solid #ccc'}}>编辑详细</h3>
                <Input addonBefore="会员机器人数量"	name='robot_client' onChange={this.setDate.bind(this)} disabled value={this.state.build.robot_client}/>
                <Input addonBefore="当前在线客户"	name='online_client' onChange={this.setDate.bind(this)} disabled value={this.state.build.online_client}/>
                <Input addonBefore="当前在线机器人"	name='online_robot' onChange={this.setDate.bind(this)} disabled value={this.state.build.online_robot}/>
                <Input addonBefore="是否置顶"	name='top' onChange={this.setDate.bind(this)} placeholder="请输入0-999区间的数值" value={this.state.build.top}/>
                <span>是否红名:</span><Switch checked={this.state.build.redname?true:false} onChange={this.onChange_rname.bind(this)} checkedChildren={'是'} unCheckedChildren={'否'} />
                <span>推荐:</span><Switch checked={this.state.build.recommend?true:false} onChange={this.onChange_recom.bind(this)} checkedChildren={'是'} unCheckedChildren={'否'} />
                    <span>房间状态锁:</span>
                    <Select value={this.state.build.lock*1} style={{ width: 120 }} onChange={this.onChange_lock.bind(this)}>
                        <Option value={0}>正常</Option>
                        <Option value={1}>关闭</Option>
                        <Option value={2}>冻结</Option>
                 </Select>
                    <span>房间标识:</span>
                    <Select value={this.state.build.roomtype} style={{ width: 120 }} onChange={this.onChange_type.bind(this)}>
                        <Option value={0}>无标识</Option>
                        <Option value={1}>生日房</Option>
                        <Option value={2}>开业房</Option>
                        <Option value={3}>晚会房</Option>
                        <Option value={4}>结婚房</Option>
                        <Option value={5}>优胜房</Option>
                        <Option value={6}>鹊桥房</Option>
                        <Option value={7}>人气王</Option>
                        <Option value={8}>整蛊王</Option>
                 </Select>
                
                <br/>
                <Input addonBefore="房间密码:" name='pass' onChange={this.setDate.bind(this)} value={this.state.build.pass}/>
                <Input addonBefore="创建时间:" name='pass' onChange={this.setDate.bind(this)} value={getDate(this.state.build.create_time)} disabled/>
                <br/>
                <span>
                房间设置:
                </span>
                <br/>
                <CheckboxGroup options={options} onChange={this.onCheck_rom.bind(this)} value={this.state.build.opt_room.constructor===Array?this.state.build.opt_room:[]}/> 
                <br/>
                <span>
                 聊天设置:
                </span>
                <CheckboxGroup options={options2} onChange={this.onCheck_chat.bind(this)} value={this.state.build.opt_chat.constructor===Array?this.state.build.opt_chat:[]}/>
                <div style={{overflow:'hidden'}}>
                <div className='editRom_text'>
                <span>欢迎信息:</span>
                <br/>
                <textarea name='welcom' onChange={this.setDate.bind(this)} value={this.state.build.welcom}>
              
                </textarea>
                </div>
                <div className='editRom_text'>
                <span>公告1:</span>
                <br/>
                <textarea name='notice1' onChange={this.setDate.bind(this)} value={this.state.build.notice1}>
                </textarea>
                </div>
                <div className='editRom_text'>
                <span>公告2:</span>
                <br/>
                <textarea name='notice2' onChange={this.setDate.bind(this)} value={this.state.build.notice2}>

                </textarea>
                </div>
                </div>
                <div style={{margin:'10px 20px'}}>
                <Button type="primary" onClick={this.onSumit.bind(this)} style={{marginRight:'20px'}}>提交</Button>
                <Button ><Link to='/get_room_info' >关闭</Link></Button>
                </div>
            </div>
         </div>
        )
    }
}


export default App;