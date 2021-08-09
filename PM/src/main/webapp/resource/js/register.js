$('#submit_btn').click(function(){ 
	if ($('input[name="identifier"]').val() == ''){
		alert_pop('아이디를 입력해주세요.',2);
		return false;
	}
	var id_val = $('input[name="identifier"]').val();
	var idReg = /^[a-z]+[a-z0-9]{5,19}$/g;
	
	if (!idReg.test(id_val)){
		alert_pop("아이디는 영문자로 시작하는 6~20자 영문자 또는 숫자이어야 합니다.",2);
		return false
	}
	
	if ($('input[name="password"]').val() == ''){
		alert_pop('비밀번호를 입력해주세요.',2);
		return false;
	}
	
	var pw = $('input[name="password"]').val();
	var re_pw = $('input[name="rePassword"]').val(); 
	var pwReg = /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,50}$/;

	if (!pwReg.test(pw)){
		alert_pop("비밀번호는 최소 8 자, 최소 하나의 특수문자와 하나의 숫자를 포함해야합니다.",2);
		return false;
	}
	if (pw != re_pw){
		alert_pop("비밀번호가 일치하지 않습니다.",2);
		return false;
	}
	
	if ($('input[name="name"]').val() == ''){
		alert_pop('이름을 입력해주세요.',2);
		return false;
	}
	
	if ($('input[name="birth"]').val() == ''){
		alert_pop('생년월일을 입력해주세요', 2);
		return false;
	}
	
	var birth_dath = $('input[name="birth"]').val();
	var birth_format = /^(19[0-9][0-9]|20\d{2})-(0[0-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
	
	if (!birth_format.test(birth_dath)){
		alert_pop("잘못된 생년월일입니다. 다시 입력해주세요.",2);
		return false
	}
	
	if (!$('input[name="gender"]').is(':checked')){
		alert_pop("성별을 선택해주세요.",2);
		return false
	}
	
	if ($('input[name="phone"]').val() == ''){
		alert_pop('전화번호를 입력해주세요', 2);
		return false;
	}
	
	var phone = $('input[name="phone"]').val();
	var regTel = /^((01[1|6|7|8|9])[1-9]+[0-9]{6,7})|(010[1-9][0-9]{7})$/;
	
	if (!regTel.test(phone)){
		alert_pop("잘못된 전화번호입니다. 다시 입력해주세요.",2);
		return false
	}
	
	if ($('input[name="email"]').val()==''){
		alert_pop("이메일을 입력해주세요.",2);
		return false
	}
	
	var email = $('input[name="email"]').val();
	var regEmail =/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;


	if (!regEmail.test(email)){
		alert_pop("잘못된 이메일입니다. 다시 입력해주세요.",2);
		return false
	}
	
	if ($('input[name="university"]').val() == '' && $('input[name="mb_type"]').val() == 'enterprise'){
		alert_pop('기업명을 입력해주세요', 2);
		return false;
	}
	
	$('div.wait_box').css('display', 'block');
	
	var url = contextPath + "/user/insetRegister";
	var data = $('form').serialize();
	
	var file_url = contextPath + "/user/uploadFile"
	var id = $('input[name="identifier"]').val();
	var formData = new FormData($("#fileForm")[0]);
	formData.append("identifier", id);
	
	$.ajax({
		url : url,
		type : "post",
		dataType : "Json",
		data : data,
		async: false,
		success : function(data){
			$('div.wait_box').css('display', 'none');
			if(data.code == 1){
				alert_pop("저장이 완료되었습니다.",3,"","", function() {
					location.href = contextPath + data.url;
				});
			}
			else if (data.code == 0){
				// 모달로 구분 비밀번호 불일치 데이터 알려주기 
				$('input[name="rePassword"]').val('');
				$('input[name="rePassword"]').focus();
			}
		},
		error: function() {
		}
	});
	
	$.ajax({
		url : file_url,
		type : "post",
		dataType : "Json",
		data : formData,
		async: false,
		contentType: false,
		processData: false,
		success : function(data){
			
		},
		 error:function(request,status,error){
			 alert("code = "+ request.status + " message = " + request.responseText + " error = " + error); // 실패 시 처리	       
		}
	});
	
});


function setThumbnail(event) { 
	var reader = new FileReader(); 
	reader.onload = function(event) { 
	var img = document.createElement("img"); 
	img.setAttribute("src", event.target.result); 
		$('div#image_container').empty();
		document.querySelector("div#image_container").appendChild(img); 
	}; 
	reader.readAsDataURL(event.target.files[0]); 
} 

$('#filecancle').click(function() {
	//$('div#image_container').empty();
	$('div#image_container').html('<img src="'+resourcePath+'/img/user.png">');
	$('input[name="file"]').val("");

})

