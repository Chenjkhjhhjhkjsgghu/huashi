import React from 'react';
import { Link } from 'react-router-dom';
import { Input, Select, Button,message} from 'antd';
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
class App extends React.Component{
    constructor(...args)
    {
        super(...args)
        this.state ={
            accounts: "",
            alipay: "",
            autograph: "",
            bank_addr: "",
            bank_card: "",
            bank_name: "",
            bank_pass: "888888",
            bean: 0,
            bean_bank: 0,
            belong: "13000",
            birthdate: "1970-01-01 08:00:00",
            city: "",
            client_pass: "****",
            coin: 0,
            coin_bank: 0,
            consume_month: 0,
            consume_total: 0,
            country: "",
            email: "",
            face_id: 0,
            fave_rooms: "",
            id: "132",
            idcard: "",
            last_login_ip: "",
            last_login_time: "1970-01-01 08:00:00",
            level: "100",
            memo: "",
            mobile: "",
            name: "",
            near_rooms: "",
            nickname: "132",
            num: 2724,
            phone: "",
            power: 0,
            power_ext: 0,
            province: "",
            qq: "",
            recharge_day: 0,
            recharge_money: 0,
            reg_ip: "",
            reg_time: "2018-11-17 19:42:23",
            safety_pass: "888888",
            score: 0,
            sex: 0,
            status: 0,
            total_minute: 0,
            total_talk: 0,
            type: 118
        }
    }

    componentDidMount(){
        document.onclick=()=>this.props.push('/user_manage')
        this.fn()
    }
    componentWillUnmount()
    {
        document.onclick = null;
    }
   fn()
   {
       axios.get('/user_manage',{id:this.props.id,sites:getUrl().sites}).then(res=>{
          this.setState(res.output.record[0])
       }).catch(error=>{console.log(error)})
   } 
   setDates(e)
   {
       this.setState({
           level:e
       })
   }
   setDate(e)
   {
        var json = {}
       json[e.target.name] = e.target.value;
        this.setState(json)
   }
  Submit()
  {
      let value = this.state;
      value.level = value.level.toString()
      axios.post('/user_manage_redact', {data:value,sites:getUrl().sites} )
      .then(res=>{
             this.props.onSubmit({sites:getUrl().sites,id:this.props.id})
             message.info(res)
             window.history.back()
      }).catch(error=>{console.log(error)})
  }
  Sex(e)
  {
      this.setState({
          sex:e
      })
  }
    render()
    {
        return(
            <div className="user_set_ority" onClick={(e)=>e.nativeEvent.stopImmediatePropagation()}>
                <h2 style={{ textAlign: 'center',fontSize:'18px',lineHeight:'50px' }}>您当前正在编辑ID为<span style={{ color: 'rgb(64, 169, 255)'}}>{this.props.id}</span>的信息</h2>
                <Input addonBefore='所属房间:'  onChange={this.setDate.bind(this)} name='belong'  value={this.state.belong} />
                <Input addonBefore='昵称:' value={this.state.nickname}  onChange={this.setDate.bind(this)} name='nickname' />
                <Input addonBefore='生日:' value={this.state.birthdate} onChange={this.setDate.bind(this)} name='birthdate' />
                <Input addonBefore='姓名:' value={this.state.name} onChange={this.setDate.bind(this)} name='name' />
                <Input addonBefore='国家:' value={this.state.country} onChange={this.setDate.bind(this)} name='country' />
                <Input addonBefore='省份:' value={this.state.province} onChange={this.setDate.bind(this)} name='province' />
                <Input addonBefore='城市:' value={this.state.city} onChange={this.setDate.bind(this)} name='city' />
                <Input addonBefore='手机:' value={this.state.mobile } onChange={this.setDate.bind(this)} name='mobile' />
                <Input addonBefore='电话:' value={this.state.phone} onChange={this.setDate.bind(this)} name='phone' />
                <Input addonBefore='QQ号码:' value={this.state.qq} onChange={this.setDate.bind(this)} name='qq' />
                <Input addonBefore='邮箱:' value={this.state.email}  onChange={this.setDate.bind(this)} name='email' />
                <Input addonBefore='签名:' value={this.state.autograph} onChange={this.setDate.bind(this)} name='autograph' />
                <Input addonBefore='银行密码:' value={this.state.bank_pass} onChange={this.setDate.bind(this)} name='bank_pass' disabled/>
                <Input addonBefore='确认密码:' value={this.state.safety_pass} onChange={this.setDate.bind(this)} name='safety_pass' disabled/>
                <Input addonBefore='银行名:' value={this.state.bank_name} onChange={this.setDate.bind(this)} name='bank_name' />
                <Input addonBefore='银行卡号:' value={this.state.bank_card} onChange={this.setDate.bind(this)} name='bank_card' />
                <Input addonBefore='银行地址:' value={this.state.bank_addr} onChange={this.setDate.bind(this)} name='bank_addr' />
                <Input addonBefore='身份证:' value={this.state.idcard} onChange={this.setDate.bind(this)} name='idcard' />
                <Input addonBefore='支付宝帐户:' value={this.state.alipay} onChange={this.setDate.bind(this)} name='alipay' />
                <Input addonBefore='充卡要求天数:' value={this.state.recharge_day} onChange={this.setDate.bind(this)} name='recharge_day' disabled/>
                <Input addonBefore='充卡要求金额:' value={this.state.recharge_money} onChange={this.setDate.bind(this)} name='recharge_money' disabled/>
                <Input addonBefore='累计消费:' value={this.state.consume_total} onChange={this.setDate.bind(this)} name='consume_total' disabled/>
                <Input addonBefore='本月消费:' value={this.state.consume_month} onChange={this.setDate.bind(this)} name='consume_month' disabled/>
                <span>性别:		
                <Select value={this.state.sex*1} onChange={this.Sex.bind(this)}>
                <Option value={0}>男</Option>
                <Option value={1}>女</Option>
                </Select>
                </span>
                <span>级别:
             <Select value={this.state.level*1} style={{ width: 120 }} onChange={this.setDates.bind(this)}> 
                        {
                            options.map(i => {
                                return <Option value={i.value} key={i.value}>{i.label}</Option>
                            })
                        }
                    </Select>
                </span>
               
                <br />
                <Input addonBefore='备注:' value={this.state.memo} onChange={this.setDate.bind(this)} name='memo' />
                <br />
                <Button type="primary" style={{margin:'20px 5px' }} onClick={this.Submit.bind(this)}>提交</Button>
                <Button><Link to='/user_manage'>关闭</Link></Button>
            </div>
        )
    }
}

export default App;