$(document).ready(function (){
	var _id = document.location.search;	
	var url = contextPath + "/portfolio/portfolioView"+_id;
	var data = $('form').serialize();
	
	
	$('#btn_init').on('click', function(){
		$("input[name='name_enter']").val('');
		$("input[name='enter']").val('');
	});
	
	$.ajax({
		url : url,  //controller url
		type : "post",  // method type
		dataType : "Json",  //data type
		data : data,  
		success : function(res){
			console.log(res);
			
			var userlist = res.result.userlist;
			for(var i=0; i<userlist.length;i++) {
				if(i == 0) $('span.member').text(userlist[i].name);
				else $('span.member').append(", "+userlist[i].name);
			}
			
			var enterlist = res.result.enterlist;
			for(var i=0; i<enterlist.length;i++) {
				if (i == 0) $('input[name="name_enter"]').val(enterlist[i].name);
				else $('input[name="name_enter"]').val($('input[name="name_enter"]').val()+", "+enterlist[i].name);
				
				if (i == 0) $('input[name="enter"]').val(enterlist[i]._id);
				else $('input[name="enter"]').val($('input[name="enter"]').val()+"|"+enterlist[i]._id);
			}
			var type = "";
			
			var resultList = res.result.resultlist[0];
			
			if (resultList.type == "personal"){	
				type = "개인"	
				$('.view_member').css("display",'none');	
				$('.view_group').css("display",'none');	
			} else{	
				type = "그룹";	
				$('.view_member').css("display",'inline-table');	
				$('.view_group').css("display",'inline-table');	
			};
			
			$('.pt_type').text(type); 
			$('input[name="no"]').val(resultList._id);
			$('input[name="type"][value="'+resultList.type+'"]').prop('checked',true);
			$('._professor').text(resultList.professor);
			$('._leader').text(resultList.leader);
			$('.name').text(resultList.name);
			$('.startDate').text(resultList.startDate);
			$('.endDate').text(resultList.endDate);
			$('.status').val(resultList.status);	
			$('.apply').text(resultList.score);
			$('input[name="score"]').val(resultList.score);
			$('span.score').text(resultList.score); 
			$('input[name="complain"]').val(resultList.complain);
			$('input[name="answer"]').val(resultList.answer);
			$('span.answer').text(resultList.answer);
			$('.contents').html(resultList.content);
			
			$('a.link_a').attr( "href", resultList.link).text(resultList.link);
//			$('.link').text(resultList.link);
			
			if(resultList.shaHash != null) {
				var shaHash = resultList.shaHash.substring(0,25);
				$('.fileHash').text(shaHash);
				if($('input[name="type"]').val() == 'professor'){
					$('.fileHash').closest('li').append('<button class="btn br_0 view_search_btn fl_right" data-dialog="file_verification">검증</button>')
					
					$('button.view_search_btn').click(function(){
						
						var fileUrl = resultList.fileUrl;
						var shaHash = resultList.shaHash;
						var no = $('input[name="no"]').val();
						
						$.ajax({
							url : contextPath+"/portfolio/shaVerifi?shaHash="+shaHash+"&fileUrl="+fileUrl+"&no="+no,
							type : "post",
							dataType : "json",
							success : function(data){
								if(data.code == 1 ) {
									alert_pop("위변조 없는 검증된 파일입니다.",3,"","", function() {
									})
								}else {
									alert_pop("검증값과 일치하지않습니다. 변경된 파일입니다.",3,"","", function() {
									})
								}
							}
						});
					})
				}
			}
			
			if($('input[name="type"]').val() == 'professor' || $('input[name="type"]').val() == 'student') {
				$('span.complain').text(resultList.complain);
			};
			
			//파일 첨부
			if (resultList.fileUrl) {
				$('a.fileUrl').attr('href',resultList.fileUrl);	
			} else {
				$('.btn_download').hide();
			}
			
			$('button[name="btn_link"]').attr('onclick',"location.href="+""+resultList.fileUrl+"'");
			$('a.revise').attr("href", contextPath+"/revise?no="+$('input[name="no"]').val());
			if( resultList.fileType =="png" || resultList.fileType =="jpg" || resultList.fileType =="jpeg" || resultList.fileType=="bmp" || resultList.fileType =="gif"){
				$('a.download').attr ( "href", resourcePath+"/portfolio/uploadfile/"+resultList.fileUrl);				
			}else {
				$('a.download').attr ( "href", contextPath+"/portfolio/portfolioView/load?file="+resultList.fileUrl);
			}
			
			var user_type = $('input[name="type"]').val();
			var status = resultList.status;
			
			if (user_type == 'student'){
				if (status == 'wait'){
					$('li#modify').show();
					$('li#delete').show();
				} else if(status == 'evaluation'){
					$('li#complain, li#done').show();					
				} else if (status == 'done'){
					$('li#enter_share').show();
				}
			}else if(user_type == 'professor'){
				if (status == 'wait' || status == 'complain'){
					$('li#evaluation').show();
				}
			}
			if (status == 'done' && user_type == 'student'){
				$('li.search_enter').removeClass("disabled");
			}
		},
		error: function() {
			console.log("error");
		}
	});
	
});

$(document).on('click', '#findenter', function(){
	setFindUser('enter');
})

$('#enter_share').click(function(){
	$.ajax({
		url : contextPath+"/portfolio/portfoliocomplete",
		type : "post",
		dataType : "json",
		data : $('form[name="waiting"]').serialize(),
		success : function(data){
			alert_pop("기업 공유가 완료되었습니다.",3,"","", function() {
				location.href = contextPath + "/index";
			})
		}
	});
});

// 삭제하기 버튼 함수
$('button.delete').click(function(){
	var no = $('input[name="no"]').val();
	alert_pop("해당 게시물을 삭제하시겠습니까?.",1,"취소","확인", function() {
		
		$.ajax({
			url : contextPath+"/portfolio/deletePortfolio?no="+no,
			type : "post",
			dataType : "json",
			success : function(data){
				alert_pop("게시물이 삭제되었습니다.",3,"","", function() {
					location.href = contextPath + "/index";
				})
				
			}
		});
	});
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
			srchList = res.result.enterlist;
			
			var listEle ='';
			
			var LFindType = find_type.toLowerCase();	
			$.each(srchList , function(idx, item){
								
				if (res.code ==1){					
					listEle += '<li>';
					//listEle += '<input type="hidden" id="_id_data" value='+item._id+'>';
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
					listEle += '	<p>일치하는 정보가 없습니다. 다시 확인해주세요.</p>';
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
	var user_names = $('input[name="name_'+srch_type+'"]').val();
	var user_ids = $('input[name="enter"]').val();
	
	var name_enter = $('input[name="enter"]').val()
	var enter_split = name_enter.split("|")
		
	for(var i=0; i<enter_split.length; i++) {
		if(enter_split[i] == user_id){
			alert_pop("이미 추가된 회원입니다.",2);
			return
		}
	}
	
	if(user_names == "") {
		$('input[name="name_'+srch_type+'"]').val(user_name);
		$('input[name="enter"]').val(user_id);
	}else {
		$('input[name="name_'+srch_type+'"]').val(user_names+","+user_name);
		$('input[name="enter"]').val(user_ids+"|"+user_id);
	}
	
	
	$('#'+srch_type+'_find').find('.btn_close').click();
	
	return false;
});







