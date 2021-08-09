$('input[name="identifier"]').focus();
// 로그인 submit
$('form').submit(function(){
	
	
	if ($('input[name="identifier"]').val() == ''){
		alert_pop('아이디 입력해주세요.',2);
		return false;
	}
	if ($('input[name="password"]').val() == ''){
		alert_pop('비밀번호를 입력바랍니다.',2);
		return false;
	}
	
	var url = contextPath + "/user/login";
	var data = $('form').serialize();
	
	loading();
	
	$.ajax({
		url : url,  //controller url
		type : "post",  // method type
		dataType : "Json",  //data type
		data : data,  
		success : function(data){
			unLoading();
			if(data.code == 1) location.href = contextPath + data.url;
			else{
				alert_pop("입력정보를 확인 부탁드립니다.",2);
				return false;
			}
			
		},
		error: function() {
			console.log("error");
		}
	});
});

