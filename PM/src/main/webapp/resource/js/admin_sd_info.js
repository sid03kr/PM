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
			$('input[name="identifier"]').val(res.identifier);
			$('input[name="name"]').val(res.name);
			$('input[name="university"]').val(res.university);
			$('input[name="universityMajor"]').val(res.universityMajor);
			$('input[name="universityNumber"]').val(res.universityNumber);
			$('input[name="phone"]').val(res.phone);
			$('input[name="email"]').val(res.email);
			$('input[name="birth"]').val(res.birth);
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


$('.am_bg_point').click(function() {
	
	if(confirm("위 내용으로 수정하시겠습니까 ?") == true){
		var data = $('form[name="sd_info"]').serialize();
		var _id = $('input[name="_id"]').val();
		var type = $('input[name="type"]').val();
		var url = contextPath + '/admin/myEditReq';
		
		$.ajax({
			type:'post',
		url: url,
		dataType: 'json',
		data : data,
		success: function(data) {
			alert("수정되었습니다");
		},
		error: function() {
			console.log("error");
				}
			})
		}else{
		    return ;
	}
})

$('.delete_user').click(function() {
	if(confirm("정말 삭제하시겠습니까 ?") == true){
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
					location.href = contextPath + "/admin_sd?type"+type;
				}else if(type =="professor"){
					location.href = contextPath + "/admin_pf?type"+type;
				}else {
					location.href = contextPath + "/admin_ep?type"+type;
				}
			},
			error: function() {
				console.log("error");
			}
		})
    }else{
        return ;
    }
})
