
function getGroupRoomList() {
  $.ajax({
    type: 'POST',
    data: {
    	page: 0,
  		page_size: 100,
  		name: 'all'
    },
    xhrFields:{
        withCredentials:true
        },
        url: _json_url.url+'/room_group/getGroupRoomList',
    dataType: "json",
    success: function(res) {
      if(res.code===100)
          {
            
            top.window.location.href = '/?sites='+_sites
            
            
            return;
          }  
          if (res.error_code == 'SUCCESS') {
        console.log(res)
        setList(res.result.record)
      } else {
        alert(res.reason)
      }
    }
  })
}