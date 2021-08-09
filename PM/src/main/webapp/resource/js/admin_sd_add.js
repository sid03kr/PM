$('.am_bg_point').click(function() {
	
	idCheck()
	
	if ($('input[name="identifier"]').val() == ''){
		alert('ID계정을 입력바랍니다.');
		return false;
	}
	
	var pw = $('input[name="password"]').val();
	var re_pw = $('input[name="rePassword"]').val(); 
	var pwReg = /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,50}$/;

	if (!pwReg.test(pw)){
		alert("비밀번호는 최소 8 자로, 최소 하나의 특수문자와 하나의 숫자를 포함해야합니다.");
		return false;
	}
	if (pw != re_pw){
		alert("비밀번호가 일치하지 않습니다.");
		return false;
	}
	if ($('input[name="name"]').val() == ''){
		alert('이름을 입력바랍니다.');
		return false;
	}
	if ($('input[name="phone"]').val() == ''){
		alert('전화번호를 입력해주세요');
		return false;
	}
	
	var phone = $('input[name="phone"]').val();
	var regTel = /^((01[1|6|7|8|9])[1-9]+[0-9]{6,7})|(010[1-9][0-9]{7})$/;
	
	if (!regTel.test(phone)){
		alert("잘못된 전화번호입니다. 다시 입력해주세요.");
		return false
	}
	if ($('input[name="birth"]').val() == ''){
		alert('생년월일을 입력해주세요');
		return false;
	}
	var birth_dath = $('input[name="birth"]').val();
	var birth_format = /^(19[0-9][0-9]|20\d{2})-(0[0-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
	
	if (!birth_format.test(birth_dath)){
		alert("잘못된 생년월일입니다. 다시 입력해주세요.");
		return false
	}
	if ($('input[name="email"]').val() == ''){
		alert('이메일주소를 입력바랍니다.');
		return false;
	}
	var email = $('input[name="email"]').val();
	var regEmail =/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

	if (!regEmail.test(email)){
		alert("잘못된 이메일입니다. 다시 입력해주세요.");
		return false
	}
	
	addUser();
});


function addUser() {
	var data = $('form[name="am_sd_add"]').serialize();
	var type = $('input[name="type"]').val();
	var url = contextPath + '/user/insetRegister';
	
	$.ajax({
		type:'post',
		url: url,
		dataType: 'json',
		data : data,
		success: function(data) {
			if(type =="student") {
				location.href = contextPath + "/admin_sd";
			}else if(type =="professor"){
				location.href = contextPath + "/admin_pf";
			}else {
				location.href = contextPath + "/admin_ep";
			}
		},
		error: function() {
			console.log("error");
		}
	})
}

function idCheck() {
	var identifier = $('input[name="identifier"]').val();
	$.ajax({
		url : contextPath+'/admin/idCheck',
		type : 'post',
		dataType : 'json',
		data : {identifier : identifier},
		success : function(data){
			if(data.code != 1) {
				alert(data.msg)
				return false
			}
		}
	});
}