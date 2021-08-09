<%@ page language='java' contentType='text/html; charset=UTF-8' pageEncoding='UTF-8'%>
<%@ include file='head.jsp' %>

<!-- url에 받아온 값이 있어야 request.getparameter 사용할수있음!! -->
<% 
	String pf_status = request.getParameter("status");
%>
<!-- <link rel='stylesheet' type='text/css' href='${resourcePath}/css/home.css'> -->	

<div class="pofol_upload pofol_view">
	<div class="sub_tit">
		<button class="btn"><a href="${contextPath}/index">취소</a></button>
		포트폴리오 평가	
		
		<button class="btn point complete none" data-dialog="view_save">저장</button>
	</div>
	<form name="waiting" action="" method="">
	<% if (st_type.equals("student")){ %>
		<input type="hidden" name="page_type" class="page_type" value="포트폴리오 관리">
	<%} else{ %>
		<input type="hidden" name="page_type" class="page_type" value="평가 관리">
	<% } %>
	<input type="hidden" name="type" value="<%=(String)session.getAttribute("type")%>"> 
	<input type="hidden" name="no" value="<%=(String)request.getParameter("no")%>"> 
	<input class="status" type="hidden" name=status> 
	<input class="_enterprise" name ="_enterprise" type="hidden">
	<input class="professorSignature" name ="professorSignature" type="hidden">
	<input class="studentSignature" name ="studentSignature" type="hidden">
	<input class="blockchainHashcode" name ="blockchainHashcode" type="hidden">
		<ul>
			<li class="w50">
				<p class="mr_5">종류</p> 
			
					<span class="pt_type"></span>
					<!-- <label>
						<input type="radio" value="personal" name="type">개인
					</label>
					<label>
						<input type="radio" value="group" name="type">그룹
					</label> -->
			
			</li>
			<li class="w50">
				<p>담당</br>교수</p>
				<span class="_professor">${_professor}</span>
				<input type="hidden" name = "_professor">
			</li>
			<li class="w100 view_member">
				<p>참여</br>인원</p>
				<span class="member"></span>
			</li>
			<li class="w100 view_group">
				<p>그룹</br>리더</p>
				<span class="_leader">${_leader}</span>
				<input type="hidden" name = "_leader" >
			</li>
			<li class="w100">
				<p>제목</p>
				<span class="name">${name }</span>
				<input type="hidden" name = "name">
			</li>
			<li class="w100">
				<p>기간</p>
				<span class="startDate">${startDate }</span><span>~</span><span class="endDate">${endDate }</span>
				<input type="hidden" name = "startDate">
				<input type="hidden" name = "endDate">
			</li>
			<li class="w100 sp">
				<div class="contents">${content}</div>
				<input type="hidden" name = "content">
			</li>
			<li class="w100">
				<p>노션</br>링크</p>
				<span class="link"><a class="link_a"  target="blank"></a></span>
				<input type="hidden" name = "link">
			</li>
			<li class="w100">
				<p>파일</br>첨부</p>
				<div>
					<button class = "btn point btn_download" ><a class="download" target="_blank">파일보기</a></button>
				</div>
			</li>
			 
			 <li class="w100 score" >
			 <p>평가</br>점수</p>
			 <% if (st_type.equals("professor")&& (pf_status.equals("wait")||pf_status.equals("complain"))){ %>
				<input type="text" name = "score" value="${score}" >
			 <% }else{ %>
				<input type="hidden" name="score">
				<span class='score' >${score}</span>				
			<% } %>
			</li>
			
						
			
			<% if(st_type.equals("student") && (pf_status.equals("evaluation"))){ %>
				<li class="w100" >
					<p>이의신청</br>사유</p>
					<input type="text" name = "complain" id = "complain" >
				</li>
			<% } else if(st_type.equals("student") && (pf_status.equals("complain"))){ %>
				<li class="w100" >
					<p>이의신청</br>사유</p>
					<span class='complain' ></span>
					<input type="hidden" name="complain">
				</li>
			<% } else if(st_type.equals("student") && (pf_status.equals("done"))){ %>
				<li class="w100" >
					<p>이의신청</br>사유</p>
					<span class='complain' ></span>
					<input type="hidden" name="complain">
				</li>
			<% } else if(st_type.equals("professor") && pf_status.equals("complain")){ %>
				<li class="w100" >
					<p>이의신청</br>사유</p>
					<span class='complain' ></span>
					<input type="hidden" name="complain">
				</li>
			<% }else if (st_type.equals("professor") && pf_status.equals("evaluation")) {%>
				<li class="w100" >
					<p>이의신청</br>사유</p>
					<span class='complain' ></span>
					<input type="hidden" name="complain">
				</li>
			<% }else if (st_type.equals("professor") && pf_status.equals("done")) {%>
				<li class="w100" >
					<p>이의신청</br>사유</p>
					<span class='complain' ></span>
					<input type="hidden" name="complain">
				</li>
			<% } %>
			
			
			<% if(st_type.equals("student") && (pf_status.equals("evaluation") || pf_status.equals("complain"))){ %>
				<li class="w100" >
					<p>이의신청</br>답변</p>
					<span class='answer' ></span>
					<input type="hidden" name="answer">
				</li>
			<% } else if(st_type.equals("professor") && pf_status.equals("complain")){ %>
				<li class="w100" >
					<p>이의신청</br>답변</p>
					<input type="text" name = "answer" id = "answer" >
				</li>
			<% } else if(st_type.equals("professor") && pf_status.equals("evaluation")) { %>
				<li class="w100" >
					<p>이의신청</br>답변</p>
					<span class='answer' ></span>
					<input type="hidden" name="answer">
				</li>
			<% } else if(st_type.equals("professor") && pf_status.equals("done")) { %>
				<li class="w100" >
					<p>이의신청</br>답변</p>
					<span class='answer' ></span>
					<input type="hidden" name="answer">
				</li>
			<% } else if(st_type.equals("student") && pf_status.equals("done")) { %>
				<li class="w100" >
					<p>이의신청</br>답변</p>
					<span class='answer' ></span>
					<input type="hidden" name="answer">
				</li>
			<% } %>
			
			
			
			<li class="w100" >
				<p>파일</br>검증</p>
				<input type="hidden" name ="fileHash" readonly>
				<span class="fileHash" ></span>
				<!-- <button class="btn br_0 view_search_btn fl_right" data-dialog="file_verification">검증</button>-->
			</li>
			
			
			<!-- 
			<% if(st_type.equals("student")){ %>
			<li class="w100" >
				<p>검증</br>해쉬</p>
				<% if(st_type.equals("professor")){ %>
					<input type="hidden" name="complain">
					<span class='complain' ></span>
				<% }else{ %>
					<input type="text" name = "complain" id = "complain" >
				<% } %>
			</li>
			<% } %>
			 -->
			
			
			<% if(st_type.equals("student") && pf_status.equals("done")){ %>
				<li class="w100 disabled search_enter">
					<p>평가공유 </p>
					<input type="hidden" name ="enter">
					<input type="text" name ="name_enter" style="width:58%" value="" readonly>
					<button class="btn br_0" id="btn_init">리셋</button>
					<button class="btn br_0 view_search_btn" data-dialog="enter_find" >찾기</button>
				</li>
			<% } %>
			
			
			<li class="w100 btn_display" id="modify" style="display:none">
				<button class="btn re_btn" data-stat="modify"><a href="${contextPath}/revise" class="revise">수정하기</a></button>
			</li>
			<li class="w100 btn_display" id="delete" style="display:none">
				<button class="btn re_btn delete" data-stat="delete">삭제하기</button>
			</li>
			<li class="w100 btn_display"  id="evaluation" style="display:none">
				<button class="btn re_btn btn_evaluation" data-stat="evaluation" >평가진행</button>
			</li>
			<li class="w100 btn_display"  id="done" style="display:none">
				<button class="btn re_btn btn_done" data-stat="done">평가확정</button>
			</li>
			<li class="w100 btn_display"  id="complain" style="display:none">
				<button class="btn re_btn btn_complain" data-stat="complain">이의신청</button>
			</li>
			<li class="w100 btn_display"  id="enter_share" style="display:none">
				<button class="btn re_btn btn_enter_share" data-stat="enter_share">기업공유</button>
			</li>
			
			 

		</ul>
	</form>
</div>

<div id="file_verification" class="dialog">	
	<div class="dialog__overlay"></div>	
	<div class="dialog__content simple w75">	
		<div class="dialog_top">	
		</div>	
		<div class="dialog_body">	
			<p class='text'>파일검증이 완료되었습니다.</p>	
		</div>	
		<div class="dialog_btn writer_btn">	
			<button class="btn  point writer_bt" data-dialog-close>확인</button>	
			<!-- <button class="btn point">확인</button> -->	
		</div>	
	</div>	
</div>	


<!-- 팝업 -->	
<div id="view_save" class="dialog">	
	<div class="dialog__overlay"></div>	
	<div class="dialog__content simple w75">	
		<div class="dialog_top">	
		</div>	
		<div class="dialog_body">	
			<p>저장이 완료되었습니다.</p>	
		</div>	
		<div class="dialog_btn">	
			<button class="btn close point" data-dialog-close>확인</button>	
			<!-- <button class="btn point">확인</button> -->	
		</div>	
	</div>	
</div>

<div id="enter_find" class="dialog">
	<div class="dialog__overlay"></div>
	<div class="dialog__content pop_find w90">
		<div class="dialog_top">
			<span>기업 찾기</span>
		</div>
		<div class="dialog_body">
			<form id="findenterForm" name="findenterForm"  action="" method="">
				<div>
					<input type="text" name="name" placeholder="기업명을 입력해주세요">
					<button id="findenter"><i class="ri-search-line"></i></button>
				</div>
			</form>
			<ul id="enter_list" class="search_list">
				
			</ul>
		</div>
		<div class="dialog_btn">
			<button class="btn btn_close" data-dialog-close>닫기</button>
			<!-- <button class="btn point btn_ok">확 인</button>-->
		</div>
	</div>
</div>

<%@ include file="tail.jsp" %>
<script>
var group_type = '<%= st_type%>'
var pf_status = '<%= pf_status%>'

$('.btn_evaluation, .btn_done, .btn_complain').click(function(res) {
	console.log(group_type)
	var no = $('input[name="no"]').val();
	var url = contextPath + "/portfolio/portfolioEditStatus";
	var score = $('input[name="score"]').val();
	var complain = $('input[name="complain"]').val();
	
	if($('input[name="answer"]').val() != null && $('input[name="answer"]').val() != "" && $('input[name="answer"]').val() != "null") {
		var answer = $('input[name="answer"]').val();	
	}
	
	var status = $(this).data("stat");
		
	if ($('input[name="score"]').val() =='' && group_type == 'professor' && (pf_status =='wait' || pf_status =='complain')){
		alert_pop('평가 점수를 입력해주세요', 2);
		return false;
	}
	if($('input[name="score"]').val() > 100) {
		alert_pop("점수는 100점을 넘을 수 없습니다.",2)
		return false;
	}
	if($('input[name="score"]').val() < 0) {
		alert_pop("점수는 0점보다 작을 수 없습니다.",2)
		return false;
	}
	
	var score = $('input[name="score"]').val();
	var score_format = /^[1-9][0-9]?$|^100$/g;
	if (!score_format.test(score)){
		alert_pop("잘못된 숫자형식입니다. 다시 입력해주세요.",2);
		return false
	}
	
	if($(this).data("stat") != 'done'){
		if($('input[name="complain"]').val() =='' && group_type=="student" && pf_status =='evaluation') {
			alert_pop('이의신청 사유를 입력해주세요',2);
			return;
		}else if( $('input[name="complain"]').val() !='' && $('input[name="complain"]').val() != null && group_type=="student" && pf_status =='evaluation') {
			alert_pop("해당 내용으로 이의신청을 하시겠습니까?",1,"취소","확인", function() {
				$.ajax({
					url : url,
					type : "post",
					dataType : "Json",
					data:{no:no, status:status, score:score, complain:complain, answer:answer},
					success : function(data){
						
						console.log("실행")
						if (group_type == 'professor' && pf_status =='wait'){
							alert_pop('평가가 완료 되었습니다.', 2);
						} 
						location.href=contextPath+"/index";
					},
					error: function() {
						console.log("실패")
					}
				});
			});
			return			
		}
	}
	
	
	if($(this).data("stat") != 'complain' ){
		if(group_type == "student"){
			alert_pop('확정 후 수정이 불가능합니다', 1 , "취소", "확인", function(){
			location.href=contextPath+"/sign?no="+no+"&score="+score+"&status=done";
			});
		}else if(answer == null || answer == "") {
			location.href=contextPath+"/sign?no="+no+"&score="+score+"&status="+$(this).data("stat");
		}else {
			location.href=contextPath+"/sign?no="+no+"&score="+score+"&answer="+answer+"&status="+$(this).data("stat");
		};
		return;
	}
	
	$.ajax({
		url : url,
		type : "post",
		dataType : "Json",
		data:{no:no, status:status, score:score, complain:complain, answer:answer},
		success : function(data){
			
			console.log("실행")
			if (group_type == 'professor' && pf_status =='wait'){
				alert_pop('평가가 완료 되었습니다.', 2);
			} 
			location.href=contextPath+"/index";
		},
		error: function() {
			console.log("실패")
		}
	});
});

</script>
<script>
(function() {
	//IE11 patch
	if (window.NodeList && !NodeList.prototype.forEach) {
	  NodeList.prototype.forEach = Array.prototype.forEach;
	}
	var dlgtrigger = document.querySelectorAll( '[data-dialog]' );
	dlgtrigger.forEach(function(item, index) {
		somedialog = document.getElementById( item.getAttribute( 'data-dialog' ) ),
		dlg = new DialogFx( somedialog );
		item.addEventListener( 'click', dlg.toggle.bind(dlg) );
	})
})();
</script>
<script type="text/javascript" src="${resourcePath}/js/view.js"></script>

