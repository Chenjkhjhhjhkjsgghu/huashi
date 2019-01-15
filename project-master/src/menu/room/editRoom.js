import React from 'react';

import axios from './../../axios';

import {Button , Input ,message,Switch } from 'antd';


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
        this. state ={
            props:{
                display:{display:'block'}
            },
            params:{
             sites:getUrl().sites,
             id:'',
             sorder:'',
             name:'',
             show:false,
             url:'',
             ico:'',
             type:'',
             areaadmin:''
            }
        } 
    }
    componentWillMount()
    {
        this.fn(this.state.params)
    }
  
   
  fn()
  {
        let value = this.state.params;
        value.id = this.props.id.id;
        axios.get('/get_zone_info',value).then(res=>{
        let data =res.output.record[0];
        data.sites = getUrl().sites;
        this.setState(
        {
        params: data
        }
        )
        }).catch(error=>{
        console.log(error)
        })
  }

   onChange(e)
   {
       this.setState({
           show:e
       })
   }

   setType(e)
   {
       let value = this.state.params;
       value[e.target.name] = e.target.value;
       this.setState(
           {
               params:value
            }
       )
   }

   Submit()
   {
       let value = this.state.params;
       value.id = this.props.id.id;
       axios.post('/redact_zone',this.state.params).then(res=>{
               message.info('提交成功')
               setTimeout(()=>{
                this.props.onSubmit()
               },500)
       }).catch(error=>{
           console.log(error)
       })
   }
   coloes()
   {
    window.history.back()
   }
    render()
    {
        return (
         <div  className="Edit_room" style={this.state.props.display}>
            <h3 style={{lineHeight:'40px',textAlign:'center'}}>您当前正在编辑<span style={{color:'#6fb3e0'}}>{this.state.params.name}</span>房间</h3>
            <Input addonBefore="排序"	defaultValue={this.state.params.sorder} name='sorder' onChange={this.setType.bind(this)} onChange={this.setType.bind(this)}/>
            <Input addonBefore="分区名称" defaultValue={this.state.params.name} name='name' onChange={this.setType.bind(this)}/>
             <span>是否显示:</span><Switch defaultChecked={this.state.params.show?true:false} onChange={this.onChange.bind(this)} checkedChildren={'是'} unCheckedChildren={'否'} />,
            <Input addonBefore="url" defaultValue={this.state.params.url} name='url' onChange={this.setType.bind(this)}/>
            <Input addonBefore="图标" defaultValue={this.state.params.ico} name='ico' onChange={this.setType.bind(this)}/>
            <Input addonBefore="区长ID" name='areaadmin' onChange={this.setType.bind(this)}/>
            <Button type="primary" onClick={this.Submit.bind(this)}>提交</Button>
            <Button onClick={this.coloes}>关闭</Button>
         </div>
        )
    }
}


export default App;