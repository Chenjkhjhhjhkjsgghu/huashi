var siteInfo = {
        'shijie': {url:'http://api.fq98.com:84',name:'视界'},
        '2019yl': {url:'http://api.fq98.com:84',name:'2019yl'},
        'bycheng': {url:'http://api.fq98.com:84',name:'不夜城'},
        'hjba':{url:'http://api.fq98.com:84',name:'欢聚吧'}
}

var paihang = {
    'shijie': {url:'https://api.fq98.com:8808',name:'视界'},
    '2019yl': {url:'https://api.fq98.com:8808',name:'2019yl'},
    'hjba': {url:'https://api.fq98.com:8808',name:'2019yl'},
    'bycheng': {url:'https://api.fq98.com:8808',name:'2019yl'},
}
var urlData = getRequest()
var userMessage = ''
var timeExecute = ''
var siteid = urlData.sites
var sid = urlData.sid
var timeFaveRooms=''
var timeNearRooms=''
var FaveRoomsURL = []
var NearRoomsURL = []
var url = siteInfo[siteid].url
var openUrlList = []
var roomList = 0
var kinds = urlData.kinds


 $.ajax({
        url:paihang[siteid].url+'/get_this_week_rank',
        data:{sites:siteid},
        dataType: "json",
        success:function(res){
            var datas = res.msg.rank_list;
            var name = res.msg.nickname_list;
            var Room_name = res.msg.room_list;
            setPihang(datas,name,Room_name)

          }
       })     
$.ajax({
    type: "GET",
    url: `${url}/getUserInfo`,
    data: { sid: sid, siteId: siteid },
    dataType: "json",
    success: function (res) {
        // alert(res)
        console.log('res++', res)
        if (res && res.error_code == 'SUCCESS') {
            var userInfo = res.result.list.record[0]
            userInfo.visable = res.result.list.out_val_num //--todo,要改回正确的隐身
            // userInfo.visable = 1
            console.log(userInfo)
            userMessage = userInfo

            if (roomList && userMessage) {

            addvisable(userMessage.visable,roomList)
            }
            // addvisable(userInfo.visable)
        }

    }
})
$.ajax({
    type: "GET",
    url: `${url}/getSpecialRoom`,
    data: { siteId: siteid ,kinds:kinds},
    dataType: "json",
    success: function (res) {
        // alert(res)
        console.log('res++', res)
        if (res && res.error_code == 'SUCCESS') {
            var dwidth=document.getElementById('bbd').clientWidth;
            res.result.list.forEach((value, key) => {
                var openUrl = `roomid=${value.id}&roompwd=${value.pass}&type=${value.type}&rtype=${value.roomtype}&lock=${value.lock}&hstype=1&`
                openUrlList[key] = openUrl
                var tmpl = `   <li onmouseover="a('onair${key}')" onmouseout="b('onair${key}')" class="jqw">
                        <div class="roomphoto" onclick="location.href='?visable=1&${openUrl}'">
                            <div id="onair${key}" class="photo_onair" style="display:none"></div>
                            <div class="photo_onroomid">房间ID：${value.id}</div>${is_recommend(value.recommend)}
                            
                            <img src="${getimage( value.image)}" width="130px" height="100px" onerror="this.onerror='';this.src= './img/mo.gif'" />
                                
                            
                        </div>
                        <div class="roominfo"><h2>
                        ${is_lock(value.pass)}
                                ${getIcon(value.roomtype)}
                            ${is_red_name(value.name,value.redname)}</h2><h3><img src="./static/images/avater.gif" />${value.online_client}/${value.maxclient}</h3><div class="btn_goys"><a href="?visable=1&${openUrl}">
                            <img src="./static/images/enter.gif" /></a><span class= "visable${key}"><span/>
                        </div></div></li>`
                $('.roomList').append(tmpl)
                roomList = res.result.list.length
                if (835<dwidth)
                {
                    $('.jqw').css('width','16.6%');
                }
                else if (705<dwidth)
                {
                    $('.jqw').css('width','20%');
                }
                else if (dwidth<=705)
                {
                    $('.jqw').css('width','25%');
                }
            });
                if (roomList && userMessage) {
                addvisable(userMessage.visable,roomList)
                }
        }

    }
})


function addvisable(visable,roomList){
    if(visable){
        for(var i = 0;i<roomList;i++){
            // console.log('ifvisable(visable,openUrlList[i])',ifvisable(visable,openUrlList[i]))
            $(`.visable${i}`).html(ifvisable(visable,openUrlList[i]))
        }
    }
}

function getName(id){
    id = Math.abs(id)
    if(id == 1920){
        return '站长'
    }
    if(id == 1910){
        return '客服'
    }
    if(id == 1900){
        return '巡管'
    }
    if(id == 1780){
        return '代理'
    }
    if(id == 1770){
        return "MC主持"
    }
    if(id == 1760){
        return "超级主持"
    }
    if(id == 1750){
        return "五星主持"
    }
    if(id == 1740){
        return "四星主持"
    }
    if(id == 1730){
        return "三星主持"
    }

    if(id == 1720){
        return "二星主持"
    }
    if(id == 1710){
        return "一星主持"
    }
    if(id == 1391){
        return "天王"
    }

    if(id == 1390){
        return "帝尊"
    }
    if(id == 1380){
        return "天尊"
    }
    if(id == 1370){
        return "金尊"
    }
    if(id == 1360){
        return "紫尊"
    }
    if(id == 1350){
        return "超级管理"
    }
    if(id == 1340){
        return "财主"
    }
    if(id == 1330){
        return "超级大亨"
    }

    if(id == 1320){
        return "大亨"
    }
    if(id == 1310){
        return "终身VIP"
    }
    if(id == 1300){
        return "VIP"
    }
    if(id == 200){
        return "注册用户"
    }
    if(id == 100){
        return "游客"
    }
}
function getTtitle(icon){
    icon = Math.abs(icon)
    if(icon ==1){
        return '生日房'
    }
    if(icon ==2){
        return '开业房'
    }
    if(icon ==3){
        return '晚会房'
    }
    if(icon ==4){
        return '结婚房'
    }
    if(icon ==5){
        return '优胜房'
    }
    if(icon ==6){
        return '鹊桥房'
    }
    if(icon ==7){
        return '人气房'
    }
    if(icon ==8){
        return '整蛊房'
    }
   return '无标识'
}

function getIcon(icon){
    if(icon){
        return '<img src="./static/icon/'+icon+'.gif" title=${getTtitle(icon)} />'
    }else{
        return ''
    }
}
function getRequest() {
    var url = window.location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        var strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}

function ifvisable(visanle,openUrl){
    if(visanle){
        return '<a href="?visable=0&'+openUrl+'"><img src="./static/images/go.gif" /></a>'
    }else{
        return ''
    }
}

function getimage(imgae){
    if(imgae){
       
        if(imgae.indexOf('img')>=0){
            //获取前端服务器默认的
          return  "/shizhu/static/img/" + imgae
         
        }else{
          return url + "/images/"+siteid+"/" + imgae
          
        }
    }else{
        return `./img/${siteid}.gif`
    }
}
function is_recommend(recommend){
    recommend = recommend*1 || 0
    if(recommend){
        return '<div class="photo_rtip">推荐</div>'
    }else{
        return ''
    }
}
function is_red_name(name,redName){
    console.log(redName)
    redName = redName * 1 || 0
    if(redName){
        return `<span style="color:red">${name}<span>`
    }else{
      
        return `<span style="color:black">${name}<span>`
    }
}
function is_lock(lock){
    console.log('lock',lock)
    if(lock){
        return `<img src="./images/icon_lock.gif"/>`
        
    }else{
        return ''
    }
}

function setPihang(dates,name,Room_name)
{
    var Star = [
                  {
                    name:'鲜花之星',
                    img:'000101s.bmp',
                    data:dates.this_week_flower_get
                  },
                  {
                    name:'香吻之星',
                    img:'000102s.bmp',
                    data:dates.this_week_kiss_get
                  },
                  {
                    name:'钻戒之星',
                    img:'000109s.bmp',
                    data:dates.this_week_ring_get
                  },
                  {
                    name:'飞机之星',
                    img:'000512s.bmp',
                    data:dates.this_week_plane_get
                  },
                  {
                    name:'名车之星',
                    img:'000111s.bmp',
                    data:dates.this_week_car_get
                  },
                  {
                    name:'香水之星',
                    img:'000107s.bmp',
                    data:dates.this_week_perfume_get
                  },
                  {
                    name:'消费大亨',
                    img:'-1s.png',
                    data:dates.this_week_user_coin
                  },
                  {
                    name:'房间消费',
                    img:'-2s.png',
                    data:dates.this_week_room_send
                  }
        ]
          setRank(Star,name,$('#room_paihang'),Room_name)
}


function setRank(datas,names,dom,Room_name)
{
    dom.empty()
    for(var i = 0;i<datas.length;i++)
    {
        var data = datas[i].data.length===0?{user_id:'',sum:0}:datas[i].data[0];
        var name = data.user_id===''?'':names[data.user_id];
        if (i===7)
         {
            name = data.room_id===undefined?'': Room_name[data.room_id]
         }
        var rank_name = datas[i].name;
        var rank_img = datas[i].img;
        var str = '<li title="Idx:'+data.user_id+',昵称：'+name+'" class="rlbg"><div class="rankbox"><div class="num"><img src="../static/images/props/'+rank_img+'" width="16px" alt="'+rank_name+'" title="'+rank_name+'"></div><div class="rbinfo2"><h2>'+name+'</h2><h3>'+data.sum+'</h3></div></div></li>'
        dom.append(str)
    }
}