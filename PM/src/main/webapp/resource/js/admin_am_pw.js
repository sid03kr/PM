$(document).ready(function() {
	var _id = $('input[name="_id"]').val();
	var url = contextPath + '/admin/View';
	
	$.ajax({
		type:'post',
		url: url,
		dataType: 'json',
		data : {_id:_id},
		success: function(data) {
			var res = data.result.data
			$('input[name="identifier"]').val(res.identifier);
			$('input[name="name"]').val(res.name);
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
	var _id = $('input[name="_id"]').val();
	var password = $('input[name="password"]').val();
	var rePassword = $('input[name="rePassword"]').val();
	var url = contextPath + '/admin/adminPw';
	
	$.ajax({
		type:'post',
		url: url,
		dataType: 'json',
		data : {_id:_id, password:password, rePassword:rePassword},
		success: function(data) {
			location.href = contextPath + "/admin_am";
		},
		error: function() {
			console.log("error");
		}
	})
})

$('.delete_user').click(function() {
	var _id = $('input[name="_id"]').val();
	var url = contextPath+'/admin/deleteAdmin'
	// 팝업 띄워주고 action 이 일어나게 수정해야할 것
	$.ajax({
		type:'post',
		url: url,
		dataType: 'json',
		data : {_id:_id},
		success: function(data) {
			location.href = contextPath + "/admin_am";
		},
		error: function() {
			console.log("error");
		}
	})
})