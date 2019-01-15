var dataList = {
  page: 0,
  page_size: 10,
  id: "",
  keyword: ""
}
$(function () {
  getRoomList()
  $('#form_search').on('submit',function() {
    dataList.id = $('#id_idx').val()
    dataList.keyword = $('#id_name').val()
    getRoomList()
    return false
  })
  $('#form_search2').on('submit',function() {
    var page_size = parseInt($('.input-mini').val())
    if (page_size > 0) {
      dataList.page_size = page_size
      getRoomList()
    }
    return false
  })
})
function getRoomList() {
  $.ajax({
    type: 'POST',
    data: dataList,
    url: '/room_group/getRoomList',
    dataType: "json",
    success: function(res) {
      if (res.error_code == 'SUCCESS') {
        // console.log(res)
        setList(res.result.record)
        $(".pagination").paging({
          pageNo: res.result.page_num*1 + 1,
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
  getRoomList()
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
}