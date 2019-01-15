
var siteInfo = {
        'shijie': {url:'http://rooms.fq98.com:83',name:'视界'},
        '2019yl': {url:'http://rooms.fq98.com:83',name:'2019yl'},
        'bycheng': {url:'http://rooms.fq98.com:83',name:'不夜城'},
        'hjba':{url:'http://rooms.fq98.com:83',name:'欢聚吧'}
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
    let arr = [];
    arr = nUrl[i].split('=')
    arr[1] = arr[1].split('#')[0]
    json[arr[0]] = arr[1]
    }
    sessionStorage.setItem('_sites',JSON.stringify(json))
    return json;
    }
getRequest()
  var _Url = JSON.parse(sessionStorage._sites)  
$(document).ready(function () {
    var urlData = _Url
    var roomid = urlData.roomid
    var siteid = urlData.sites
    var sid = urlData.sid
    var data = {}
    $('.titleInfo').text(siteInfo[siteid].name+'--多人视频室主后台管理系统')
    $('.titleStr').text(siteInfo[siteid].name+'--多人视频室主后台管理系统')
    data.roomid = roomid
    data.siteid = siteid
    data.sid = sid
    $.ajax({
        type: "GET",
        url: siteInfo[_Url.sites].url+'/shizhu/verifyUser',
        data: data,
        dataType: "json",
        success: function (res) {
            if (res && res.error_code == 'SUCCESS') {
                //    alert('登录成功')
                //face_id
                var src = '/header/' + res.result.lists.face_id + '.bmp'
                var img = '  <img class="nav-user-photo"src="' + src + '"  alt="Jason\'s Photo" />'
                $(".image").html(img);
                var html = '<small>Welcome</small>' + res.result.lists.id + '（房间：' + roomid + '）'
                $('.user-info').html(html)
                $('.pull').show()
            } else {
                if (res && res.reason) {
                    alert(res.reason)
                } else {
                    alert('请求失败')
                }
            }
        }
    })
})