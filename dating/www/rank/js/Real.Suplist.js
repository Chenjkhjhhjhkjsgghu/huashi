/// <reference path="jquery.min.js" />


///by tinder
///2011.5.24

(function ($) {
    $.fn.ImagesList = function (options) {
        var _this = $(this);
        var defaults = {
            id: 1,
            time: 1000,
            stime: 1000
        };
        var o = $.extend(defaults, options);
        if (_this.length == 0) return;

        var _in = false;
        var _max = 0;
        var _width = 0;
        var _n = 0;
        //var _list = ;

        function _list() {
            return _this.find("ul>li");
        }
        _init();
        function _init() {
            _this.css("overflow", "hidden");
            _this.find("ul").css("width", "10000px");
            // _list()
            _max = _list().length;
            for (var i = 0; i < _max; i++) {//(_max > 4 ? 4 : _max)
                _list().eq(i).attr("style", "float:left;display:inline;")
                _list().eq(i).css("heght", "");
                //_list().eq(i).show();

            }
            if (_max > 1) {
                _width = _list().eq(0).width();
                // alert(_width);
            }
        }

        _this
        .mouseover(function () {
            _in = true;
        })
        .mouseout(function () {
            _in = false;
        });

        if (_max > 4) {
            setInterval(_next, o.time);
        }
        var _left = 0;
        function _next() {
            if (!_in) {
                // _left += _width / 10;
                _list().eq(0).animate({ marginLeft: "-" + _width + "px" }
                , o.stime
                , "linear"
                , function () {
                    //                    _list().eq(0).hide();
                    //                    _list().eq(4).show();
                    _list().eq(0).insertAfter(_list().eq(_max - 1)).css("margin-left", "0px");
                });
                //alert(_left);

                //                if (_left >= _width) {
                //                    _left = 0;
                //                    _list().eq(0).hide();
                //                    _list().eq(4).show();
                //                    _list().eq(0).insertAfter(_list().eq(_max - 1));
                //                }

            }
        }

    };
})(jQuery);

(function ($) {
    $.fn.ItemShow = function (options) {
        var _this = $(this);
        var defaults = {
            id: 1,
            time: 1000
        };
        var o = $.extend(defaults, options);
        if (_this.length == 0) return;
        if (_this.find("a").length > 0) {
            _this.find("a").each(function () {
                $(this).mouseover(function () {
                    var index = $(this).prevAll().length;
                    // alert(index);
                    $(this).siblings().attr("class", "");
                    $(this).attr("class", "on");
                    var _p = $(this).parent().parent();
                    if (_p.find("table").length == 0) {
                        _p = _p.parent();
                    }
                    // alert($(this).parent().parent().parent().find("table").length);
                    _p.find("table").hide();
                    _p.find("table").eq(index).show();
                });

            });
        }
    };
})(jQuery);