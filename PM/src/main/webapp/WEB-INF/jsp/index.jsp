<%@ page language='java' contentType='text/html; charset=UTF-8' pageEncoding='UTF-8'%>
<%@ include file='head.jsp' %>

<% if (st_type.equals("student")){ %>
	<input type="hidden" name="page_type" class="page_type" value="포트폴리오 관리">
<%} else{ %>
	<input type="hidden" name="page_type" class="page_type" value="평가 관리">
<% } %>
<input type="hidden" name="member_type" class="member_type" value="<%=st_type %>">
<div class="portfolio">
	<div class="sub_tit">
		<button class="btn search"><i class="ri-search-line"></i></button>
		포트폴리오 조회
		<button class="btn write_btn"><a href="${contextPath}/write"><i class="ri-pencil-fill"></i></a></button>
	</div>
	<div class="hidden_search">
		<form id="" name="search_portfolio" action="" method="">
			<div class="search_type">
				<div class="all_view">
					<div class="search_term">
						<p>전체보기</p>
						<i class="ri-arrow-down-s-line"></i>
					</div>
				</div>
				<div class="slt_view">
					<select id="sch_key">
						<option value="name">제목</option>
						<option value="content">내용</option>
					</select>
				</div>
				<div class="search_view">
					<input type="text" placeholder="검색어" name="name" id="sch_val">
					<button class="btn_sch_portfolio"><i class="ri-search-line"></i></button>
				</div>
			</div>
			<div class="hidden_2" style="display:none;">
				<ul>
					<li>
						<label>
							<input type="radio" name="pofol_search" value="all" checked><p>전체기간</p>
						</label>
					</li>
					<li>
						<label>
							<input type="radio" name="pofol_search" value="year"><p>연간</p>
							<select name="year_slt">
								<option value="2020">2020년</option>
								<option value="2021">2021년</option>
							</select>
						</label>
					</li>
					<li>
						<label>
							<input type="radio" name="pofol_search" value="month"><p>월간</p>
							<select name="month_slt_y">
								<option value="2020">2020년</option>
								<option value="2021">2021년</option>
							</select>
							<select name="month_slt_m">
								<option value="01">1월</option>
								<option value="02">2월</option>
								<option value="03">3월</option>
								<option value="04">4월</option>
								<option value="05" selected>5월</option>
								<option value="06">6월</option>
								<option value="07">7월</option>
								<option value="08">8월</option>
								<option value="09">9월</option>
								<option value="10">10월</option>
								<option value="11">11월</option>
								<option value="12">12월</option>
							</select>
						</label>
					</li>
					<li>
						<label>
							<input type="radio" name="pofol_search" value="choose"><p>선택</p>
							<input type="date" placeholder="시작일" id="start_Date" class="hasDatepicker">
							<input type="date" placeholder="종료일" id="end_Date" class="hasDatepicker">
						</label>
					</li>
					<li class="button_2">
						<button class="btn btn_sch_portfolio">확인</button>
						<button class="btn close btn_close_date">취소</button>
					</li>
				</ul>
			</div>
			<input type="hidden" name="pageNo" value="1">
		</form>
	</div>
	<div class="slt">
		<form name="" action="" method="">
			<select name = "status">
				<option value="">전체보기</option>
				<option value="evaluation">평가완료보기</option>
				<option value="wait">평가대기보기</option>
				<option value="complain">이의신청보기</option>
				<option value="done">평가확정보기</option>
			</select>
		</form>
	</div>
	<div class="result">
		<ul>
			<li>
				<p>등록</p>
				<span class ="count"></span>
			</li>
			<li>
				<p>평가</br>완료</p>
				<span class = "evaluation"></span>
			</li>
			<li>
				<p>평가</br>대기</p>
				<span class= "wait"></span>
			</li>
			<li>
				<p>이의</br>신청</p>
				<span class = "complain"></span>
			</li>
			<li>
				<p>평가</br>확정</p>
				<span class = "done"></span>
			</li>
		</ul>
	</div>
	
	<div class="list">
		<ul  id="portfolioList"></ul>	
	</div>
</div>
<div class="pofol_bottom">
	<div>
		<ul id="list_index">
		</ul>
	</div>
</div>


<script> 
$(document).ready(function(){
$('.sub_tit .search').live('click', function(){
	$('.hidden_search').animate({
	height:'toggle',
	}, 200);
	});
});
</script>

<script> 
$(function () {
         
   $(".hidden_2 .close").live("click", function() {
      $(".hidden_2").css("display","none");
   });

   $(".search_term").live("click", function() {
      $(".hidden_2").css("display","block");
   });
});
</script>

<%@ include file="tail.jsp" %>

<script type="text/javascript" src="${resourcePath}/js/index.js"></script>


