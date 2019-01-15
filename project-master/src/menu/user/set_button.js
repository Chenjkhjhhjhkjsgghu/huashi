
import React from 'react';
import axios from './../../axios'
import { Link } from 'react-router-dom';
import { Icon, Popconfirm, message, Button, Menu, Dropdown } from 'antd';


var status = {};
var _this = null;
var id_users = [];
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

setStatu(e) {
        status.sites=getUrl().sites
        status.status = e.target.getAttribute('data-str')
        status.id = e.target.name;
 }
  constructor(...args)
  {
      super(...args)
      _this = this
      this.quanxian = this.props.data;
  }
confirms()
{
    axios.post(`/user_manage_stop`, status).then(res => {
            message.success('操作成功');
            this.props.sss({current:1,sites:getUrl().sites})
    }).catch(error=>{console.log(error)})
}
confirm() {
    var values = {
        userIdList: id_users,
        sites: getUrl().sites
    }
axios.post(`/user_manage_delete`, values).then(res => {
            message.success('删除成功');
            this.props.sss({current:1,sites:getUrl().sites})
    }).catch(error=>{console.log(error)})
}
set_id(e)
{
    this.props.set_id(e.target.name)
}
setId(e)
{
    id_users=[];
    id_users.push(e.target.name)
}
cance()
{
    message.error('取消操作');
}
    render()
    {
        const menu = (
            <Menu className='user_manage_button'>
           {Object.keys(this.quanxian).map((i) => {
              if (this.quanxian[i].id == '19') {
              return <Menu.Item key={this.quanxian[i].id}>
                  <Link style={{ color: '#fff' }} to={`/user_manage/set_ority/${this.props.id}`}>
                     <Button  onClick={this.set_id.bind(this)} name={`${this.props.id}`} style={{ color: '#fff', border: 'none', background: "#40a9ff", height:'25px',fontSize:'13px' }}>
                     <Icon type="edit" />编辑</Button></Link>
                        </Menu.Item>
               }
             if (this.quanxian[i].id == '17')
                    {
                   return <Menu.Item key={this.quanxian[i].id}>
                            <Popconfirm title={`您确定要删除${this.props.id}吗？
                        `} onConfirm={this.confirm.bind(this)} onCancel={this.cancel} okText="是" cancelText="否" >
                <Button style={{ color: '#fff', border: 'none', background: "#40a9ff"}} name={`${this.props.id}`} onClick={this.setId} >
                                <Icon type="delete" />删除</Button>
                            </Popconfirm>
                        </Menu.Item>;
                    }
                    if (this.quanxian[i].id == '18') {
                        return <Menu.Item key={this.quanxian[i].id}>
                            <Popconfirm title={`你确定要冻结${this.props.id}用户吗？`} onConfirm={this.confirms.bind(this)} onCancel={this.cancel} okText="是" cancelText="否" >
                            {this.props.status===1? <Button style={{ color: '#fff', border: 'none', background: "#40a9ff", height:'25px',fontSize:'13px' }} onClick={this.setStatu} name={this.props.id} data-str='0'><Icon type="smile-o" />解冻</Button>:
                            <Button style={{ color: '#fff', border: 'none', background: "#40a9ff", height:'25px',fontSize:'13px' }} onClick={this.setStatu} name={this.props.id} data-str='1'><Icon type="frown-o" />冻结</Button>
                        }
                            </Popconfirm>
                             </Menu.Item>
                    }
               })}
                {this.quanxian.user_manage_stop.id == '18' ? <Menu.Item key={this.quanxian.user_manage_stop.id}>
                    <Popconfirm title={`你确定要封${this.props.id}用户吗？`} onConfirm={this.confirms} onCancel={this.cancel} okText="是" cancelText="否" >
                        {this.props.status===2?<Button style={{ color: '#fff', border: 'none', background: "#40a9ff", height:'25px',fontSize:'13px' }} onClick={this.setStatu} name={this.props.id} data-str='0'><Icon type="smile-o" />解封</Button>:
                        <Button style={{ color: '#fff', border: 'none', background: "#40a9ff", height:'25px',fontSize:'13px' }} onClick={this.setStatu} name={this.props.id} data-str='2'><Icon type="frown-o" />封号</Button>}
                    </Popconfirm>
                </Menu.Item>:false 
                    }
            </Menu>
        );
        return(
                <div>
                <Dropdown overlay={menu} placement="bottomCenter">
                    <Button  style={{ height:'25px',fontSize:'13px'}}>
                    <span className="ant-dropdown-link">
                           操作<Icon type="down" />
                        </span>
                    </Button>
                    </Dropdown>
                </div>
        )
    }
}

export default Buttons;