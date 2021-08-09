<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="common/head.sub.jsp" %>
<link rel='stylesheet' type='text/css' href='${resourcePath}/css/login.css'>

<header>
	<div class="tit">
		<span class="page_name">아이디 찾기</span>
	</div>
</header>
<div class="find_search">
	<form name="" action="" method="">
		<ul>
			<li class="w30">
				<p>이 름</p>
			</li>
			<li class="w70">
				<input type="text" name="name">
			</li>
			<li class="w30">
				<p>생년월일</p>
			</li>
			<li class="w70">
				<input type="text" placeholder="ex) 19841003" name="birth">
			</li>
			<li class="w30">
				<p>휴대폰번호</p>
			</li>
			<li class="w70">
				<input type="text" placeholder='" - " 빼고 번호만 입력' name="phone">
			</li>
		</ul>
		<div>
			<button class="btn" id="submit_btn">확 인</button>
		</div>
		<div>
			<div id = "findId"></div>
			<div class="fl_left he_30">
				<a href="${contextPath}/">로그인</a>
			</div>
			<div class="fl_right he_30">
				<a href="${contextPath}/find_pw">비밀번호찾기</a>
			</div>
		</div>
	</form>
</div>

<%@ include file="common/tail.sub.jsp" %>
<script type="text/javascript" src="${resourcePath}/js/find_id.js"></script>