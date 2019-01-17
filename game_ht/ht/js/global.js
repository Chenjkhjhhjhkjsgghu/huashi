
  
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
      sessionStorage._sites = JSON.stringify(json)
     return json;
  }

  
   _sites = sessionStorage._sites;
   _json_url = JSON.parse(sessionStorage._Url);



if(location.pathname!=='/login.html'&&location.pathname!=='/'&&location.pathname!=='/index.html'&& typeof _json_url ==='undefined')
{
  window.location.href = '/login.html?sites='+_sites
}

setTimeout(function(){
 window.location.href = window.location.href
},1000*60*60*4)
         
 _json_url = JSON.parse(sessionStorage._Url);

function getManagerDetail(id, callback) {
  $.ajax({
    data: {
      id: id
    },
    xhrFields:{
        withCredentials:true
        },
        url: _json_url.url+'/system_setup/getManagerDetail',
    type: 'post',
    dataType: 'JSON',
    success: function (res) {
      (callback && typeof(callback)==="function") && callback(res);
    },
    error: function (err) {
      console.log('error',err);
    }
  })
}
// 获取权限列表
function getAuthority(type, callback) {
  $.ajax({
    data: {
      type: type
    },
    xhrFields:{
        withCredentials:true
        },
        url: _json_url.url+'/system_setup/authority',
    type: 'post',
    dataType: 'JSON',
    success: function (res) {
      (callback && typeof(callback)==="function") && callback(res);
    },
    error: function (err) {
      console.log('error',err);
    }
  })
}
// 修改管理员信息
function updateManager(data, callback) {
  $.ajax({
    data: data,
    xhrFields:{
    withCredentials:true
    },
    url: _json_url.url+'/system_setup/updateManager',
    type: 'post',
    dataType: 'JSON',
    success: function (res) {
      (callback && typeof(callback)==="function") && callback(res);
    },
    error: function (err) {
      console.log('error',err);
    }
  })
}
