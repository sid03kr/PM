<%@ page language='java' contentType='text/html; charset=UTF-8' pageEncoding='UTF-8'%>
<%@ include file='admin_head.jsp' %>

<div class="am_add am_am_add">
	<form name="am_am_add" action="" method="" onsubmit="">
		<div class="add_list">
			<ul>
				<li class="w100">
					<p class="title">관리자 계정정보</p>
				</li>
				<li class="w20">ID 계정</li>
				<li class="w80"><input type="text" name="identifier"></li>
				<li class="w20">이름</li>
				<li class="w80"><input type="text" name="name"></li>
				<li class="w20">비밀번호</li>
				<li class="w80"><input type="password" name="password"></li>
				<li class="w20">비밀번호 확인</li>
				<li class="w80"><input type="password" name="rePassword"></li>
				<button class="btn am_bg_point" id="register">추가하기</button>
			</ul>
		</div>
	</form>
</div>

<%@ include file="admin_tail.jsp" %>
<script type="text/javascript" src="${resourcePath}/js/admin_am_add.js"></script>

