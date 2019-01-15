import React from 'react';
import { Progress, Button ,Input,message,Tooltip,Icon,Select} from 'antd';
import axios from './../../axios'

const Option = Select.Option;
const ButtonGroup = Button.Group;
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
  state = {
    percent:0,
    percents:0,
  }

  componentDidMount()
  {
    this.fn()
  }


  fn()
  {
    axios.get('/agent_config_getDate',{sites:getUrl().sites}).then(res=>{
      this.setState({
        percent:res.debt_ratio,
        percents:res.reward_ratio
      })
    }).catch(error=>console.log(error))
  }
 Submit()
 {
   var values = {
    sites:getUrl().sites,
    debt_ratio:JSON.parse(this.state.percent),
    reward_ratio:JSON.parse(this.state.percents),
    qq_bind:0,
    qq_verify:0,
    move_give:'是'
   }
   axios.post('/agent_config_post',values).then(res=>{
       message.info('设置成功')
       this.fn()
   }).catch(error=>console.log(error))
 }
  increase = () => {
    let percent = this.state.percent + 1;
    if (percent > 30) {
      percent = 30;
    }
    this.setState({ percent });
  }
  decline = () => {
    let percent = this.state.percent - 1;
    if (percent < 0) {
      percent = 0;
    }
    this.setState({ percent });
  }
  setPercent(e){
    var value =e.target.value;

    if(value>30)
    {
      value =30
    }
    if(value<0)
    {
      value=0;
    }
    if(Number(value))
    {
      this.setState({
        percent:value
       })
    }
    else{
      message.info('请输入合法的数字')
    }
  }
  increases = () => {
    let percents = this.state.percents + 1;
    if (percents > 30) {
      percents = 30;
    }
    this.setState({ percents });
  }
  declines = () => {
    let percents = this.state.percents - 1;
    if (percents < 0) {
      percents = 0;
    }
    this.setState({ percents });
  }
  setArrs(e){
    var value =e.target.value;

    if(value>30)
    {
      value =30
    }
    if(value<0)
    {
      value=0;
    }
    if(Number(value))
    {
      this.setState({
        percents:value
       })
    }
    else{
      message.info('请输入合法的数字')
    }
  }
  render() {
    return (
      <div style={{padding:'40px'}}>
        <span>代理后台自助借款占当月销售的最大比例(百分比):<Tooltip title="代理后台自助借款占当月销售的比例"><Icon type="question-circle" style={{color:'#65bcda'}}/></Tooltip></span>
        <br/>
        <Progress type="circle" percent={this.state.percent*1} width={50} style={{margin:'10px'}}/>
        <ButtonGroup>
          <Button onClick={this.decline} icon="minus" />
           <Input  style={{width:'50px'}} value={this.state.percent*1} onChange={this.setPercent.bind(this)} />
          <Button onClick={this.increase} icon="plus" />
        </ButtonGroup>
        <br/>
        <span>代理提成(百分比):</span>
        <Progress type="circle" percent={this.state.percents*1} width={50} style={{margin:'10px'}}/>
        <ButtonGroup>
          <Button onClick={this.declines} icon="minus"  />
           <Input  style={{width:'50px'}} value={this.state.percents*1} onChange={this.setArrs.bind(this)} />
          <Button onClick={this.increases} icon="plus" />
        </ButtonGroup>
        <br/>
        <span style={{display:"block",margin:'20px 0'}}>代理后台QQ绑定设置:
        <Select defaultValue={0} style={{ width: 120,margin:'0 10px' }} >
        <Option value={0}>不提示绑定</Option>
        <Option value={1}>强制绑定</Option>
        <Option value={3}>登陆提示</Option>
        </Select>
        </span>
        <span  style={{display:"block",margin:'20px 0'}}>代理后台QQ验证设置:</span>
        <Button type="primary" onClick={this.Submit.bind(this)}>提交</Button>
      </div>
    );
  }
}

export default App;