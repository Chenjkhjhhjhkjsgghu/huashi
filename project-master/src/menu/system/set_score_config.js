import React from 'react';
import aixos from './../../axios'
import { Input, Switch, Select,Button,Icon,message,Tooltip} from 'antd';

const Option = Select.Option;

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

  var json = '';

class App extends React.Component{
    constructor(...args)
    {
        super(...args)
        this.state={
        sites:getUrl().sites,
        socre_to_coin:'',
        socre_part:'',
        min_part:'',
        rmb_ratio: {"1780":0,"1710":0,"1720":0,"1730":0,"1740":0,"1750":0,"1760":0,"1770":0},
        max_time:'',
        open_exchange:false,
        status:0 
        }
    }

    componentWillMount()
    {
        this.fn()
    }

fn()
{
    aixos.get('/get_score_config',{sites:getUrl().sites}).then(res=>{
        var json = JSON.parse(res.rmb_ratio);
        this.setState({
            socre_to_coin: res.socre_to_coin,
            socre_part: res.socre_part,
            min_part: res.min_part,
            rmb_ratio:json,
            max_time: res.max_time,
            open_exchange:res.open_exchange,
            status:res.status
        })
    }).catch(error=>console.log(error))
}
inChange(e)
{
   switch (e.target.name*1) {
       case 1:
           this.setState({
               socre_to_coin: e.target.value, 
           })
           break;
       case 2:
           this.setState({
               socre_part: e.target.value,
           })
           break;
       case 3:
           this.setState({
               min_part: e.target.value,
           })
           break;
       case 4:
            json = this.state.rmb_ratio;
           json['1780']=e.target.value;
           this.setState({
               rmb_ratio: json,
           })

           break;
       case 5:
            json = this.state.rmb_ratio;
           json['1710'] = e.target.value;
           this.setState({
               rmb_ratio: json,
           })
           break;
       case 6:
            json = this.state.rmb_ratio;
           json['1720'] = e.target.value;
           this.setState({
               rmb_ratio: json,
           })
           break;
       case 7:
            json = this.state.rmb_ratio;
           json['1730'] = e.target.value;
           this.setState({
               rmb_ratio: json,
           })
           break;
       case 8:
            json = this.state.rmb_ratio;
           json['1740'] = e.target.value;
           this.setState({
               rmb_ratio: json,
           })
           break;
       case 9:
            json = this.state.rmb_ratio;
           json['1750'] = e.target.value;
           this.setState({
               rmb_ratio: json,
           })
           break;
       case 10:
            json = this.state.rmb_ratio;
           json['1760'] = e.target.value;
           this.setState({
               rmb_ratio: json,
           })
           break;
       case 11:
            json = this.state.rmb_ratio;
           json['1770'] = e.target.value;
           this.setState({
               rmb_ratio: json,
           })
           break;
       case 12:
           this.setState({
               max_time: e.target.value,
           })
           break;
       
           default:
           return json;
           
   }
}    

onChange(e)
{
  this.setState({
      open_exchange:e
  })
}
handleChange(e)
{  
    this.setState({
        status: e
    })
}
sumit()
{
    aixos.post('/set_score_config',this.state).then(res=>{
           message.info('设置成功')
           setTimeout(()=>{
            this.fn()
           },500)
    }).catch(error=>console.log(error))
}
    render(){
        return(
            <div className='set_score_config'>
                <div className="set_divs"><span>积分兑换比例:<Tooltip title="例如5,等于500%"><Icon type="question-circle" style={{fontSize:'16px',color:'#65bcda'}}/></Tooltip></span><Input onChange={this.inChange.bind(this)} name={1} value={this.state.socre_to_coin} /></div>
                <div className="set_divs"><span>积分兑换每份积分:</span><Input onChange={this.inChange.bind(this)} name={2} value={this.state.socre_part} /></div>
                <div className="set_divs"><span>积分兑换起兑份数:<Tooltip title="如：每份积分200w，起兑分数为2份，则起兑积分为400w"><Icon type="question-circle" style={{fontSize:'16px',color:'#65bcda'}}/></Tooltip></span> <Input onChange={this.inChange.bind(this)} name={3} value={this.state.min_part}/></div >
                <div className="set_divs"><span>每份兑换RMB金额（元）:</span></div >
                <ul>
                    <li> <span>代理:</span><Input name={4} onChange={this.inChange.bind(this)} value={this.state.rmb_ratio['1780']}/></li>
                    <li> <span>一星主持:</span><Input name={5} onChange={this.inChange.bind(this)} value={this.state.rmb_ratio['1710']}/></li>
                    <li> <span>二星主持:</span><Input name={6} onChange={this.inChange.bind(this)} value={this.state.rmb_ratio['1720']}/></li>
                    <li> <span>三星主持:</span><Input name={7} onChange={this.inChange.bind(this)} value={this.state.rmb_ratio['1730']}/></li>
                    <li> <span>四星主持:</span><Input name={8} onChange={this.inChange.bind(this)} value={this.state.rmb_ratio['1740']}/></li>
                    <li> <span>五星主持:</span><Input name={9} onChange={this.inChange.bind(this)} value={this.state.rmb_ratio['1750']}/></li>
                    <li> <span>超级主持:</span><Input name={10} onChange={this.inChange.bind(this)} value={this.state.rmb_ratio['1760']}/></li>
                    <li> <span>MC主持:</span><Input name={11} onChange={this.inChange.bind(this)} value={this.state.rmb_ratio['1770']}/></li>
                </ul>
                <div className="set_divs" style={{margin:'20px 0'}}><span style={{lineHeight:'30px'}}>普通每天最大兑换次数:<Tooltip title="兑换次数限制只对普通兑换有效，积分换卡无限制"><Icon type="question-circle" style={{fontSize:'16px',color:'#65bcda'}}/></Tooltip></span> <Input onChange={this.inChange.bind(this)} name={12} value={this.state.max_time}/></div >
                
                <div className="set_divs"><span>是否开启积分换卡:<Tooltip title="不开启时主持只能选择普通兑换"><Icon type="question-circle" style={{fontSize:'16px',color:'#65bcda'}}/></Tooltip> <Switch checked={this.state.open_exchange} onChange={this.onChange.bind(this)} /></span></div >
               
                <div><span>积分换卡审核设置:</span> 
                <Select value={this.state.status} style={{ width: 180,marginLeft:'1px' }} onChange={this.handleChange.bind(this)}>
                <Option value={0}>无需审核直接兑换</Option>
                <Option value={1}>需后台确认支付</Option>
                <Option value={2}>后台二次审核确认支付</Option>
                </Select>
                </div>
                <Button style={{margin:'20px 0'}} onClick={this.sumit.bind(this)} type="primary"><Icon type="check" />保存</Button>
            </div>
        )
    }
}

export default App;