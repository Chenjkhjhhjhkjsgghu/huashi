var dataList = {
  page: 0,
  page_size: 10,
  id: "",
  keyword: ""
}
$(function () {
  getList()
  $('#form_search').on('submit',function() {
    dataList.id = $('#id_uid').val()
    dataList.roomid = $('#id_rid').val()
    getList()
    return false
  })
  $('#form_search2').on('submit',function() {
    var page_size = parseInt($('.input-mini').val())
    if (page_size > 0) {
      dataList.page_size = page_size
      getList()
    }
    return false
  })
})
function getList() {
  $.ajax({
    type: 'POST',
    data: dataList,
    xhrFields:{
        withCredentials:true
        },
        url: _json_url.url+'/room_group/room_views_block_list',
    dataType: "json",
    success: function(res) {
      if(res.code===100)
          {
            
            top.window.location.href = '/?sites='+_sites
            
            
            return;
          }  
          if (res.error_code == 'SUCCESS') {
        // console.log(res)
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
  getList()
}
// 渲染列表
function setList(lists) {
  var dom = $('#mainTable tbody')
  dom.empty()
  var list = lists
  // console.log(list,'list')
  // for(var i = 0; i < list.length; i++) {
  //   list[i].profit = list[i]['sum(user_profit)']
  // }
  var html = tmpl('table_list', list);
  dom.html(html)
  $('[data-options="confirm"]').on(ace.click_event, function() {
      var url = $(this).attr("href");
      bootbox.confirm($(this).attr("data-confirm-title"), function(result) {
          if(result) {
            $.get(url, function(res) {
              if(res.code===100)
          {
            
            top.window.location.href = '/?sites='+_sites
            
            
            return;
          }  
          if (res.error_code == 'SUCCESS') {
                getList()
              } else {
                alert(res.reason)
              }
            });  
          }
      });
  });
}