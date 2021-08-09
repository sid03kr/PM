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
	
	var url = contextPath + "/user/findpw"
	var data = $('form').serialize();
	var listEle ='';
	
	loading();
	$.ajax({
		url : url,
		type : "post",
		dataType : "Json",
		data : data,
		success : function(data){
			unLoading();
			if(data.code == 1) {
				listEle += '<div class="id_result">';
				listEle += '	<p>가입하신 이메일로 임시 비밀번호가 발송되었습니다.</p>';
				listEle += '</div>';
			}else {
				listEle += '<div class="id_result">';
				listEle += '	<p>입력하신 정보가 일치하지않습니다. 다시확인해주세요 </p>';
				listEle += '</div>';
			}
			

			//closeLoader();
			$("#findPw").html(listEle);
		},
		 error:function(request,status,error){
	        alert("code = "+ request.status + " message = " + request.responseText + " error = " + error); // 실패 시 처리
	       },
	     complete : function(data) {
	                 //  실패했어도 완료가 되었을 때 처리
	        }
	});
	
});