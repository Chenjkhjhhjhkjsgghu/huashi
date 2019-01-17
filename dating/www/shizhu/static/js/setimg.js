var siteInfo = {
        'shijie': {url:'http://api.fq98.com:84',name:'视界'},
        '2019yl': {url:'http://api.fq98.com:84',name:'2019yl'},
        'bycheng': {url:'http://api.fq98.com:84',name:'不夜城'},
        'hjba':{url:'http://api.fq98.com:84',name:'欢聚吧'}
}

$(document).ready(function () {
    function getRequest() {
        var url = window.location.search; //获取url中"?"符后的字串
        console.log(url)
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            var strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
            }
        }
        return theRequest;
    }
    var urlData = getRequest()
    var roomid = urlData.roomid
    var siteid = urlData.sites
    var sid = urlData.sid
    var data = {}
    data.roomid = roomid
    data.siteid = siteid
    data.sid = sid
    $.ajax({
        type: "GET",
        url: siteInfo[getRequest().sites].url+'/shizhu/getRoomImg',
        data: data,
        dataType: "json",
        success: function (res) {
           if(res&&res.error_code == 'SUCCESS'){
              $('.btn-info').show()
              var imgInfo = res.result.lists
              if(imgInfo){
                  if(imgInfo.indexOf('img')>=0){
                      //获取前端服务器默认的
                    var img = "/shizhu/static/img/" + res.result.lists
                    $('.nowImg').attr('width','130px' )
                    $('.nowImg').attr('height','100px' )
                    $('.nowImg').attr('src',img)
                  }else{
                    var img = siteInfo[getRequest().sites].url+"/images/"+siteid+"/" + imgInfo
                    $('.nowImg').attr('width','130px' )
                    $('.nowImg').attr('height','100px' )
                    $('.nowImg').attr('src',img)
                  }
              }else{
                var img = "/img/" + siteid+".gif"
                $('.nowImg').attr('width','130px' )
                $('.nowImg').attr('height','100px' )
                $('.nowImg').attr('src',img)
              }
           }else{
               
           }
        }
    })
    $('.btn-info').on('click',function(){
        // var img = $('#id_photo').val()
        var imgInfo =  $('.nowImg').attr('src')
        if(imgInfo.indexOf('data')==0){
            var file = document.getElementById("id_photo").files[0]
            console.log(document.getElementById("id_photo").files)
            if(!file){
                return alert('请先选择图片')
            }
            var size = document.getElementById("id_photo").files[0].size /1024
            if(100 < size){
                return alert('请图片大小在100k以内的图片')
            }
            var reader = new FileReader();
            reader.onload = function (e) {
                var data = e.target.result;
                console.log('data',data)
                //加载图片获取图片真实宽度和高度
                var image = new Image();
                image.onload = function () {
                    var width = image.width;
                    var height = image.height;
                   if(width>200||height>153){
                    return alert('图片尺寸应在130*100内')
                       
                   }
                   var data = new FormData();
                   data.append('file',file)
                   console.log('data',data)
                   $.ajax({
                    url: siteInfo[getRequest().sites].url+'/uploadRoomImg?siteid='+siteid+'&roomid='+roomid,
                    data: data,
                    contentType: false,
                    processData: false,
                    type: 'POST',
                    success: function (result) {
                       if(result.error_code == 'SUCCESS'){
                           alert('保存成功')
                       }else{
                           alert("保存失败")
                       }
                    },
                    error: function (err) {
                        console.error(err);
                        alert("请求超时")
                    }
                    })
                  
                };
                image.src = data;
            };
            reader.readAsDataURL(file)
        }else if(imgInfo.indexOf('http:') ==0){
            //非上传图片接口
            imgInfo = imgInfo.split('/')
            var imgNum = imgInfo[imgInfo.length-1]
            var data = {}
            data.imgNum = imgNum
            data.siteid = siteid
            data.roomid = roomid
            $.ajax({
                url: siteInfo[getRequest().sites].url+'/updateRoomImg',
                data: data,
                type: 'POST',
                success: function (result) {
                   if(result.error_code == 'SUCCESS'){
                       alert('保存成功')
                   }else{
                       alert("保存失败")
                   }
                },
                error: function (err) {
                    console.error(err);
                    alert("请求超时")
                }
                })
        }else{
            alert('请先选择图片')
        }
     
    })

    


})