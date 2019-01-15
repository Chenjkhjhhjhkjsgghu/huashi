$(function () {
  $('#submit').on('click',function() {
    console.log(2222)
    return false
  })
})
function getRoomList(data) {
  dataList = data
  $.ajax({
    type: 'POST',
    data: data,
    xhrFields:{
        withCredentials:true
        },
        url: _json_url.url+'/room_group/getRoomList',
    dataType: "json",
    success: function(res) {
      if(res.code===100)
          {
            
            top.window.location.href = '/?sites='+_sites
            
            
            return;
          }  
          if (res.error_code == 'SUCCESS') {
        console.log(res)
        setList(res.result.record)
        $(".pagination").paging({
          pageNo: res.result.page_num + 1,
          totalPage: res.result.page_count,
          totalSize: res.result.page_record_count,
          callback: function(num) {
            getPageList(num)
          }
        })
        $('.allNum').html(res.result.allNum)
        $('.allPage').html(res.result.allPage + 1)
      } else {
        alert(res.reason)
      }
    }
  })
}
// 按分页搜索列表
function getPageList(num) {
  dataList.page = num - 1
  getRoomList(dataList)
}
// 渲染列表
function setList(lists) {
  var dom = $('#mainTable tbody')
  dom.empty()
  var list = lists
  console.log(list,'list')
  // for(var i = 0; i < list.length; i++) {
  //   list[i].profit = list[i]['sum(user_profit)']
  // }
  var html = tmpl('table_list', list);
  dom.html(html)
}