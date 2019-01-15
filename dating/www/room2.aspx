<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link rel="stylesheet" type="text/css" href="../static/css/reset_min.css" media="all" />
<link rel="stylesheet" type="text/css" href="../static/css/global_min.css?v=201703231518" media="all" />
<link rel="stylesheet" type="text/css" href="../static/css/room.css?v=9" media="all" />
<title>Client</title>
	<script type="text/javascript" src="../static/js/jquery.min.js"></script>
	<script type="text/javascript" src="../static/js/main.js"></script>
	<script type="text/javascript">
		$(function(){

		
		
		$(".rank_con ul li:even").addClass("rlbg")
		
		
		$('.beauti_girl ul,.room_recommend ul,').hover(function(){
			$(this).addClass('cur').siblings().removeClass('cur');
		},function(){
			$(this).removeClass('cur');
		})

		})
	</script>
    <script>
	 function a(divID){
		 
		 document.getElementById(divID).style.display="block";
		 
	 }
	 function b(divID){
		 
		 document.getElementById(divID).style.display="none";
		 
	 }
	</script>
    <script>
        $(document).ready(function() {
            fixed();
            $(window).resize(function() {
                ff();
                fixed();
            });
        });



        function fixed() {
            var offset = $('.sider_l').offset().left + $('.sider_l').outerWidth(true) + 10;
            var padding = $('.wrapper').css('padding-top');

            $('.sider_r').css({
                'position': 'fixed',
                'top': padding,
                'left': offset
            });
        }

        function ff(){
            var dwidth=document.getElementById('bbd').clientWidth;

            if (835<dwidth)
            {$('.jqw').css('width','16.6%');}
            else if (705<dwidth)
            {$('.jqw').css('width','20%');}
            else if (dwidth<=705)
            {$('.jqw').css('width','25%');}
        }
    </script>
</head>

<body onload="ff()">
<div class="wrapper">
    
         
			<div class="sider_l">
			
			
			
            <div class="beauti_girl">				
				<div class="hd"><img src="../static/images/icon_tt.gif" /><h2>房间列表</h2></div>
                <div class="bd" id="bbd">
					<ul>
                        

                            <li onmouseover="a('onair0')" onmouseout="b('onair0')" class="jqw">
                                <div class="roomphoto" onclick="location.href='?roomid=10088&roompwd=0&visable=1&type=300&rtype=64&hstype=1&'">
                                    <div id="onair0" class="photo_onair" style="display:none"></div><div class="photo_onroomid">房间ID：10088</div><div class="photo_rtip">推荐</div>
                                    
                                        <img src="../ping/room/9fb553110f0c7c440ec3342e7271ebcb_62463.gif" width="130px" height="100px" onerror="this.onerror='';this.src= '../img/mo.gif'" />
                                    
                                </div>
                                <div class="roominfo"><h2 style="color:red">
                                    
                                        <img src="../static/images/roomicon/icon_sign7.gif" title="人气王" />
                                    
                                    
                                    
                                        <img src="../static/images/roomicon/icon_rstar.gif" title="积分第一"/>
                                    
                                    
                                    
                                    oО魅力金座ゞ</h2><h3><img src="../static/images/avater.gif" />300/300</h3><div class="btn_goys"><a href="?roomid=10088&roompwd=0&visable=1&type=300&rtype=64&hstype=1&"><img src="../static/images/enter.gif" /></a><a href="?roomid=10088&roompwd=0&visable=0&type=300&rtype=64&hstype=1&"><img src="../static/images/go.gif" /></a>
                                </div></div></li>

                        

                            <li onmouseover="a('onair1')" onmouseout="b('onair1')" class="jqw">
                                <div class="roomphoto" onclick="location.href='?roomid=10055&roompwd=0&visable=1&type=300&rtype=64&subtype=0&'">
                                    <div id="onair1" class="photo_onair" style="display:none"></div><div class="photo_onroomid">房间ID：10055</div><div class="photo_rtip">推荐</div>
                                    
                                        <img src="http://img.piupiu.com/ping/room/eca50c55889e7869c3980b866e28c2be_15962.png" width="130px" height="100px" onerror="this.onerror='';this.src= '../img/mo.gif'" />
                                    
                                </div>
                                <div class="roominfo"><h2 style="color:red">
                                    
                                    
                                    
                                        <img src="../static/images/roomicon/icon_rstar.gif" title="积分第三"/>
                                    
                                    
                                    
                                    ℡﹏習慣有你☆づ</h2><h3><img src="../static/images/avater.gif" />299/300</h3><div class="btn_goys"><a href="?roomid=10055&roompwd=0&visable=1&type=300&rtype=64&subtype=0&"><img src="../static/images/enter.gif" /></a><a href="?roomid=10055&roompwd=0&visable=0&type=300&rtype=64&subtype=0&"><img src="../static/images/go.gif" /></a>
                                </div></div></li>

                        

                            <li onmouseover="a('onair2')" onmouseout="b('onair2')" class="jqw">
                                <div class="roomphoto" onclick="location.href='?roomid=11188&roompwd=0&visable=1&type=300&rtype=2112&subtype=0&'">
                                    <div id="onair2" class="photo_onair" style="display:none"></div><div class="photo_onroomid">房间ID：11188</div><div class="photo_rtip">推荐</div>
                                    
                                        <img src="http://img.piupiu.com/c01be473a05084eb6f7aae1a5e3928c8_5255.gif" width="130px" height="100px" onerror="this.onerror='';this.src= '../img/mo.gif'" />
                                    
                                </div>
                                <div class="roominfo"><h2 style="color:red">
                                    
                                        <img src="../static/images/roomicon/icon_sign2.gif" title="开业房" />
                                    
                                    
                                    
                                    
                                    
                                    沉迷世界</h2><h3><img src="../static/images/avater.gif" />260/300</h3><div class="btn_goys"><a href="?roomid=11188&roompwd=0&visable=1&type=300&rtype=2112&subtype=0&"><img src="../static/images/enter.gif" /></a><a href="?roomid=11188&roompwd=0&visable=0&type=300&rtype=2112&subtype=0&"><img src="../static/images/go.gif" /></a>
                                </div></div></li>

                        

                            <li onmouseover="a('onair3')" onmouseout="b('onair3')" class="jqw">
                                <div class="roomphoto" onclick="location.href='?roomid=10999&roompwd=0&visable=1&type=300&rtype=3072&subtype=0&'">
                                    <div id="onair3" class="photo_onair" style="display:none"></div><div class="photo_onroomid">房间ID：10999</div><div class="photo_rtip">推荐</div>
                                    
                                        <img src="http://img.piupiu.com/ping/room/58fa72ed329b116791310c75392f6f5b_5465.jpg" width="130px" height="100px" onerror="this.onerror='';this.src= '../img/mo.gif'" />
                                    
                                </div>
                                <div class="roominfo"><h2 style="color:red">
                                    
                                        <img src="../static/images/roomicon/icon_sign5.gif" title="优胜房" />
                                    
                                    
                                    
                                    
                                    
                                    ︶ㄣ独领风骚︶</h2><h3><img src="../static/images/avater.gif" />299/300</h3><div class="btn_goys"><a href="?roomid=10999&roompwd=0&visable=1&type=300&rtype=3072&subtype=0&"><img src="../static/images/enter.gif" /></a><a href="?roomid=10999&roompwd=0&visable=0&type=300&rtype=3072&subtype=0&"><img src="../static/images/go.gif" /></a>
                                </div></div></li>

                        

                            <li onmouseover="a('onair4')" onmouseout="b('onair4')" class="jqw">
                                <div class="roomphoto" onclick="location.href='?roomid=15555&roompwd=0&visable=1&type=300&rtype=2048&subtype=0&'">
                                    <div id="onair4" class="photo_onair" style="display:none"></div><div class="photo_onroomid">房间ID：15555</div><div class="photo_rtip">推荐</div>
                                    
                                        <img src="http://img.piupiu.com/c34d4fb5a3d95925bd5939534a4454aa_45154.gif" width="130px" height="100px" onerror="this.onerror='';this.src= '../img/mo.gif'" />
                                    
                                </div>
                                <div class="roominfo"><h2 style="color:red">
                                    
                                        <img src="../static/images/roomicon/icon_sign2.gif" title="开业房" />
                                    
                                    
                                    
                                    
                                    
                                    じ★SY赌神酒吧</h2><h3><img src="../static/images/avater.gif" />289/300</h3><div class="btn_goys"><a href="?roomid=15555&roompwd=0&visable=1&type=300&rtype=2048&subtype=0&"><img src="../static/images/enter.gif" /></a><a href="?roomid=15555&roompwd=0&visable=0&type=300&rtype=2048&subtype=0&"><img src="../static/images/go.gif" /></a>
                                </div></div></li>

                        

                            <li onmouseover="a('onair5')" onmouseout="b('onair5')" class="jqw">
                                <div class="roomphoto" onclick="location.href='?roomid=19888&roompwd=0&visable=1&type=300&rtype=2048&subtype=0&'">
                                    <div id="onair5" class="photo_onair" style="display:none"></div><div class="photo_onroomid">房间ID：19888</div><div class="photo_rtip">推荐</div>
                                    
                                        <img src="http://img.piupiu.com/ping/room/002131017e8795cdc838039fd0a85e7f_8111.gif" width="130px" height="100px" onerror="this.onerror='';this.src= '../img/mo.gif'" />
                                    
                                </div>
                                <div class="roominfo"><h2 style="color:red">
                                    
                                        <img src="../static/images/roomicon/icon_sign2.gif" title="开业房" />
                                    
                                    
                                    
                                    
                                    
                                    光芒万丈小太阳！</h2><h3><img src="../static/images/avater.gif" />279/300</h3><div class="btn_goys"><a href="?roomid=19888&roompwd=0&visable=1&type=300&rtype=2048&subtype=0&"><img src="../static/images/enter.gif" /></a><a href="?roomid=19888&roompwd=0&visable=0&type=300&rtype=2048&subtype=0&"><img src="../static/images/go.gif" /></a>
                                </div></div></li>

                        

                            <li onmouseover="a('onair6')" onmouseout="b('onair6')" class="jqw">
                                <div class="roomphoto" onclick="location.href='?roomid=10818&roompwd=0&visable=1&type=300&rtype=0&subtype=0&'">
                                    <div id="onair6" class="photo_onair" style="display:none"></div><div class="photo_onroomid">房间ID：10818</div>
                                    
                                        <img src="http://img.piupiu.com/ping/room/4146c9616f0ac570902c7d4897d3d196_20020.jpg" width="130px" height="100px" onerror="this.onerror='';this.src= '../img/mo.gif'" />
                                    
                                </div>
                                <div class="roominfo"><h2 style="color:red">
                                    
                                        <img src="../static/images/roomicon/icon_sign5.gif" title="优胜房" />
                                    
                                    
                                    
                                    
                                    
                                    车行VS酒窝</h2><h3><img src="../static/images/avater.gif" />300/300</h3><div class="btn_goys"><a href="?roomid=10818&roompwd=0&visable=1&type=300&rtype=0&subtype=0&"><img src="../static/images/enter.gif" /></a><a href="?roomid=10818&roompwd=0&visable=0&type=300&rtype=0&subtype=0&"><img src="../static/images/go.gif" /></a>
                                </div></div></li>

                        

                            <li onmouseover="a('onair7')" onmouseout="b('onair7')" class="jqw">
                                <div class="roomphoto" onclick="location.href='?roomid=15588&roompwd=0&visable=1&type=300&rtype=2048&subtype=0&'">
                                    <div id="onair7" class="photo_onair" style="display:none"></div><div class="photo_onroomid">房间ID：15588</div>
                                    
                                        <img src="http://img.piupiu.com/ping/room/125e4cfb2292dbb89bc7e6c49bad411d_38775.jpg" width="130px" height="100px" onerror="this.onerror='';this.src= '../img/mo.gif'" />
                                    
                                </div>
                                <div class="roominfo"><h2 style="color:red">
                                    
                                        <img src="../static/images/roomicon/icon_sign2.gif" title="开业房" />
                                    
                                    
                                    
                                    
                                    
                                    皇家贵族</h2><h3><img src="../static/images/avater.gif" />298/300</h3><div class="btn_goys"><a href="?roomid=15588&roompwd=0&visable=1&type=300&rtype=2048&subtype=0&"><img src="../static/images/enter.gif" /></a><a href="?roomid=15588&roompwd=0&visable=0&type=300&rtype=2048&subtype=0&"><img src="../static/images/go.gif" /></a>
                                </div></div></li>

                        

                            <li onmouseover="a('onair8')" onmouseout="b('onair8')" class="jqw">
                                <div class="roomphoto" onclick="location.href='?roomid=10438&roompwd=0&visable=1&type=300&rtype=2112&subtype=0&'">
                                    <div id="onair8" class="photo_onair" style="display:none"></div><div class="photo_onroomid">房间ID：10438</div>
                                    
                                        <img src="http://img.piupiu.com/5e764a799638adf3e393d9f3c5c30aa4_70386.jpg" width="130px" height="100px" onerror="this.onerror='';this.src= '../img/mo.gif'" />
                                    
                                </div>
                                <div class="roominfo"><h2 style="color:red">
                                    
                                        <img src="../static/images/roomicon/icon_sign2.gif" title="开业房" />
                                    
                                    
                                    
                                    
                                    
                                    ==莎==家==帮==</h2><h3><img src="../static/images/avater.gif" />290/300</h3><div class="btn_goys"><a href="?roomid=10438&roompwd=0&visable=1&type=300&rtype=2112&subtype=0&"><img src="../static/images/enter.gif" /></a><a href="?roomid=10438&roompwd=0&visable=0&type=300&rtype=2112&subtype=0&"><img src="../static/images/go.gif" /></a>
                                </div></div></li>

                        

                            <li onmouseover="a('onair9')" onmouseout="b('onair9')" class="jqw">
                                <div class="roomphoto" onclick="location.href='?roomid=10099&roompwd=0&visable=1&type=300&rtype=0&subtype=0&'">
                                    <div id="onair9" class="photo_onair" style="display:none"></div><div class="photo_onroomid">房间ID：10099</div>
                                    
                                        <img src="http://img.piupiu.com/ping/room/1afba2249e103623f52fb255c73be843_56346.jpg" width="130px" height="100px" onerror="this.onerror='';this.src= '../img/mo.gif'" />
                                    
                                </div>
                                <div class="roominfo"><h2 style="color:red">
                                    
                                        <img src="../static/images/roomicon/icon_sign2.gif" title="开业房" />
                                    
                                    
                                    
                                    
                                    
                                    MIぃ闺蜜之家╮</h2><h3><img src="../static/images/avater.gif" />288/300</h3><div class="btn_goys"><a href="?roomid=10099&roompwd=0&visable=1&type=300&rtype=0&subtype=0&"><img src="../static/images/enter.gif" /></a><a href="?roomid=10099&roompwd=0&visable=0&type=300&rtype=0&subtype=0&"><img src="../static/images/go.gif" /></a>
                                </div></div></li>

                        

                            <li onmouseover="a('onair10')" onmouseout="b('onair10')" class="jqw">
                                <div class="roomphoto" onclick="location.href='?roomid=10021&roompwd=0&visable=1&type=300&rtype=0&subtype=0&'">
                                    <div id="onair10" class="photo_onair" style="display:none"></div><div class="photo_onroomid">房间ID：10021</div>
                                    
                                        <img src="http://img.piupiu.com/ping/room/f2be7ffc14e8431b24858d6daba6320a_61808.jpg" width="130px" height="100px" onerror="this.onerror='';this.src= '../img/mo.gif'" />
                                    
                                </div>
                                <div class="roominfo"><h2 style="color:red">
                                    
                                        <img src="../static/images/roomicon/icon_sign2.gif" title="开业房" />
                                    
                                    
                                    
                                    
                                    
                                    〆灬百花谷ゝ</h2><h3><img src="../static/images/avater.gif" />285/300</h3><div class="btn_goys"><a href="?roomid=10021&roompwd=0&visable=1&type=300&rtype=0&subtype=0&"><img src="../static/images/enter.gif" /></a><a href="?roomid=10021&roompwd=0&visable=0&type=300&rtype=0&subtype=0&"><img src="../static/images/go.gif" /></a>
                                </div></div></li>

                        

                            <li onmouseover="a('onair11')" onmouseout="b('onair11')" class="jqw">
                                <div class="roomphoto" onclick="location.href='?roomid=11333&roompwd=0&visable=1&type=300&rtype=32768&subtype=0&'">
                                    <div id="onair11" class="photo_onair" style="display:none"></div><div class="photo_onroomid">房间ID：11333</div>
                                    
                                        <img src="http://img.piupiu.com/ping/room/dceef51a3284fe99bf71bce7a224b49f_6661.jpg" width="130px" height="100px" onerror="this.onerror='';this.src= '../img/mo.gif'" />
                                    
                                </div>
                                <div class="roominfo"><h2 style="color:red">
                                    
                                        <img src="../static/images/roomicon/icon_sign5.gif" title="优胜房" />
                                    
                                    
                                    
                                    
                                    
                                    灬人间╃地狱★ </h2><h3><img src="../static/images/avater.gif" />282/300</h3><div class="btn_goys"><a href="?roomid=11333&roompwd=0&visable=1&type=300&rtype=32768&subtype=0&"><img src="../static/images/enter.gif" /></a><a href="?roomid=11333&roompwd=0&visable=0&type=300&rtype=32768&subtype=0&"><img src="../static/images/go.gif" /></a>
                                </div></div></li>

                        

                            <li onmouseover="a('onair12')" onmouseout="b('onair12')" class="jqw">
                                <div class="roomphoto" onclick="location.href='?roomid=11000&roompwd=0&visable=1&type=300&rtype=32768&subtype=0&'">
                                    <div id="onair12" class="photo_onair" style="display:none"></div><div class="photo_onroomid">房间ID：11000</div>
                                    
                                        <img src="http://img.piupiu.com/537a2129a82c3b045bc4cd31b0aebef6_5472.jpg" width="130px" height="100px" onerror="this.onerror='';this.src= '../img/mo.gif'" />
                                    
                                </div>
                                <div class="roominfo"><h2 style="color:red">
                                    
                                        <img src="../static/images/roomicon/icon_sign2.gif" title="开业房" />
                                    
                                    
                                    
                                    
                                    
                                    夜店</h2><h3><img src="../static/images/avater.gif" />277/300</h3><div class="btn_goys"><a href="?roomid=11000&roompwd=0&visable=1&type=300&rtype=32768&subtype=0&"><img src="../static/images/enter.gif" /></a><a href="?roomid=11000&roompwd=0&visable=0&type=300&rtype=32768&subtype=0&"><img src="../static/images/go.gif" /></a>
                                </div></div></li>

                        

                            <li onmouseover="a('onair13')" onmouseout="b('onair13')" class="jqw">
                                <div class="roomphoto" onclick="location.href='?roomid=19666&roompwd=0&visable=1&type=300&rtype=0&subtype=0&'">
                                    <div id="onair13" class="photo_onair" style="display:none"></div><div class="photo_onroomid">房间ID：19666</div>
                                    
                                        <img src="http://img.piupiu.com/ping/room/1593254a120daf75f746bb25f30661ad_78584.gif" width="130px" height="100px" onerror="this.onerror='';this.src= '../img/mo.gif'" />
                                    
                                </div>
                                <div class="roominfo"><h2 style="color:red">
                                    
                                        <img src="../static/images/roomicon/icon_sign2.gif" title="开业房" />
                                    
                                    
                                    
                                    
                                    
                                    捡破烂★家族</h2><h3><img src="../static/images/avater.gif" />275/300</h3><div class="btn_goys"><a href="?roomid=19666&roompwd=0&visable=1&type=300&rtype=0&subtype=0&"><img src="../static/images/enter.gif" /></a><a href="?roomid=19666&roompwd=0&visable=0&type=300&rtype=0&subtype=0&"><img src="../static/images/go.gif" /></a>
                                </div></div></li>

                        

                            <li onmouseover="a('onair14')" onmouseout="b('onair14')" class="jqw">
                                <div class="roomphoto" onclick="location.href='?roomid=10520&roompwd=0&visable=1&type=300&rtype=0&subtype=0&'">
                                    <div id="onair14" class="photo_onair" style="display:none"></div><div class="photo_onroomid">房间ID：10520</div>
                                    
                                        <img src="http://img.piupiu.com/ping/room/6e4f176a251f11ddc750a5fc451785c0_7546.gif" width="130px" height="100px" onerror="this.onerror='';this.src= '../img/mo.gif'" />
                                    
                                </div>
                                <div class="roominfo"><h2 style="color:red">
                                    
                                        <img src="../static/images/roomicon/icon_sign2.gif" title="开业房" />
                                    
                                    
                                    
                                    
                                    
                                    缘分天空</h2><h3><img src="../static/images/avater.gif" />274/300</h3><div class="btn_goys"><a href="?roomid=10520&roompwd=0&visable=1&type=300&rtype=0&subtype=0&"><img src="../static/images/enter.gif" /></a><a href="?roomid=10520&roompwd=0&visable=0&type=300&rtype=0&subtype=0&"><img src="../static/images/go.gif" /></a>
                                </div></div></li>

                        

                            <li onmouseover="a('onair15')" onmouseout="b('onair15')" class="jqw">
                                <div class="roomphoto" onclick="location.href='?roomid=18881&roompwd=0&visable=1&type=300&rtype=64&subtype=0&'">
                                    <div id="onair15" class="photo_onair" style="display:none"></div><div class="photo_onroomid">房间ID：18881</div>
                                    
                                        <img src="http://img.piupiu.com/0ceb59d46d1dc55038e81d1646e91b32_18988.gif" width="130px" height="100px" onerror="this.onerror='';this.src= '../img/mo.gif'" />
                                    
                                </div>
                                <div class="roominfo"><h2 style="color:red">
                                    
                                        <img src="../static/images/roomicon/icon_sign2.gif" title="开业房" />
                                    
                                    
                                    
                                    
                                    
                                    ◆淡淡女人香の。</h2><h3><img src="../static/images/avater.gif" />269/300</h3><div class="btn_goys"><a href="?roomid=18881&roompwd=0&visable=1&type=300&rtype=64&subtype=0&"><img src="../static/images/enter.gif" /></a><a href="?roomid=18881&roompwd=0&visable=0&type=300&rtype=64&subtype=0&"><img src="../static/images/go.gif" /></a>
                                </div></div></li>

                        

                            <li onmouseover="a('onair16')" onmouseout="b('onair16')" class="jqw">
                                <div class="roomphoto" onclick="location.href='?roomid=10006&roompwd=0&visable=1&type=300&rtype=2048&subtype=0&'">
                                    <div id="onair16" class="photo_onair" style="display:none"></div><div class="photo_onroomid">房间ID：10006</div>
                                    
                                        <img src="http://img.piupiu.com/ping/room/aa15ad8a942bc76ee251ea3a13206613_85744.jpg" width="130px" height="100px" onerror="this.onerror='';this.src= '../img/mo.gif'" />
                                    
                                </div>
                                <div class="roominfo"><h2 style="color:red">
                                    
                                        <img src="../static/images/roomicon/icon_sign2.gif" title="开业房" />
                                    
                                    
                                    
                                    
                                    
                                    爱的后花园</h2><h3><img src="../static/images/avater.gif" />267/300</h3><div class="btn_goys"><a href="?roomid=10006&roompwd=0&visable=1&type=300&rtype=2048&subtype=0&"><img src="../static/images/enter.gif" /></a><a href="?roomid=10006&roompwd=0&visable=0&type=300&rtype=2048&subtype=0&"><img src="../static/images/go.gif" /></a>
                                </div></div></li>

                        

                            <li onmouseover="a('onair17')" onmouseout="b('onair17')" class="jqw">
                                <div class="roomphoto" onclick="location.href='?roomid=10988&roompwd=0&visable=1&type=300&rtype=0&subtype=0&'">
                                    <div id="onair17" class="photo_onair" style="display:none"></div><div class="photo_onroomid">房间ID：10988</div>
                                    
                                        <img src="../img/mo.gif" width="130px" height="100px" />
                                    
                                </div>
                                <div class="roominfo"><h2 style="color:red">
                                    
                                    
                                    
                                    
                                    
                                    ╭千城◆酒吧</h2><h3><img src="../static/images/avater.gif" />267/300</h3><div class="btn_goys"><a href="?roomid=10988&roompwd=0&visable=1&type=300&rtype=0&subtype=0&"><img src="../static/images/enter.gif" /></a><a href="?roomid=10988&roompwd=0&visable=0&type=300&rtype=0&subtype=0&"><img src="../static/images/go.gif" /></a>
                                </div></div></li>

                        

                            <li onmouseover="a('onair18')" onmouseout="b('onair18')" class="jqw">
                                <div class="roomphoto" onclick="location.href='?roomid=10001&roompwd=0&visable=1&type=300&rtype=0&subtype=0&'">
                                    <div id="onair18" class="photo_onair" style="display:none"></div><div class="photo_onroomid">房间ID：10001</div>
                                    
                                        <img src="http://img.piupiu.com/4adb1866ff73814f7b46f52de47c0ec1_42454.jpg" width="130px" height="100px" onerror="this.onerror='';this.src= '../img/mo.gif'" />
                                    
                                </div>
                                <div class="roominfo"><h2 style="color:red">
                                    
                                        <img src="../static/images/roomicon/icon_sign2.gif" title="开业房" />
                                    
                                    
                                    
                                    
                                    
                                    普渡众生</h2><h3><img src="../static/images/avater.gif" />265/300</h3><div class="btn_goys"><a href="?roomid=10001&roompwd=0&visable=1&type=300&rtype=0&subtype=0&"><img src="../static/images/enter.gif" /></a><a href="?roomid=10001&roompwd=0&visable=0&type=300&rtype=0&subtype=0&"><img src="../static/images/go.gif" /></a>
                                </div></div></li>

                        

                            <li onmouseover="a('onair19')" onmouseout="b('onair19')" class="jqw">
                                <div class="roomphoto" onclick="location.href='?roomid=12222&roompwd=0&visable=1&type=300&rtype=2048&subtype=0&'">
                                    <div id="onair19" class="photo_onair" style="display:none"></div><div class="photo_onroomid">房间ID：12222</div>
                                    
                                        <img src="http://img.piupiu.com/img_10.gif" width="130px" height="100px" onerror="this.onerror='';this.src= '../img/mo.gif'" />
                                    
                                </div>
                                <div class="roominfo"><h2 style="color:red">
                                    
                                        <img src="../static/images/roomicon/icon_sign2.gif" title="开业房" />
                                    
                                    
                                    
                                    
                                    
                                    网缘╰☆上卡处</h2><h3><img src="../static/images/avater.gif" />264/300</h3><div class="btn_goys"><a href="?roomid=12222&roompwd=0&visable=1&type=300&rtype=2048&subtype=0&"><img src="../static/images/enter.gif" /></a><a href="?roomid=12222&roompwd=0&visable=0&type=300&rtype=2048&subtype=0&"><img src="../static/images/go.gif" /></a>
                                </div></div></li>

                        

                            <li onmouseover="a('onair20')" onmouseout="b('onair20')" class="jqw">
                                <div class="roomphoto" onclick="location.href='?roomid=16888&roompwd=0&visable=1&type=300&rtype=2112&subtype=0&'">
                                    <div id="onair20" class="photo_onair" style="display:none"></div><div class="photo_onroomid">房间ID：16888</div>
                                    
                                        <img src="http://img.piupiu.com/274a3938bdc769d4f6f5ba38296e1246_37696.jpg" width="130px" height="100px" onerror="this.onerror='';this.src= '../img/mo.gif'" />
                                    
                                </div>
                                <div class="roominfo"><h2 style="color:red">
                                    
                                        <img src="../static/images/roomicon/icon_sign2.gif" title="开业房" />
                                    
                                    
                                    
                                    
                                    
                                    我最闪亮</h2><h3><img src="../static/images/avater.gif" />264/300</h3><div class="btn_goys"><a href="?roomid=16888&roompwd=0&visable=1&type=300&rtype=2112&subtype=0&"><img src="../static/images/enter.gif" /></a><a href="?roomid=16888&roompwd=0&visable=0&type=300&rtype=2112&subtype=0&"><img src="../static/images/go.gif" /></a>
                                </div></div></li>

                        

                            <li onmouseover="a('onair21')" onmouseout="b('onair21')" class="jqw">
                                <div class="roomphoto" onclick="location.href='?roomid=10521&roompwd=0&visable=1&type=300&rtype=2112&subtype=0&'">
                                    <div id="onair21" class="photo_onair" style="display:none"></div><div class="photo_onroomid">房间ID：10521</div>
                                    
                                        <img src="http://img.piupiu.com/b374029603c90c96d90c1c300a16a604_10469.jpg" width="130px" height="100px" onerror="this.onerror='';this.src= '../img/mo.gif'" />
                                    
                                </div>
                                <div class="roominfo"><h2 style="color:red">
                                    
                                        <img src="../static/images/roomicon/icon_sign1.gif" title="生日房" />
                                    
                                    
                                    
                                    
                                    
                                    天地情缘</h2><h3><img src="../static/images/avater.gif" />263/300</h3><div class="btn_goys"><a href="?roomid=10521&roompwd=0&visable=1&type=300&rtype=2112&subtype=0&"><img src="../static/images/enter.gif" /></a><a href="?roomid=10521&roompwd=0&visable=0&type=300&rtype=2112&subtype=0&"><img src="../static/images/go.gif" /></a>
                                </div></div></li>

                        

                            <li onmouseover="a('onair22')" onmouseout="b('onair22')" class="jqw">
                                <div class="roomphoto" onclick="location.href='?roomid=10008&roompwd=0&visable=1&type=300&rtype=2048&subtype=0&'">
                                    <div id="onair22" class="photo_onair" style="display:none"></div><div class="photo_onroomid">房间ID：10008</div>
                                    
                                        <img src="http://img.piupiu.com/ping/room/0a4287dbd7e216887c57b42ab301205f_78014.gif" width="130px" height="100px" onerror="this.onerror='';this.src= '../img/mo.gif'" />
                                    
                                </div>
                                <div class="roominfo"><h2 style="color:red">
                                    
                                        <img src="../static/images/roomicon/icon_sign2.gif" title="开业房" />
                                    
                                    
                                    
                                    
                                    
                                    霸气公馆</h2><h3><img src="../static/images/avater.gif" />261/300</h3><div class="btn_goys"><a href="?roomid=10008&roompwd=0&visable=1&type=300&rtype=2048&subtype=0&"><img src="../static/images/enter.gif" /></a><a href="?roomid=10008&roompwd=0&visable=0&type=300&rtype=2048&subtype=0&"><img src="../static/images/go.gif" /></a>
                                </div></div></li>

                        

                            <li onmouseover="a('onair23')" onmouseout="b('onair23')" class="jqw">
                                <div class="roomphoto" onclick="location.href='?roomid=19199&roompwd=0&visable=1&type=300&rtype=2048&subtype=0&'">
                                    <div id="onair23" class="photo_onair" style="display:none"></div><div class="photo_onroomid">房间ID：19199</div>
                                    
                                        <img src="http://img.piupiu.com/eed2f329d05cd2abba7146284e7a1cd5_15445.jpg" width="130px" height="100px" onerror="this.onerror='';this.src= '../img/mo.gif'" />
                                    
                                </div>
                                <div class="roominfo"><h2 style="color:red">
                                    
                                        <img src="../static/images/roomicon/icon_sign2.gif" title="开业房" />
                                    
                                    
                                    
                                    
                                    
                                    ︶ㄣ笑看人生ぺ</h2><h3><img src="../static/images/avater.gif" />260/300</h3><div class="btn_goys"><a href="?roomid=19199&roompwd=0&visable=1&type=300&rtype=2048&subtype=0&"><img src="../static/images/enter.gif" /></a><a href="?roomid=19199&roompwd=0&visable=0&type=300&rtype=2048&subtype=0&"><img src="../static/images/go.gif" /></a>
                                </div></div></li>

                        
					</ul>
					
					<div class="clear"></div>

				</div>
                
                <div id="pagenation">
                    <div id="wrapper">
                        <ul>
                            
                                <li  class="active"><a href="?sessionId=58fe047c0500000c75d3642217ddaef1&groupid=2&page=1">1</a></li>
                            
                                <li ><a href="?sessionId=58fe047c0500000c75d3642217ddaef1&groupid=2&page=2">2</a></li>
                            
                                <li ><a href="room.aspx">3</a></li>
                            
                        </ul>
                    </div>
                </div>
                
			</div>



			
			
			
			
		</div>
			
		<div class="sider_r">
			
            
            <div class="rank">
				<div class="hd">
					<img src="../static/images/icon_tt.gif" /><h2>本周之星</h2>
				</div>
				<div class="bd">
					<div class="rank_con">
						<ul>
                            
                                <li title="Idx:71083,昵称：大众じ瓜 瓜♥"><div class="rankbox"><div class="num"><img src="../static/images/props/000101s.bmp" width="16px" alt="鲜花之星" title="鲜花之星" /></div><div class="rbinfo2"><h2>大众じ瓜 瓜♥</h2><h3>2628</h3></div></div></li></li>

                                <li title="Idx:772430,昵称：最强音の甜心"><div class="rankbox"><div class="num"><img src="../static/images/props/000102s.bmp" width="16px" alt="香吻之星" title="香吻之星" /></div><div class="rbinfo2"><h2>最强音の甜心</h2><h3>1272404</h3></div></div></li></li>
                            
                                <li title="Idx:723999,昵称：︶ㄣ独领︶月儿"><div class="rankbox"><div class="num"><img src="../static/images/props/000109s.bmp" width="16px" alt="钻戒之星" title="钻戒之星" /></div><div class="rbinfo2"><h2>︶ㄣ独领︶月儿</h2><h3>10</h3></div></div></li></li>
                            
                                <li title="Idx:779999,昵称： ︶ㄣ独领︶心儿"><div class="rankbox"><div class="num"><img src="../static/images/props/000512s.bmp" width="16px" alt="飞机之星" title="飞机之星" /></div><div class="rbinfo2"><h2> ︶ㄣ独领︶心儿</h2><h3>2</h3></div></div></li></li>
                            
                                <li title="Idx:779999,昵称： ︶ㄣ独领︶心儿"><div class="rankbox"><div class="num"><img src="../static/images/props/000111s.bmp" width="16px" alt="名车之星" title="名车之星" /></div><div class="rbinfo2"><h2> ︶ㄣ独领︶心儿</h2><h3>64</h3></div></div></li></li>
                            
                                <li title="Idx:715999,昵称：︶ㄣ独领︶晴儿"><div class="rankbox"><div class="num"><img src="../static/images/props/000107s.bmp" width="16px" alt="香水之星" title="香水之星" /></div><div class="rbinfo2"><h2>︶ㄣ独领︶晴儿</h2><h3>11</h3></div></div></li></li>
                            

                            
                                <li title="Idx:10681967,昵称：皮皮虾"><div class="rankbox"><div class="num"><img src="../static/images/props/-1s.png" width="16px" alt="消费大亨" title="消费大亨" /></div><div class="rbinfo2"><h2>皮皮虾</h2><h3>3750000</h3></div></div></li></li>
                            

                            
                                
                                <li title="房间号:10088,房间名：oО魅力金座ゞ"><div class="rankbox"><div class="num"><img src="../static/images/props/-2s.png" width="16px" alt="房间消费" title="房间消费" /></div><div class="rbinfo2"><h2>oО魅力金座ゞ</h2><h3>1262991</h3></div></div></li></li>
                                
                            
                                
                            
                                
                            
                                
                            
                                
                            

						</ul>
					</div>
					
				</div>
			</div>
            
            <div class="service">
				<div class="hd">
					<img src="../static/images/icon_tt.gif" /><h2>客服中心</h2>
				</div>
				<div class="bd">
					<div class="serv_con">
                    
                        <ul>
                            
                                <li class="bdr"><a target="_blank" href="http://wpa.qq.com/msgrd?v=3&amp;uin=7733536&amp;site=qq&amp;menu=yes"><img border="0" src="http://wpa.qq.com/pa?p=2:7733536:17" alt="在线咨询" title="在线咨询" onerror="this.onerror='';this.src= '../static/images/qq.gif'"></a><h3>在线客服</h3></li>
                            
                            
                                <li class="bdr"><a target="_blank" href="http://wpa.qq.com/msgrd?v=3&amp;uin=7733536&amp;site=qq&amp;menu=yes"><img border="0" src="http://wpa.qq.com/pa?p=2:7733536:17" alt="vip销售" title="vip销售" onerror="this.onerror='';this.src= '../static/images/qq.gif'"></a><h3>VIP销售</h3></li>
                            
                            <li><a target="_blank" href="http://wpa.qq.com/msgrd?v=3&amp;uin=7733536&amp;site=qq&amp;menu=yes"><img border="0" src="http://wpa.qq.com/pa?p=2:7733536:17" alt="软件版本" title="软件版本" onerror="this.onerror='';this.src= '../static/images/qq.gif'"></a><h3>软件版本</h3></li>
                        </ul>
                         
                    
                    </div>
                </div>
            </div>
            <!--
            <div class="regulation">
                <a href="http://jb.ccm.gov.cn/" target="_blank">12318全国文化市场举报</a>
            </div>
			-->
			
		</div>
</div>
</body>
</html>
