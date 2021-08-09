$(document).ready(function() {
	var _id = $('input[name="_id"]').val();
	var type = $('input[name="type"]').val();
	var url = contextPath + '/admin/userView';
	
	$.ajax({
		type:'post',
		url: url,
		dataType: 'json',
		data : {_id:_id, type:type},
		success: function(data) {
			var res = data.result.data
			$('span#name').text(res.name);
			
			if(res._profile =="" || res._profile ==null){
				$('.img').html('<img src="'+resourcePath+'/img/user.png">')
			}else {
				$('.img').html('<img src="'+resourcePath+'/portfolio/uploadfile/'+res._profile+'">')
			}
			$('option[value="'+res.gender+'"]').prop('selected',true);
			
		},
		error: function() {
			console.log("error");
		}
	})
});

$('#updatePw').click(function() {
	var pw = $('input[name="password"]').val();
	var re_pw = $('input[name="rePassword"]').val(); 
	var pwReg = /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,50}$/;

	if (!pwReg.test(pw)){
		alert("비밀번호는 최소 8 자, 최소 하나의 특수문자와 하나의 숫자를 포함해야합니다.");
		return false;
	}
	if (pw != re_pw){
		alert("비밀번호가 일치하지 않습니다.");
		return false;
	}
	if(confirm("위 내용으로 수정하시겠습니까 ?") == true){
		
		var _id = $('input[name="_id"]').val();
		var password = $('input[name="password"]').val();
		var rePassword = $('input[name="rePassword"]').val();
		var url = contextPath + '/admin/updatePw';
		
		$.ajax({
			type:'post',
			url: url,
			dataType: 'json',
			data : {_id:_id, password:password, rePassword:rePassword},
			success: function(data) {
				alert("수정되었습니다.");
			},
			error: function() {
				console.log("error");
				}
			})
		}
		else{
		    return ;
		}
})

$('.delete_user').click(function() {
	if(confirm("정말삭제하시겠습니까 ?") == true){
		var _id = $('input[name="_id"]').val();
		var url = contextPath+'/admin/deleteUser'
		var type = $('input[name="type"]').val();

		$.ajax({
			type:'post',
			url: url,
			dataType: 'json',
			data : {_id:_id},
			success: function(data) {
				alert("삭제되었습니다.");
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
	else{
	    return ;
	}
})