$(document).ready(function() {
	//writer()
	leader()
	member()
	professor()
	$('.form-control').select2();
	
	if($('select[name="type"]').val() == 'group'){
		$('.type_group').css('display','inline-table');
	}else{
		$('.type_group').css('display','none');
	}
	
	$('select[name="type"]').change(function(){
		if($('select[name="type"]').val() == 'group'){
			$('.type_group').css('display','inline-table');
		}else{
			$('.type_group').css('display','none');
		}
	});

	return false
})


$('select[name="type"]').val()

$('#insertPofol').click(function() {
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
	
	if ($('input[name="link"]').val() == '' && $('input[name="file"]').val() == ''){
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
	
	var _user = $('input[name="page_user"]').val();
	var job_type = $('input[name="job_type"]').val();
	var data = $('form[name="am_pofol_add"]').serialize();
	var formData = new FormData($("#am_pofol_add")[0]);
	
	var name_member = $('[name="name_member"]').val();     // ["448", "453", "454"]
	if( name_member != null  && name_member != "") {
		var member = name_member.join( '|' );    // 448|453|454
		data += "&member="+member;
	}
	
	$.ajax({
		type:'post',
		url: contextPath+"/admin/insertPofol",
		dataType: 'json',
		async:false,
		data : data,
		success: function(data) {
			if(_user === "null"){
				location.href = contextPath + "/admin_pofol";
			}else {
				location.href = contextPath + "/admin_sd_pofol?_id="+_user+"&type="+job_type;
			}
			
			if($('input[name="fileName"').val() != "" && $('input[name="fileName"]').val != null){
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
		},
		error: function() {
			console.log("error");
		}
	});
});

/*
function writer() {						
	
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
			$('select[name="_user"]').html(arr.join(''));
						
		}		
	});					
}
*/

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
			$('select[name="_user"]').html(arr.join(''));
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
				arr.push('<option value="'+data.result.professorlist[i]._id+'">'+data.result.professorlist[i].name+'</option>');
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
