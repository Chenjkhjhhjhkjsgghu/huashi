var siteInfo = {
        'shijie': {url:'http://api.fq98.com:84',name:'视界'},
        '2019yl': {url:'http://api.fq98.com:84',name:'2019yl'},
        'bycheng': {url:'http://api.fq98.com:84',name:'不夜城'},
        'hjba':{url:'http://api.fq98.com:84',name:'欢聚吧'}
}

var paihang = {
    'shijie': {url:'https://api.fq98.com:88',name:'视界'},
    '2019yl': {url:'https://api.fq98.com:88',name:'2019yl'},
    'hjba': {url:'https://api.fq98.com:88',name:'2019yl'},
    'bycheng': {url:'https://api.fq98.com:88',name:'2019yl'},
}

$(document).ready(function () {
  
    var urlData = getRequest()
    var userMessage = ''
    var timeExecute = ''
    var siteid = urlData.sites
    var sid = urlData.sid
    var timeFaveRooms=''
    var timeNearRooms=''
    var FaveRoomsURL = []
    var NearRoomsURL = []
    const url = siteInfo[siteid].url;
    console.log(url)
    $('.pg1').append('<img src="./static/images/'+siteid+'1.jpg"/>')
    $('.pg2').append('<img src="./static/images/'+siteid+'2.jpg"/>')
    var openUrlList = []
    var roomList = 0

    $.ajax({
        url:paihang[siteid].url+'/get_today_rank',
        data:{sites:siteid},
        dataType: "json",
        success:function(res){
            if(res.code===200)
            {
                var name = res.msg.nickname_list;
                var dates = res.msg.rank_list;
                if(dates===undefined)
                {
                   dates={}
                }
                  var Star = [
                  {
                    name:'鲜花之星',
                    img:'000101s.bmp',
                    data:dates.today_flower_get
                  },
                  {
                    name:'香吻之星',
                    img:'000102s.bmp',
                    data:dates.today_kiss_get
                  },
                  {
                    name:'名车之星',
                    img:'000111s.bmp',
                    data:dates.today_car_get
                  },
                  {
                    name:'飞机之星',
                    img:'000512s.bmp',
                    data:dates.today_plane_get
                  },
                  {
                    name:'钻戒之星',
                    img:'000109s.bmp',
                    data:dates.today_ring_get
                  },
                  {
                    name:'香水之星',
                    img:'000107s.bmp',
                    data:dates.today_perfume_get
                  }
                 ]

                 setSore(name,dates.today_user_rank_score,$('#day_jifen'))
                 setSore(name,dates.today_user_rank_coin,$('#day_xiaofei'))
                 setStar(name,Star,$('#box_star'))
            }
            else{
                alert(res.msg)
            }
      
        }
    })
    $.ajax({
        type: "GET",
        url: `${url}/getUserInfo`,
        data: { sid: sid, siteId: siteid },
        dataType: "json",
        success: function (res) {
            if (res && res.error_code == 'SUCCESS') {
                var userInfo = res.result.list.record[0]
                userInfo.visable = res.result.list.out_val_num
                getNearRooms(userInfo.near_rooms)
                getFaveRooms(userInfo.fave_rooms)
                userMessage = userInfo
                $('.nickName').html(`${userInfo.nickname}<Br /> (${userInfo.id})`)
                $('.cred').html(getName(userInfo.level))
                $('.experience').css('width', `${Math.abs(userInfo.level) * 100 / 1920}%`)
                $('.uhead').css('background', `url(/header/${userInfo.face_id}.bmp)`)
                if (roomList && userMessage) {
                    addvisable(userMessage.visable,roomList)
                    }

                
            }
        }
    })
    $.ajax({
        type: "GET",
        url: `${url}/getRoomInfo`,
        data: { siteId: siteid },
        dataType: "json",
        success: function (res) {
            if (res && res.error_code == 'SUCCESS') {
                $('.roomList').empty()
                var dwidth=document.getElementById('bbd').clientWidth;
                res.result.list.forEach((value, key) => {
                    var openUrl = 'roomid='+value.id+'&roompwd='+value.pass+'&type='+value.type+'&rtype='+value.roomtype+'&lock='+value.lock + '&hstype=1&'
                    openUrlList[key] = openUrl
                    var tmpl = `<li onmouseover="a('onair${key}')" onmouseout="b('onair${key}')" class="jqw">
                            <div class="roomphoto" onclick="location.href='?visable=1&${openUrl}'">
                                <div id="onair${key}" class="photo_onair" style="display:none"></div>
                                <div class="photo_onroomid">房间ID：${value.id}</div>${is_recommend(value.recommend)}
                                <img src="${getimage(value.image) }" width="130px" height="100px" onerror="this.onerror='';this.src= './img/mo.gif'" />
                            </div>
                            <div class="roominfo"><h2>
                                    ${is_lock(value.pass)}
                                    ${getIcon(value.roomtype)}
                                    ${is_red_name(value.name,value.redname)}</h2><h3><img src="./static/images/avater.gif" />${value.online_client}/${value.maxclient}</h3><div class="btn_goys"><a href="?visable=1&${openUrl}">
                                <img src="./static/images/enter.gif" /></a><span class= "visable${key}"><span/>
                            </div></div></li>`
                    $('.roomList').append(tmpl)
                    roomList = res.result.list.length
                     
                    if (roomList && userMessage) {
                    addvisable(userMessage.visable,roomList)
                    }
                    // alert(dwidth)
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
                        $('.jqw').css('margin-left','0px');
                        $('.jqw').css('margin-right','0px');
                    }
                });

            }

        }
    })
     

    function getNearRooms(nearRooms) {
        if (nearRooms){
                $.ajax({
                    type: "GET",
                    url: `${url}/getRoom`,
                    data: { roomIdList: nearRooms, siteId: siteid },
                    dataType: "json",
                    success: function (res) {
                        if (res && res.error_code == 'SUCCESS') {
                            var dwidth=document.getElementById('bbd').clientWidth;
                            res.result.list.forEach((value, key) => {
                                var openUrl = `roomid=${value.id}&roompwd=${value.pass}&type=${value.type}&rtype=${value.roomtype}&lock=${value.lock}&hstype=1&`
                                NearRoomsURL[key] = openUrl
                                var tmpl = `   <li onmouseover="a('onair${key}')" onmouseout="b('onair${key}')" class="jqw">
                                        <div class="roomphoto" onclick="location.href='?visable=1&${openUrl}'">
                                            <div id="onair${key}" class="photo_onair" style="display:none"></div>
                                            <div class="photo_onroomid">房间ID：${value.id}</div>${is_recommend(value.recommend)}
                                            
                                            <img src="${getimage(value.image) }" width="130px" height="100px" onerror="this.onerror='';this.src= './img/mo.gif'" />
                                                
                                            
                                        </div>
                                        <div class="roominfo"><h2>
                                        ${is_lock(value.pass)}
                                                ${getIcon(value.roomtype)}
                                            ${is_red_name(value.name,value.redname)}</h2><h3><img src="./static/images/avater.gif" />${value.online_client}/${value.maxclient}</h3><div class="btn_goys"><a href="?visable=1&${openUrl}">
                                            <img src="./static/images/enter.gif" /></a><span class= "NearRoomsvisable${key}"><span/>
                                        </div></div></li>`
                                $('.NearRooms').append(tmpl)
                               
                               
                            });
                  if(userMessage&&NearRoomsURL.length>0){
                if(userMessage.visable){
                for(var i = 0;i<roomList;i++){
                // console.log('ifvisable(visable,openUrlList[i])',ifvisable(visable,openUrlList[i]))
                $(`.NearRoomsvisable${i}`).html(ifvisable(userMessage.visable,NearRoomsURL[i]))
                     }
                  }
                }
                        }
            
                    }
                })
           
        }
    }
    function getFaveRooms(faveRooms) {
        if (faveRooms){
                //后台查询收藏房间
                $.ajax({
                    type: "GET",
                    url: `${url}/getRoom`,
                    data: { roomIdList: faveRooms, siteId: siteid },
                    dataType: "json",
                    success: function (res) {
                        // alert(res)
                        console.log('res++', res)
                        if (res && res.error_code == 'SUCCESS') {
                            var dwidth=document.getElementById('bbd').clientWidth;
                            res.result.list.forEach((value, key) => {
                                var openUrl = `roomid=${value.id}&roompwd=${value.pass}&type=${value.type}&rtype=${value.roomtype}&lock=${value.lock}&hstype=1&`
                                FaveRoomsURL[key] = openUrl
                                var tmpl = `   <li onmouseover="a('onair${key}')" onmouseout="b('onair${key}')" class="jqw">
                                        <div class="roomphoto" onclick="location.href='?visable=1&${openUrl}'">
                                            <div id="onair${key}" class="photo_onair" style="display:none"></div>
                                            <div class="photo_onroomid">房间ID：${value.id}</div>${is_recommend(value.recommend)}
                                            
                                            <img src="${getimage(value.image)}" width="130px" height="100px" onerror="this.onerror='';this.src= './img/mo.gif'" />
                                                
                                            
                                        </div>
                                        <div class="roominfo"><h2>
                                        ${is_lock(value.pass)}
                                                ${getIcon(value.roomtype)}
                                            ${is_red_name(value.name,value.redname)}</h2><h3><img src="./static/images/avater.gif" />${value.online_client}/${value.maxclient}</h3><div class="btn_goys"><a href="?visable=1&${openUrl}">
                                            <img src="./static/images/enter.gif" /></a><span class= "FaveRoomsvisable${key}"><span/>
                                        </div></div></li>`
                                $('.FaveRooms').append(tmpl)
                               
                                // alert(dwidth)
                            });
                            if(userMessage&&FaveRoomsURL.length>0){
                            if(userMessage.visable){
                            console.log(1)
                            for(var i = 0;i<roomList;i++){
                            // console.log('ifvisable(visable,openUrlList[i])',ifvisable(visable,openUrlList[i]))
                            $(`.FaveRoomsvisable${i}`).html(ifvisable(userMessage.visable,FaveRoomsURL[i]))
                                   }
                                }
                            }
                        }
            
                    }
                })
            
        }
    }
    $.ajax({
        type: "GET",
        url: `${url}/getMayorInfo`,
        data: { siteId: siteid },
        dataType: "json",
        success: function (res) {
            if (res && res.error_code == 'SUCCESS') {
                var data = res.result.list
                var tmpl = `<h3 title="${data.send_nickname}">${data.send_nickname}<br />
                <span>（IDX：${data.send_id}）</span></h3>
                <h4>票数：${data.total}票</h4>`
                $('.mayorInfo').html(tmpl)
            }else{
                var tmpl = `<h3 title="虚位以待">虚位以待<br /></h3>
                <h4>票数：0票</h4>`
                $('.mayorInfo').html(tmpl)
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
})


function setSore(names,json,dom)
{
    var str = '';
    dom.empty()
    if (json===undefined)
     {
        return;
     }
    for(var i = 0;i<json.length;i++)
    {
        str+='<li title="Idx:'+json[i].user_id+',昵称：'+names[json[i].user_id]+',站点：'+siteInfo[getRequest().sites].name+'"><div class="rankbox rlbg"><div class="num"><img src="../static/images/num'+(i+1)+'.gif"></div><div class="rbinfo2"><h2>'+names[json[i].user_id]+'</h2><h3>'+json[i].sum+'</h3></div></div></li>'
       dom.append(str)
       str=''
    }
}


function setStar(names,json,dom)
{
    var str = '';
    dom.empty()
    var ali = $('<li></li>');
    for(var i = 0;i<json.length;i++)
    {
        var data = json[i].data==undefined?{user_id:'',sum:''}:json[i].data[0]===undefined?{user_id:'',sum:''}:json[i].data[0];
        var name = data.user_id===''?'':names[data.user_id]
       str+='<div class="ranksbox" title="Idx:'+data.user_id+',昵称：'+name+'：'+siteInfo[getRequest().sites].name+'"><div class="num"><img src="../static/images/props/'+json[i].img+'" alt="'+json[i].name+'" title="'+json[i].name+'"/></div><div class="rbinfo2"><h2>'+json[i].name+'：'+name+'</h2><h3>'+data.sum+'</h3></div></div>'
       ali.append(str)
       if((i+1)%3===0)
       {
            dom.append(ali);
            ali = $('<li></li>')
       }
       str=''
    }
}    



function getRequest()
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
        var arr = [];
        arr = nUrl[i].split('=')
        arr[1] = arr[1].split('#')[0]
        json[arr[0]] = arr[1]
      }
     return json;
  }
