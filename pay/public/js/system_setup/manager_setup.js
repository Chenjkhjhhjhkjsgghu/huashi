  var dataList = {
    page: 1,
    page_size: 10
  }
  // var authorityList = localStorage.getItem('authority')
  $(function () {
    getUserList() // 获取列表
    $('#form_search2').on('submit',function() {
      dataList.page = 1
      getUserList()
      return false
    })
    $('#mainTable').on('click','.btn-delete',function() {
      console.log($(this).attr('data-id'))
      var id = $(this).attr('data-id')
      layer.confirm('警告：删除将不能恢复，确定要删除吗？', {
        btn: ['确认','取消'] //按钮
      }, function(){
        deleteManager(id)
      }, function(){
        // window.parent.$.fancybox.close();
      });
    })
  })
  // 按条件搜索列表
  function getUserList() {
    dataList.page_size = parseInt($('#form_search2 .input-mini').val())
    $.ajax({
      type: "POST",
      url: '/system_setup/getuserList',
      data: dataList,
      dataType: "json",
      success:function(res){
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
          dataList.page = res.result.pageNo
          $('.allNum').html(res.result.allNum)
          $('.allPage').html(res.result.allPage)
        }
      }
    })
    // console.log(dataList)
  }
  // 按分页搜索列表
  function getPageList(num) {
    dataList.page = num
    getUserList()
  }
  // 渲染列表
  function recordList(lists) {
    var dom = $('#mainTable tbody')
    dom.empty()
    var list = lists
    // console.log(list)
    var html = tmpl('table_list', list);
    dom.html(html)
  }
  function setTime(date) {
    date = new Date(date)
    return date.getTime()
  }
  // 删除管理员
  function deleteManager(id) {
    $.ajax({
      type: "POST",
      url: '/system_setup/deleteManager',
      data: {
        id: id
      },
      dataType: "json",
      success:function(res){
        if (res.error_code == 'SUCCESS') {
          layer.closeAll('dialog')
          getUserList(dataList)
        }
      }
    })
  }
  // 设置用户信息
  function setInfo() {
    localStorage.setItem('user_id', 2)
    localStorage.setItem('user_name', '张玉')
    console.log(localStorage)
  }
