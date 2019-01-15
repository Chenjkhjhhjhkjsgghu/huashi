import React from 'react';
import { Link } from 'react-router-dom';
import { Input, Button, message} from 'antd';
import axios from './../../axios'

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
class App extends React.Component {
    constructor(...args) {
        super(...args)
        this.json = {
            sites:getUrl().sites,
            id:'',
            client_pass : "",	
            bank_pass : "",	
            safety_pass : "",
        }
        this.state = {
            id:'',
            client_pass : "",	
            bank_pass : "",	
            safety_pass : "",
            sites:getUrl().sites,
            nickname:'',
            belong:'',
        }
    }
    Submit() {
        if(this.state.client_pass==='')
        {
            delete this.state.client_pass
        }
        if(this.state.bank_pass==='')
        {
            delete this.state.bank_pass
        }
        if(this.state.safety_pass==='')
        {
            delete this.state.safety_pass
        }
        axios.post('/update_user_password', {sites:getUrl().sites,id:this.state.id,record:this.state})
            .then(res => {
                    message.info('修改成功')
                    this.setState({
                        id:'',
                        client_pass : "",	
                        bank_pass : "",	
                        safety_pass : "",
                        sites:getUrl().sites,
                        nickname:'',
                        id:'',
                        belong:''
                    })
            }).catch(error=>console.log(error))
      
    }
    set_id(e)
    {
        this.json.id = e.target.value;
        axios.get('/user_manage',{sites:getUrl().sites,id:this.json.id })
        .then(res=>{
                if(res.output.page_record_count>1)
                {
                    message.error('没有该用户信息')
                    return;
                }
                if(res.output.page_record_count===0)
                {
                    message.error('没有该用户信息')
                    return;
                }
               res.output.record.forEach    (i=>{
                this.setState({
                    nickname:i.nickname,
                    belong:i.belong,
                   })
               })
        }).catch(error=>console.log(error))
    }
    set_pass()
    {
       var str = randomWord(true,8,8)
        this.json.client_pass = str;
        this.setState({
            client_pass:str
        })
    }
    Change_user(e)
    {
       let value = this.state;
       value[e.target.name] = e.target.value;
       this.setState(value)
   }
    render() {
        
        return (
            <div className="create_user2">
                <h2 style={{ textAlign: 'left', fontSize: '22px', lineHeight: '50px' }}><span style={{ color: 'rgb(64, 169, 255)' }}>修改用户密码</span></h2>
                <Input addonBefore='用户ID：' name='id' onChange={this.Change_user.bind(this)} onBlur={this.set_id.bind(this)} value={this.state.id} addonAfter={this.state.nickname}/><br/>
                <Input addonBefore='用户密码：' style={{width:'300px'}} name='client_pass' onChange={this.Change_user.bind(this)} value={this.state.client_pass}/>
                <Button onClick ={this.set_pass.bind(this)} style={{margin:'20px 0 0 10px'}}>随机密码</Button> 
                <Input addonBefore='银行密码：' name='bank_pass' onChange={this.Change_user.bind(this)}  />
                <Input addonBefore='确认密码：' name='safety_pass' onChange={this.Change_user.bind(this)}  />
                <Input addonBefore='所属房间：' name='belong' onChange={this.Change_user.bind(this)}  value={this.state.belong} disabled/>
                <div style={{overflow:'hidden'}}>
                    <span style={{ display: "block", float: 'left' }}>修改原因：</span>
                    <textarea  onChange={this.Change_user.bind(this)} name='memo' style={{ float: 'left', width:'330px',height:'120px' }}></textarea>
                </div>
                <br/>
                <Button type="primary" style={{ margin: '0 5px' }} onClick={this.Submit.bind(this)}>提交</Button>
                <Button><Link to='/fast_find_user'>关闭</Link></Button>
            </div>
        )
    }
}

export default App;