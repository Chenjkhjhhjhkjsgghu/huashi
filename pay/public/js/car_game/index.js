  $(function () {
    var dataList = {
      page: 1,
      page_size: 10
    }
    getRecord(dataList)
    $('#form_search').on('submit',function() {
      formSubmit()
      return false
    })
    $('#form_search2').on('submit',function() {
      formSubmit()
      return false
    })
  })
  // 按条件搜索
  function formSubmit() {
    var wincode = $('#id_winroleidx').val()
    var startTime = $('#id_datetime_s').val()
    var endTime = $('#id_datetime_e').val()
    var idx = $('#id_idx').val()
    var page_size = $('.input-mini').val()
    if (page_size > 0) {
      page_size = page_size
    } else {
      page_size = 10
    }
    var data = {
      wincode: wincode,
      idx: idx,
      page: 1,
      page_size: page_size
    }
    if (startTime && endTime) {
      if (startTime < endTime) {
        data.startTime = startTime
        data.endTime = endTime
      } else {
        data.startTime = endTime
        data.endTime = startTime
      }
    } else {
      data.startTime = ''
      data.endTime = ''
    }
    getRecord(data)
  }
  // 按条件搜索列表
  function getRecord(data) {
    dataList = data
    $.ajax({
      type: "POST",
      url: '/game/carList',
      data: data,
      dataType: "json",
      success:function(res){
        // if (res.error_code == 'SUCCESS') {
        recordList(res.result.lists)
        $(".pagination").paging({
          pageNo: res.result.pageNo,
          totalPage: res.result.allPage,
          totalSize: res.result.allNum,
          callback: function(num) {
            getPageList(num)
          }
        })
        $('.allNum').html(res.result.allNum)
        $('.allPage').html(res.result.allPage)
      }
    })
    // console.log(dataList)
  }
  // 按分页搜索列表
  function getPageList(num) {
    dataList.page = num
    getRecord(dataList)
  }
  // 渲染列表
  function recordList(lists) {
    var dom = $('#mainTable tbody')
    dom.empty()
    var list = lists
    for(var i = 0; i < list.length; i++) {
      list[i].betting_list = JSON.parse(list[i].betting_list)
    }
    // console.log(list)
    var html = tmpl('table_list', list);
    dom.html(html)
  }
  function setTime(date) {
    date = new Date(date)
    return date.getTime()
  }