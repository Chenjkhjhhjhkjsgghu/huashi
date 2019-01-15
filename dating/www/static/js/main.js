$(function(){
	




	$(".rank .hd ul li").click(function(){
		$(this).addClass("on").siblings().removeClass("on");
		var index = $(".rank .hd ul li ").index(this);
		$(".rank .bd").eq(index).show().siblings(".bd").hide();
	})
	
	$(".gift .hd ul li").click(function(){
		$(this).addClass("on").siblings().removeClass("on");
		var index = $(".gift .hd ul li ").index(this);
		$(".gift .bd").eq(index).show().siblings(".bd").hide();
	})
	
	
	$(".room_list .simple_list ul li").hover(function(){
		$(this).find(".photo_show").show();
	},function(){
		$(this).find(".photo_show").hide();
	})
	
	
	
	

})