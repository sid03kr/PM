
<%@ page language='java' contentType='text/html; charset=UTF-8' pageEncoding='UTF-8'%>
<%@ include file="common/head.sub.jsp" %>

<link rel='stylesheet' type='text/css' href='${resourcePath}/css/pm_admin.css'>
<div class="admin" >
	<div class="am_head">
		<div class="re_index">
			<a href="${contextPath}/admin_sd">관리자페이지</a>
		</div>
		
		<div class="logout">
			<div>
				<p class="logout_btn">관리자</p><i class="ri-arrow-down-s-fill"></i>
			</div>
			<div class="hidden_out none" >
				<button class ="admin_out">로그아웃</button>
			</div>
		</div>
		
	</div>
	<div class="left_nav">
		<div>
			<ul>
				<li>
					<a href="${contextPath}/admin_sd?type=student" class="am_point"><i class="ri-group-fill"></i>학생 관리</a>
				</li>
				<li>
					<a href="${contextPath}/admin_pf?type=professor" class="am_point"><i class="ri-user-3-fill"></i>교수 관리</a>
				</li>
				<li>
					<a href="${contextPath}/admin_ep?type=enterprise" class="am_point"><i class="ri-building-fill"></i>기업 관리</a>
				</li>
				<li>
					<a href="${contextPath}/admin_am" class="am_point"><i class="ri-admin-fill"></i>관리자 관리</a>
				</li>
				<li>
					<a href="${contextPath}/admin_pofol" class="am_point"><i class="ri-file-user-fill"></i>포트폴리오 관리</a>
				</li>
			</ul>
		</div>
	</div>


<script type="text/javascript" src="${resourcePath}/js/admin_head.js"></script>