<%@ page language='java' contentType='text/html; charset=UTF-8' pageEncoding='UTF-8'%>
<%@ include file='admin_head.jsp' %>

<% String _id = request.getParameter("_id"); %>
<% String no = request.getParameter("no"); %>
<% String job_type = request.getParameter("type"); %>

<div class="am_add">
	<div class="info_right w100">
		<form name="pofol_re" action="" method="" id="pofolViewForm" enctype="multipart/form-data">
		<input type="hidden" name ="_id" value="<%=_id%>">
		<input type="hidden" name ="no" value="<%=no%>">
		<input type="hidden" name ="job_type" value="<%=job_type%>">
		<input type="hidden" name ="status">
		<!-- 
		<input type="hidden" name ="_professor">
		 -->
		<input type="hidden" name ="hidden_name">
		
		
			<ul>
				<li class="w100">
					<p class="title">포트폴리오 수정</p>
				</li>
				<li class="w20">종류</li>
				<li class="w80">
					<select name="type">
						<option value="personal">개인</option>
						<option value="group">그룹</option>
					</select>
				</li>
				<li class="w20">포트폴리오 제목</li>
				<li class="w80"><input type="text" name="name"></li>
				<li class="w20">포트폴리오 시작일</li>
				<li class="w80"><input type="date" name="startDate"></li>
				<li class="w20">포트폴리오 종료일</li>
				<li class="w80"><input type="date" name="endDate" ></li>
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
				<li class="w20">블록체인코드</li>
				<li class="w80">
					<input type="text" name="pofol_re_inp6" disabled>
				</li>
				<div>
					<button class="btn am_bg_point" id="update_pofol">수정하기</button>
					<a class="del_btn btn" id="delete_pofol">삭제</a>
				</div>
			</ul>
		</form>
	</div>
</div>

<%@ include file="admin_tail.jsp" %>
<script type="text/javascript" src="${resourcePath}/js/admin_pofol_re.js"></script>
<script type="text/javascript" src="${resourcePath}/js/util/select2.min.js"></script>

<link rel="stylesheet" type="text/css" href="${resourcePath}/css/util/select2.min.css">