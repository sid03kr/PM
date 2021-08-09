<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="common/head.sub.jsp" %>
<link rel='stylesheet' type='text/css' href='${resourcePath}/css/login.css'>
<div class="sub_tit">
	<button class="btn inj_btn"  onclick="history.back()">취소</button>
	생체인증
	<!-- <button class="btn"><a href="http://192.168.0.224:8080/PM/write"><i class="ri-pencil-fill"></i></a></button> -->
</div>
<div class="inj">
	<div class="touch w50">
		<div>
			<a href="#">
				<img src="${resourcePath}/img/songr-4.png">
				<p>Touch ID</p>
			</a>
		</div>
	</div>
	<div class="face w50">
		<div>
			<a href="#">
				<img src="${resourcePath}/img/face-5.png">
				<p>Face ID</p>
			</a>
		</div>
	</div>
</div>
<!-- <button class="btn inj_back"  onclick="history.back()">취소</button>
 -->




<%@ include file="common/tail.sub.jsp" %>
<script type="text/javascript" src="${resourcePath}/js/login.js"></script>
