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

 _Url = '';
  num = '';
function Login(callback)
{
  if(_Url==='')
{
  $.ajax({
  url:'https://pay.fq98.com:8890/get_sites',
  dataType:'jsonp',
  async:false,
  data:{
    sites:getUrl().sites
  },
  success:function(res){
     _Url=res;
     $('.pay_c1 span').text(_Url.name)
     $('.top_tit').text(_Url.name+'充值中心')
   callback(res)
  }
})
}
else{
callback(_Url)
}
}

    function submit2() {
      var order_num = $('#oid').val()
      window.location.href='gateway.html?order_num=' + order_num +'&type=' + 2+'&sites='+data.sites;
    }
    function submit3() {
      var order_num = $('#oid').val()
      window.location.href='gateway.html?order_num=' + order_num +'&type=' + 3+'&sites='+data.sites;
    }
    // 生成订单编号

    function submit() {

      var userid = $('#userid2').val()
      var belong = $(".belong").val()
      var name = $('#submit').attr('data-name')
      var type = $('#type').val()
         $.ajax({
        url: _Url.url+'/creat_order',
        data: {
          order_money:$('#s_money').text(),
          userid: userid,
          type: type,
          name: name,
          sites:data.sites,
          belong:belong
        },
        dataType:'jsonp',
        success:function(res){
          if (res.error_code === 'SUCCESS') {
            $('.pay_info1').hide()
            $('.pay_info2').show()
            $('.pay_info2 .order_num').html(res.result.order_num)
            $('.pay_info2 .order_name').html(res.result.name)
            $('.pay_info2 .order_money').html(res.result.order_money / 100 + '元')
            $('#oid').val(res.result.order_num)
          }
        }
      })
    }

    function submitAgent() {
      var userid = $('#userid').val()
         $.ajax({
        url: _Url.url+'/create_agent_order',
        data: {
          order_money:$('#s_money').text(),
          agent_id:userid,
          type: 2,
          sites:data.sites
        },
        dataType:'jsonp',
        success:function(res){
          if (res.error_code === 'SUCCESS') {
            $('.pay_info1').hide()
            $('.pay_info2').show()
            $('.pay_info2 .order_num').html(res.result.order_num)
            $('.pay_info2 .order_name').html(res.result.agent_id)
            $('.pay_info2 .order_money').html(res.result.order_money / 100 + '元')
            $('#oid').val(res.result.order_num)
          }
        }
      })
    }
 function clearDefaultText (el,message)
    {
        var obj = el;
        if(typeof(el) == "string")
            obj = document.getElementById(id);
        if(obj.value == message)
        {
            obj.value = "";
            obj.style.color="#333";
        }
        obj.onblur = function()
        {
            if(obj.value == "")
            {
                obj.value = message;
                obj.style.color="#999";
            }
        }
    }
  function search() {
    
      if (searchStatus) {
        searchStatus = false;

        //   var sid = $('#userid2').val()
        var userid = $('#userid2').val()
          var random = Math.floor(Math.random()*1000)
         Login(function(Url){
             $.ajax({
            url: Url.url+'/user?userid=' + userid + '&random=' + random + '&sites=' + data.sites,
            dataType: "jsonp",
            success:function(res){
              searchStatus = true;
              if (res.error_code === 'SUCCESS') {
                res.result.belong = res.result.belong===''?'该用户没有指定房间':res.result.belong
                $('.pay_btn input').attr('disabled', false)
                $('#submit').attr('data-name', res.result.name)
                var nickName = res.result.name;
                $('#nickName').text(nickName+'('+userid+')');
                $('#belong').text(res.result.belong);
                // $('.pay_btn').attr("hidden",'false')
                $('.pay_btn').show();
                
              }else{
                // $(".pay_c1").html(`充值站点：<span style="color:red;font-weight:bold;">请输入正确的用户ID</span> （请务必确认充值站点）`)
                // alert(111)
                $('#nickName').text('用户不存在')
                $('.pay_btn').hide()
              }
            }
          })
         })
      }
    }
    var searchStatus = true
    $(document).ready(function(){
    $('.logo img').attr('src','../../logo/'+getUrl().sites+'.png');
    $('.login_min').each(function(){
      $(this).attr('src','../../logo/'+getUrl().sites+'_min.png')
    })
    var site = '';
    data = getUrl();
    //  if(typeof data.sid !== undefined){
    //     $("#userid2").attr('value',)
    //  }
    // alert(data.userid)
        if(data.userid){
            $('#userid2').val(data.userid)
            $('#userid').val(data.userid)
            
            $('#pay_box a').each(function(){
               var url =  $(this).attr('href')+'?userid='+data.userid+'&sites='+data.sites;
               $(this).attr('href',url)
            })
        }
        
    //   getMyMessage()
    if($('#submit_card').length!==0)
    {
       $('#submit_card').on('click',function(){
      var belong = $(".belong").val()
      var name = $('#submit').attr('data-name')
      $.ajax({
          url: _Url.url+'/point_recharge',
        data: {
          sites:data.sites,
          userid:userid,
          card:$('#card').val(),
          card_pass:$('#card_pass').val()
        },
        dataType:'jsonp',
        success:function(res){
          if(res.error_code ==='SUCCESS'){
            alert('充值成功!'+'\n'+'本次操作金额：+'+res.result.coin+'\n'+'您的余额为:'+res.result.coin_after)
          }
          else{
            alert(res.reason)
          }
         
        }
      })
    })
    }
        if($('#userid').length!==0)
        {
          $('.pay_btn2').on('click', function() {
        submit2()
      })
          $('#submit').on('click', function() {
           submitAgent()
      })
         searchAgent();

         $('#userid').blur(function(){
          searchAgent()
         })
        }


       function searchAgent()
       {
        if (searchStatus) {
           searchStatus = false;
        //   var sid = $('#userid2').val()
            var userid = $('#userid').val()
            var random = Math.floor(Math.random()*1000)
         Login(function(Url){
             $.ajax({
            url: Url.url+'/get_agent_info?agent_id=' + userid + '&random=' + random + '&sites=' + data.sites,
            dataType: "jsonp",
            success:function(res){
                searchStatus = true;
              if (res.error_code === 'SUCCESS') {
                $('.pay_btn input').attr('disabled', false)
                $('#submit').attr('data-name', res.result.name)
                var nickName = res.result.userId
                $('#nickName').text(nickName);
                // $('.pay_btn').attr("hidden",'false')
                $('.pay_btn').show();
                $('#belong').text(res.result.belong);
              }else{
                // $(".pay_c1").html(`充值站点：<span style="color:red;font-weight:bold;">请输入正确的用户ID</span> （请务必确认充值站点）`)
                // alert(111)
                $('#nickName').text('用户不存在')
                $('.pay_btn').hide()
              }
            }
          })
         })
    }



       }
       if($('#userid2').length!==0)
       {
        console.log('asd')
        search()
         $('#submit').on('click', function() {
        submit()
      })
      $('.pay_btn2').on('click', function() {
        submit2()
      })
      $('.pay_btn3').on('click', function() {
        submit3()
      }) 
           var timeToSend1 = ''
        $('.pay_c b').click(function(){
            $('.pay_c').hide();
            $('.pay_x').show();
        })
        $('#search').click(function(){
            // $('.pay_c').show();
            // $('.pay_x').hide();
            $('.pay_btn').hide()
            search()
        })
        $("#userid2").on("input change keypress",function(){
            $(".pay_btn>input").attr("disabled","disabled")
            $("#userid").val(this.value)
            // search()
            $('#nickName').val('')
            $('.pay_btn').hide()
            if (timeToSend1) {
                clearTimeout(timeToSend1)
            }
            if($("#userid2").val()){
                timeToSend1 = setTimeout(function(){
                    search()
            }, 1000)
            }
            else{

      $('#nickName').text('');
       $('#belong').text('');
     
            }
        })

    
       }
     
    
  
            $('.checked_radio span').live("click",function(){
            $(this).addClass('rd_on').siblings().removeClass('rd_on');
        })

        $("input[name=p_userid]").live("click",function(){
            $("#userid").val(this.value)
        })

        $('#on_bank').click(function(){
            $('#pay_bank').animate({height:'370'});
            $(this).hide();
        })

        $('.pay_btn').click(function () {
            if ($("#userid").val() == "") {
                alert("账号不能为空！,请输入账号并确认账号");
            }
            else {
                // $("#pay_k").zxxbox();
                console.log(111111)
            }
        });

        $("#pay_k").click(function(){
            $.zxxbox.hide();
        })
              if($('#p_money').length===0)
            {
              return;
            }
            $(":radio[name='p_card']").click(function(){
                if(!$(this).attr("price"))
                {
                    $("#d_money").show();
                    $("#s_money").html($("#p_money").val())
                    $("#s_coin").html(CalcCoin(parseInt($("#p_money").val())))
                }
                else
                {
                    $("#d_money").hide();
                    $("#s_money").html($(this).attr("price"))
                    $("#s_coin").html(CalcCoin(parseInt($(this).attr("price"))))
                }

            })
            $("#p_money").keydown(function(){
                if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)
                        && event.keyCode != 8
                        && event.keyCode != 13)
                    return false;

            }).keyup(function(){

                        num = $(this).val()
                        coin = CalcCoin(parseInt(num))
                        if(parseInt(num) % 10 == 0)
                        {

                            $("#s_money").text(num)
                            $("#s_coin").text(coin)
                        }
                    }).focusout(function()
                    {
                        // num = $(this).val()
                        // if(parseInt(num) % 10 != 0)
                        // {
                        //     $(this).val(num)
                        //     $("#s_money").html(10)
                        //     $("#s_coin").html(CalcCoin(10))
                        // }
                        num = $(this).val()
                        coin = CalcCoin(parseInt(num))
                        if(parseInt(num) % 10 == 0)
                        {
                            $("#s_money").html(num)
                            $("#s_coin").html(coin)
                        }
                    })

            $("input:checked").click();


       
    })
   function CalcCoin(money)
        {
            coin = 100000.0;
            total = coin*money;
            return total;

        }