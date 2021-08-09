<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="common/head.sub.jsp" %>
<link rel='stylesheet' type='text/css' href='${resourcePath}/css/login.css'>
<div class='login'>
	<div class='login_box'>
		<div class="login_img">
			<img src="${resourcePath}/img/ildo_login.png">
		</div>
		<div class='head'>
			<form name='login'>
				<ul class='col2'>
					<li class='w20'><i class="ri-user-fill"></i></li>
					<li class='w80'><input type='text' name='identifier'></li>
				</ul>
				<ul class='col2'>
					<li class='w20'><i class="ri-key-2-fill"></i></li>
					<li class='w80'><input type='password' name='password'></li>
				</ul>
				<ul class='col3'>
					<li class='w50'>
						<input type="checkbox" id="auto_log"  name="rememberMe" value="1">
							<label for="auto_log"> 자동로그인</label>
					</li>
					<!-- 
					<li class='w50 fl_right'><a href="${contextPath}/certification">생체인증</a></li>
					 -->
				</ul>
				<div class="login_btn">
					<button class='btn point' type='submit'>로그인</ button>
					<!-- <label class='warn'></label> -->
				</div>
				
				<ul class='col3'>
					<li class="find">
						<div class="find_id">
							<a href="${contextPath}/find_id">아이디찾기</a>
						</div>
						<p>|</p>
						<div class="find_pw">
							<a href="${contextPath}/find_pw">비밀번호찾기</a>
						</div>
					</li>
					<li class='join fl_right'><a  data-dialog="join_slt">회원가입</a></li>
				</ul>
			</form>
		</div>
	</div>
</div>

<div id="join_slt" class="dialog">
	<div class="dialog__overlay"></div>
	<div class="dialog__content w75">
		<div class="basic dialog_title">
			가입구분
			<button data-dialog-close class="go_back"><i class="ri-close-fill"></i></button>
		</div>

		<div class="dialog_body">
			<div class="body_top">
				<div class="slt_btn">
					<div>
						<a href="${contextPath}/join_student?type=student">
							<button class="bg_white btn">학생 가입</button>
						</a>
					</div>
					<div>
						<a href="${contextPath}/join_student?type=professor">
							<button class="bg_blue btn" >교수 가입</button>
						</a>
					</div>
					<div>
						<a href="${contextPath}/join_student?type=enterprise">
							<button class="bg_green btn">기업 가입</button>
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<%@ include file="common/tail.sub.jsp" %>
<script type="text/javascript" src="${resourcePath}/js/login.js"></script>
