$(function() {
  var dataList = {}
  var chartList = []
//   getList(dataList)
  $('#form_search').on('submit',function() {
    return false
  })
  $('#btn_search').on('click',function() {
    console.log(333333)
    getList(dataList)
    return false
  })
})
_json_url = JSON.parse(sessionStorage._Url);
function getList(dataList) {
  var data = dataList
  data.idx = $('#id_idx').val()
  data.startTime = $('#id_datetime_s').val()
  data.endTime = $('#id_datetime_e').val()
  if (!data.startTime || !data.endTime) {
    console.log('请选择日期！')
    alert('请选择日期！')
    return false
  }
  $.ajax({
    type: "POST",
    xhrFields:{
        withCredentials:true
        },
        url: _json_url.url+'/game/daily_winlost',
    data: data,
    dataType: "json",
    success:function(res){
      if(res.code===100)
          {
            
            top.window.location.href = '/?sites='+_sites
            
            
            return;
          }  
          if (res.error_code == 'SUCCESS') {
        chartList = res.result.lists
        setChart(chartList)
        var html = res.result.startTime + '至' + res.result.endTime + '用户【' + res.result.user_id + '】 总输赢为 ：' + res.result.allProfit
        $('.userMessage').html(html)
      }
      else{
        alert(res.reason)
      }
    }
  })
}
function setChart(lists) {
  var dateList = []
  var dataList = []
  for (var i = 0; i < lists.length; i++) {
    dateList.push(lists[i].time)
    dataList.push(lists[i].winlost)
  }
  var myChart = echarts.init(document.getElementById('main'));
  option = {
      tooltip : {
          trigger: 'axis'
      },
      toolbox: {
          show : true,
          feature : {
              restore : {show: true},
              saveAsImage : {show: true}
          }
      },
      calculable : true,
      legend: {
          data: ["输赢"]
      },
      xAxis : [
          {
              type : 'category',
              data : dateList // 日期
          }
      ],
      yAxis : [

          {"type":"value",
              "name":"",
              "axisLabel" : {
                  "formatter": '{value}'
              }
          }


      ],
      series : [
          {   "type":"bar",
              "name":"输赢",


              itemStyle: {
                  normal: {
                      label : {
                          show: true, position: 'top'
                      }
                  }
              },

              "data" : dataList // 数据
          }

      ]
  };
  myChart.setOption(option); 
}

