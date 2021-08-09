// 마이페이지 실행 후 뷰에 넘겨줄 데이터 호출
$(document).ready(function (){
	$.ajax({
		url : contextPath + "/user/userfind", 
		type : "post",
		dataType : "Json",
		success : function(res){
			if(res.result.data._profile=="" || res.result.data._profile ==null){
				$('div#image_container').html('<img src="'+resourcePath+'/img/user.png">');
			}else {
				$('div#image_container').html('<img src="'+resourcePath+'/portfolio/uploadfile/'+res.result.data._profile+'">');
			}
			$('input[name="identifier"]').val(res.result.data.identifier);
			$('input[name="name"]').val(res.result.data.name);
			$('input[name="birth"]').val(res.result.data.birth);
			$('input[name="gender"][value="'+res.result.data.gender+'"]').prop('checked',true);
			$('input[name="phone"]').val(res.result.data.phone);
			$('input[name="email"]').val(res.result.data.email);
			$('input[name="university"]').val(res.result.data.university);
			$('input[name="universityMajor"]').val(res.result.data.universityMajor);
			$('input[name="universityNumber"]').val(res.result.data.universityNumber);
		},
		error: function() {
		}
	});
});

// 저장버튼 클릭 후 정규식 and from 데이터 저장 밑 이미지 데이터 수정
$('#save_btn').click(function(){
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
	
	if ($('input[name="university"]').val() == '' && $('input[name="type"]').val() == 'enterprise'){
		alert_pop('기업명을 입력해주세요', 2);
		return false;
	}
	
	
	
	var url = contextPath + "/user/myEditReq";
	var data = $('form').serialize();
	var file_url = contextPath + "/user/uploadFile";
	var id = $('input[name="identifier"]').val();
	var formData = new FormData($("#fileForm")[0]);
	formData.append("identifier", id);
	
	loading();
	$.ajax({
		url : url,
		type : "post",
		dataType : "Json",
		data : data,
		async: false,
		success : function(data){
			unLoading();
			if (data.code == 1) {
				$('input[data-dialog = "my_save"]').click();
			}
			$('#my_save').click(function(){
				$(location).attr('href',contextPath+data.url);
			});
			if($('input[name="file"]').val() != null && $('input[name="file"]').val() != "" ){ 
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
			}else if($('#image_container').html() == '<img src="/resource/img/user.png">'){
				$.ajax({
					url : contextPath + "/user/noneProfile",
					type : "post",
					dataType : "Json",
					async: false,
					contentType: false,
					processData: false,
					success : function(data){
					},
					 error:function(request,status,error){
					        alert("code = "+ request.status + " message = " + request.responseText + " error = " + error); // 실패 시 처리	       
					        }
				});
			}
		},
		error: function() {
			console.log("error");
		}
	});
	
});

$('button.re_btn').click(function(){
	alert_pop("정말 로그아웃하시겠습니까?",1,"취소","확인", function() {
		
		$.ajax({
			url : contextPath+"/user/logout",
			type:"post",
			dataType:"json",
			success : function(data){
				location.href=contextPath+data.url;
			}
		})
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

$('#my_photo_del').click(function() {
	
	if ($.browser.msie) { 
		// ie 일때 input[type=file] init. 
		$('div#image_container').html('<img src="'+resourcePath+'/img/user.png">');
//		$('#my_img_file').replaceWith( $('#my_img_file').clone(true) ); 
	} else {
		// other browser 일때 input[type=file] init. 
		$('div#image_container').html('<img src="'+resourcePath+'/img/user.png">');
		$('#my_img_file').val("");
	}

})

	