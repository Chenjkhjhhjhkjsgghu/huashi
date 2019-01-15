$(function() {
    var _p = $("#drpPid");
    var _c = $("#drpCity");

    _p.change(function() {
    _c.empty();
        $.ajax({
            url: '/city/' + $(this).val()+'/',
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


//function GetCity2(proId, cityId) {
//    clear(document.getElementById(cityId));
//    $.ajax({
//        url: '../ajax.aspx?pid=' + $('#' + proId).val(),
//        type: 'GET',
//        dataType: 'xml',
//        timeout: 20000,
//        error: function() {
//            alert('Error loading XML document');
//        },
//        success: function(xml) {
//            $(xml).find('city').each(
//                        function() {
//                            var item_value = $(this).find('id').text();
//                            var item_text = $(this).find('name').text();

//                            $('#' + cityId).append('<option value=\"' + item_value + '\">' + item_text + '</option>');
//                        }
//                    );
//        }
//    });

//}