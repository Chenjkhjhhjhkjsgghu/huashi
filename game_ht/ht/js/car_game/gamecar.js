$(function() {
  console.log(11111)
  get_gamecar_setting()
  $('#validation-form').on('submit',function() {
    var data = {}
    if ($('#id_bankerup').val() == '') {
      alert('请输入上庄要求！')
    } else {
      data.bankerup = parseInt($('#id_bankerup').val())
    }
    if ($('#id_bankerdown').val() == '') {
      alert('请输入下庄要求！')
    } else {
      data.bankerdown = parseInt($('#id_bankerdown').val())
    }
    if ($('#id_persglmax').val() == '') {
      alert('请输入最大下注限制！')
    } else {
      data.persglmax = parseInt($('#id_persglmax').val())
    }
    if ($('#id_perwinmax').val() == '') {
      alert('请输入最大输赢限制！')
    } else {
      data.perwinmax = parseInt($('#id_perwinmax').val())
    }
    data.allowstar = $('#id_allowstar').val()
    data.exchange_coin = $('#id_exchange_coin').val()
    if ($('#id_rank1_0').val() == '') {
      alert('请输入起始时间！')
    } else{
      data.rankone_start = parseInt($('#id_rank1_0').val())
      if (data.rankone_start > 23) {
        data.rankone_start = 23
      }
      if (data.rankone_star < 0) {
        data.rankone_start = 0
      }
    }

    if ($('#id_rank1_1').val() == '') {
      alert('请输入结束时间！')
    } else{
      data.rankone_end = parseInt($('#id_rank1_1').val())
      if (data.rankone_end > 23) {
        data.rankone_end = 23
      }
      if (data.rankone_end < 0) {
        data.rankone_end = 0
      }
      if (data.rankone_end < data.rankone_start) {
        data.rankone_end = data.rankone_start
      }
    }

    if ($('#id_rank2_0').val() == '') {
      alert('请输入起始时间！')
    } else{
      data.ranktwo_start = parseInt($('#id_rank2_0').val())
      if (data.ranktwo_start > 23) {
        data.ranktwo_start = 23
      }
      if (data.rankone_star < 0) {
        data.ranktwo_start = 0
      }
    }

    if ($('#id_rank2_1').val() == '') {
      alert('请输入结束时间！')
    } else{
      data.ranktwo_end = parseInt($('#id_rank2_1').val())
      if (data.ranktwo_end > 23) {
        data.ranktwo_end = 23
      }
      if (data.ranktwo_end < 0) {
        data.ranktwo_end = 0
      }
      if (data.ranktwo_end < data.ranktwo_start) {
        data.ranktwo_end = data.ranktwo_start
      }
    }
    data.ratemap = $('#id_ratemap').val()
    data.rankshow = $('#id_rankshow').val()
    data.rankshow2 = $('#id_rankshow2').val()
    data.system_banker_set = $('#id_system_banker_set').val()
    data.system_user_id = $('#id_system_user').val()
    data.system_user_siteId = $('#id_system_user1').val()
    data.system_max_win = $('#id_system_max_win').val()
    data.system_max_lost = $('#id_system_max_lost').val()
    var chip_list = $('#id_chip').val()

    if (chip_list.length === 0) {
      alert('最少要有一个！')
    }
    if (chip_list.length > 6) {
      alert('最多只能选六个！')
    }
    for (var i = 0; i < chip_list.length - 1; i++) {
      for (var j = 0; j < chip_list.length - i - 1; j++) {
        if (parseInt(chip_list[j]) > parseInt(chip_list[j + 1])) {
          var temp = chip_list[j]
          chip_list[j] = chip_list[j + 1]
          chip_list[j + 1] = temp
        }
      }
    }
    data.chip_chosen = JSON.stringify(chip_list)
    $.ajax({
      type: 'POST',
      data: data,
      xhrFields:{
        withCredentials:true
        },
        url: _json_url.url+'/game/setting_gamecar',
      dataType: "json",
      success: function(res) {
        console.log(res)
        if(res.code===100)
          {
            
            top.window.location.href = '/?sites='+_sites
            
            
            return;
          }  
          if (res.error_code == 'SUCCESS') {
          get_gamecar_setting()
          alert('修改成功！')
        } else {
          alert(res.reason)
        }
      }
    })
    return false
  })
})
function get_gamecar_setting() {
  $.ajax({
    type: 'POST',
    data: '',
    xhrFields:{
        withCredentials:true
        },
        url: _json_url.url+'/game/get_setting_gamecar',
    dataType: "json",
    success: function(res) {
      $('#id_system_user1').empty()
      $('#id_system_user1').append(()=>{
        var str =''
        for(var i = 0;i<res.result.siteId_arr.length;i++)
        {
          str+='<option value="'+res.result.siteId_arr[i]+'">'+res.result.siteId_arr[i]+'</option>'
        }
        return  str;
      })
      setting_message(res.result)

    }
  })
}
function setting_message(data) {
  $('#id_system_banker_set').val(data.system_banker_set.toString())
        if($('#id_system_banker_set').val()!=='true')
        {
            $('#select_id').css('display','none')
        }
        else{
            $('#select_id').css('display','block')
        }
  $('#id_system_user').val(data.system_user.split('@')[0])
  $('#id_system_user1').val(data.system_user.split('@')[1])
  $('#id_system_max_lost').val(data.system_max_lost)
  $('#id_system_max_win').val(data.system_max_win)
  $('#id_bankerup').val(data.bankerup)
  $('#id_bankerdown').val(data.bankerdown)
  $('#id_persglmax').val(data.persglmax)
  $('#id_perwinmax').val(data.perwinmax)
  $('#id_allowstar').val(data.allowstar)
  $('#id_rank1_0').val(data.rankone_start)
  $('#id_rank1_1').val(data.rankone_end)
  $('#id_rank2_0').val(data.ranktwo_start)
  $('#id_rank2_1').val(data.ranktwo_end)
  $('#id_ratemap').val(data.rate)
  $('#id_rankshow').val(data.rankshow)
  $('#id_rankshow2').val(data.rankshow2)
  $('#id_chip').val(data.chip_list).chosen()
}