import React from 'react';
import { Link } from 'react-router-dom';
import { Input, Select, Button, message} from 'antd';
import axios from './../../axios'

const Option = Select.Option;

const options = [
    { 'label': '游客', 'value': 100 }, { 'label': '注册用户', 'value': 200 }, { 'label': 'VIP', 'value': 1300 }, { 'label': '终身VIP', 'value': 1310 }, { 'label': '大亨', 'value': 1320 }, { 'label': '超级大亨', 'value': 1330 }, { 'label': '财主', 'value': 1340 }, { 'label': '超级管理', 'value': 1350 }, { 'label': '紫尊', 'value': 1360 }, { 'label': '金尊', 'value': 1370 }, { 'label': '天尊', 'value': 1380 }, { 'label': '帝尊', 'value': 1390 }, { 'label': '天王', 'value': 1391 }, { 'label': '一星主持', 'value': 1710 }, { 'label': '二星主持', 'value': 1720 }, { 'label': '三星主持', 'value': 1730 }, { 'label': '四星主持', 'value': 1740 }, { 'label': '五星主持', 'value': 1750 }, { 'label': '超级主持', 'value': 1760 }, { 'label': 'MC主持', 'value': 1770 }, { 'label': '代理', 'value': 1780 }, { 'label': '巡管', 'value': 1900 }, { 'label': '客服', 'value': 1910 },
];
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

class App extends React.Component {
    constructor(...args) {
        super(...args)
        this.state = {
            sites:getUrl().sites,
            id:'',
            level:1300,
            recharge_day:'',
            recharge_money:'',
            memo:'',
            nickname:'',
            belong:'',
            disabled:false
        }
    }
    Change_level(e) {
        this.setState({
            level: e
        })
    }
    Change_id(e) {
        this.setState({
            id: e.target.value
        })
    }
    Change_nickname(e)
    {
        this.setState({
            nickname:e.target.value
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
        if(this.state.id==='')
        {
            message.error('id为空')
            return;
        }
        axios.post('/user_demotioneing_run', this.state)
            .then(res => {
                    message.info('修改成功')
                    this.setState({
                        sites:getUrl().sites,
                        id:'',
                        level:1300,
                        recharge_day:'',
                        recharge_money:'',
                        memo:'',
                        nickname:'',
                        belong:'',
                        disabled:false
                    })
            }).catch(error=>{console.log(error)})
      
    }
    set_id(e)
    {
        let values = e.target.value;
        if(values==='')
        {
            message.error('请输入会员ID')
            return;
        }
        axios.get('/user_verify',{sites:getUrl().sites,id:values})
        .then(res=>{
               res.map((i)=>{
             return this.setState({
                    id:i.id,
                    level:parseInt(i.level),
                    recharge_day:i.recharge_day,
                    recharge_money:i.recharge_money,
                    memo:i.memo,
                    nickname:i.nickname,
                    belong:i.belong,
                    disabled:true
                   })
               })
        }).catch(error=>{console.log(error)})
    }
    fn(e){
       var values = e.target.value;
       if(values.match(/-/i)!==null)
       {
           values = values.split('-');
           if(Array.isArray(values))
           {
               if (values[1]-values[0]>50)
               {
                   message.info('只能输入两数间距不能大于50的数字')
                   return;
               }
               else{
                  this.setState({
                      idList:values
                  })
               }
           }
        }
       else{
           message.info('您输入的格式不正确')
           return;
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
                haoma: '请输入号码,回车提交',
                action: this.add_id.bind(this)
            })
        }
        else {
            this.setState({
                haoma: '请输入一组连续，且相距不大于50的号码。例:10-60',
                action:this.fn.bind(this),
                idList:[]
            })
        }
    }

    render() {
        
        return (
            <div className="create_user">
                <h3 style={{ textAlign: 'left', fontSize: '18px', lineHeight: '50px' }}><span style={{ color: 'rgb(64, 169, 255)' }}>会员升降级</span></h3>
                <span><b style={{ color: 'red' }}>*</b>id：</span>
                <Input placeholder='请输入您要修改的会员id'  onChange={this.Change_id.bind(this)} onBlur={this.set_id.bind(this)} disabled={this.state.disabled}/>
                <br />
                <span><b style={{ color: 'red' }}>*</b>昵称：</span>
                <Input placeholder='请输入您要修改的会员昵称'  onChange={this.Change_nickname.bind(this)} value={this.state.nickname}/>
                <br />
                <span><b style={{ color: 'red' }}>*</b>开号等级：</span>
                <Select value={this.state.level} style={{ width: 120 }} onChange={this.Change_level.bind(this)}>
                    {
                        options.map(i => {
                            return i.value==1920?<Option  disabled value={i.value} key={i.value}>{i.label}</Option>:<Option value={i.value} key={i.value}>{i.label}</Option>
                        })
                    }
                </Select>
                <br />
                 <span>充卡要求：</span>
                <Select value={this.state.recharge_day*1} style={{ width: 120 }} onChange={this.Change_recharge_day.bind(this)} >
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
                <Input placeholder='请输入您要修改的房间号' onChange={this.Change_belong.bind(this)} style={{ width: '370px' }} value={this.state.belong}/>
                <br />
                <div style={{overflow:'hidden'}}>
                    <span style={{ display: "block", float: 'left' }}>备注：</span>
                    <textarea value={this.state.memo} onChange={this.Change_memo.bind(this)} style={{ float: 'left', width: '400px',height:'120px' }}></textarea>
                </div>
                <br/>
                <Button type="primary" style={{ margin: '0 5px' }} onClick={this.Submit.bind(this)}>提交</Button>
                <Button><Link to='/fast_find_user'>关闭</Link></Button>
            </div>
        )
    }
}

export default App;