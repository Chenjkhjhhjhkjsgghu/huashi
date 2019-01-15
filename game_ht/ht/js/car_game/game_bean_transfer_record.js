  $(function () {
    var dataList = {
      page: 1,
      page_size: 10
    }
    var data = []
  
    Date.prototype.format = function (fmt) {
        var s = '';
        s += this.getFullYear() + '-';          // 获取年份。
        if (this.getMonth() < 9) {
            s += '0' + (this.getMonth() + 1) + "-";         // 获取月份。
        } else {
            s += (this.getMonth() + 1) + "-";         // 获取月份。
        }
        if (this.getDate() < 10) {
            s += '0' + this.getDate();                 // 获取日。
        } else {
            s += this.getDate();                 // 获取日。
        }
        return (s);                          // 返回日期。
    }
    function getDayAll(begin, end) {
        var dateAllArr = new Array();
        var ab = begin.split("-");
        var ae = end.split("-");
        var db = new Date();
        db.setUTCFullYear(ab[0], ab[1] - 1, ab[2]);
        var de = new Date();
        de.setUTCFullYear(ae[0], ae[1] - 1, ae[2]);
        var unixDb = db.getTime();
        var unixDe = de.getTime();
        for (var k = unixDb; k <= unixDe;) {
            dateAllArr.push((new Date(parseInt(k))).format().toString());
            k = k + 24 * 60 * 60 * 1000;
        }
        return dateAllArr;
    }
    var day = new Date()
    var today = day.format('yyyy-MM-dd')
    var sevenday = new Date(day - 1000 * 60 * 60 * 24 * 6).format('yyyy-MM-dd');
    $("#id_logtime_s").attr("value", sevenday)
    $("#id_logtime_e").attr("value", today)
    // getRecord(dataList)
    formSubmit()
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
    var startTime = $('#id_logtime_s').val()
    var endTime = $('#id_logtime_e').val()
    var idx = $('#id_idx').val()
    var page_size = $('.input-mini').val()
    if (page_size > 0) {
      page_size = page_size
    } else {
      page_size = 10
    }
    var data = {
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
      return alert('开始时间和结束时间不能为空')
    }
    if((new Date( data.endTime)-new Date( data.startTime))/1000/60/60/24>6){
      return alert('时间间隔最大只能为7天')
    }
    data.type = $('.selectType').val()
    data.user_id_out =  $('.user_id_out').val()
    data.user_id_in =  $('.user_id_in').val()
    console.log(data)
    // alert(new Date( data.endTime)-new Date( data.startTime))
    getRecord(data)
  }
  // 按条件搜索列表
  function getRecord(data) {
    dataList = data
    $.ajax({
      type: "POST",
      xhrFields:{
        withCredentials:true
        },
        url: _json_url.url+'/game/get_game_bean_transfer_record',
      data: data,
      dataType: "json",
      success:function(res){
          if(res.code===100)
          {
            
            top.window.location.href = '/?sites='+_sites
            
            
            return;
          }  
          if (res.error_code == 'SUCCESS') {
          function formatTime(time) {
            var d = new Date(time);
           var year = d.getFullYear();
           var month = (d.getMonth()+1)<10?('0'+(d.getMonth()+1)):(d.getMonth()+1);
           var day = d.getDate()<10?('0'+d.getDate()): d.getDate();
           var hours = d.getHours()<10?('0'+d.getHours()):d.getHours();
           var minutes = d.getMinutes()<10?('0'+d.getMinutes()):d.getMinutes();
           var seconds = d.getSeconds()<10?('0'+d.getSeconds()):d.getSeconds();
           var youWant= year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
            return youWant;
        }
          Object.keys(res.result.lists).forEach(key=>{
            if(res.result.lists[key]){
              res.result.lists[key].date = formatTime(res.result.lists[key].date)
              if(1 == res.result.lists[key].type){
                res.result.lists[key].type = '会员豆转豆'
              }else if(2 == res.result.lists[key].type){
                res.result.lists[key].type = '充豆'
              }else{
                res.result.lists[key].type = '扣豆'
              }
            }
          })
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
        // if(res.result.allNum ==0){
        //   $('.userMessage').html('');
        // }
        // if(res.result.allservice){
        //   var html = `${data.startTime} 00:00:00 到 ${data.endTime} 23:59:59 车行服务费累计为：${res.result.allservice}`
        //   $('.userMessage').html(html);
        // }
      }
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
    // for(var i = 0; i < list.length; i++) {
    //   list[i].betting_list = JSON.parse(list[i].betting_list)
    // }
    // console.log(list)
    var html = tmpl('table_list', list);
    dom.html(html)
  }
  function setTime(date) {
    date = new Date(date)
    return date.getTime()
  }