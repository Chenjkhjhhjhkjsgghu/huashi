import React from 'react';
import { Link } from 'react-router-dom';
import { Input, Select, Button, message, Radio,Tag,Icon} from 'antd';
import crypto from 'crypto'
import axios from 'axios'
import Web from './../../web'

const RadioGroup = Radio.Group;
const Option = Select.Option;
function randomWord(randomFlag, min, max){
    var str = "",
        range = min,
        arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
 
    // 随机产生
    if(randomFlag){
        range = Math.round(Math.random() * (max-min)) + min;
    }
    for(var i=0; i<range; i++){
        var pos = Math.round(Math.random() * (arr.length-1));
        str += arr[pos];
    }
    return str;
}
const options = [
    { 'label': '游客', 'value': 100 }, { 'label': '注册用户', 'value': 200 }, { 'label': 'VIP', 'value': 1300 }, { 'label': '终身VIP', 'value': 1310 }, { 'label': '大亨', 'value': 1320 }, { 'label': '超级大亨', 'value': 1330 }, { 'label': '财主', 'value': 1340 }, { 'label': '超级管理', 'value': 1350 }, { 'label': '紫尊', 'value': 1360 }, { 'label': '金尊', 'value': 1370 }, { 'label': '天尊', 'value': 1380 }, { 'label': '帝尊', 'value': 1390 }, { 'label': '天王', 'value': 1391 }, { 'label': '一星主持', 'value': 1710 }, { 'label': '二星主持', 'value': 1720 }, { 'label': '三星主持', 'value': 1730 }, { 'label': '四星主持', 'value': 1740 }, { 'label': '五星主持', 'value': 1750 }, { 'label': '超级主持', 'value': 1760 }, { 'label': 'MC主持', 'value': 1770 }, { 'label': '代理', 'value': 1780 }, { 'label': '巡管', 'value': 1900 }, { 'label': '客服', 'value': 1910 },
];
var arrs = [];

function hash(obj){
    if(obj===''||typeof obj ==='undefined')
    {
        return ''
    }
    const hash = crypto.createHash('md5');
    hash.update(obj);
   return hash.digest('hex')
}

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

function unique(arr)
{
    var nArr = [];

    for(var i = 0;i<arr.length;i++)
    {
        if (nArr.indexOf(arr[i])===-1)
         {
             nArr.push(arr[i])
         }
    }
    return nArr;
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
var display = false;
class App extends React.Component {
    constructor(...args) {
        super(...args)

        this.arr_id = []
        this.state = {
            agent_div:{display:'none'},
            sites:getUrl().sites,
            register_agent:0,
            agent_pass:'',
            agent_safety_pass:'',
            idList:[],
            type:1,
            password:'',
            level:1300,
            recharge_day:0,
            recharge_money:0,
            belong:'',
            memo:'',
            haoma:'请输入号码,回车提交',
            style:{display:'none'},
            els:[],
            successUser:[]
        }

        this.set_pass = this.set_pass.bind(this)
        this.change_id = this.change_id.bind(this)
    }
    Change_level(e) {
        if(e===1780)
        {
            if(this.state.type===1)
            {
                this.setState({
                    agent_div:{display:'block'},
                    register_agent:1,
                    level: e
                 })
                 return;
            }
        }
        this.setState({
            level: e,
            register_agent:0,
            agent_div:{display:'none'},
        })
    }
    Change_password(e) {
        this.setState({
            password: e.target.value
        })
    }
    set_pass()
    {
       var str = randomWord(true,8,8)
       this.setState({
           password:str
       })
    }
    Change_recharge_day(e) {
        this.setState({
            recharge_day:e
        })
    }
    Change_recharge_money(e) {
        this.setState({
            recharge_money: e.target.value
        })
    }
    Change_belong(e) {
        this.setState({
            belong: e.target.value
        })
    }
    Change_memo(e) {
        this.setState({
            memo: e.target.value
        })
    }
    Submit() {
        if (this.state.password === '')
        {
            message.info('请填入必选项')
            return;
        }
        if (this.state.idList.length ===0) {
            message.info('请填入必选项')
            return;
        }
        if(this.state.level==='')
        {
            message.info('请填入必选项')
            return;
        }

        if(this.state.belong==='')
        {
            message.info('请填入必选项')
            return;
        }
        let value = Object.assign({},this.state);
        value.agent_pass = hash(this.state.agent_pass)
        value.agent_safety_pass=hash(this.state.agent_safety_pass)
        axios.post(Web[getUrl().sites].url+'/create_user',value)
            .then(res => {
                    if(res.data.code===400)
                    {
                        message.error(res.data.msg)
                        return;
                    }
                    message.info('开号成功')
                    arrs=[]
                    this.setState({
                        style:{display:'block'},
                        els:res.data.msg.create_user_err_list,
                        idList:[],
                        successUser:res.data.msg.successUser
                    })
                    arrs=[]
            }).catch(res=>{
              console.log(res)                     
            })
      
    }
    setArr(e)
    {
        let arr = '';
        if (e.target.parentNode.parentNode.getAttribute('data-value') === null)
        {
           arr=  e.target.parentNode.parentNode.parentNode.getAttribute('data-value')
        }
        else{
           arr= e.target.parentNode.parentNode.getAttribute('data-value')
        }
        let nArr = this.state.idList;
        if (nArr.indexOf(arr)>-1)
        {
            nArr.splice(nArr.indexOf(arr),1)
            this.setState({
                idList:nArr
            })
        }

    }
    add_id(e)
    {
        let values = e.target.value;
        if(values==='')
        {
            return;
        }
        if(values.match(/[0-9]/g).length === values.length)
        {
        axios.get(Web[getUrl().sites].url+'/user_verify',{params:{sites:getUrl().sites,id:e.target.value}})
        .then(res=>{
            if(res.data.code===300)
            {
            arrs.push(values)
            arrs = unique(arrs)
            this.setState({
            idList: arrs
             })
            }
            else{
                message.error('用户已存在')
            }
        }).catch(error=>{
            console.log(error)
        })
        }
        else{
            message.error('用户名不能是字母')
        }
        e.target.value = '';
    }
    change_id(e)
    {
        
        if(e.target.name === 'arr1'){
            this.arr_id[0] = e.target.value
        }
        else{
            this.arr_id[1] = e.target.value
        }
    }
    fn(e){
       var values = this.arr_id;
       if(values[0]===''||values[1]==='')
       {
           message.error('账户不能为空')
           return
       }
       if(values[0]===values[1])
       {
           message.error('不要输入相同的数字')
           return;
       }
       values.forEach(i=>{
        if(i.match(/[0-9]/g).constructor!==Array)
       {
           message.error('用户名不能是字母')
           return;
       }
       if(i.match(/[0-9]/g).length !== i.length)
       {
        message.error('用户名不能是字母')
        return;
       }
    })
           if(Array.isArray(values))
           {
               if (values[1]-values[0]>50 )
               {
                   message.error('只能输入两数间距不能大于50的数字')
                   return;
               }
               if(values[0]-values[1]>0)
               {
                message.error('您输入的号码循序有误')
                return;
               }
             
               else{
                  this.setState({
                      idList:values
                  })
               }
           }
   
    }
    onChange(e)
    {
        this.setState({
            type:e.target.value
        });
        if(this.state.type ===2)
        {
            this.setState({
                idList:[]
            })
            if(this.state.level===1780)
            {
                this.setState({
                   agent_div:{display:'block'},
                   register_agent:1
                })
            }
        }
        else {
            this.setState({
                agent_div:{display:'none'},
                register_agent:0,
                idList:[]
            })
            arrs = []
        }
    }
  display()
  {
      display = !display;
      if(display)
      {
          this.setState({
              sites:getUrl().sites,
              idList:[],
              type:1,
              password:'',
              level:100,
              recharge_day:0,
              recharge_money:0,
              belong:'',
              memo:'',
              style:{display:'none'},
              successUser:[],
              els:[],
              agent_safety_pass:'',
              agent_pass:'',
              agent_div:{display:'none'},
          })
      }
     
  }
  Change_agent_pass(e)
  {
      this.setState({
        agent_pass:e.target.value
      })
  }
  Change_agent_safety_pass(e)
  {
    this.setState({
        agent_safety_pass:e.target.value
      })
  }
    render() {
         
        var str = this.state.type ===1?this.state.idList.map(i=>{
            return <Tag key={i} color="blue-inverse" data-value={i} closable onClose={this.setArr.bind(this)}>{i}</Tag>
        }):false
        
        return (
            <div className="create_user">
                <div className="create_div" style={this.state.style}>
                  <div style={{textAlign:'center',fontSize:'30px',color:'green'}}><Icon type="check" />开号成功</div>
                  <h3>账号：<div style={{width:'100%',padding:'0 20px'}}>
                  {this.state.successUser.map(i=>{
                    return <span style={{border:'0',display:'inline-block'}} key={i}><span>{i}</span>,</span>
                  })}</div></h3>
                  <h3>密码：{this.state.password}</h3>
                  <h3>开号等级：{ser_dengji(this.state.level)}</h3>
                  <h3>充卡要求时间：{this.state.recharge_day}</h3>
                  <h3>充卡要求金额：{this.state.recharge_money}</h3>
                  <h3>所属房间：{this.state.belong}</h3>
                  <h3>失败号码：<div style={{width:'100%',padding:'0 20px'}}>{this.state.els.map(i=>{
                    return <span style={{display:'inline-block'}} key={i}>{i}</span>
                  })}</div></h3>
                <Button onClick={this.display.bind(this)}>关闭</Button>
                </div>
                <h3 style={{ textAlign: 'left', fontSize: '18px', lineHeight: '50px' }}><span style={{ color: 'rgb(64, 169, 255)' }}>用户开号</span></h3>
                <RadioGroup onChange={this.onChange.bind(this)} value={this.state.type}>
                    <Radio value={1}>号码不连续</Radio>
                    <Radio value={2}>号码连续</Radio>
                </RadioGroup>
                <br />
                <span><b style={{ color: 'red' }}>*</b>账户：</span>
                {this.state.type===1?<Input placeholder='请输入号码,回车提交'  onPressEnter={ this.add_id.bind(this)}  onBlur={ this.add_id.bind(this)}/>:<b>
                <Input  style={{width:'150px'}} name='arr1' onChange={this.change_id} placeholder='开头'/>
                 <b style={{margin:'0 20px'}}>—</b> 
                <Input  style={{width:'150px'}} name='arr2' onChange={this.change_id} onBlur={ this.fn.bind(this)} placeholder='结尾'/>
                </b>}
                <br />
                {str}
                <div>
                <span><b style={{ color: 'red' }}>*</b>密码：</span>
                <Input placeholder="请输入用户名密码" onChange={this.Change_password.bind(this)} type='text' value={this.state.password} style={{width:'288px'}}/>
                <Button onClick ={this.set_pass} style={{marginLeft:'20px'}}>随机密码</Button>
                </div>
                
                <span><b style={{ color: 'red' }}>*</b>开号等级：</span>
                <Select value={this.state.level} style={{ width: 120 }}  onChange={this.Change_level.bind(this)}>
                    {
                        options.map(i => {
                            return <Option value={i.value} key={i.value}>{i.label}</Option>
                        })
                    }
                </Select>
                <div style={this.state.agent_div}>
                <span><b style={{ color: 'red' }}>*</b>代理密码：</span>
                <Input placeholder="请输入代理密码" onChange={this.Change_agent_pass.bind(this)} type='text' value={this.state.agent_pass} style={{ width: '365px' }}/>
                <br />
                <span><b style={{ color: 'red' }}>*</b>代理安全密码：</span>
                <Input placeholder="请输入代理安全密码" onChange={this.Change_agent_safety_pass.bind(this)} type='text' value={this.state.agent_safety_pass} style={{ width: '345px' }}/>
                <br />
                </div>
                <br />
                 <span>充卡要求：</span>
                <Select value={this.state.recharge_day} style={{ width: 120 }} onChange={this.Change_recharge_day.bind(this)}>
                    <Option value={0}>无要求</Option>
                    <Option value={3}>3天</Option>
                    <Option value={5}>5天</Option>
                    <Option value={7}>7天</Option>
                    <Option value={15}>15天</Option>
                    <Option value={20}>20天</Option>
                    <Option value={30}>1个月</Option>
                    <Option value={60}>2个月</Option>
                    <Option value={90}>3个月</Option>
                    <Option value={183}>半年</Option>
                    <Option value={365}>一年</Option>
                </Select>
                <span style={{ marginLeft: '20px' }}>金额不得少于：</span>
                <Input placeholder='元' onChange={this.Change_recharge_money.bind(this)} style={{width:'130px'}} value={this.state.recharge_money}/>
                <br />
                
                <span> <b style={{color:'red'}}>*</b> 所属房间：</span>
                <Input placeholder='请输入房间号' onChange={this.Change_belong.bind(this)} style={{ width: '370px' }} value={this.state.belong}/>
                <br />
                <div style={{overflow:'hidden'}}>
                    <span style={{ display: "block", float: 'left' }}>备注：</span>
                    <textarea value={this.state.recharge_mome} onChange={this.Change_memo.bind(this)} style={{ float: 'left', width: '400px',height:'120px' }}></textarea>
                </div>
                <br/>
                <Button type="primary" style={{ margin: '0 5px' }} onClick={this.Submit.bind(this)}> 提交</Button>
                <Button><Link to='/fast_find_user'>关闭</Link></Button>
            </div>
        )
    }
}

export default App;