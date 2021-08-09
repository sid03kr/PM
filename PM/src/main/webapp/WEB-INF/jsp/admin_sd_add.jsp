<%@ page language='java' contentType='text/html; charset=UTF-8' pageEncoding='UTF-8'%>
<%@ include file='admin_head.jsp' %>
<% String type = request.getParameter("type").toString(); %>

<div class="am_add">
	<form name="am_sd_add" action="" method="" id="am_sd_add" >
	<input type ="hidden" name="type" value="<%=type%>">
		<div class="add_list">
			<ul>
				<li class="w100">
				<% if (type.equals("student")){ %>
					<p class="title">학생 계정정보</p>
				<%} else if(type.equals("professor")) { %>
					<p class="title">교수 계정정보</p>
				<%} else { %>
					<p class="title">기업 계정정보</p>
				<% } %>
					
				</li>
				<li class="w20">ID 계정</li>
				<li class="w80"><input type="text" name="identifier"></li>
				<li class="w20">비밀번호</li>
				<li class="w80"><input type="password" name="password"></li>
				<li class="w20">비밀번호 확인</li>
				<li class="w80"><input type="password" name="rePassword"></li>
				<li class="w20">이름</li>
				<li class="w80"><input type="text" name="name"></li>
				
				<% if (type.equals("student")){ %>
					<li class="w20">대학(원)</li>
				<%} else if(type.equals("professor")) { %>
					<li class="w20">대학(원)</li>
				<%} else { %>
					<li class="w20">기업명</li>
				<% } %>
				<li class="w80"><input type="text" name="university"></li>
				
				<% if (type.equals("student")){ %>
					<li class="w20">학과</li>
				<%} else if(type.equals("professor")) { %>
					<li class="w20">교과</li>
				<%} else { %>
					<li class="w20">부서</li>
				<% } %>
				<li class="w80"><input type="text" name="universityMajor"></li>
				
				<% if (type.equals("student")){ %>
					<li class="w20">학번</li>
				<%} else if(type.equals("professor")) { %>
					<li class="w20">교번</li>
				<%} else { %>
					<li class="w20">사번</li>
				<% } %>
				<li class="w80"><input type="text" name="universityNumber"></li>
				
				<li class="w20">연락처</li>
				<li class="w80"><input type="text" name="phone"></li>
				<li class="w20">이메일</li>
				<li class="w80"><input type="text" name="email"></li>
				<li class="w20">생일</li>
				<li class="w80"><input type="date" name="birth"></li>
				<li class="w20">성별</li>
				<li class="w80">
					<select name="gender">
						<option value="male" selected>남</option>
						<option value="female">여</option>
					</select>
				</li>
				<button class="btn am_bg_point">추가하기</button>
			</ul>
		</div>
	</form>
</div>

<%@ include file="admin_tail.jsp" %>
<script type="text/javascript" src="${resourcePath}/js/admin_sd_add.js"></script>