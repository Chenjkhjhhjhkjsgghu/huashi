import React from 'react';
import axios from './../../axios';
import { Input,Button,message,Icon ,Radio} from 'antd';

const RadioGroup = Radio.Group;
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
    }
    state ={
    dialog:{
        name:'充值',
        Balance:0,
        display:{display:'none'}
    },
     nickName:'',
     borrow:{
        coin:'',
        sites:getUrl().sites,
        id:'',
        amount:'',
        type:1,
        memo:''
     }
    }
  
    setDate(e)
    {
        let value = this.state.borrow;
        switch(e.target.name)
        {
            case 'amount':
            value.amount = e.target.value;
            this.setState({
             borrow:value
            })
            break;
            case 'id':
            value.id = e.target.value;
            this.setState({
             borrow:value
            })
            break;
            case 'memo':
            value.memo = e.target.value;
            this.setState({
             borrow:value
            })
            break;
        }
    }
    Submit()
    {
        if(this.state.borrow.id==='')
        {
            message.error('您输入ID')
            return;
        }
        if(this.state.borrow.amount==='')
        {
            message.error('请输入金额')
            return;
        }
        let value = this.state.borrow;
        axios.post('/exchange_coin',value).then(res=>{
                let dialog = this.state.dialog;
                dialog.display={display:'block'}
                dialog.Balance = res;
                this.setState({
                    dialog:dialog
                }) 
        }).catch(error=>console.log(error))
    }
    setType(e)
    {
        let json = this.state.dialog
       if(e.target.value===1)
       {
           json.name='充值';
           this.setState({
           dialog:json
           })
       }
       else{
        json.name='扣除';
        this.setState({
        dialog:json
        })
       }
       let value = this.state.borrow;
       value.type = e.target.value;
       this.setState({
           borrow:value
       })
    }
    serachId(e)
    {
        if(e.target.value==='')
        {
            return;
        }
        axios.get('/user_verify',this.state.borrow).then(res=>{
            let json = this.state.borrow;
        if(res.constructor === Array)
        {
            json.coin = res[0]['coin']
            this.setState({
                borrow:json,
                nickName:res[0]['nickname']
            })
        }
        else{
            message.error('查询不到用户的ID信息，请核对后重试')
        }
        }).catch(error=>console.log(error))
    }
    onClose()
    {
        this.setState({
            dialog:{
                name:'充值',
                Balance:0,
                display:{display:'none'}
            },
            nickName:'',
            borrow:{
                coin:'',
                sites:getUrl().sites,
                id:'',
                amount:'',
                type:1,
                memo:''
             }
        })
    }
    render(){
        return (
        <div>
            <h2>会员充扣币</h2>
            <div className="borrow1">
            <div className='dialog' style={this.state.dialog.display}>
            <div>
            <h2><Icon type="check" style={{color:'green'}}/>{this.state.dialog.name}成功</h2>
            <span>操作ID:<b>{this.state.borrow.id}</b></span>
            <span>本次{this.state.dialog.name}会员币:<b style={{color:'red'}}>{this.state.borrow.amount}</b></span>
            <span>操作后会员币为:<b>{this.state.dialog.Balance}</b></span>
            <Icon type="close" onClick={this.onClose.bind(this)}/>
             </div>
            </div>
            <Input addonBefore='充值账号:' value={this.state.borrow.id}  onChange = {this.setDate.bind(this)} name = 'id' onBlur={this.serachId.bind(this)} addonAfter={this.state.nickName}/>
            <Input addonBefore='当前余额:' value={this.state.borrow.coin} readOnly disabled/>
            <Input onChange={this.setDate.bind(this)} name='amount' addonBefore='输入会员币值:'  value={this.state.borrow.amount}/>
            <RadioGroup  value={this.state.borrow.type*1} onChange={this.setType.bind(this)}>
            <Radio value={2}>扣会员币</Radio>
            <Radio value={1}>充会员币</Radio>
            </RadioGroup>
            <Input onChange={this.setDate.bind(this)} name='memo' addonBefore='备注:' />
            <Button type="primary" onClick={this.Submit.bind(this)}>提交</Button>
            </div>
        </div>

        )
    }
}


export default App;