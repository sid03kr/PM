<%@ page language='java' contentType='text/html; charset=UTF-8' pageEncoding='UTF-8'%>
<%@ include file='admin_head.jsp' %>

<% String _id = request.getParameter("_id"); %>

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
				<a href="${contextPath}/admin_am_info?_id=<%=_id%>">계정정보<i class="ri-arrow-drop-right-line"></i></a>
			</li>
			<li class="pw_reset">
				<a href="${contextPath}/admin_am_pw?_id=<%=_id%>">비밀번호 수정<i class="ri-arrow-drop-right-line"></i></a>
			</li>
		</ul>
	</div>
	<div class="info_right w75">
		<form name="am_pw" action="" method="">
		<input type="hidden" name="_id" value="<%=_id %>">
			<ul>
				<li class="w100">
					<p class="title">비밀번호 수정</p>
				</li>
				<li class="w20">
					비밀번호
				</li>
				<li class="w80">
					<input type="password" name="password" placeholder="비밀번호를 입력하세요.">
				</li>
				<li class="w20">
					비밀번호 확인
				</li>
				<li class="w80">
					<input type="password" name="rePassword" placeholder="비밀번호를 입력하세요.">
				</li>
				<div>
					<button class="btn am_bg_point" id="updatePw">수정하기</button>
					<a class="del_btn btn delete_user">삭제</a>
				</div>
			</ul>
		</form>
	</div>
</div>

<%@ include file="admin_tail.jsp" %>
<script type="text/javascript" src="${resourcePath}/js/admin_am_pw.js"></script>