
import React from 'react';
import axios from './../../axios'
import crypto from 'crypto'
import { Icon, Popconfirm, message, Button, Menu, Dropdown, Input} from 'antd';
import Submits from './submit'

var id_users = [];

var _type = null;

var open = true;

var sites = getUrl().sites;


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
class Buttons extends React.Component{

  constructor(...args)
  {
      super(...args)
      this.status = parseInt(this.props.status);
      this.state={
          pass:'',
          user:'',
          display:{display:'none'},
          Doms:{
              name:'密码',
              action:this.revise_pass.bind(this),
              show:false
          },
          userId:'',
          roomId:'',
          getDate:{},
          is_show:{display:'none'}
      }
  }
  set_pass(e)
  {
      
      this.setState({
          pass:e.target.value
      })
  }
 revise_pass()
 {
    const hash = crypto.createHash('md5');
      hash.update(this.state.pass)
      var pass =hash.digest('hex')
      var values = {
        sites,
        password:pass,
        user_id:this.props.id
      }
   axios.post('/amend_pass',values).then(res=>{
           message.info('修改成功')
           this.props.dis()
           this.display({target:{name:6}})
           this.setState({
            pass:''
         })
           this.props.message({current:1,sites:getUrl().sites})
   }).catch(error=>{
       console.log(error)
   })
 } 
 anquan_pass()
 {
    const hash = crypto.createHash('md5');
      hash.update(this.state.pass)
      var pass =hash.digest('hex')
      var values = {
        sites,
        password:pass,
        user_id:this.props.id
      }
   axios.post('/reset_safety_pass',values).then(res=>{
           message.info('修改成功')
           this.display({target:{name:6}})
           this.setState({
            pass:''
        })
           this.props.message({current:1,sites:getUrl().sites})
   }).catch(error=>{
       console.log(error)
   })
 } 
confirm(e) {
    let values = {
        sites,
        id:this.props.id
    }
axios.post(`/delete_agent`, values).then(res => {
            message.success('删除成功');
            this.props.message({current:1,sites:getUrl().sites})
    })
}
confirms(e) {
    let values = {
        sites,
        type:_type*1,
        id:this.props.id
    }
axios.post(`/agent_stop`, values).then(res => {
           if(this.state._type)
           {
            message.success('冻结成功');
            this.props.message({current:1,sites:getUrl().sites})
           }
           else{  
           this.props.message({current:1,sites:getUrl().sites})
            message.success('解冻成功');
           }
    }).catch(error=>console.log(error))
}
setType(e)
{
  _type = e.target.name;
}
setId(e)
{
    id_users=[];
    id_users.push(e.target.name)
}
cancel()
{
    message.error('取消操作');
}
display(e)
{ 
    if(e.target.name==="1")
    {
        this.setState({
            Doms:{
                name:'密码',
                action:this.revise_pass.bind(this)
            }
        })
    }
    if(e.target.name==="2")
    {
        this.setState({
            Doms:{
                name:'安全密码',
                action:this.anquan_pass.bind(this)
            }
        })
    }
    if(e.target.name==="3")
    {
        var str = null;
        this.props.datas.map(i=>{
            if(i.userId ===this.props.id)
            {
                str = i;
            }
        })
        this.setState({
            Doms:{
                name:'信息',
                action:this.anquan_pass.bind(this),
                show:true,
                getDate :str
            }
        })
    }
    open =!open; 
   if(open){
    this.setState({
        display:{display:'none'}
    })
   }
   else{
    this.setState({
        display:{display:'block'}
    })
   }
}
set_edu(e)
{
    this.props.set_edu(this.props.id,e.target.name)
}

upDates(){
    this.display({target:{name:6}})
    this.props.message({sites:getUrl().sites})
}
    render()
    {
        const menu = (
            <Menu>

            <Menu.Item>
            <Popconfirm 
            title={`您确定要删除${this.props.id}吗？
            `} onConfirm={this.confirm.bind(this)} onCancel={this.cancel} okText="是" cancelText="否" >
                <Button style={{ height:'25px',fontSize:'13px',display:'block',margin:'0 auto'}} >删除</Button>
            </Popconfirm>
             </Menu.Item>
             
             <Menu.Item>
                 <Button style={{ height:'25px',fontSize:'13px',display:'block',margin:'0 auto'}}  onClick={this.display.bind(this)} name={3}>编辑</Button>
             </Menu.Item>

             <Menu.Item>
             <Popconfirm 
            title={`冻结或解冻${this.props.id}
            `} onConfirm={this.confirms.bind(this)} onCancel={this.cancel} okText="是" cancelText="否" >
                 {this.props.status===1?<Button style={{ height:'25px',fontSize:'13px',display:'block',margin:'0 auto'}}  name={-1} onClick={this.setType.bind(this)}>冻结</Button>:<Button style={{ height:'25px',fontSize:'13px',display:'block',margin:'0 auto'}}  name={1} onClick={this.setType.bind(this)}>解冻</Button>}
                 </Popconfirm>
             </Menu.Item>

             <Menu.Item>
                 <Button style={{ height:'25px',fontSize:'13px',display:'block',margin:'0 auto'}}  onClick={this.set_edu.bind(this)} name={5}>借还款</Button>
             </Menu.Item>

             <Menu.Item>
                 <Button style={{ height:'25px',fontSize:'13px',display:'block',margin:'0 auto'}}  onClick={this.display.bind(this)} name={1}>修改密码</Button>
             </Menu.Item>

             <Menu.Item>
                 <Button style={{ height:'25px',fontSize:'13px',display:'block',margin:'0 auto'}}  onClick={this.set_edu.bind(this)} name={4}>后台打款</Button>
             </Menu.Item>
            
             <Menu.Item>
                 <Button style={{ height:'25px',fontSize:'13px',display:'block',margin:'0 auto'}}  onClick={this.set_edu.bind(this)} name={7}>后台还款</Button>
             </Menu.Item>

             <Menu.Item>
                 <Button style={{ height:'25px',fontSize:'13px',display:'block',margin:'0 auto'}}  onClick={this.display.bind(this)} name={2}>修改安全密码</Button>
             </Menu.Item>

            </Menu>
        );
        return(
             <div className='aBt1'>
            <div className='resive' style={this.state.display}>
            <h2>您当前正在修改<b>{this.props.id}</b>的{this.state.Doms.name}</h2>
            {this.state.Doms.show?<Submits id={this.props.id} upDate={this.upDates.bind(this)}/>:false}    
            {this.state.Doms.show?false:<Input placeholder={`请输入你要修改的${this.state.Doms.name}`} prefix={<Icon type="user" />} value={this.state.pass} onChange={this.set_pass.bind(this)}/>}
            {this.state.Doms.show?false: <Button onClick={this.state.Doms.action} type="primary">提交</Button>}
            <Icon className='Close' type="close-circle" onClick={this.display.bind(this)}/>
            </div>
              
               <Dropdown overlay={menu} placement="bottomCenter">
               <Button style={{background:'#fff', height:'25px',fontSize:'13px'}}>
                    <span className="ant-dropdown-link" style={{ color:"rgb(64, 169, 255)"}}>
                           操作<Icon type="down" />
                        </span>
               </Button>      
                    </Dropdown>
             
           </div>
        )
    }
}

export default Buttons;