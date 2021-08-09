<%@ page language='java' contentType='text/html; charset=UTF-8' pageEncoding='UTF-8'%>
<%@ include file="common/head.sub.jsp" %>

<link rel='stylesheet' type='text/css' href='${resourcePath}/css/pm_admin.css'>

<div class='am_login'>
	<form name="am_login"  action="" method="">
		<div>
			<p class="main_tit">로그인</p>
			<ul>
				<li>ID</li>
				<li>
					<input type="text" placeholder="아이디를 입력하세요." name="identifier">
				</li>
				<li>비밀번호</li>
				<li>
					<input type="password" placeholder="비밀번호를 입력하세요." name="password">
				</li>
			</ul>
			<button class="btn point" id="login_sub">로그인</button>
		</div>
	</form>
</div>

<%@ include file="common/tail.sub.jsp" %>
<script type="text/javascript" src="${resourcePath}/js/admin_login.js"></script>
