$(function() {
	$('#login').on('submit', function() {
		console.log(1111)
		login()
		return false
	})
})
function login() {
	var userName = $('input[name="user_login"]').val()
	var userPass = $('input[name="user_pass"]').val()
	var data = {
		userName:userName,
		userPass:userPass
	}
	$.ajax({
	    type: "post",
	    url: '/login',
	    data: data,
	    dataType: "json",
	    success:function(res){
			if (res.error_code == 'SUCCESS') {
				localStorage.setItem('nickname', res.result.nickname)
				localStorage.setItem('headerImg', res.result.headerImg)
				setTimeout(function() {
					window.location.href = '/'
				}, 500)
			} else {
				$('.red').show()
			}
	    }
	})
}