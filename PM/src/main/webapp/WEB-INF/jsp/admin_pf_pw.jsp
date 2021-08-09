<%@ page language='java' contentType='text/html; charset=UTF-8' pageEncoding='UTF-8'%>
<%@ include file='admin_head.jsp' %>

<div class="am_info">
	<div class="info_left w25">
		<ul>
			<li class="name">
				<div class="img">
					<img src="${resourcePath}/img/user.png">
				</div>
				<div>
					<p>이름</p>
					<span>김교수</span>
				</div>
			</li>
			<li class="acc_info">
				<a href="http://192.168.0.224:8080/PM_tmp/admin_pf_info">계정정보<i class="ri-arrow-drop-right-line"></i></a>
			</li>
			<li class="acc_info">
				<a href="">포트폴리오 평가 정보<i class="ri-arrow-drop-right-line"></i></a>
			</li>
			<li class="acc_info">
				<a href="http://192.168.0.224:8080/PM_tmp/admin_pf_pw">비밀번호 수정<i class="ri-arrow-drop-right-line"></i></a>
			</li>
		</ul>
	</div>
	<div class="info_right w75">
		<form name="pf_pw" action="" method="">
			<ul>
				<li class="w100">
					<p class="title">비밀번호 수정</p>
				</li>
				<li class="w20">
					비밀번호
				</li>
				<li class="w80">
					<input type="password" name="pf_pw_inp1" placeholder="비밀번호를 입력하세요.">
				</li>
				<li class="w20">
					비밀번호 확인
				</li>
				<li class="w80">
					<input type="password" name="pf_pw_inp2" placeholder="비밀번호를 입력하세요.">
				</li>
				<div>
					<button class="btn am_bg_point">수정하기</button>
					<a href="#" class="del_btn btn">삭제</a>
				</div>
			</ul>
		</form>
	</div>
</div>


<%@ include file="admin_tail.jsp" %>