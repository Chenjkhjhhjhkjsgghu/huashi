  $(function () {
    var dataList = {
      page: 1,
      page_size: 10,
      user_id:'',
      status:"",
      type:""
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
    var type = $('#search_type').val()
    var status = $('#search_status').val()
    var idx = $('#id_idx').val()
    var data = {
      page:1,
      page_size:20,
      user_id:idx,
      status:status,
      type:type
    }
    getRecord(data)
  }
  // 按条件搜索列表
  function getRecord(data) {
    dataList = data
    $.ajax({
      type: "GET",
      xhrFields:{
        withCredentials:true
        },
        url: _json_url.url+'/game/get_fail_bean_list',
      data: data,
      dataType: "json",
      success:function(res){
        res.pageNo=1;
        res.allPage = 1;
        res.allNum = 1;
        if(res.code===100)
          {
            top.window.location.href = '/?sites='+_sites
            return;
          }  
      if (res.error_code == 'SUCCESS') {

        recordList(res.lists)
        $(".pagination").paging({
          pageNo: res.pageNo,
          totalPage: res.allPage,
          totalSize: res.allNum,
          callback: function(num) {
            getPageList(num)
          }
        })
        $('.allNum').html(res.allNum)
        $('.allPage').html(res.allPage)
      }
    }
    // console.log(dataList)
  })}
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
     lists.forEach(function(i){
      i.status = i.status!==0?'成功':'失败'
       i.type = i.type!==0?'加豆':'扣豆'
       i.createtime = getDate(i.createtime)
     })
    var html = tmpl('table_list', lists);

    dom.html(html)
  }
 function getDate(arr)
  {
    var time = new Date(arr)
   var s = '';
   s += time.getFullYear() + '-';          // 获取年份。
   if (time.getMonth() < 9) {
       s += '0' + (time.getMonth() + 1) + "-";         // 获取月份。
   } else {
       s += (time.getMonth() + 1) + "-";         // 获取月份。
   }
   if (time.getDate() < 10) {
       s += '0' + time.getDate()+' ';                 // 获取日。
   } else {
       s += time.getDate() +' ';                 // 获取日。
   }
   if (time.getHours() < 10) {
       s += '0' + time.getHours()+ ":";                 // 获取小时。
   } else {
       s += time.getHours()+ ":";                 // 获取小时。
   }
   if (time.getMinutes() < 10) {
       s += '0' + time.getMinutes()+ ":";                 // 获取分钟。
   } else {
       s += time.getMinutes()+ ":";                 // 获取分钟。
   }
   if (time.getSeconds() < 10) {
       s += '0' + time.getSeconds();                 // 获取秒。
   } else {
       s += time.getSeconds();                 // 获取秒。
   }
   return (s);                          // 返回时间。
  }