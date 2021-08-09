<%@ page language='java' contentType='text/html; charset=UTF-8' pageEncoding='UTF-8'%>
<%@ include file='head.jsp' %>
<!-- <link rel='stylesheet' type='text/css' href='${resourcePath}/css/home.css'> -->	
<input type="hidden" class="page_type" value="마이페이지">
<% String user_type = (String)session.getAttribute("type"); %>

<div class='join_student mypage'>
	<div class="sub_tit">
		<button class="btn"><a href="${contextPath}/index">취소</a></button>정보수정
		<input type="hidden" data-dialog = "my_save">
		<button class="btn point" id="save_btn">저장</button>
	</div>
	<form name="" action="" method="" id="fileForm" enctype="multipart/form-data">
		<input type="hidden" name="type" value="<%= user_type%>">
		<div class="img">
			<div class="w35">
				<% if(null != (String)session.getAttribute("_profile")){ %>
					<div id="image_container"><img src="${resourcePath}/portfolio/uploadfile/${_profile}"></div>
				<% }else{ %>
					<div id="image_container"><img src="${resourcePath}/img/user.png"></div>
				<% } %>
			</div>
			<div class="w65">
				<input type="file" id="my_img_file" name="file" accept="image/*" onchange="setThumbnail(event);" value="">
				<label class="btn point" for="my_img_file">사진등록</label>
				<button class="btn" id="my_photo_del">등록취소</button>
			</div>
		</div>
		<ul>
			<li class="w35">
				<div>
					아이디
				</div>
			</li>
			<li class="w65">
				<div>
					<input type="text" placeholder="" name="identifier" value="" readonly>
				</div>
			</li>
			<li class="w35">
				<div>
					비밀번호
				</div>
			</li>
			<li class="w65">
				<div>
					<input type="password" name="password" placeholder="특수문자와 숫자를 포함한 8~20자">
				</div>
			</li>
			<li class="w35">
				<div>
					비밀번호확인
				</div>
			</li>
			<li class="w65">
				<div>
					<input type="password" name="rePassword" placeholder="비밀번호를 다시 입력해주세요" >
				</div>
			</li>
			<li class="w35">
				<div>
					이름
				</div>
			</li>
			<li class="w65">
				<div>
					<input type="text" name="name" value="">
				</div>
			</li>
			<li class="w35">
				<div>생년월일</div>
			</li>
			<li class="w65">
				<div>
					<input type="text"  name="birth" value=""  onfocus="(this.type='date')" onblur="(this.type='text')" class="hasDatepicker" id="">
				</div>
			</li>
			<li class="w35">
				<div>성별</div>
			</li>
			<li class="w65 radio">
				<div>
					<input type="radio" id="male_2" name="gender" value="male" checked>
						<label for="male_2" >남자</label>
					<input type="radio" id="female_2" name="gender" value="female">
						<label for="female_2">여자</label>
				</div>
			</li>
			<li class="w35">
				<div>휴대전화</div>
			</li>
			<li class="w65">
				<div>
					<input type="text" name="phone" value="" >
				</div>
			</li>
			<li class="w35">
				<div>이메일</div>
			</li>
			<li class="w65">
				<div>
					<input type="text" name="email" value="" >
				</div>
			</li>
			
			<% if(user_type.equals("enterprise")){ %>
			<li class="w35">
				<div>기업명</div>
			</li>
			<li class="w65">
				<div>
					<input type="text" name ="university" placeholder="기업명을 입력해주세요" value="">
				</div>
			</li>
			<% }else{ %>
			<li class="w35">
				<div>대학교(원) </div>
			</li>
			<li class="w65">
				<div>
					<input type="text" name ="university" placeholder="대학교(원)을 입력해주세요 (선택항목)" value="">
				</div>
			</li>
			<% }%>
			<% if(user_type.equals("student")){ %>
			<li class="w35">
				<div>학과</div>
			</li>
			<li class="w65">
				<div>
					<input type="text" name="universityMajor" placeholder="학과를 입력해주세요 (선택항목)" value="">
				</div>
			</li>
			<% }else if(user_type.equals("professor")){ %>
			<li class="w35">
				<div>교과</div>
			</li>
			<li class="w65">
				<div>
					<input type="text" name="universityMajor" placeholder="교과를 입력해주세요 (선택항목)" value="">
				</div>
			</li>
			<% }else{ %>
			<li class="w35">
				<div>부서</div>
			</li>
			<li class="w65">
				<div>
					<input type="text" name="universityMajor" placeholder="부서를 입력해주세요 (선택항목)" value="">
				</div>
			</li>
			<% }%>
			<% if(user_type.equals("student")){ %>
			<li class="w35">
				<div>학번</div>
			</li>
			<li class="w65">
				<div>
					<input type="text" name="universityNumber" placeholder="학번을 입력해주세요 (선택항목)" value="">
				</div>
			</li>
			<% }else if(user_type.equals("professor")){ %>
			<li class="w35">
				<div>교번</div>
			</li>
			<li class="w65">
				<div>
					<input type="text" name="universityNumber" placeholder="교번을 입력해주세요 (선택항목)" value="">
				</div>
			</li>
			<% }else{ %>
			<li class="w35">
				<div>사번</div>
			</li>
			<li class="w65">
				<div>
					<input type="text" name="universityNumber" placeholder="사번를 입력해주세요 (선택항목)" value="">
				</div>
			</li>
			<% }%>
			<li class="w35">
				<div>생체인증</div>
			</li>
			<li class="w65">
				<div>
					<span class="inj_data">미등록</span>
					<button class="btn">
						<a href="${contetxPath}/certification">인증하기</a>
					</button>
				</div>
			</li>
			<li class="w100">	
				<button class="btn re_btn"><a>로그아웃</a></button>	
			</li>
		</ul>
	</form>
</div>


<!-- 팝업 -->	

<div id="my_save" class="dialog">	
	<div class="dialog__overlay"></div>	
	<div class="dialog__content simple w75">	
		<div class="dialog_top">	
		</div>	
		<div class="dialog_body">	
			<p>저장이 완료되었습니다.</p>	
		</div>	
		<div class="dialog_btn">	
			<button class="btn close point" data-dialog-close>확인</button>	
		</div>	
	</div>	
</div>
 
<div id="my_photo_del" class="dialog">	
	<div class="dialog__overlay"></div>	
	<div class="dialog__content simple w75">	
		<div class="dialog_top">	
		</div>	
		<div class="dialog_body">	
			<p>등록된 사진이 삭제되었습니다.</p>	
		</div>	
		<div class="dialog_btn">	
			<button class="btn close point" data-dialog-close>확인</button>	
		</div>	
	</div>	
</div>




<%@ include file="tail.jsp" %>
<script type="text/javascript" src="${resourcePath}/js/mypage.js"></script>

<script>	
(function() {	
	//IE11 patch	
	if (window.NodeList && !NodeList.prototype.forEach) {	
	  NodeList.prototype.forEach = Array.prototype.forEach;	
	}	
	var dlgtrigger = document.querySelectorAll( '[data-dialog]' );	
	dlgtrigger.forEach(function(item, index) {	
		somedialog = document.getElementById( item.getAttribute( 'data-dialog' ) ),	
		dlg = new DialogFx( somedialog );	
		item.addEventListener( 'click', dlg.toggle.bind(dlg) );	
	})	
})();	
</script>
