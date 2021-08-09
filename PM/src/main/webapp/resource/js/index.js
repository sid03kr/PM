var ptfList =''; //포트폴리오 리스트값 저장
var totalPage = ''; //총페이지 갯수
var IdxPageCnt = 5; //뿌려주는 페이징 갯수
var curPageGroup=1;

if($('input[name="member_type"]').val() != 'student'){
	$('button.write_btn').css("display", "none");
	$('div.sub_tit').css("padding-right", "61px");
}

$(document).ready(function (){
	
	setPortfolioList();
	
	return false;
});

// 검색식 확인버튼
$(document).on('click','.btn_sch_portfolio', function(){
	setPortfolioList(true);
	
	return false;
});

$(document).on('change','select[name="status"]', function(){
	
	setPortfolioList(true);
	
	return false;
});

//포트폴리오 리스트 뿌리기
function setPortfolioList(bChgSchOpt){
	var url = contextPath + '/portfolio/portfolioList';
	//var data = $('form[name="search_portfolio"]').serialize();
	
	var sch_key = $('#sch_key').val();
	var sch_val = $('#sch_val').val();
	var pofol_search = $('input[name="pofol_search"]:checked').val();
	
	var pageNo;
	if (bChgSchOpt){
		$('input[name="pageNo"]').val(1);
		pageNo = 1;
	} else {
		pageNo = $('input[name="pageNo"]').val();
	}
	
	var pars = {
			"pofol_search": pofol_search,
			"pageNo" : pageNo
		};

	var year_slt ='', 
		month_slt_y='', 
		month_slt_m = '' , 
		start_Date = '', 
		end_Date='';
	
	var slt_status = $('select[name="status"]').val();
			
	if (sch_val !=''){
		if (sch_key =='name'){
			pars.name = sch_val;
		} else {
			pars.content = sch_val;
		}
	}
	
	if (pofol_search == 'year'){
		year_slt = $('select[name="year_slt"]').val();
		
		pars.year = year_slt;
		
	} else if (pofol_search == 'month') {
		month_slt_y = $('select[name="month_slt_y"]').val();
		month_slt_m = $('select[name="month_slt_m"]').val();
		
		pars.year = month_slt_y;
		pars.month = month_slt_m;
		
	} else if (pofol_search == 'choose') {
		start_Date = $('input#start_Date').val();
		end_Date = $('input#end_Date').val();
		
		pars.start_Date = start_Date;
		pars.end_Date = end_Date;
	}
	
	if (slt_status != '') {
		pars.status = slt_status
	}

	$.ajax({
			type: 'POST', 
			dataType: 'json', 
			url: url, 
			//data: data,
			data: pars,
			success: function(res) {
				console.log(res)
				ptfList = res.result; //포트폴리오 리스트값 받아오기
				totalPage = res.pageNum; //총페이지수 받아오기
				
				//초기화
				$("#portfolioList").html('');
				$('#list_index').html('');
				
				// result text 변경
				$('.count').text(res.count);
				$('.evaluation').text(res.countEvaluation);
				$('.done').text(res.countDone);
				$('.wait').text(res.countWait);
				$('.complain').text(res.countComplain);
								
				if (ptfList == ''){
					return false;
				}
				
				var listEle = '';
				
				$.each(ptfList , function(idx, item){ 
					
					console.log(item)
					var mark_str = item.status;
					switch (mark_str) {
					  case 'done':  
						  mark_str = 'complete'
						  break;
					  case 'complain':
						  mark_str = 're_apply'
						  break;
					  case 'evaluation':
						  mark_str='confirm'
						  break;
					  default:
						  mark_str='waiting'
					}
					
					var status = '';
					switch(item.status){
						case 'done': status = '평가확정'; break;
						case 'complain': status = '이의신청'; break;
						case 'wait': status = '평가대기'; break;
						default: status = '평가완료'; break;
					}
					
					var yyyy = item.updatedat.substr(0,4);
					var mm = item.updatedat.substr(5,2);
					var dd = item.updatedat.substr(8,2);
					
					var dateId = yyyy+'-'+mm+dd+'-'+padZero(String(item._id), 4);
					
					listEle += '<li>';
					listEle += '	<a href=' +contextPath+"/view?no="+item._id+"&status="+item.status+'>';
					listEle += '		<div class="w10">'+dateId+'</div>';
					listEle += '		<div class="w90 id">';
					if (item.type == 'personal'){
						listEle += '			<p class="w50"><i class="ri-user-line"></i>'+item.username+'</p>';
					}else {
						listEle += '			<p class="w50"><i class="ri-group-line"></i>'+item.username+'</p>';
					}
					listEle += '			<span class="date">'+item.createdat+'</span>';
					listEle += '		</div>';
					listEle += '		<div class="w90 title">';
					listEle += '			<p class="w80">'+item.name+'</p>';
					listEle += '			<span class="'+mark_str+'">'+status+'</span>';
					listEle += '		</div>';
					listEle += '	</a>';
					listEle += '</li>';
				});
				
				$("#portfolioList").html(listEle);
				
				setListIdx(); //page list값 다시 뿌려주기

			},
			error: function() {
				console.log("error");
			}
	
	});
	
}

//페이징 리스트 뿌려주기
function setListIdx(){
	
	var curPage = $('input[name="pageNo"]').val();
	curPageGroup = Math.ceil(curPage / IdxPageCnt);
	var lastpageGroup = Math.ceil(totalPage / IdxPageCnt);
	var endPage 	= (IdxPageCnt * curPageGroup) < totalPage  ? (IdxPageCnt * curPageGroup) : totalPage ;
	var startPage = curPageGroup != lastpageGroup ? (endPage - (IdxPageCnt -1)):((curPageGroup-1)*IdxPageCnt)+1;
	
	var listIdxEle = '';
	
	if (curPage > IdxPageCnt){
		listIdxEle += '<li class="btn_move_page prev"><i class="ri-arrow-left-s-line"></i></li>';
	}
	
	for (var i = startPage; i<=endPage; i++){
		listIdxEle+='<li '+(i==curPage? "class='page_point'":'')+'"><a href="#" page="'+i+'"class="btn_move_page '+(i==curPage? 'on':' ')+'">'+ i +'</a></li>';
	}
	
	if (curPageGroup != lastpageGroup){
		listIdxEle += '<li class="btn_move_page next"><i class="ri-arrow-right-s-line"></i></li>';
	}
	
	$('#list_index').html(listIdxEle);
}

//페이지 이동
$(document).on('click','.btn_move_page', function(){
	if ($(this).hasClass('next')){
		curPage = curPageGroup *IdxPageCnt+1;
		
		if (curPage > totalPage){
			curPage = totalPage
		}
		console.log('next')
	} else if ($(this).hasClass('prev')){
		curPage = (curPageGroup -1) * IdxPageCnt ;
		
		if(curPage < 1){
			curPage = 1;
		}
		console.log('prev')
	} else {
		curPage = parseInt($(this).attr('page'));
	}
	
	$('input[name="pageNo"]').val(curPage);
	
	setPortfolioList();
	
	return false;
});

// 0단위 붙이기
function padZero(char, len, c){
	var c= c || '0';
	while (char.length< len) char= c+ char;
	return char;
}







