import React from 'react';
import { Table, Icon ,Button , Input, DatePicker ,Select,Popconfirm,message} from 'antd';
import axios from './../../axios'; 


const { RangePicker } = DatePicker;
const Option = Select.Option;
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

const json = {"1":"砸金蛋","2":"深水炸弹","101":"鲜花","102":"香吻","103":"爱你久久","104":"洋娃娃","105":"一起跳舞","106":"月亮代表我的心","107":"香水","108":"喜糖","109":"钻戒","110":"谢谢你","111":"名车","112":"别墅","113":"支持你","114":"欢迎你","115":"中意你（男）","116":"中意你（女）","117":"牛郎织女","118":"爆炸鸭子","120":"求QQ","121":"求手机","122":"求交往","123":"求女友","124":"求抱走","125":"求抱抱","126":"求安慰","127":"求呵护","128":"心动","129":"哈根达斯","130":"K歌之王","131":"天长地久","132":"双宿双飞","133":"亲嘴鱼","134":"一箭钟情","135":"啵一个","136":"我爱你","137":"一生一世","138":"心动","139":"爱情鸟","140":"B特","141":"私奔","142":"香车丽人","143":"丽人好礼","144":"爱相随","145":"出售光棍","146":"出售剩女","147":"醋坛子","148":"浪漫焰火","149":"我的眼里只有你","150":"情侣","151":"幸运美女","152":"幸运帅哥","201":"掌声","202":"啤酒","203":"抱抱","205":"爱神之箭","206":"寂寞","207":"粽子","208":"两肋插刀","209":"百年好合","210":"生日蛋糕","211":"喜羊羊","212":"灰太狼","213":"香烟","214":"红包","215":"鞭炮","216":"爆炸财神","217":"爆炸礼炮","218":"烟花","222":"月饼","223":"汤圆","230":"魔法教棒","231":"小岛","232":"哥是传说","233":"嘿咻","234":"江南style","235":"狼牙棒","236":"求人品","237":"元芳你怎么看","238":"美眉证","239":"你最棒","240":"帅锅证","241":"三明治","242":"求校花","243":"甜筒","244":"伤不起","245":"爱心贴","246":"支持你","247":"祝贺你","248":"别伤心","249":"舒适抱枕","250":"波棒糖","251":"萤火棒","252":"罚款单","253":"踩你","254":"冰激凌","255":"马到成功","256":"圣诞帽","257":"圣诞袜","258":"圣诞树","259":"2014","260":"恭贺新禧","261":"大红袍","262":"吉祥如意","263":"大哥好","264":"哥俩好","265":"求泡泡","266":"求香吻","267":"HI","268":"爱心便当","269":"端午节快乐","270":"给力","271":"最佳朋友","272":"幸运荧光棒","273":"龙井茶","274":"圣诞快乐","301":"大香蕉","302":"绿帽子","303":"跳蛋","304":"三八","305":"放狗咬你","306":"我靠","307":"罩罩","308":"咪咪奶嘴","309":"瞪谁谁怀孕","310":"选票","311":"猪头","312":"敲死你","313":"踩","314":"内裤","315":"避孕套","316":"抓鸡鸡","317":"抓咪咪","318":"比基尼","341":"被雷了","342":"弹鸡鸡","343":"脱光","344":"粑粑","345":"板砖","346":"鄙视你","347":"肚兜","348":"踢飞","349":"裙底风光","350":"告别光棍","360":"点歌娃娃","401":"铜钱","402":"金币","405":"美元","406":"金条","407":"劳力士","408":"百宝箱","409":"金龙","410":"金兔","411":"支票","412":"宝箱","413":"聚宝盆","414":"摇钱树","415":"马上有钱","501":"美女如云","502":"梦回故乡","503":"梦想成真","504":"前程似锦","505":"天使之恋","506":"我心永恒","507":"私家庄园","508":"无悔今生","509":"情定一生","510":"一见钟情","511":"导弹","512":"飞机","513":"宇宙飞船","514":"丘比特","515":"结婚证","516":"点歌票","517":"婚戒","518":"离婚证","519":"豪华游轮","520":"IKISSYOU","521":"皇冠","522":"天使","523":"我好寂寞","524":"为了谁","525":"豪华跑车","526":"爆炸飞鸡","527":"生日祈福","528":"求婚","529":"花轿","530":"女神，我来了","531":"生日祝福","532":"圣诞快乐","533":"土豪，我们做个朋友吧","534":"新年快乐","535":"兄弟，干一杯","601":"幸运兔","602":"幸运花","603":"幸运吻","604":"幸运啤酒","605":"幸运香水","606":"幸运钻戒","607":"幸运跑车","608":"幸运飞机","609":"幸运丘比特","610":"幸运掌声","611":"爆炸我想你","612":"幸运神马都是浮云","613":"幸运星","614":"幸运棒棒糖","615":"幸运别墅","616":"幸运佛","617":"幸运神","618":"幸运圣诞","619":"幸运鞭炮","620":"幸运红包","621":"幸运挂历","622":"幸运宝箱","623":"幸运Viski","624":"幸运足球","625":"幸运女神","626":"幸运导弹","627":"幸运兔","628":"幸运布加迪威龙","629":"爆炸满分","653":"仙女散花","655":"原子弹","657":"卫星","658":"火箭","660":"让子弹飞","661":"鹊桥会","662":"嫦娥奔月","663":"航空母舰","664":"婚车","665":"跑车","666":"美人鱼","667":"轰炸机","668":"婚礼","670":"过大年","671":"我们结婚吧","672":"我来听你的演唱会","673":"守护一生","674":"除夕夜","675":"闪亮女主播","676":"休了你","677":"车行大发","678":"感谢有你","679":"女神降临","680":"天使降临","681":"有情人终成眷属","682":"大力神金杯","684":"相约巴黎之夜","800":"婚礼套装","6688":"小喇叭","6689":"大喇叭","6690":"短信","6700":"盖章"}
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
const columns = [{
  title: '组ID',
  dataIndex: 'groupid'               
},{
  title: '用户id',
  dataIndex: 'client',
},{
    title: '昵称',
    dataIndex: 'nickname',
},{
  title: '操作类型',
  dataIndex: 'type',
  render:(text)=>{
    return text===3?'发送礼物':'收到礼物'
  }
},{
    title: '道具',
    dataIndex: 'obj',
    render:(text)=>{
        return json[text]
    }
},{
    title: '数量',
    dataIndex: 'obj_count',
},{
    title: '金币',
    dataIndex: 'coin',
},{
    title: '积分',
    dataIndex: 'score',
},{
    title: '豆值',
    dataIndex: 'bean',
},{
    title: '房间id',
    dataIndex: 'room',
},{
    title: '时间',
    dataIndex: 'time',
    render:(text)=>{
        return getDate(text)
    }
},{
    title: '详情',
    dataIndex: 'note',
},{
    title: '操作',
    dataIndex: 'oper'
   
}];

var color = false;
class App extends React.Component{
   constructor(...args){
       super(...args)
       this.color='table_red';
       this.search = {
        sites:getUrl().sites,
        accept_user_id:'',
        send_user_id:'',
        obj:'',
        belong:'',
        start_time:'',
        end_time:'',
        current:1
       }
   }
   state ={
    pagination:{},
    loading:false,
    save_id:'',
    data:[]
   }

   componentDidMount()
   {
       this.fn(this.search)
   }
   save_id(e)
   {
      this.setState({
        save_id:e.target.name
      })
   }
   cancel()
   {
       message.error('取消还原')
   }
   confirm()
   {
       axios.post('/restore_gift',{groupid:this.state.save_id,sites:getUrl().sites}).then(res=>{
        message.info('还原成功')
        this.fn(this.search)
       }).catch(error=>console.log(error))
   }
   fn(params){
       this.setState({
           loading:true
       }) 
    axios.get('/coin_detail',params).then(res=>{
       res.output.map((i,index,record)=>{
                i.key= index+'asd'
                i.oper = json[i.obj].match(/^爆炸|幸运/g)!=null?'':i.oper?
                <Button style={{height:'25px',fontSize:'13px'}} >已还原</Button>:
                <Popconfirm title={`确定还原${i.groupid}内的礼物吗？
                `} onConfirm={this.confirm.bind(this)} onCancel={this.cancel} okText="是" cancelText="否" >
                <Button onClick={this.save_id.bind(this)} name={i.groupid} style={{height:'25px',fontSize:'13px'}} type="primary" >还原</Button> 
                </Popconfirm>     
                if(index===0)
                {
                 i.color =color;
                 return;
                }
                if(i.groupid!==record[index-1].groupid)
                {
                   color=!color;
                   i.color=color;
                }
                else{
                    i.color=color;
                }
                
       })
       
       this.setState({
           data:res.output,
           loading:false,
           pagination:{
               pageSize:20,
               current:res.page*1,
               total:res.count*1
            }
       })
    })
   }
   searchBar()
   {
       this.search.current = 1;
       this.fn(this.search)
   }
   setType(e)
   {
     this.search[e.target.name] = e.target.value;
   }

   set_time(e,string)
   {
    this.search.end_time = string[1] ===''?'':string[1]+ '23:59:59';
    this.search.start_time = string[0] ===''?'':string[0]+ '00:00:00';;
   }
   current(e)
   {
       let value = this.search;
       value.current = e.current;
       this.fn(value)
   }
   setColor(i,record)
   {
      return i.color?'table_black':'table_red'
   }
   set_obj(e)
   {
      this.search.obj = e;
   }
   search_input(input, option){
    return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
   }
    render(){
        return(
            <div className='coin_detail'>
                <div style={{margin:'20px 0'}}>
                <Input placeholder='接收人' style={{width:'200px',margin:'0 5px'}} name='accept_user_id' onChange={this.setType.bind(this)} onPressEnter={this.searchBar.bind(this)}/>
                <Input placeholder='发送人' style={{width:'200px',margin:'0 5px'}} name='send_user_id' onChange={this.setType.bind(this)} onPressEnter={this.searchBar.bind(this)}/>
                <span>道具:</span>
                <Select defaultValue='' style={{ width: 120 }} onChange={this.set_obj.bind(this)}  optionFilterProp="children" filterOption={this.search_input} showSearch>
                        <Option value="">全部</Option>
                       {Object.keys(json).map(i=>{
                       return <Option key={i} value={i}>{json[i]}</Option>
                       })}
               </Select>
                <Input placeholder='房间id' style={{width:'200px',margin:'0 5px'}} name='belong' onChange={this.setType.bind(this)} onPressEnter={this.searchBar.bind(this)}/>
                <RangePicker format="YYYY-MM-DD  " onChange={this.set_time.bind(this)}  placeholder={['开始时间','结束时间']} name='time'/>
                <Button onClick={this.searchBar.bind(this)} style={{marginLeft:'5px'}}><Icon type="search"/>搜索</Button>
                </div>
                <Table scroll={{x:true}} columns={columns}  dataSource={this.state.data} bordered size="small" loading={this.state.loading} rowClassName={this.setColor.bind(this)}  pagination={this.state.pagination} onChange={this.current.bind(this)}/>
            </div>
        )
    }
}

export default App; 