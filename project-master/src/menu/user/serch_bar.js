import React from 'react';

import { Input, Select, Button, Icon} from 'antd';

const Option = Select.Option;

const options = [
    { 'label': '游客', 'value': 100 }, { 'label': '注册用户', 'value': 200 }, { 'label': 'VIP', 'value': 1300 }, { 'label': '终身VIP', 'value': 1310 }, { 'label': '大亨', 'value': 1320 }, { 'label': '超级大亨', 'value': 1330 }, { 'label': '财主', 'value': 1340 }, { 'label': '超级管理', 'value': 1350 }, { 'label': '紫尊', 'value': 1360 }, { 'label': '金尊', 'value': 1370 }, { 'label': '天尊', 'value': 1380 }, { 'label': '帝尊', 'value': 1390 }, { 'label': '天王', 'value': 1391 }, { 'label': '一星主持', 'value': 1710 }, { 'label': '二星主持', 'value': 1720 }, { 'label': '三星主持', 'value': 1730 }, { 'label': '四星主持', 'value': 1740 }, { 'label': '五星主持', 'value': 1750 }, { 'label': '超级主持', 'value': 1760 }, { 'label': 'MC主持', 'value': 1770 }, { 'label': '代理', 'value': 1780 }, { 'label': '巡管', 'value': 1900 }, { 'label': '客服', 'value': 1910 }, { 'label': '站长', 'value': 1920 },
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
class Serch_bar extends React.Component{
    constructor(...args)
    {
        super(...args)
        this.search ={
            id:"",
            roomId:"",
            nickName:"",
        }
        this.state = {
            sites:getUrl().sites,
            current:1,
            number:"", 
            interval:"",
            level:''
        }
    }

Change_id(e)
{
  this.search[e.target.name] = e.target.value
}
Change_level(value)
 {
     this.setState({
         level:value
     })   
 }
Change_number(value)
{
    this.setState({
        number: value
    })   
}
Change_interval(value)
{
    this.setState({
        interval: value
    })   
}
Change_form()
{
    this.search.current = 1;
    this.props.onSubmit(Object.assign(this.state,this.search))
}


    render()
    {
        return(
            <div className="example-input" style={{ borderBottom: "1px solid #438eb9" }}>
                <Input placeholder="用户ID" onChange={this.Change_id.bind(this)} style={{width:'150px'}} onPressEnter={this.Change_form.bind(this)} name='id'/>
                <Input placeholder="所属房间" onChange={this.Change_id.bind(this)} onPressEnter={this.Change_form.bind(this)} name='roomId'/>
                <Input placeholder="昵称" onChange={this.Change_id.bind(this)}  onPressEnter={this.Change_form.bind(this)} name='nickName'/>
                 <Input placeholder="币分豆值最低下限" onChange={this.Change_id.bind(this)} onPressEnter={this.Change_form.bind(this)} name='minCSB' style={{width:'140px'}}/>
                <span>级别:
         <Select value={this.state.level} style={{ width: 120 }} onChange={this.Change_level.bind(this)}>
         <Option value='' >全部</Option>
                        {
                            options.map(i => {
                                return <Option value={i.value} key={i.value}>{i.label}</Option>
                            })
                        }
                    </Select>
                </span>

                <span>号段:
          <Select value={this.state.number} style={{ width: 120 }} onChange={this.Change_number.bind(this)} >
                        <Option value="">全部</Option>
                        <Option value="2位号">2位号</Option>
                        <Option value="3位号">3位号</Option>
                        <Option value="4位号">4位号</Option>
                        <Option value="5位号">5位号</Option>
                        <Option value="6位号">6位号</Option>
                        <Option value="7位号">7位号</Option>
                        <Option value="8位号">8位号</Option>
                        <Option value="9位号">11位号</Option>
                    </Select>
                </span>

                <span>登陆情况:
              <Select value={this.state.interval} style={{ width: 120 }} onChange={this.Change_interval.bind(this)}>
                       <Option value="">全部</Option>
                        <Option value="-1">今日登陆</Option>
                        <Option value="7">7天未登陆</Option>
                        <Option value="10">10天未登陆</Option>
                        <Option value="15">15天未登陆</Option>
                        <Option value="30">30天未登陆</Option>
                        <Option value="60">60天未登陆</Option>
                        <Option value="90">90天未登陆</Option>
                        <Option value="180">180天未登陆</Option>
             </Select>
                </span>
                <Button onClick={this.Change_form.bind(this)}><Icon type="search" /> 搜索</Button>
            </div>
        )
    }
}

export default Serch_bar;