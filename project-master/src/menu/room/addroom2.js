import React from 'react';

import axios from './../../axios';

import { Button , Input , message,Checkbox} from 'antd';

import {  Link } from 'react-router-dom';





const CheckboxGroup = Checkbox.Group;

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
        this.state = {
            build:{
            sites:getUrl().sites,    
            id:'',  //字符型，15字节，ID *
            name:'', //房间名 *
            kinds:'0001', //归属房间 *（这个一样可以调用区间的接口去生成下拉）
            owner:'',  //室主
            maxclient:'', //最大人数
            robot_nor:'150', //一般机器人数量
            agent:''
            },
            arr:[]
        }
    }

componentDidMount()
{
    this.fn() 

}
fn()
{
    axios.get('/get_zone_info',{sites:getUrl().sites}).then(res=>{
            let arr = [];
            res.output.record.map((i)=>{
                let json = {};
              json.label = i.name;
              json.value = i.id;
              arr.push(json)
            })       
            this.setState({
                arr:arr
            })
    }).catch(error=>{
        console.log(error)
    })
}

onSumit()
{
    if(this.state.build.id==='')
    {
        message.error('请输入分区ID')
        return;
    }
    let value = this.state.build;
    if(value.name==='')
    {
        value.name=value.id;
    }
    value.maxclient = value.maxclient*1;
    value.robot_nor = value.robot_nor*1;
    axios.post('/create_room',{sites:getUrl().sites,record:value}).then(res=>{
            message.info('提交成功')
            setTimeout(()=>{
                this.props.onSubmit({current:1,sites:getUrl().sites})
            },400)
    }).catch(error=>{
        console.log(error)
    })
}

setDate(e)
{
  if(e.target.name==='maxclient')
  {
    e.target.value = e.target.value.replace(/[^\d]/g,'');
  }
  if(e.target.name==='robot_nor')
  {
    e.target.value = e.target.value.replace(/[^\d]/g,'');
  }
  let value = this.state.build;
  value[e.target.name] = e.target.value;

  this.setState({
      build:value
  })
}

onCheck(values)
{
    let value = this.state.build;
    value.kinds = `${values}`;
    this.setState({
        build:value
    })
}
    render(){
   
        return(
            <div className='add_rom'>
                 <Input addonBefore={<div><span style={{color:'red',lineHeight:'100%'}}>*</span>房间ID:</div>}  name='id' onChange={this.setDate.bind(this)} />
                 <Input addonBefore={<div><span style={{color:'red',lineHeight:'100%'}}>*</span>房间名称:</div>} name='name' onChange={this.setDate.bind(this)} placeholder='默认为房间ID'/> 
                 <Input addonBefore={<div>代理id:</div>} name='agent' onChange={this.setDate.bind(this)}/>      
                 <Input addonBefore="室主ID:"	name='owner' onChange={this.setDate.bind(this)}/>
                 <Input value={this.state.build.maxclient} addonBefore={<div><span style={{color:'red',lineHeight:'100%'}}>*</span>最大人数:</div>} name='maxclient' onChange={this.setDate.bind(this)} placeholder='请输入0-9999内的数字范围'/>
                 <Input addonBefore="一般机器人数量:"	name='robot_nor' onChange={this.setDate.bind(this)} placeholder={this.state.build.robot_nor}/>
                 <h3 style={{textAlign:'center',borderBottom:'1px solid #ccc'}}>请勾选房间所在分区</h3>
                 <CheckboxGroup options={this.state.arr} onChange={this.onCheck.bind(this)} defaultValue={new Array(this.state.build.kinds)}/>
               <div style={{marginTop:'20px'}}>
               <Button type="primary" onClick={this.onSumit.bind(this)} style={{marginRight:'20px'}}>提交</Button>
                <Button><Link to='/get_room_info'>关闭</Link></Button>
               </div>
            </div>
        )
    }
}



export default App;