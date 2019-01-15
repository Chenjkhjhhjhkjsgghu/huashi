import React from 'react';

import axios from './../../axios';

import { Button , Input , message,Select } from 'antd';

import {  Link } from 'react-router-dom';



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
class App extends React.Component{
    constructor(...args)
    {
        super(...args)
  
        this.state = {
            display:{display:'block'}
            ,
            data:this.props.date,
            params:{
            sites:getUrl().sites,
            id:'',
            parent:'', // 所属上级 * （用接口1查所有区间，parent为空的就是顶级，如果要创建顶级，就传空值）
            name:'',// 分区名称 *
            url:'',// 网址
            ico:'',// 图标(数字)
            areaadmin:'',// 区长id
            dispgroups:'',// 可见等级（输入框自己填）
            show:1,// 是否可见（下拉选择，1是，0否，默认1）
            redname:0,// 是否红名（下拉选择，1是，0否，默认0）
            sorder:'',// 排序（输入框，数字）
            type:''// 输入框，自己填
            }
        }
    }
setId(e)
{
 let value = this.state.params;
  value.parent = e;
 this.setState({
     params:value
 })
}
setLevel(e)
{
    let value = this.state.params;
    value.dispgroups = e;
    this.setState({
        params:value
    })
}
setRedname(e)
{
    let value = this.state.params;
    value.redname = e;
    this.setState({
        params:value
    })
}
setShow(e)
{
    let value = this.state.params;
    value.show = e;
    this.setState({
        params:value
    })
}
setDate(e)
{
   let value = this.state.params;
   value[e.target.name] = e.target.value;
   this.setState({
       params:value
   })
}

onSumit()
{
    if(this.state.params.id==='')
    {
        message.error('请输入分区ID')
        return;
    }
    if(this.state.params.name==='')
    {
        message.error('请输入分区名称')
        return;
    }
    axios.post('/create_zone',this.state.params).then(res=>{
            message.info('提交成功')
            this.setState({
                params:{}
            })
            setTimeout(()=>{
                this.props.onSubmit()
            },500)
    }).catch(error=>{
        console.log(error)
    })
}
onColoes()
{
    window.history.back()
}
    render(){
        let Options = this.state.data.map((i,index)=>{
            return (
            <Option key={index} value={i.id}>{i.name}</Option>
            )
        }) 
        return(
            <div className='add_rom'>
               <h3 style={{textAlign:'center',lineHeight:'40px',color:'rgb(38, 121, 181)'}}>新增分区</h3>
                <span>所属上级:</span>
                <Select defaultValue={''} style={{ width: 180 }} onChange={this.setId.bind(this)}>
                <Option value=''>顶级</Option>
                 {Options}
                </Select>
                <Input addonBefore="分区id:"	name='id' onChange={this.setDate.bind(this)}/>
                <Input addonBefore="排序"  name='sorder'  onChange={this.setDate.bind(this)} />
                <Input addonBefore="分区名称:" name='name' onChange={this.setDate.bind(this)}/>     
                <div>
                <span className='add_span'>是否可见:</span>
               <Select defaultValue={this.state.params.show} style={{ width: 100 }} onChange={this.setShow.bind(this)}>
                <Option value={0}>否</Option>
                <Option value={1}>是</Option>
                </Select>
                <span>是否红名:</span>
               <Select defaultValue={this.state.params.redname} style={{ width: 100 }} onChange={this.setRedname.bind(this)}>
                <Option value={0}>否</Option>
                <Option value={1}>是</Option>
                </Select>
                </div>
               <Input addonBefore="网址:"	name='url' onChange={this.setDate.bind(this)}/>
               <Input addonBefore="图标:"	name='ico' onChange={this.setDate.bind(this)}/>
               <Input addonBefore="区长"	name='areaadmin' onChange={this.setDate.bind(this)}/>
                          
               <div>
                <span>可见等级:</span>
               <Select defaultValue={'-1'} style={{ width: 140 }} onChange={this.setLevel.bind(this)}>
                <Option value={'-1'}>全部可见</Option>
                <Option value={'199'}>VIP以上可见</Option>
                <Option value={'1999'}>全部不可见</Option>
                </Select>
                </div>
               <div style={{marginTop:'20px'}}>
               <Button type="primary" onClick={this.onSumit.bind(this)} style={{marginRight:'20px'}}>提交</Button>
                <Button onClick={this.onColoes.bind(this)}>关闭</Button>
               </div>
            </div>
        )
    }
}



export default App;