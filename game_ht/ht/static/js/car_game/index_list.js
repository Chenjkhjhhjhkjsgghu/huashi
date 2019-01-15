  $(function () {
    var url = document.location.href;
    var thisUrl = url.split('?')[1]
    var list = thisUrl.split('&')
    var obj = {}
    for (var i = 0; i < list.length; i++) {
      var key = list[i].split('=')[0]
      var value = list[i].split('=')[1]
      obj[key] = value
    }
    var dataList = {
      gameNum: obj.gameNum,
      page: 1,
      page_size: 10
    }
    getRecord(dataList)
    $('#form_search2').on('submit',function() {
      var page_size = $('.input-mini').val()
      console.log(page_size, 'page_size')
      dataList.page_size = page_size
      getRecord(dataList)
      return false
    })
  })
  // 按条件搜索列表
  function getRecord(data) {
    dataList = data
    $.ajax({
      type: "get",
      xhrFields:{
        withCredentials:true
        },
        url: _json_url.url+'/game/one_betting_list',
      data: data,
      dataType: "json",
      success:function(res){
        if(res.code===100)
          {
            
            top.window.location.href = '/?sites='+_sites
            
            
            return;
          }  
          if (res.error_code == 'SUCCESS') {
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
    console.log(list)
    for(var i = 0; i < list.length; i++) {
      list[i].betting_list = JSON.parse(list[i].betting_list)
    }
    var html = tmpl('table_list', list);
    dom.html(html)
  }
  function setTime(date) {
    date = new Date(date)
    return date.getTime()
  }