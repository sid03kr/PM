var ptfList =''; //포트폴리오 리스트값 저장
var totalPage = ''; //총페이지 갯수
var IdxPageCnt = 5; //뿌려주는 페이징 갯수
var curPageGroup=1;
var curPage = 1;

$(document).ready(function() {
	getPofolList()
	return false
})

$(document).on('change','select[name="postNum"]', function(){
	
	getPofolList(true);
	
	return false;
});

$('input[name="name"]').keyup(function() {
	getPofolList()
	
	return false
})

function getPofolList (search) {
	var data = $('form[name="pofol_list"]').serialize();
	$.ajax({
		type:'post',
		url: contextPath + '/admin/pofolList',
		dataType: 'json',
		data : data,
		success: function(data) {
			ptfList = data.result; //포트폴리오 리스트값 받아오기
			totalPage = data.pageNum; //총페이지수 받아오기
			$('input[name="count"]').val(data.count);
			$('#list_index').html('');
			var ele ='';
			
			for(var i=0; i<data.result.length; i++){
				var result= data.result[i]
				
				ele+='<tr>';
				ele+='	<td>'; 
				ele+='		<a href="'+contextPath+'/admin_pofol_re?no='+result._id+' " class="am_point"><i class="ri-eye-fill"></i></a>';
				ele+='	</td>';
				ele+='	<td>'+result._id+'</td>';
				ele+='	<td>'+result.name+'</td>';
				ele+='	<td>'+result.type+'</td>';
				ele+='	<td>'+result.status+'</td>';
				ele+='	<td>'+result.startdate+'</td>';
				ele+='	<td>'+result.enddate+'</td>';
				ele+='</tr>';
			}
			$("#pofolList").html(ele);
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
	getPofolList();
	
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
	
	getPofolList();
	
	return false;
});