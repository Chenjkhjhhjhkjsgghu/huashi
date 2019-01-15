var dataList = {
  page: 0,
  page_size: 10,
  name: "",
}
$(function () {
  getUserList()
  $('#form_search').on('submit',function() {
    dataList.idx = $('#id_idx').val()
    dataList.userid = $('#id_userid').val()
    dataList.myname = $('#id_myname').val()
    dataList.level = $('#id_level').val()
    dataList.roomidx = $('#id_roomidx').val()
    dataList.numlen = $('#id_numlen').val()
    dataList.logindate = $('#id_logindate').val()
    getUserList()
    return false
  })
  $('#form_search2').on('submit',function() {
    var page_size = parseInt($('.input-mini').val())
    if (page_size > 0) {
      dataList.page_size = page_size
      getUserList()
    }
    return false
  })
})
// 管理员列表
function getUserList() {
  $.ajax({
    type: 'POST',
    data: dataList,
    xhrFields:{
        withCredentials:true
        },
        url: _json_url.url+'/user_manage/getUserList',
    dataType: "json",
    success: function(res) {
      if(res.code===100)
          {
            
            top.window.location.href = '/?sites='+_sites
            
            
            return;
          }  
          if (res.error_code == 'SUCCESS') {
        setList(res.result.record)
        $(".pagination").paging({
          pageNo: res.result.page_num + 1,
          totalPage: res.result.page_count,
          callback: function(num) {
            getPageList(num)
          }
        })
        $('.allNum').html(res.result.record_count)
        $('.allPage').html(res.result.page_count)
      } else {
        alert(res.reason)
      }
    }
  })
}
// 按分页搜索列表
function getPageList(num) {
  dataList.page = num - 1
  getUserList()
}
// 渲染列表
function setList(lists) {
  var dom = $('#mainTable tbody')
  dom.empty()
  var list = lists
  var html = tmpl('table_list', list);
  dom.html(html)
}