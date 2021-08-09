$(document).ready(function() {
	professor();
	member();
	leader();
	$('.form-control').select2();
	return false
})

$('select[name="type"]').change(function(){
		if($('select[name="type"]').val() == 'group'){
			$('.type_group').css('display','inline-table');
			$('.form-control').select2();
		}else{
			$('.type_group').css('display','none');
		}
	});

$('#update_pofol').click(function () {
	
	if ($('select[name="_user"]').val() == ''){
		alert('작성자를 입력바랍니다.');
		return false;
	}
	if ($('input[name="name"]').val() == ''){
		alert('제목을 입력바랍니다.');
		return false;
	}
	if ($('input[name="startDate"]').val() == '' || $('input[name="endDate"]').val() == ''){
		alert('기간을 입력바랍니다.');
		return false;
	}
	if ($('input[name="startDate"]').val() >  $('input[name="endDate"]').val()){
		alert('시작일이 종료일보다 빨라야합니다.');
		return false;
	}
	
	if ($('input[name="_professor"]').val() == ''){
		alert('교수값이 비어있습니다.');
		return false;
	}
	
	if ($('textarea').val() == ''){
		alert('본문내용을 입력바랍니다.');
		return false;
	}
	
	if ($('input[name="link"]').val() == '' && $('input[name="fileName"]').val() == ''){
		alert('노선링크 또는 파일업로드를 해주시기 바랍니다.');
		return false;
	}
	
	if ($('input[name="link"]').val() != ''){
		var link_val = $('input[name="link"]').val();
		var linkReg = /(http(s)?:\/\/)([a-z0-9\w]+\.*)+[a-z0-9]{2,4}/gi;
		if (!linkReg.test(link_val)){
			alert("http:// 또는 https:// 로 시작하는 도메인주소를 입력해주세요");
			return false
		}
	}
	
	if(confirm("위 내용으로 수정하시겠습니까 ?") == true){
		var fileName = $('input[name="fileName"]').val();
		var data = $('#pofolViewForm').serialize();
		var formData = new FormData($("#pofolViewForm")[0]);
		formData.append("fileName", fileName);
		
		var name_member = $('[name="name_member"]').val();     // ["448", "453", "454"]
		console.log(name_member);
		if( name_member != null  && name_member != "") {
			var member = name_member.join( '|' );    // 448|453|454
			data += "&member="+member;
			console.log(member);
		}
		
		$.ajax({
			type:'post',
			url: contextPath + "/portfolio/portfolioEditReq",
			dataType: 'json',
			data : data,
			async:false,
			success: function(data) {
				
				if($('input[name="file"]').val() != "" && $('input[name="file"]').val != null){
					$.ajax({
						type:'post',
						url: contextPath + "/portfolio/uploadFile",
						dataType: 'json',
						async:false,
						data : formData,
						contentType: false,
						processData: false,
						success: function(data) {
						},
						error: function() {
							console.log("error");
						}
					});
				}
				if (($('input[name="fileName"]').val() == "" && $('input[name="file"]').val() == "" ) || ($('input[name="fileName"]').val() == null &&  $('input[name="file"]').val() == null)) {
					var no = $('input[name="no"]').val();
					
					// 파일 값도 null 넣어야할수도있음 
					$.ajax({
						url : contextPath + "/portfolio/deleteSha?no="+no,
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
				alert("수정되었습니다.");
				location.href = contextPath + '/admin_pofol'
			},
			error: function() {
				console.log("error");
			}
		});
    }
    else{
        return ;
    }
	
})

$('#delete_pofol').click(function () {
	if(confirm("정말 삭제하시겠습니까 ?") == true){
		var no = $('input[name="no"]').val();
		$.ajax({
			type:'post',
			url: contextPath + "/portfolio/deletePortfolio",
			dataType: 'json',
			data : {no:no},
			async:false,
			success: function(data) {
				alert("삭제되었습니다.");
				location.href = contextPath + '/admin_pofol'
			},
			error: function() {
				console.log("error");
			}
		});
    }
    else{
        return ;
    }
	
})


function pofolView() {
	var no = $('input[name="no"]').val();
	
	$.ajax({
		type:'post',
		url: contextPath + "/portfolio/portfolioView",
		dataType: 'json',
		async:false,
		data : {no:no},
		success: function(data) {
			console.log(data);
			res = data.result.resultlist[0]
			
			$('option[value="'+res.type+'"]').prop('selected',true);
			if($('select[name="type"]').val() == 'group'){
				$('.type_group').css('display','inline-table');
				$('.form-control').select2();
			}else{
				$('.type_group').css('display','none');
			}
			$('input[name="name"]').val(res.name);
			$('input[name="_id"]').val(res._user);
			$('input[name="startDate"]').val(res.startDate);
			$('input[name="endDate"]').val(res.endDate);
			
			$('#prof'+res._professor).val(res._professor).prop("selected", true);
			$('option[value="'+res._leader+'"]').prop('selected',true);
			console.log(data.result.userlist.length>0);
			console.log(data.result.userlist[1]._id);
			console.log(data.result.userlist.length);
			if(data.result.userlist.length >0 ){
				for(var i=0; i<data.result.userlist.length; i++) {
					$('option[value="'+data.result.userlist[i]._id+'"]').prop('selected',true);
					if(i == data.result.userlist.length-1) {
						$('.form-control').select2();
					}	
				}
			}
			
			$('textarea').html(res.content.replace("<p>","").replace("</p>",""));
			$('input[name="link"]').val(res.link);
			$('input[name="fileName"]').val(res.fileName);
			$('input[name="status"]').val(res.status);
		},
		error: function() {
			console.log("error");  
		}
	});
}


$('#del_file').click(function() {
	$('#file_upload').val("");
	$('#fileName').val("");
})

function leader() {						
	
	var name = $('input[name="hidden_name"]').val();
	
	$.ajax({					
		url : contextPath+ "/portfolio/findLeader",
		type : 'post',				
		dataType : 'json',			
		data: {name:name},
		success : function(data) {
			var length=data.result.leaderlist.length;
			
			var arr = new Array('<option value="">Select...</option>');
			
			for(var i=0; i<length; i++) {
				arr.push('<option value="'+data.result.leaderlist[i]._id+'">'+data.result.leaderlist[i].name+'</option>');
			}
			$('select[name="_leader"]').html(arr.join(''));
			pofolView();
		}		
	});					
}
function professor() {						
	
	var name = $('input[name="hidden_name"]').val();
	
	$.ajax({					
		url : contextPath+ "/portfolio/findProfessor",				
		type : 'post',				
		dataType : 'json',			
		data: {name:name},
		success : function(data) {
			var length=data.result.professorlist.length;
			
			var arr = new Array('<option value="">Select...</option>');
			
			for(var i=0; i<length; i++) {
				arr.push('<option id="prof'+data.result.professorlist[i]._id+'" value="'+data.result.professorlist[i]._id+'">'+data.result.professorlist[i].name+'</option>');
			}
			$('select[name="_professor"]').html(arr.join(''));
		}		
	});					
}

function member() {						
	
	var name = $('input[name="hidden_name"]').val();
	
	$.ajax({					
		url : contextPath+ "/portfolio/findMember",				
		type : 'post',				
		dataType : 'json',			
		data: {name:name},
		success : function(data) {
			var length=data.result.leaderlist.length;
			
			var arr = new Array();
			
			for(var i=0; i<length; i++) {
				arr.push('<option class="member_data" value="'+data.result.leaderlist[i]._id+'">'+data.result.leaderlist[i].name+'</option>');
			}
			$('select[name="name_member"]').html(arr.join(''));
		}		
	});					
}


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