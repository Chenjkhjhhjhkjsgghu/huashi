$(function() {
    var _p = $("#drpPid");
    var _c = $("#drpCity");

    _p.change(function() {
    _c.empty();
        $.ajax({
            xhrFields:{
        withCredentials:true
        },
        url: _json_url.url+'/city/' + $(this).val()+'/',
            type: 'GET',
           // dataType: 'json',
            timeout: 20000,
			 
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert('Error');
            },
            success: function(json) {
                for (var i = 0; i < json.length; i++) {
                    //alert(json[i]["n"]);
                    _c.append('<option value=\"' + json[i]["n"] + '\">' + json[i]["n"] + '</option>');
                }

                //                json.each(function() {
                //                    alert($(this));
                //                });

            }
        });
    });


});
