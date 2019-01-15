
import React from 'react';
import axios from './../../axios'
import { Button ,message,Input,Switch,Icon} from 'antd';

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
  constructor(...args){
    super(...args)
    this.edu= {
      sites:getUrl().sites,
      type:1,
      is_cash:true,
      amount:'',
      memo:''
    }
  }
  state = {
    edu:{
      sites:getUrl().sites,
      userId:'',
      agentId:'',
      balance:'',
      debt:'',
      true_name:''
    },
    display:{
      display:'none'
    }
  };

  change_id(e)
  {
    this.edu.id = e.target.value
  }
  xianjin(e)
  {
      this.edu.is_cash = e
  }
  change_edu(e)
  {
      this.edu.amount = e.target.value
  }
  change_memo(e)
  {
        this.edu.memo=e.target.value
  }

  Submit()
  {
    if(this.edu.balance==='')
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
    this.edu.is_cash = this.edu.is_cash.toString()
    axios.post('/ht_add_agent_balance',this.edu).then(res=>{
        message.info('打款成功')
        this.edu.balance_before= res.balance_before/100
        this.edu.balance_after= res.balance_after/100
        this.edu.amount = res.amount/100
        let value = Object.assign(this.state.edu,this.edu);
        this.edu.is_cash = JSON.parse(this.edu.is_cash)
        this.setState({
            edu:value,
            display:{display:'block'}
        })
    }).catch(error=>{
      console.log(error)
    })
  }
  set_edus()
  {
      axios.get('/get_agent_info',{id:this.edu.id,sites:getUrl().sites}).then(res=>{
        this.edu.userId=res.userId
        this.edu.agentId=res.agentId
        this.edu.balance=res.balance/100
        this.edu.debt=res.debt/100
        this.edu.borrowing=res.borrowing/100+res.debt/100
        this.edu.true_name = res.true_name;
        this.setState({
            edu:this.edu
        })
       }).catch(error=>{
         console.log(error)
       })
  }
  onClose(){
    this.setState({
        display:{display:'none'},
        edu:{
            sites:getUrl().sites,
            id:'',
            userId:'',
            agentId:'',
            balance:'',
            debt:'',
            true_name:''
          }
    })
  }
  render() {
    return (
     <div className='ht_refund'>
     <h3 style={{ textAlign: 'left', fontSize: '22px', lineHeight: '50px' }}><span style={{ color: 'rgb(64, 169, 255)' }}>后台打款</span></h3>
      <div className='dialog'  style={this.state.display}>
            <div>
            <h2><Icon type="check" style={{color:'green'}}/>打款成功</h2>
            <span>操作id:<b>{this.state.edu.id}</b></span>
            <span>操作金额:<b style={{color:'red'}}>{this.state.edu.amount}</b></span>
            <span>操作前余额:<b>{this.state.edu.balance_before}</b></span>
            <span>操作后余额:<b>{this.state.edu.balance_after}</b></span>
            <Icon type="close" onClick={this.onClose.bind(this)}/>
             </div>
     </div>     
     <h2 style={{textAlign:'center',color:'rgba(0,160,233,.7)',margin:'20px 0'}}>{this.state.name}</h2>
     <div><Input addonBefore='代理ID:' defaultValue={this.state.edu.id} onChange={this.change_id.bind(this)}  onBlur={this.set_edus.bind(this)}/></div>
     <div><Input addonBefore='代理商姓名:' disabled value={this.state.edu.true_name}/></div>
     <div><Input addonBefore='当前代理帐户余额:' disabled value={isNaN(this.state.edu.balance)?0:this.state.edu.balance}/></div>  
     <div><Input addonBefore='当前代理已欠金额:' disabled value={isNaN(this.state.edu.debt)?0:this.state.edu.debt}/></div>
     <div><Input  addonBefore='当前代理可借金额' disabled value={isNaN(this.state.edu.borrowing)?0:this.edu.borrowing}/></div>
     <div><span>是否现金进账:</span><Switch defaultChecked={this.edu.is_cash} onChange={this.xianjin.bind(this)} /></div>
     <div><Input addonBefore='打款金额:' defaultValue={this.state.edu.amount} onChange={this.change_edu.bind(this)}/></div>
     <div><Input addonBefore='备注:' defaultValue={this.state.edu.memo}   onChange={this.change_memo.bind(this)}/>  </div>
     <Button type="primary" onClick={this.Submit.bind(this)}>提交</Button>
      </div>
    );
  }
}

export default App;