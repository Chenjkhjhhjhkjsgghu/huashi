import React from 'react';
import axios from './../../axios';

import { Input,Button,message,Switch ,Radio,Icon} from 'antd';
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
        Balance:0,
        add:'',
        display:{display:'none'}
    },
     nickName:'',
     nickName2:'',
     coin:'',
     coin2:'',
     borrow:{
        sites:getUrl().sites,
        id:'',
        transform_user_id:'',
        amount:'',
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
            case 'transform_user_id':
            value.transform_user_id = e.target.value;
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
        axios.post('/user_transform_score',value).then(res=>{
                let dialog = this.state.dialog;
                dialog.display={display:'block'}
                dialog.Balance = res.deduct;
                dialog.add = res.add
                this.setState({
                    dialog:dialog
                }) 
        }).catch(error=>console.log(error))
    }
    onClose()
    {
        this.setState({
            dialog:{
                Balance:0,
                add:0,
                display:{display:'none'}
            },
            nickName:'',
            nickName2:'',
            coin:'',
            coin2:'',
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
    serachId(e)
    {
        let arr = 2;
        if(e.target.value==='')
        {
            return;
        }
        if(e.target.name ==='id')
       {
                arr=1;
       }
        axios.get('/user_verify',{id:e.target.value,sites:getUrl().sites}).then(res=>{
        if(res.constructor === Array)
        {
                if(arr==1)
                {
                    
                    this.setState({
                    coin:res[0]['score'],
                    nickName:res[0]['nickname']
                })
                }
                else{
                    this.setState({
                    coin2: res[0]['score'],
                    nickName2:res[0]['nickname']})
                }
               
        }
        else{
            message.error('查询不到用户的ID信息，请核对后重试')
        }
        }).catch(error=>console.log(error))
    }

  
    render(){
        return (
        <div>
            <h2>会员转积分</h2>
            <div className="borrow1">
            <div className='dialog' style={this.state.dialog.display}>
            <div>
            <h2><Icon type="check" style={{color:'green'}}/>转出积分成功</h2>
            <span>转出ID:<b>{this.state.borrow.id}</b></span>
            <span>本次转出积分:<b style={{color:'red'}}>{this.state.borrow.amount}</b></span>
            <span>操作后积分为:<b>{this.state.dialog.Balance}</b></span>
            <span>转入ID:<b>{this.state.borrow.transform_user_id}</b></span>
            <span>操作后积分为:<b>{this.state.dialog.add}</b></span>
            <Icon type="close" onClick={this.onClose.bind(this)}/>
             </div>
            </div>
            <Input addonBefore='转出用户id:' value={this.state.borrow.id}  onChange = {this.setDate.bind(this)} name = 'id' onBlur={this.serachId.bind(this)} addonAfter={this.state.nickName}/>
            <Input addonBefore='转出用户当前积分:' value={this.state.coin} readOnly disabled/>
            <Input addonBefore='转入用户id:' value={this.state.borrow.transform_user_id}  onChange = {this.setDate.bind(this)} name = 'transform_user_id' onBlur={this.serachId.bind(this)} addonAfter={this.state.nickName2}/>
            <Input addonBefore='转入用户当前积分:' value={this.state.coin2} readOnly disabled/>
            <Input onChange={this.setDate.bind(this)} name='amount' addonBefore='输入会员积分:'  value={this.state.borrow.amount}/>
            <Input onChange={this.setDate.bind(this)} name='memo' addonBefore='备注:' />
            <Button type="primary" onClick={this.Submit.bind(this)}>提交</Button>
            </div>
        </div>

        )
    }
}


export default App;