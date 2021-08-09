// 로그인 submit
$('#login_sub').click(function(){
	
	if ($('input[name="identifier"]').val() == ''){
		alert('아이디 입력해주세요.');
		return false;
	}
	if ($('input[name="password"]').val() == ''){
		alert('비밀번호를 입력바랍니다.');
		return false;
	}
	
	var url = contextPath + "/admin/login";
	var data = $('form').serialize();
	
	$('div.wait_box').css('display', 'block');
	
	$.ajax({
		url : url,  //controller url
		type : "post",  // method type
		dataType : "Json",  //data type
		data : data,  
		success : function(data){
			$('div.wait_box').css('display', 'none');
			if(data.code == 1) location.href = contextPath + "/admin_sd";
			else{
				alert("입력정보를 확인 부탁드립니다.");
				return false;
			}
			
		},
		error: function(request,status,error){
	        alert("code = "+ request.status + " message = " + request.responseText + " error = " + error); // 실패 시 처리
	       }
	});
});

