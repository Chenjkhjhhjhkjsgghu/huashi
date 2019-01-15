$(function() {
  
})
// 获取管理员信息
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
