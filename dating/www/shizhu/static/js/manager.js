
var siteInfo = {
        'shijie': {url:'http://rooms.fq98.com:83',name:'视界'},
        '2019yl': {url:'http://rooms.fq98.com:83',name:'2019yl'},
        'bycheng': {url:'http://rooms.fq98.com:83',name:'不夜城'},
        'hjba':{url:'http://rooms.fq98.com:83',name:'欢聚吧'}
}
    function getRequest()
    {
    var json = {}
    var url = window.location.href;
    if(url.match(/\?/gi)===null)
    {
    alert('找不到网站标识符')
    return false;
    }
    var nUrl = url.split('?')[1].split('&');
    for(var i = 0;i<nUrl.length;i++)
    {
    let arr = [];
    arr = nUrl[i].split('=')
    arr[1] = arr[1].split('#')[0]
    json[arr[0]] = arr[1]
    }
    sessionStorage.setItem('_sites',JSON.stringify(json))
    return json;
    }

 var _Url = JSON.parse(sessionStorage._sites)


$(document).ready(function () {
   
    var dataList = {
        page: 1,
        page_size: 10
    }
    var urlData = _Url
    console.log('urlData', urlData)
    var siteid = urlData.sites
    var sid = urlData.sid
    var roomId = urlData.roomid
    function formSubmit() {
        var page_size = $('.input-mini').val()
        if (page_size * 1 > 0) {
            page_size = page_size
        } else {
            page_size = 10
        }
        var data = {
            page: 1,
            page_size: page_size
        }
        data.siteid = siteid
        data.sid = sid
        data.roomId = roomId
        data.adminId = $(".adminId").val()
        // alert(new Date( data.endTime)-new Date( data.startTime))
        getRecord(data)
    }
    function getRecord(data) {
         dataList = data;
        $.ajax({
            url: siteInfo[_Url.sites].url+'/shizhu/getAdminList',
            data: data,
            dataType: "json",
            success: function (res) {
                if (res.error_code == 'SUCCESS') {
                    console.log('res', res)
                    Object.keys(res.result.lists.record).forEach(function (key) {
                        if (res.result.lists.record[key].type == 1) {
                            res.result.lists.record[key].typeName = '管理员'
                        } else {
                            res.result.lists.record[key].typeName = '副室主'
                        }
                    })
                    recordList(res.result.lists.record)
                    $(".pagination").paging({
                        pageNo: res.result.pageNo,
                        totalPage: res.result.allPage,
                        totalSize: res.result.allNum,
                        callback: function (num) {
                            getPageList(num)
                        }
                    })
                    $('.allNum').html(res.result.allNum)//总条数
                    $('.allPage').html(res.result.allPage)//总页数
                } else {
                    if (res.reason) {
                        alert(res.reason)
                    }

                }
            }
        })
    }
    formSubmit()
    $('.btn-warning').on('click', function () {
        formSubmit()
    })
    function getPageList(num) {
        dataList.page = num
        getRecord(dataList)
    }

    $('#form_search').on('submit', function () {
        formSubmit()
        return false
    })
    $('#form_search2').on('submit', function () {
        formSubmit()
        return false
    })
    function recordList(lists) {
        var dom = $('#mainTable tbody')
        dom.empty()
        var list = lists
        // console.log(list)
        var html = tmpl('table_list', list);
        dom.html(html)
        $('[data-options="confirm"]').on(ace.click_event, function () {
            var url = $(this).attr("href");
            var id = $(this).attr('data-id')
            console.log(id, 'id')
            bootbox.confirm($(this).attr("data-confirm-title"), function (result) {

                if (result) {
                    $.get(url, function (res) {
                        console.log('result', res)
                        if (res.error_code == 'SUCCESS') {
                            bootbox.alert(res.reason)
                            formSubmit()

                            // window.parent.location.reload()
                        } else {
                            console.log('res.reason', res.reason)
                            bootbox.alert(res.reason)
                        }
                    });
                }
            });
        });
    }
  
    $(".btnMove").click(function(){
        var list = []
        var hint = "警告：删除将不能恢复，确定要删除吗？<br />将要删除以下管理员："
        $.each($('.optionId'),function(){
            if(this.checked){
               console.log("你选了："+
                    $('.optionId:checked').length+"个，其中有："+$(this).val());
                    list.push($(this).val())
                    hint = hint+"<br />"+$(this).val()
            }
        });
        console.log('list',list)
        console.log('hint',hint)
        //<br />
        if(list.length>0){
            bootbox.confirm(hint, function (result) {
               console.log('result:',result)
               if(result){
                   var data ={}
                   data.list = list
                   data.roomId = roomId
                   data.siteid = siteid
                   console.log('data',data.list)
                $.ajax({
                    type: "POST",
                    url: siteInfo[_Url.sites].url+'/shizhu/delectAdminList',
                    data: data,
                    dataType: "json",
                    success: function (res) {
                        if (res.error_code == 'SUCCESS') {
                            bootbox.alert(res.reason)
                        } else {
                            if (res.reason) {
                                var reason = '下列管理员删除失败：<br />' + res.reason
                                bootbox.alert(res.reason)
                            }else{
                                bootbox.alert('请求失败，请刷新页面重试')
                            }
        
                        }
                        if($('.aceOption:checked').length >=1){
                            $('.aceOption').click()
                        }
                        formSubmit()
                    }
                })
               }
            });
        }else{
            bootbox.alert('请先选择要删除的管理')
        }
       
    });


})