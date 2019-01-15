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
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}

function ifvisable(visanle,openUrl){
    if(visanle){
        return '<a href="'+openUrl+'&visable=1"><img src="./static/images/go.gif" /></a>'
    }else{
        return ''
    }
}