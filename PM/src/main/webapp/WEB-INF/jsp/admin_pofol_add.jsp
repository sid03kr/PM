<%@ page language='java' contentType='text/html; charset=UTF-8' pageEncoding='UTF-8'%>
<%@ include file='admin_head.jsp' %>

<% String _user = request.getParameter("_user"); %>
<% String job_type = request.getParameter("type"); %>

<div class="am_add pofol_add">
	<form name="am_pofol_add" action="" method="" id="am_pofol_add" enctype="multipart/form-data">
	<input type="hidden" name="job_type" value="<%=job_type %>">
	<input type="hidden" name="hidden_name">
	<input type="hidden" name="page_user" value="<%=_user %>">
		<div class="add_list">
			<ul>
				<li class="w20">종류</li>
				<li class="w80">
					<select name="type">
						<option value="personal" selected>개인</option>
						<option value="group">그룹</option>
					</select>
				</li>
				<li class="w20">작성자</li>
				<li class="w80">
					<select name="_user">
					</select>
				</li>  
				<li class="w20">포트폴리오 제목</li>
				<li class="w80"><input type="text" name="name"></li>
				<li class="w20">포트폴리오 시작일</li>
				<li class="w80"><input type="date" name="startDate"></li>
				<li class="w20">포트폴리오 종료일</li>
				<li class="w80"><input type="date" name="endDate"></li>
				<li class="w20 type_group">리더</li>
				<li class="w80 type_group">
					<select name="_leader">
					</select>
				</li>  
				<li class="w20 type_group">팀원</li>
				<li class="w80 h_a type_group">
					<select class="form-control" name="name_member" multiple="multiple" >
					</select>
				</li>
				<li class="w20">교수</li>
				<li class="w80">
					<select name="_professor">
					</select>
				</li>
				<li class="w20">포트폴리오 내용</li>
				<li class="w80 textarea">
					<textarea name="content"></textarea>
				</li>
				<li class="w20">링크</li>
				<li class="w80">
					<input type="text" name="link">
				</li>
				<li class="w20 file">파일</li>
				<li class="w80 file">
					<div>
						<input style="display:none" type="file" id="file_upload" name = "file" onchange="javascript:document.getElementById('fileName').value = this.value.split('\\')[this.value.split('\\').length-1]">
						<input type="text" id="fileName" name="fileName" class="file_name" value="">
					</div>
					<div>
						<label for="file_upload" class="btn">파일첨부</label>
						<button class="btn reset">첨부초기화</button>
					</div>
				</li>
				
				<button class="btn am_bg_point" id="insertPofol">추가하기</button>
			</ul>
		</div>
	</form>
</div>

<%@ include file="admin_tail.jsp" %>
<script type="text/javascript" src="${resourcePath}/js/admin_pofol_add.js"></script>
<script type="text/javascript" src="${resourcePath}/js/util/select2.min.js"></script>

<link rel="stylesheet" type="text/css" href="${resourcePath}/css/util/select2.min.css">
