var ptfList =''; //포트폴리오 리스트값 저장
var totalPage = ''; //총페이지 갯수
var IdxPageCnt = 5; //뿌려주는 페이징 갯수
var curPageGroup=1;
var curPage = 1;

$(document).ready(function() {
     getAdminList ()
	return false
   
})

$(document).on('change','select[name="postNum"]', function(){
	getAdminList(true);
	return false;
});

$("#sd_all").click(function(){
    if($("#sd_all").prop("checked")){
        $("input[name=admin_sd_ck_1]").prop("checked",true);
        setchkcnt();
    } else{
    	$('.guide_msg').hide();
        $("input[name=admin_sd_ck_1]").prop("checked",false);
    }
});

//input check 값 변경될 경우
$(document).on('change',$("input[name=admin_sd_ck_1]"), function(){
	setchkcnt();
	
	return false;
});

//guide msg 삭제 버튼 클릭
$(document).on('click','.btn_del_msg ', function(){
	var type = $('input[name="type"]').val();
	var _id = new Array();
	$('input[name="admin_sd_ck_1"]:checked').each(function() {
		var check = $(this).val();
		_id.push(check);
		// _id.join(check);
	});
	var _id2 = _id.join().replace(/ /g,"");
	
	$.ajax({
		type:'post',
		url: contextPath + "/admin/deleteUser",
		dataType: 'json',
		async:false,
		data : {_id:_id2},
		success: function(data) {
			location.href = contextPath + "/admin_pf?type=" +type
		},
		error: function() {
			console.log("error");
		}
	});
	
});

function setchkcnt(){
	
	if (!$('.guide_msg').is('visible')){
		$('.guide_msg').show();
	}
	var chk_cnt = $('input[name="admin_sd_ck_1"]:checked').length;
	$('.chk_cnt').text(chk_cnt);
	
	if(chk_cnt < 1){
		$('.guide_msg').hide();
	}
	
	return false;
}

$('input[name="name"]').keyup(function() {
	getAdminList ()
	
	return false
})


function getAdminList (search) {
	var data = $('form[name="am_professor"]').serialize();
	$.ajax({
		type:'post',
		url: contextPath + '/admin/listMapping',
		dataType: 'json',
		data : data,
		success: function(data) {
			ptfList = data.result; //포트폴리오 리스트값 받아오기
			totalPage = data.pageNum; //총페이지수 받아오기
			$('input[name="count"]').val(data.count);
			$('#list_index').html('');
			$('#userList').html('');
			
			var ele ='';
			
			for(var i=0; i<data.result.length; i++){
				var result= data.result[i]
				
				var gender = '';
				switch(result.gender){
					case 'male': gender = '남성'; break;
					default: gender = '여성'; break;
				}
				
				ele+='<tr>';
				ele+='	<td>';
				ele+='		<input type="checkbox" name="admin_sd_ck_1" id="sd_ck_'+result._id+'" value="'+result._id+' ">';
				ele+='		<label for="sd_ck_'+result._id+'"></label>';
				ele+='	</td>';
				ele+='	<td>';
				ele+='		<a href="'+contextPath+'/admin_sd_info?_id='+result._id+'&type='+result.type+'" class="am_point"><i class="ri-eye-fill"></i></a>';
				ele+='	</td>';
				ele+='	<td>'+result.identifier+'</td>';
				ele+='	<td>';
				ele+='		<div class="img">';
				
				if(result._profile =="" || result._profile ==null){
					ele+='			<img src="'+resourcePath+'/img/user.png">';
				}else {
					ele+='			<img src="'+resourcePath+'/portfolio/uploadfile/'+result._profile+'">';
				}
				ele+='		</div>';
				ele+='	</td>';
				ele+='	<td>'+result.name+'</td>';
				if(result.university == null) {
					ele+='	<td></td>';
				}else {
					ele+='	<td>'+result.university+'</td>';
				}
				if(result.universitymajor == null) {
					ele+='	<td></td>';
				}else {
					ele+='	<td>'+result.universitymajor+'</td>';
				}
				if(result.universitynumber == null) {
					ele+='	<td></td>';
				}else {
					ele+='	<td>'+result.universitynumber+'</td>';
				}
				ele+='	<td>'+result.birth+'</td>';
				ele+='	<td>'+gender+'</td>';
				ele+='	<td>'+result.phone+'</td>';
				ele+='</tr>';
			}
			
			$("#userList").html(ele);
			setListIdx(); //page list값 다시 뿌려주기
			pageValue();
			
		},
		error: function() {
			console.log("error");
		}
	})
}

$('.reset_btn').click(function () {
	$('input[name="name"]').val("");
	getAdminList ();
	
	return false
	
})

function setListIdx(){
	
	var curPage = $('input[name="pageNo"]').val();
	curPageGroup = Math.ceil(curPage / IdxPageCnt);
	var lastpageGroup = Math.ceil(totalPage / IdxPageCnt);
	var endPage 	= (IdxPageCnt * curPageGroup) < totalPage  ? (IdxPageCnt * curPageGroup) : totalPage ;
	var startPage = curPageGroup != lastpageGroup ? (endPage - (IdxPageCnt -1)):((curPageGroup-1)*IdxPageCnt)+1;
	
	var listIdxEle = '';
	
	listIdxEle += '<li class="btn_move_page p_next"><img src="'+resourcePath+'/img/end.png"></li>';
	listIdxEle += '<li class="btn_move_page next"><i class="ri-arrow-right-s-line"></i></li>';
	listIdxEle += '<li class="btn_move_page prev"><i class="ri-arrow-left-s-line"></i></li>';
	listIdxEle += '<li class="btn_move_page p_prev"><img src="'+resourcePath+'/img/first.png"></li>';
	
	$('#list_index').html(listIdxEle);
}

function pageValue(){
	
	var curPage = $('input[name="pageNo"]').val();
	var count = $('input[name="count"]').val();
	curPageGroup = Math.ceil(curPage / IdxPageCnt);
	var lastpageGroup = Math.ceil(totalPage / IdxPageCnt);
	var endPage 	= (IdxPageCnt * curPageGroup) < totalPage  ? (IdxPageCnt * curPageGroup) : totalPage ;
	var startPage = curPageGroup != lastpageGroup ? (endPage - (IdxPageCnt -1)):((curPageGroup-1)*IdxPageCnt)+1;
	var postNum = $('select[name="postNum"]').val();
	var totalPageNo = Math.ceil(count / postNum);
	
	var listIdxEle = '';
	
	listIdxEle+='<li>'+curPage+'  -  '+totalPageNo+'   of   '+count+'</li>';
	
	$('#pageValue').html(listIdxEle);
}


//페이지 이동
$(document).on('click','.btn_move_page', function(){
	var count = $('input[name="count"]').val();
	var postNum = $('select[name="postNum"]').val();
	var totalPageNo = Math.ceil(count / postNum);
	
	
	if ($(this).hasClass('p_next')){
		curPage = totalPageNo;
		
		if (curPage > totalPageNo){
			curPage = totalPageNo;
		}
	} else if ($(this).hasClass('p_prev')){
		curPage = 1;
	} else if($(this).hasClass('next')) {
		++curPage;
		if(curPage > totalPage) {
			curPage = totalPage;
		}
	}else if($(this).hasClass('prev')) {
		curPage -= 1;
		if(curPage < 1 ){
			curPage = 1;
		}
	} 
	
	$('input[name="pageNo"]').val(curPage);
	
	getAdminList ();
	
	return false;
});