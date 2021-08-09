var dialog = '';

$('form').on('submit', function(event) {
    event.preventDefault();
});

$('input[type="checkbox"]#chk_all').on('click', function(){
	if($(this).prop('checked') == true) $(this).parents('ul').find('input').prop('checked', true);
	else $(this).parents('ul').find('input').prop('checked', false);
	console.log( $(this).prop('checked') );
});

$(function(){
	$('ul li a').on("click", function(){
		dialog = $(this).data("dialog");
		$('#'+$(this).data("dialog")).addClass("dialog--open");
	});
	$('button[data-dialog-close]').click(function(){
		$('#'+dialog).removeClass("dialog--open");
	});
	

	$('.btn_back').on('click', function(){
		alert_pop('이전 페이지로 이동 하시겠습니까?', 1, '아니오', '예',  function(){
			history.back();
		});
	});

	$('.btn_logout').on('click', function(){
		alert_pop('로그아웃 하시겠습니까?', 1, '아니오', '예',  function(){
		});
	});

	$('.btn_revers').on('click', function(){
		var theme = $('.wrap').hasClass('theme_dark');
		if (theme == false){
			$('.wrap').addClass('theme_dark');
		} else {
			$('.wrap').removeClass('theme_dark');
		}
	});
	
	
	
	
	

	//메뉴 버튼 클릭시 화면 전환
	$('.btn_menu').on('click', function(){
		var data_name= $(this).attr('data-name');
		$('.con_right').hide();
		$('.con_right[data-content='+data_name+']').show();


	});

	//우클릭 방지
	$('body').contextmenu( function() {
		return false;
	});
	





	$('.btn_view').on('click', function(){
		$('.left_button > ul').animate({
			height:'toggle',
		}, 200);
	});
	
	$('.tree').dblclick(function() {
		$(this).parents().find('input:checkbox').prop('checked', false);
    });
	
	

	$('.vertical_line').on('click', function(){
		var org_width = $('.wrap').width() - (580 - ( 300 - $('.con_left').width()) - ( 270 - $('.con_mid').width())) ;
		var prev_width = $(this).prev().width();
		
		if ($(this).find('i').hasClass('fold')){
			$(this).find('i').removeClass('fold').addClass('open');

		} else {
			$(this).find('i').removeClass('open').addClass('fold');
		}

		$(this).prev().animate({
			width: 'toggle'
		}, {
			duration: 300, 
			step: function(now, fx) {
				//$('.drag').css('width', org_width + (prev_width - now));
				$('.con_right').css('width', org_width + (prev_width - now));
				
		   }
		});
	});


	
	//팝업 탭
	$('.dialog_tab button').on('click', function(){
		var con_view = $(this).attr('data-tab-name');
		$('.dialog_tab button').removeClass('basic');
		$(this).addClass('basic');
		$('.tab_content').hide();
		$('.con_'+con_view).show();
	});

	$('.btn_add_user').on('click', function(){
		$('#set_user_en').addClass('dialog--open');
	});
	
	
	//사이트 생성
	var site_num = $('.tree_depth1').length;
	$('#pop_site button.point').on('click', function(){

		var ele = '';
		var shape = $(this).closest('.dialog').attr('id');
		var site_name = $(this).closest('.dialog').find('.write_name').val();

		if (site_name == '') {
			alert_pop('이름을 입력해주세요', 2); 

			return false;
		}
		
		
		site_num++;

		$(this).closest('.dialog').removeClass('dialog--open');

		ele += '<li class="tree_li tree_depth2" site-num="'+site_num+'">';
		ele += '	<input type="checkbox" id="'+site_num+'">';
		ele += '	<label for="'+site_num+'">'+site_name+'</label>';
		ele += '	<i class="ri-error-warning-fill color_red property_more "></i>';
		ele += '	<dl class="tree_menu"></dl>'
		ele += '</li>';

		$('.tree_depth1').append(ele);
		$('.tree_menu').html('').append(tree_menu(shape));


	});

	//속성 추가
	$('.pop_dialog .btn.point').on('click', function(){

		var ele ='';
		var site_img;
		var shape = $(this).closest('.dialog').attr('id');
		var site_name = $(this).closest('.dialog').find('.write_name').val();
		var tree_num = $(this).closest('.dialog').attr('site-num');

		if (site_name == '') {
			alert_pop('이름을 입력해주세요', 2); 

			return false;
		}
		

		
		if (shape == 'pop_build') {
			site_img = resourcePath+'/img/icon_tree/treeicon_building.png';
		} else if (shape == 'pop_floor'){
			site_img = resourcePath+'/img/icon_tree/treeicon_floor.png';
		} else if (shape == 'pop_room') {
			site_img = resourcePath+'/img/icon_tree/treeicon_office.png';
		} else if (shape == 'pop_group') {
			site_img = resourcePath+'/img/icon_tree/treeicon_group.png';
		} else {
			site_img = '';
		}
		

		$(this).closest('.dialog').removeClass('dialog--open');

		ele += '<ul class="tree_list">';
		ele += '	<li class="tree_li">';
		ele += '		<div class="line1 point"></div>';
		ele += '		<div class="line2 point"></div>';
		ele += '		<div class="line3"></div>';
		ele += '		<input type="checkbox" id="'+site_num+'" checked="checked">';
		ele += '		<label for="'+site_num+'">';
		ele += '			<a>';
		ele += '				<img src="'+site_img+'">'+site_name+'';
		ele += '				<i class="ri-error-warning-fill color_red property_more "></i>';
		ele += '			</a>';
		ele += '		</label>';
		ele += '		<dl class="tree_menu"></dl>'
		ele += '	</li>';
		ele += '</ul>';

		$('.tree_depth2[site-num="'+tree_num+'"]').append(ele);
		$('.tree_menu').html('').append(tree_menu(shape));


		$('.tree_menu a').on('click', function(){
			var pop_name = $(this).attr('data-dialog');

			$('.wrap').find('#'+pop_name).addClass('dialog--open');
		});

		
	});

	
	$('.tree_menu a').on('click', function(){
		var tree_num = $(this).closest('.tree_depth2').attr('site-num');
		var pop_name = $(this).attr('data-dialog');
		
		$('.wrap').find('#'+pop_name).attr('site-num', tree_num);
		$('.wrap').find('#'+pop_name).addClass('dialog--open');
		

	});

	$('.property_more').on('click', function(){
		var site_num = $(this).closest('.tree_depth2').attr('site-num');
		$('.tree_depth2[site-num="'+site_num+'"]').children('.tree_menu').toggle();
	});


	$('.dialog_close').on('click',function(){
		$(this).closest('.dialog').removeClass('dialog--open');
	});

	
	

});


$(window).load(function(){
//    $.datepicker.setDefaults({
//        dateFormat: 'yy-mm-dd',
//        prevText: '이전 달',
//        nextText: '다음 달',
//        monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
//        monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
//        dayNames: ['일', '월', '화', '수', '목', '금', '토'],
//        dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
//        dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
//        showMonthAfterYear: true,
//		changeYear: true,
//		changeMonth: true,
//        yearSuffix: '년'
//    });
//	$('input[type="date"]').datepicker({
//		onChangeMonthYear: function(input, inst) {
//			setTimeout(function() {
//				$('#ui-datepicker-div > div').addClass('point');
//				$('#ui-datepicker-div thead').addClass('point');
//			}, 0);
//		},
//		beforeShow: function(input, inst) {
//			setTimeout(function() {
//				$('#ui-datepicker-div > div').addClass('point');
//				$('#ui-datepicker-div thead').addClass('point');
//			}, 0);
//		}
//	});
	$('input[type="time"]').timepicker({
		show2400: true,
		step: 1,
		timeFormat:'H:mm'
	});

	



});


//기본 안내 팝업
function alert_pop(text, num, btn_text1, btn_text2, action){
	/*
	var pop='';
	pop += '<div class="dialog dialog--open dialog_pop">';
	pop += '		<div class="dialog__overlay"></div>';
	pop += '		<div class="dialog__content dialog_sm">';
	pop +='			<div class="dialog_top"><button class="dialog_close" data-dialog-close><i class="ri-close-fill"></i></button></div>';
	pop +='			<div class="dialog_body">';
	pop +='				<p>'+text+'</p>';
	pop +='			</div>';
	pop +='			<div class="dialog_btn">';
	//버튼 두개 사용할 경우
	if (num == 1){
		pop += '				<button class="btn fl_left dialog_close"><i class="ri-close-fill"></i>'+btn_text1+'</button>';
		pop += '				<button class="btn point dialog_ok"><i class="ri-check-line"></i>'+btn_text2+'</button>';
		
	} else {
		pop += '				<button class="btn point dialog_close"><i class="ri-check-line"></i>확인</button>';
	}
	pop += '			</div>';
	pop +='		</div>';
	pop += '</div>';
	*/
	
	var pop='';
	pop += '<div id="my_save" class="dialog dialog--open dialog_pop">';
	pop += '		<div class="dialog__overlay"></div>';
	pop += '		<div class="dialog__content simple w75">';
	pop +='			<div class="dialog_top">';
	pop +='			</div>';
	pop +='				<div class="dialog_body">';
	pop +='				<p>'+text+'</p>';
	pop +='			</div>';
	pop +='			<div class="dialog_btn writer_btn">';
	//버튼 두개 사용할 경우
	if (num == 1){
		pop += '				<button class="btn  dialog_close"><i class="ri-close-fill"></i>'+btn_text1+'</button>';
		pop += '				<button class="btn point dialog_ok"><i class="ri-check-line"></i>'+btn_text2+'</button>';
		
	} else if (num == 3){
		pop += '				<button class="btn point dialog_ok"><i class="ri-check-line"></i>'+btn_text2+'</button>';
	} else {
		pop += '				<button class="btn  point writer_bt" data-dialog-close>확인</button>';
	}
	pop += '			</div>';
	pop +='		</div>';
	pop += '</div>';

	$('.wrap').append(pop);
	
	$('.pop_ok, .dialog_ok').on('click', function(){
		action();
		$('.dialog_pop').remove();
		return false;
	});

	$('.pop_close, .dialog_pop').on('click', function(){
		$('.dialog_pop').remove();
		return false;
	});
}


//DataTables 생성
function table(columns){
	var lang_kor = {
	        "decimal" : "",
	        "emptyTable" : "데이터가 없습니다.",
	        "info" : " _END_건이 조회되었습니다.",
	        "infoEmpty" : "",
	        "infoFiltered" : "( 전체 _MAX_건이 조회되었습니다. )",
	        "infoPostFix" : "",
	        "thousands" : ",",
	        "lengthMenu" : "_MENU_ 개씩 보기",
	        "loadingRecords" : "로딩중...",
	        "processing" : "처리중...",
	        "search" : "검색 : ",
	        "zeroRecords" : "검색된 데이터가 없습니다.",
	        "paginate" : {
	            "first" : "<i class='ri-rewind-mini-fill'></i>",
	            "last" : "<i class='ri-speed-mini-fill'></i>",
	            "next" : "<i class='ri-play-mini-fill test'></i>",
	            "previous" : "<i class='ri-play-mini-fill test'></i>"
	        },
	        "aria" : {
	            "sortAscending" : " :  오름차순 정렬",
	            "sortDescending" : " :  내림차순 정렬"
	        }
	    };
	
	var tables = $('#admin3table').DataTable({
		order:[[1,'asc']], // 정렬
		colReorder:true, // 열이동
		responsive: true, // 반응형
		retrieve: false,
		rowReorder: false,// 행 이동
		stateSave:false, // 새로고침시 페이징 처리 여부
		paginate: true, // 페이징 활성화 여부
		pagingType:  "full_numbers", // 페이징표시여부
		autoWidth: false, // 컬럼 자동 사이즈 조절
		autoHeight: false, // 로우 수에 맞게 상하 자동 조절
		scrollX: true, // 좌우 스크롤 사용 여부(true/false) / 고정 된 좌우 길이값(300px)
        scrollY: 792, // 상하 스크롤 사용 여부(true/false) / 고정된 상하 길이값(300px) / "auto"
		scrollCollapse:true,
		destroy: true, //테이블 재생성
		ordering: true , // 헤더 셀 선택 시 선택 된 셀 기준으로 order by 처리
		searching: false, // 텍스트 검색 활성화 여부, serverSide가 true일 경우 조회 된 내용 중에서만 검색한다.
		info: true, // 조회 건 수 표시 여부
		lengthChange: true, // 출력 할 Row 설정 여부
		pageLength: row, // 출력 할 Row 갯수
		lengthMenu: [[30, 60, 90], [30, 60, 90, "ALL"]], // 변경할 Row 선택 기준
		fixedColumns:   {
			heightMatch: 'none'
		 },
		buttons: [
			'copy','pdf','print',{
				extend:'excelHtml5',
				title: "사용자 리스트",
				autoFilter: true,
				exportOptions:{ // 페이지 안에 있는 것만 엑셀에 출력
					modifier:{page:'current'}
				},
				excelStyles:{
					cells:"sC",
					style:{
						alignment:{
							vertical: "center",
							horizontal: "left",
							wrapText: true
						}
					}
					
				},
				customize: function(xlsx) {
					this.applyStyles(xlsx); 
					var sheet = xlsx.xl.worksheets['sheet1.xml'];
					var col = $('col', sheet);
					$('row* ', sheet).each(function(index) {
						if (index > 0) {
							$(this).attr('ht', 25);
							$(this).attr('customHeight', 1);
						}
					});

					$('c[r=A1]',sheet).attr('s','47');
					$('c[r=A1]',sheet).attr('s','51');
					$('c[r=A2]',sheet).attr('s','32');
					$('c[r=B2]',sheet).attr('s','32');
					$('c[r=C2]',sheet).attr('s','32');
					$('c[r=D2]',sheet).attr('s','32');
					$('c[r=E2]',sheet).attr('s','32');
					$('c[r=F2]',sheet).attr('s','32');
					$('c[r=G2]',sheet).attr('s','32');
					$('c[r=H2]',sheet).attr('s','32');
				
					$(col[0]).attr('width', 10);
					$(col[1]).attr('width', 15);
					$(col[2]).attr('width', 20);
					$(col[3]).attr('width', 20);
					$(col[4]).attr('width', 10);
					$(col[5]).attr('width', 20);
					$(col[6]).attr('width', 20);
					$(col[7]).attr('width', 20);
					
				}
			}
		], // 추가 버튼
		dom: 'rt<"bottom"fliBp><"clear">', // 화면 그리는순서 설정(css영향을 받으니 고정으로 사용할 것) B:버튼 f:검색 l:조회갯수 i:조회건수 p:페이징
		processing: true, // 로딩표시 활성화 여부 true/false
		language: lang_kor, // 언어 설정
		serverSide: true, // 쿼리를 통한 페이징 처리 활성화 여부
		ajax :{ 
			"url": contextPath + "/json/select.do",
			"type":"GET",
			"contentType" : "application/json",
			"dataType" : "json",
			"dataSrc":function(d){
				return d.result;
			},
			error:function(){
				alert('세션이 만료되었습니다.\n로그인 페이지로 이동합니다.');
				document.location.href = contextPath+"/index";
			}
		},
		columns : columns,
		"drawCallback": function( settings ) {
			$('.current').addClass('point');
			$('.dt-button').addClass('btn');
			$('.dt-button').addClass('point');
	    }
	});
	
	return tables;
}

function seconds(seconds) {
	var hours = Math.floor(seconds/3600);
	var mins = Math.floor((seconds - hours*3600)/60);
	var secs = seconds - hours*3600 - mins*60;
	return addZero(hours) + ':' + addZero(mins) + ':' + addZero(secs);
	
	function addZero(num) {
		return ((num < 10) ? '0' : '') + num;
	}
}

function select_row(key, value){
	var json = "";
	$.ajax({
		url : contextPath+"/json/select.do",
		type : "post",
		dataType : "json",
		async: false,
		data : {key : key, value : value},
		success : function(data){
			json = data.result[0];
			if(data.code == 1){
				alert(data.msg);
				document.location.href = contextPath+"/index";
			}
		},error: function(){
			$('.dialog').css("display", "none");
			alert('세션이 만료되었습니다.\n로그인 페이지로 이동합니다.');
			document.location.href = contextPath+"/index";
		}
	});

	return json;
}

function update(form, where){
	var result = "false";
	var arr = form.serializeArray();
	var up_key = [];
	var up_value = [];
	var key = [];
	var value = [];
	
	for(var i=0; i<arr.length; i++){
		up_key.push(arr[i].name);
		up_value.push(arr[i].value);
		if(where == arr[i].name){
			key.push(arr[i].name);
			value.push(arr[i].value);
		}
	}
	
	var data = {
			up_key : up_key,
			up_value : up_value,
			key : key,
			value : value
	};
	
	$.ajax({
		url : contextPath + "/json/update.do",
		type : "post",
		dataType : "json",
		data : data,
		async: false,
		success : function(data){
			if(data.code == 0) result = "true";
		}
	});
	
	return result;
}

function insert(form){
	var result = "false";
	var arr = form.serializeArray();
	var key = [];
	var value = [];
	
	for(var i=0; i<arr.length; i++){
		key.push(arr[i].name);
		value.push(arr[i].value);
	}
	
	var data = {
			key : key,
			value : value
	};
	
	$.ajax({
		url : contextPath + "/json/insert.do",
		type : "post",
		dataType : "json",
		data : data,
		async: false,
		success : function(data){
			if(data.code == 0) result = "true";
		}
	});
	
	return result;
}

function remove(key, value){
	var result = "false";
	
	$.ajax({
		url : contextPath + "/json/delete.do",
		type : "post",
		dataType : "json",
		data : {key : [key], value : [value]},
		async: false,
		success : function(data){
			if(data.code == 0) result = "true";
		}
	});
	
	return result;
}


//서브메뉴
function tree_menu(shape){
	var tree = '';

	tree += '	<dd class="tree_hover">';
	tree += '		<a data-dialog="pop_site" class="point">추가<i class="ri-arrow-right-s-line"></i> </a>';
	tree += '		<div class="tree_depth">';
	tree += '			<div class="tree_hover">';
	tree += '				<a class="point">속성지정<i class="ri-arrow-right-s-line"></i></a>';
	tree += '				<div class="tree_depth">';

	switch(shape){
		case 'pop_build':
			tree += '					<div><a class="point" data-dialog="pop_floor">층</a></div>';
			tree += '					<div><a class="point" data-dialog="pop_room">룸</a></div>';
			tree += '					<div><a class="point" data-dialog="pop_group">그룹</a></div>';
		break;
		case 'pop_floor':
			tree += '					<div><a class="point" data-dialog="pop_build">빌딩</a></div>';
			tree += '					<div><a class="point" data-dialog="pop_floor">층</a></div>';
			tree += '					<div><a class="point" data-dialog="pop_group">그룹</a></div>';
		break;
		case 'pop_room':
			tree += '					<div><a class="point" data-dialog="pop_build">빌딩</a></div>';
			tree += '					<div><a class="point" data-dialog="pop_floor">층</a></div>';
			tree += '					<div><a class="point" data-dialog="pop_group">그룹</a></div>';
		break;
		case 'pop_group':
			tree += '					<div><a class="point" data-dialog="pop_build">빌딩</a></div>';
			tree += '					<div><a class="point" data-dialog="pop_floor">층</a></div>';
			tree += '					<div><a class="point" data-dialog="pop_room">룸</a></div>';
		break;
		default:
			tree += '					<div><a class="point" data-dialog="pop_build">빌딩</a></div>';
			tree += '					<div><a class="point" data-dialog="pop_room">룸</a></div>';
			tree += '					<div><a class="point" data-dialog="pop_group">그룹</a></div>';
		break;
	}
	
	tree += '					<div class="tree_hover">';
	tree += '						<a class="point">랙<i class="ri-arrow-right-s-line"></i></a>';
	tree += '						<div class="tree_depth">';
	tree += '							<div><a class="point">Patch panel</a></div>';
	tree += '							<div><a class="point">FDF</a></div>';
	tree += '							<div><a class="point">Rack view</a></div>';
	tree += '							<div><a class="point">Rpcs</a></div>';
	tree += '							<div><a class="point">T/H</a></div>';
	tree += '							<div><a class="point">MMS</a></div>';
	tree += '							<div>';
	tree += '								<a class="point">Network<i class="ri-arrow-right-s-line"></i></a>';
	tree += '								<div class="tree_depth">';
	tree += '									<div><a class="point">일반형</a></div>';
	tree += '									<div><a class="point">샤시형</a></div>';
	tree += '								</div>';
	tree += '							</div>';
	tree += '							<div><a class="point">Switch</a></div>';
	tree += '							<div><a class="point">Server</a></div>';
	tree += '							<div><a class="point">Display</a></div>';
	tree += '						</div>';
	tree += '					</div>';
	tree += '					<div>';
	tree += '						<a class="point">아웃렉<i class="ri-arrow-right-s-line"></i></a>';
	tree += '						<div class="tree_depth">';
	tree += '							<div><a class="point">Patch panel</a></div>';
	tree += '							<div><a class="point">FDF</a></div>';
	tree += '							<div><a class="point">Rack view</a></div>';
	tree += '							<div><a class="point">Rpcs</a></div>';
	tree += '							<div><a class="point">T/H</a></div>';
	tree += '							<div><a class="point">MMS</a></div>';
	tree += '							<div>';
	tree += '								<a class="point">Network<i class="ri-arrow-right-s-line"></i></a>';
	tree += '								<div class="tree_depth">';
	tree += '									<div><a class="point">일반형</a></div>';
	tree += '									<div><a class="point">샤시형</a></div>';
	tree += '								</div>';
	tree += '							</div>';
	tree += '							<div><a class="point">Switch</a></div>';
	tree += '							<div><a class="point">Server</a></div>';
	tree += '							<div><a class="point">Display</a></div>';
	tree += '						</div>';
	tree += '					</div>'
	tree += '				</div>';
	tree += '			</div>';
	tree += '		</div>';
	tree += '	</dd>';
	tree += '	<dd><a class="point">삭제</a></dd>';
	tree += '	<dd><a class="point">변경</a></dd>';
	tree += '	<dd><a class="point" data-dialog="file_set">도면등록</a></dd>';
	tree += '	<dd><a class="point">도면보기</a></dd>';
	tree += '	<dd><a class="point">랙구성도</a></dd>';
	tree += '	<dd><a class="point">회선연결보기</a></dd>';

	
	return tree;
}

function loading(txt){
	if (!txt) {
		txt='실행 중입니다.<br> 잠시만 기다려주세요.';
	} 
	var ele ='';
	ele+='<div class="wait_box" style="display: none;">';
	ele+='	<div class="bg">';
	ele+='		<div class="loder_wrap">';
	ele+='			<img src="'+resourcePath+'/img/ajax-loader.gif">';
	ele+='			<p>'+txt+'</p>';
	ele+='		</div>';
	ele+='	</div>';
	ele+='</div>';
	
	$('body').append(ele);
	$('.wait_box').show();
	
	return false;
}

function unLoading(){
	$('.wait_box').remove();
	
	return false;
}
