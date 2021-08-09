//확인
$(document).on('click','#submit_btn', function(){
	if ($('input[name="name"]').val() == ''){
		alert_pop('이름을 입력해주세요.',2);
		return false;
	}
	
	if ($('input[name="birth"]').val() == ''){
		alert_pop('생년월일을 입력해주세요', 2);
		return false;
	}
	
	var birth_dath = $('input[name="birth"]').val();
	var birth_format = /^(19[0-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/;
	
	if (!birth_format.test(birth_dath)){
		alert_pop("잘못된 생년월일입니다. 다시 입력해주세요.",2);
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
	
	var url = contextPath + "/user/findId"
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
			if (data.code ==1){					
				listEle += '<div class="id_result">';
				listEle += '	<p>아이디 :</p>';
				listEle += '	<span>'+data.result.find_id+'</span>';
				listEle += '</div>';
			} else {
				listEle += '<div class="id_result">';
				listEle += '	<p>일치하는 회원정보가 없습니다. 다시 확인해주세요.</p>';
				listEle += '</div>';
			}
			
			$("#findId").html(listEle);
			
		}, error:function(request,status,error){
	        alert("code = "+ request.status + " message = " + request.responseText + " error = " + error); // 실패 시 처리
	        
	    },complete : function(data) {
	    	//실패했어도 완료가 되었을 때 처리
	    }

	});
	
	return false;
});
