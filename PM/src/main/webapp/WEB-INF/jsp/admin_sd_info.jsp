<%@ page language='java' contentType='text/html; charset=UTF-8' pageEncoding='UTF-8'%>
<%@ include file='admin_head.jsp' %>

<% String _id = request.getParameter("_id"); %>
<% String type = request.getParameter("type"); %>

<div class="am_info">
	<div class="info_left w25">
		<ul>
			<li class="name">
				<div class="img">
				</div>
				<div>
					<p>이름</p>
					<span id="name"></span>
				</div>
			</li>
			<li class="acc_info">
				<a href="${contextPath}/admin_sd_info?_id=<%=_id%>&type=<%=type%>">계정정보<i class="ri-arrow-drop-right-line"></i></a>
			</li>
			<li class="pofol_info">
				<a href="${contextPath}/admin_sd_pofol?_id=<%=_id%>&type=<%=type%>">포트폴리오 제출 정보<i class="ri-arrow-drop-right-line"></i></a>
			</li>
			<li class="pw_reset">
				<a href="${contextPath}/admin_sd_pw?_id=<%=_id%>&type=<%=type%>">비밀번호 수정<i class="ri-arrow-drop-right-line"></i></a>
			</li>
		</ul>
	</div>
	<div class="info_right w75">
		<form name="sd_info" action="" method="">
		<input type="hidden" name="_id" value="<%=_id %>">
		<input type="hidden" name="type" value="<%=type %>">
			<ul>
				<% if(type.equals("student")) { %>
				<li class="w100"><p class="title">학생 계정정보</p></li>
				<% }else if(type.equals("professor")) {%>
				<li class="w100"><p class="title">교수 계정정보</p></li>
				<% }else{%>
				<li class="w100"><p class="title">기업 계정정보</p></li>
				<% }%>
			
				<li class="w20">
					ID 계정
				</li>
				<li class="w80">
					<input type="text" name="identifier" readonly>
				</li>
				<li class="w20">
					이름
				</li>
				<li class="w80">
					<input type="text" name="name">
				</li>
				<% if(type.equals("student")) { %>
					<li class="w20">대학(원)</li>
				<% }else if(type.equals("professor")) {%>
					<li class="w20">대학(원)</li>
				<% }else{%>
					<li class="w20">기업명</li>
				<% }%>
				<li class="w80"><input type="text" name="university"></li>
				<% if(type.equals("student")) { %>
					<li class="w20">학과</li>
				<% }else if(type.equals("professor")) {%>
					<li class="w20">교과</li>
				<% }else{%>
					<li class="w20">부서</li>
				<% }%>
				<li class="w80">
					<input type="text" name="universityMajor">
				</li>
				<% if(type.equals("student")) { %>
					<li class="w20">학번</li>
				<% }else if(type.equals("professor")) {%>
					<li class="w20">교번</li>
				<% }else{%>
					<li class="w20">사번</li>
				<% }%>
				<li class="w80">
					<input type="text" name="universityNumber">
				</li>
				<li class="w20">
					연락처
				</li>
				<li class="w80">
					<input type="text" name="phone">
				</li>
				<li class="w20">
					이메일
				</li>
				<li class="w80">
					<input type="text" name="email">
				</li>
				<li class="w20">
					생일
				</li>
				<li class="w80">
					<input type="date" name="birth">
				</li>
				<li class="w20">
					성별
				</li>
				<li class="w80">
					<select name="gender">
						<option value="male">남</option>
						<option value="female">여</option>
					</select>
				</li>
				<div>
					<button class="btn am_bg_point">수정하기</button>
					<a href="#" class="del_btn btn delete_user">삭제</a>
				</div>
			</ul>
		</form>
	</div>
</div>


<%@ include file="admin_tail.jsp" %>
<script type="text/javascript" src="${resourcePath}/js/admin_sd_info.js"></script>

