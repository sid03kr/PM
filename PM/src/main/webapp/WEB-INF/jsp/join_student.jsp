<%@ page language='java' contentType='text/html; charset=UTF-8' pageEncoding='UTF-8'%>
<%@ include file='head.jsp' %>
<% String mb_type = request.getParameter("type");%>
<!-- <link rel='stylesheet' type='text/css' href='${resourcePath}/css/home.css'> -->	
<link rel='stylesheet' type='text/css' href='${resourcePath}/css/login.css'>	
<input type="hidden" class="page_type" value="회원가입">	
<input type="hidden" name="mb_type" value="<%= mb_type%>">

<div class='join_student'>
	<div class="sub_tit">
		<% if(mb_type.equals("student")){ %>
			<button class="btn"><a href="${contextPath}/">취소</a></button>학생정보
		<% }else if(mb_type.equals("professor")){ %>
			<button class="btn"><a href="${contextPath}/">취소</a></button>교수정보
		<% }else{ %>
			<button class="btn"><a href="${contextPath}/">취소</a></button>기업 담당자 정보
		<% }%>
			<button class="btn point" id="submit_btn">저장</button>
	</div>
	<div class="wait_box" style="display: none;"><img src="${resourcePath}/img/ajax-loader.gif"></div>
<form id="fileForm" name="" action="" method="" enctype="multipart/form-data">
	<input type="hidden" class="page_type" value="회원가입">
	<input type="hidden" name="type" value="<%= mb_type%>">
		<div class="img">
			<div class="w35">
				<div id="image_container"><img src="${resourcePath}/img/user.png"></div>
			</div>
			<div class="w65">
				<input type="file" id="img_file" name="file" accept="image/*" onchange="setThumbnail(event);">
				<label class="point btn" for="img_file">사진등록</label>
				<button class="btn" id="filecancle">등록취소</button>
			</div>
		</div>
		<ul>
			<li class="w35">
				<div>
					<span class="rf">＊</span>아이디
				</div>
			</li>
			<li class="w65">
				<div>
					<input type="text" name="identifier" placeholder="영문자 또는 숫자의 6~20 글자 ">
				</div>
			</li>
			<li class="w35">
				<div>
					<span class="rf">＊</span>비밀번호
				</div>
			</li>
			<li class="w65">
				<div>
					<input type="password" name="password" placeholder="하나의 특수문자와 숫자를 포함한 최소 8글자">
				</div>
			</li>
			 
			<li class="w35">
				<div>
					<span class="rf">＊</span>비밀번호확인
				</div>
			</li>
			<li class="w65">
				<div>
					<input type="password" name="rePassword" placeholder="비밀번호를 다시 입력해주세요">
				</div>
			</li>
			 
			<li class="w35">
				<div>
					<span class="rf">＊</span>이름
				</div>
			</li>
			<li class="w65">
				<div>
					<input type="text" name="name" placeholder="이름을 입력해주세요">
				</div>
			</li>
			<li class="w35">
				<div>
					<span class="rf">＊</span>생년월일
				</div>
			</li>
			<li class="w65">
				<div>
					<input type="text" name ="birth" placeholder="날짜를 선택해주세요" onfocus="(this.type='date')" onblur="(this.type='text')" class="hasDatepicker" id="">
				</div>
			</li>
			<li class="w35">
				<div>
					<span class="rf">＊</span>성별
				</div>
			</li>
			<li class="w65 radio">
				<div>
					<input type="radio" id="male" name="gender" value="male">
						<label for="male">남자</label>
					<input type="radio" id="female" name="gender" value="female">
						<label for="female">여자</label>
				</div>
			</li>
			<li class="w35">
				<div>
					<span class="rf">＊</span>휴대전화
				</div>
			</li>
			<li class="w65">
				<div>
					<input type="text" name="phone" placeholder="예시 ) 01011112222">
				</div>
			</li>
			<li class="w35">
				<div>
					<span class="rf">＊</span>이메일
				</div>
			</li>
			<li class="w65">
				<div>
					<input type="text" name="email" placeholder="예시 ) abcd@email.com">
				</div>
			</li>
			
			<% if(mb_type.equals("enterprise")){ %>
			<li class="w35">
				<div>
					<span class="rf">＊</span>기업명
				</div>
			</li>
			<li class="w65">
				<div>
					<input type="text" name ="university" placeholder="기업명을 입력해주세요 (선택항목)">
				</div>
			</li>
			<% }else{ %>
			<li class="w35">
				<div>대학교(원) </div>
			</li>
			<li class="w65">
				<div>
					<input type="text" name ="university" placeholder="대학교(원)을 입력해주세요 (선택항목)">
				</div>
			</li>
			<% }%>
			<% if(mb_type.equals("student")){ %>
			<li class="w35">
				<div>학과</div>
			</li>
			<li class="w65">
				<div>
					<input type="text" name="universityMajor" placeholder="학과를 입력해주세요 (선택항목)">
				</div>
			</li>
			<% }else if(mb_type.equals("professor")){ %>
			<li class="w35">
				<div>교과</div>
			</li>
			<li class="w65">
				<div>
					<input type="text" name="universityMajor" placeholder="교과를 입력해주세요 (선택항목)">
				</div>
			</li>
			<% }else{ %>
			<li class="w35">
				<div>부서</div>
			</li>
			<li class="w65">
				<div>
					<input type="text" name="universityMajor" placeholder="부서를 입력해주세요 (선택항목)">
				</div>
			</li>
			<% }%>
			<% if(mb_type.equals("student")){ %>
			<li class="w35">
				<div>학번</div>
			</li>
			<li class="w65">
				<div>
					<input type="text" name="universityNumber" placeholder="학번을 입력해주세요 (선택항목)">
				</div>
			</li>
			<% }else if(mb_type.equals("professor")){ %>
			<li class="w35">
				<div>교번</div>
			</li>
			<li class="w65">
				<div>
					<input type="text" name="universityNumber" placeholder="교번을 입력해주세요 (선택항목)">
				</div>
			</li>
			<% }else{ %>
			<li class="w35">
				<div>사번</div>
			</li>
			<li class="w65">
				<div>
					<input type="text" name="universityNumber" placeholder="사번를 입력해주세요 (선택항목)">
				</div>
			</li>
			<% }%>
		</ul>
	</form>
</div>


<%@ include file="common/tail.sub.jsp" %>

<script type="text/javascript" src="${resourcePath}/js/register.js"></script>
