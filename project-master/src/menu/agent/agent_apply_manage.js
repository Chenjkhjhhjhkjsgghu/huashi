import React from 'react';
import { Table, Button, Popconfirm, message, Input, Icon} from 'antd';
import { Link ,Route } from 'react-router-dom';
import axios from './../../axios';
import Submit from './apply_submit';


function getDate(arr)
{
    if(arr===''||arr===null)
    {
        return '';
    }
  var time = new Date(arr)
 var s = '';
 s += time.getFullYear() + '-';          // 获取年份。
 if (time.getMonth() < 9) {
     s += '0' + (time.getMonth() + 1) + "-";         // 获取月份。
 } else {
     s += (time.getMonth() + 1) + "-";         // 获取月份。
 }
 if (time.getDate() < 10) {
     s += '0' + time.getDate()+' ';                 // 获取日。
 } else {
     s += time.getDate() +' ';                 // 获取日。
 }
 if (time.getHours() < 10) {
     s += '0' + time.getHours()+ ":";                 // 获取小时。
 } else {
     s += time.getHours()+ ":";                 // 获取小时。
 }
 if (time.getMinutes() < 10) {
     s += '0' + time.getMinutes()+ ":";                 // 获取分钟。
 } else {
     s += time.getMinutes()+ ":";                 // 获取分钟。
 }
 if (time.getSeconds() < 10) {
     s += '0' + time.getSeconds();                 // 获取秒。
 } else {
     s += time.getSeconds();                 // 获取秒。
 }
 return (s);                          // 返回时间。
}
const columns = [{
        title: '用户id',
        dataIndex: 'user_id',
},{
        title: '真实姓名',
        dataIndex: 'true_name',
},{
        title: '身份证',
        dataIndex: 'id_card',
}, {
        title: '银行卡号',
        dataIndex: 'bank_account',
}, {
        title: '开户地址',
        dataIndex: 'bank_address',
}
    , {
        title: '电话',
        dataIndex: 'phone',
}, {
        title: 'qq',
        dataIndex: 'qq',
}, {
        title: '省',
        dataIndex: 'provinces',
}, {
        title: '支付宝',
        dataIndex: 'alipay',
}, {
        title: '申请时间',
        dataIndex: 'create_time',
},{
    title: '操作',
    dataIndex: 'todo',
}
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

var order_id = '';
class App extends React.Component {

    constructor(...args) {
        super(...args)
        this.state = {
            sites:getUrl().sites,
            data:[],
            id: '',
            roomId:'',
            loading: false,
            pagination:{}
        }
    }


    componentWillMount() {
        this.fn({ current: 1,sites:getUrl().sites})
    }

    cancel(e) {
       message.error('取消操作')
    }
    setUser(e) {
        order_id = e.target.name;
    }
    confirm()
    {
        axios.post('/agree_agent_apply',{ id:order_id,sites:getUrl().sites}).then(res=>{
                message.info('审核通过')
                this.fn({ current: 1,sites:getUrl().sites})
        }).catch(error=>{
            console.log(error)
        })
    }
    confirmss()
    {
        axios.post('/delete_agent_apply',{id:order_id,sites:getUrl().sites}).then(res=>{
                message.info('删除成功')
                this.fn({current:1,sites:getUrl().sites})
        }).catch(error=>{
            console.log(error)
        })
    }
    fn(params = {}) {
        params.sites = getUrl().sites;
        var datas = [];
        this.setState({
            loading: true
        })
        axios.get('/agent_apply_manage',params).then(res =>{
                if(res.output.length===0)
                {
                    this.setState({
                        loading:false
                    })
                    return;
                }
                res.output.forEach((i, index) => {
                    datas.push({
                        key: index,
                        user_id:i.userId,
                        true_name: i.true_name,
                        id_card:i.id_card,
                        bank_account:i.bank_account,
                        bank_address:i.bank_address,
                        phone:i.phone,
                        qq:i.qq,
                        provinces: i.provinces,
                        alipay: i.alipay,
                        create_time:getDate(i.create_time),
                        todo:
                           <div>
                                <Popconfirm title={`是否通过审核?id为${i.userId}`} onConfirm={this.confirm.bind(this)} onCancel={this.cancel} okText="是" cancelText="否">
                                    <Button name={i.userId} onClick={this.setUser.bind(this)}>
                                        通过审核
                                </Button>
                                </Popconfirm>
                                        <Link to={`/agent_apply_manage/${i.userId}`}><Button name={i.userId} onClick={this.setUser.bind(this)}><Icon type="edit" />编辑</Button></Link>
                                <Popconfirm title={`是否删除id为${i.userId}的代理审核`} onConfirm={this.confirmss.bind(this)} onCancel={this.cancel} okText="是" cancelText="否">
                                    <Button name={i.userId} onClick={this.setUser.bind(this)}>
                                    <Icon type="delete" />删除
                                </Button>
                                </Popconfirm>
                           </div>
                    })
                })

                let pagination = {}
                pagination.total = res.count*1
                pagination.current = res.page*1;
                this.setState({
                    loading: false,
                    data: datas,
                    pagination: pagination
                })
        }).catch(error=>{
            console.log(error)
        })
    }

    setId(e) {
        this.setState({
            id: e.target.value
        })
    }
    Submit() {
        var value = {
            sites: getUrl().sites,
            id:this.state.id,
            current:1
        }
        this.fn(value)
    }
    agent_manage = ()=>{return <Submit id={order_id} upDate={this.fn.bind(this)}/>}
    render() {
        return (
            <div className='get_add_log'>
                <Route path='/agent_apply_manage/:name' component={this.agent_manage}/>
                <div style={{ margin: '20px 0' }} className='get_add_log_div'>
                    <Input placeholder="请输入用户ID" onChange={this.setId.bind(this)} onPressEnter={this.Submit.bind(this)}/>
                    <Button style={{marginLeft:'10px'}} onClick={this.Submit.bind(this)}><Icon type="search" />搜索</Button>
                </div>
                <Table scroll={{x:true}} columns={columns} dataSource={this.state.data} bordered loading={this.state.loading} size="small" />
            </div>
        )
    }
}

export default App;