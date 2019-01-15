  

$(document).ready(function(){
  $('#logo').attr('src','images/'+getUrl().sites+'.png')
	$('.user_topmenu li').each(function(index){

    var url = $(this).attr('rel')+"?sites="+getUrl().sites+"&"+'sid='+getUrl().sid;
    $(this).attr('rel',url)
    if($($('.user_topmenu li span')[index]).text()==='积分兑换')
     {
      $($('.user_topmenu li span')[index]).parent().css('display','none')
     }
      if($($('.user_topmenu li span')[index]).text()==='兑换查询')
     {
      $($('.user_topmenu li span')[index]).parent().css('display','none')
     }
  })
})
  var _Url = '';
  function getUrl()
  {
      var json = {}
      var url = window.location.href;
      var nUrl = url.split('?')[1].split('&');
      for(var i = 0;i<nUrl.length;i++)
      {
        var arr = [];
        arr = nUrl[i].split('=')
        json[arr[0]] = arr[1]
      }
     return json;

  }

function Login(callback)
{
   $.ajax({
    async: false,
    url:'https://api.fq98.com:88/get_sites_jsonp',
    dataType:'jsonp',
    success:function(res){
      _Url = res;
       $.get({
      url:_Url[getUrl().sites].url+'/user/user_login',
       data:getUrl(),
       dataType: 'jsonp',
       success:callback
       })
    $('#logout').attr('href',_Url[getUrl().sites].url+'/logout?sites='+getUrl().sites)
    }
  })
}
Login(function(res){
   if(res.msg.output.level * 1<1710||res.msg.output.level * 1>1780){
      $('.user_topmenu li').each(function(index){
     if($($('.user_topmenu li span')[index]).text()==='积分兑换')
     {
      $($('.user_topmenu li span')[index]).parent().css('display','none')
     }
      if($($('.user_topmenu li span')[index]).text()==='兑换查询')
     {
      $($('.user_topmenu li span')[index]).parent().css('display','none')
     }
  })
   }else{
      $('.user_topmenu li').each(function(index){
     if($($('.user_topmenu li span')[index]).text()==='积分兑换')
     {
      $($('.user_topmenu li span')[index]).parent().css('display','block')
     }
      if($($('.user_topmenu li span')[index]).text()==='兑换查询')
     {
      $($('.user_topmenu li span')[index]).parent().css('display','block')
     }
  })
   }
})

  var options = [
  { 'label': '游客', 'value': 100 }, { 'label': '注册用户', 'value': 200 }, { 'label': 'VIP', 'value': 1300 }, { 'label': '终身VIP', 'value': 1310 }, { 'label': '大亨', 'value': 1320 }, { 'label': '超级大亨', 'value': 1330 }, { 'label': '财主', 'value': 1340 }, { 'label': '超级管理', 'value': 1350 }, { 'label': '紫尊', 'value': 1360 }, { 'label': '金尊', 'value': 1370 }, { 'label': '天尊', 'value': 1380 }, { 'label': '帝尊', 'value': 1390 }, { 'label': '天王', 'value': 1391 }, { 'label': '一星主持', 'value': 1710 }, { 'label': '二星主持', 'value': 1720 }, { 'label': '三星主持', 'value': 1730 }, { 'label': '四星主持', 'value': 1740 }, { 'label': '五星主持', 'value': 1750 }, { 'label': '超级主持', 'value': 1760 }, { 'label': 'MC主持', 'value': 1770 }, { 'label': '代理', 'value': 1780 }, { 'label': '巡管', 'value': 1900 }, { 'label': '客服', 'value': 1910 }, { 'label': '站长', 'value': 1920 },
];

function setlevel(arr)
{
  for(var i = 0;i<options.length;i++)
  {
     if(arr == options[i].value)
     {
      return options[i].label; 
     }
  }
}

 jQuery(function($){ 
          $.datepicker.regional['zh-CN'] = {
              clearText: '清除', 
              clearStatus: '清除已选日期', 
              closeText: '关闭', 
              closeStatus: '不改变当前选择', 
              prevText: '< 上月', 
              prevStatus: '显示上月', 
              prevBigText: '<<', 
              prevBigStatus: '显示上一年', 
              nextText: '下月>', 
              nextStatus: '显示下月', 
              nextBigText: '>>', 
              nextBigStatus: '显示下一年', 
              currentText: '今天', 
              currentStatus: '显示本月', 
              monthNames: ['一月','二月','三月','四月','五月','六月', '七月','八月','九月','十月','十一月','十二月'], 
              monthNamesShort: ['一月','二月','三月','四月','五月','六月', '七月','八月','九月','十月','十一月','十二月'], 
              monthStatus: '选择月份', 
              yearStatus: '选择年份', 
              weekHeader: '周', 
              weekStatus: '年内周次', 
              dayNames: ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'], 
              dayNamesShort: ['周日','周一','周二','周三','周四','周五','周六'], 
              dayNamesMin: ['日','一','二','三','四','五','六'], 
              dayStatus: '设置 DD 为一周起始', 
              dateStatus: '选择 m月 d日, DD', 
              dateFormat: 'yy-mm-dd', 
              firstDay: 1, 
              initStatus: '请选择日期', 
              isRTL: false}; 
          $.datepicker.setDefaults($.datepicker.regional['zh-CN']); 
      });