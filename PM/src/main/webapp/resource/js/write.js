var check = false;

$('#btn_portfolioInsert').click(function(){
	
	if (check == false) { 
	// 유효성 넣기
	if ($('input[name="_professor"]').val() == ''){
		alert_pop('교수값이 비어있습니다.',2);
		return false;
	}
	if ($('input[name="name"]').val() == ''){
		alert_pop('제목을 입력바랍니다.',2);
		return false;
	}
	if ($('input[name="startDate"]').val() == '' || $('input[name="endDate"]').val() == ''){
		alert_pop('기간을 입력바랍니다.',2);
		return false;
	}
	if ($('input[name="startDate"]').val() >  $('input[name="endDate"]').val()){
		alert_pop('시작일이 종료일보다 빨라야합니다.',2);
		return false;
	}
	if ($('textarea').val() == ''){
		alert_pop('본문내용을 입력바랍니다.',2);
		return false;
	}
	
	if ($('input[name="link"]').val() == '' && $('input[name="file"]').val() == ''){
		alert_pop('노선링크 또는 파일업로드를 해주시기 바랍니다.',2);
		return false;
	}
	
	if ($('input[name="link"]').val() != ''){
		var link_val = $('input[name="link"]').val();
		var linkReg = /(http(s)?:\/\/)([a-z0-9\w]+\.*)+[a-z0-9]{2,4}/gi;
		if (!linkReg.test(link_val)){
			alert_pop("http:// 또는 https:// 로 시작하는 도메인주소를 입력해주세요",2);
			return false
		}
	}
	
	var url = contextPath + "/portfolio/portfolioInsert";
	var file_url = contextPath + "/portfolio/uploadFile"
	var formData = new FormData($("#fileForm")[0]);
	var pars = $('form').serialize();
	loading();
		
	$.ajax({
		url : url,
		type : "post",
		dataType : "Json",
		data : pars,
		async: false,
		success : function(data){
			
			$.ajax({
				url : file_url,
				type : "post",
				dataType : "Json",
				data : formData,
				async: false,
				contentType: false,
				processData: false,
				success : function(data){
					unLoading();
					if(data.code == 1){
						alert_pop("저장이 완료되었습니다.",3,"","", function() {
							location.href = contextPath + data.url;
						});
					}
				},
				 error:function(request,status,error){
				        alert("code = "+ request.status + " message = " + request.responseText + " error = " + error); // 실패 시 처리	       
				        }
			});
		},
		error: function() {
			console.log("error");
		}
	});
		check = true;
	} else {
		alert_pop('중복 저장은 불가능합니다.',2);
	}
});

// 교수 찾기 모달
$(document).on('click','#findProf', function(){
	setFindUser('Professor');
	return false;
});

// 리더 찾기 모달
$(document).on('click','#findLeader', function(){
	setFindUser('Leader');
	return false;
});

// 인원 찾기 모달
$(document).on('click','#findMember', function(){
	setFindUser('Member');
	return false;
});

function setFindUser(find_type){
	var url = contextPath + "/portfolio/find"+find_type;
	var pars = $('form[name=find'+find_type+'Form]').serialize() ;
	var srchList = ''
	$.ajax({
		url : url,
		type : "post",
		dataType : "Json",
		data : pars,
		async: false,
		success : function(res){
			
			if (find_type == 'Professor'){
				srchList = res.result.professorlist;
			}else{
				srchList = res.result.leaderlist;
			}
			
			var listEle ='';
			
			var LFindType = find_type.toLowerCase();	
			$.each(srchList , function(idx, item){
								
				if (res.code ==1){					
					listEle += '<li>';
					listEle += '	<div class="img">';
					if (item._profile != null){
						listEle += '		<img src="'+resourcePath+'/portfolio/uploadfile/'+item._profile+'">'; // 프로필 이미지 구현해야됨
					}else {
						listEle += '		<img src="'+resourcePath+'/img/user.png">'; // 프로필 이미지 구현해야됨
					}
					listEle += '	</div>';
					listEle += '	<div class="name">';
					listEle += '		<span class="name_data" id_data = "'+item._id+'" srch_type = "'+LFindType+'">'+item.name+ '</span>';
					if (item.university != null){
						listEle += '		<span class="uni_data">('+item.university+ ')</span>';
					}else {
						listEle += '		<span class="uni_data"></span>';
					}
					listEle += '	</div>';
					listEle += '	<div class="mail">';
					listEle += '		<i class="ri-mail-line"></i>';
					listEle += '		<span class="mail_data">'+item.email+ '</span>';
					listEle += '	</div>';
					listEle += '</li>';
				} else {
					listEle += '<div class="id_result">';
					listEle += '	<p>일치하는 회원정보가 없습니다. 다시 확인해주세요.</p>';
					listEle += '</div>';
					
				}
				
			});
			$('#'+find_type+'_list').html(listEle);
		},
		 error: function(request,status,error){
	        alert("code = "+ request.status + " message = " + request.responseText + " error = " + error); // 실패 시 처리
	       },
	     complete : function(pars) {
	                 //  실패했어도 완료가 되었을 때 처리
	        }
	});
};

$(document).on('click','.search_list > li', function(){
	var $target = $(this).find('.name_data');
	var user_name = $target.text();
	var user_id = $target.attr('id_data');
	var srch_type = $target.attr('srch_type');
	var user_member = $('input[name="member"]').val()
	var member_split = user_member.split("|")
		
	for(var i=0; i<member_split.length; i++) {
		if(member_split[i] == user_id){
			alert_pop("이미 추가된 회원입니다.",2);
			return
		}
	}
	
	if(srch_type == 'member'){
		var user_names = $('input[name="name_'+srch_type+'"]').val();
		var user_ids = $('input[name="member"]').val();
		if(user_names == "") {
			$('input[name="name_'+srch_type+'"]').val(user_name);
			$('input[name="member"]').val(user_id);
		}else {
			$('input[name="name_'+srch_type+'"]').val(user_names+","+user_name);
			$('input[name="member"]').val(user_ids+"|"+user_id);
		}
	}else{		
		$('input[name="name_'+srch_type+'"]').val(user_name);
		$('input[name="_'+srch_type+'"]').val(user_id);
	}
	
	$('#'+srch_type+'_find').find('.btn_close').click();
	
	return false;
});

$(document).ready(function(){
	var radio_value = $(this).val();
	if(radio_value == 'group'){
		$('.li_group').css('display','inline-table');
		$('.li_member').css('display','inline-table');
	}else{
		$('.li_group').css('display','none');
		$('.li_member').css('display','none');
	}

	$('.group_type').change(function(){
		var radio_value = $(this).val();
		if(radio_value == 'group'){
			$('.li_group').css('display','inline-table');
			$('.li_member').css('display','inline-table');
		}else{
			$('.li_group').css('display','none');
			$('.li_member').css('display','none');
		}
	});
	
	$('#btn_init').on('click', function(){
		$("input[name='name_member']").val('');
		$("input[name='member']").val('');
	});
	
});

$('.btn_cancel').click(function() {
	alert_pop("저장하지않고 나가시겠습니까?",1,"취소","확인", function() {
		window.history.back();
	});
})


$('.reset').click(function() {
	if ($.browser.msie) { 
		// ie 일때 input[type=file] init. 
		$("#file_upload").replaceWith( $("#file_upload").clone(true) );
		$("#fileName").val("");
	} else { 
		// other browser 일때 input[type=file] init. 
		$("#file_upload").val("");
		$("#fileName").val("");
	}

})
