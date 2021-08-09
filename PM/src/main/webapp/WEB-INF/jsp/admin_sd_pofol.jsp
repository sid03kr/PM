<%@ page language='java' contentType='text/html; charset=UTF-8' pageEncoding='UTF-8'%>
<%@ include file='admin_head.jsp' %>

<% String _id = request.getParameter("_id"); %>
<% String type = request.getParameter("type"); %>

<div class="am_info">
	<div class="info_left w25">
		<ul>
			<li class="name">
				<div class="img">
					
				</div>
				<div>
					<p>이름</p>
					<span id="name"></span>
				</div>
			</li>
			<li class="acc_info">
				<a href="${contextPath}/admin_sd_info?_id=<%=_id%>&type=<%=type%>">계정정보<i class="ri-arrow-drop-right-line"></i></a>
			</li>
			<li class="pofol_info">
				<a href="${contextPath}/admin_sd_pofol?_id=<%=_id%>&type=<%=type%>">포트폴리오 제출 정보<i class="ri-arrow-drop-right-line"></i></a>
			</li>
			<li class="pw_reset">
				<a href="${contextPath}/admin_sd_pw?_id=<%=_id%>&type=<%=type%>">비밀번호 수정<i class="ri-arrow-drop-right-line"></i></a>
			</li>
		</ul>
	</div>
	<div class="info_right_pf w75">
		<form name="sd_pofol" action="" method="">
		<input type="hidden" name="_id" value="<%=_id %>">
		<input type="hidden" name="type" value="<%=type %>">
		<input type="hidden" name="pageNo" value="1">
		<input type="hidden" name="count">
			<div>
				<p class="title">포트폴리오 목록</p>
				<div class="add_btn">
					<a href="${contextPath}/admin_pofol_add?_user=<%=_id %>&type=<%=type %>" class="am_bg_point"><i class="ri-add-line"></i>데이터 추가</a>
				</div>
			</div>
			<div class="search">
				<button class="btn"  id="reset_btn">초기화</button>
				<input type="text" name="search" placeholder="포트폴리오 이름 검색">
			</div>
			<div class="list">
				<div>
					<table>
						<thead>
							<tr>
								<th>Act</th>
								<th>_id</th>
								<th>포트폴리오명</th>
								<th>타입</th>
								<th>상태</th>
								<th class="w15">시작일</th>
								<th class="w15">종료일</th>
							</tr>
						</thead>
						<tbody id="pofolList">
						</tbody>
					</table>
					<div class="paging">
					<ul >
						<li id="list_index">
						</li>
						<li id="pageValue"></li>
						<li>
							<select name="postNum">
								<option value="10" selected>10</option>
								<option value="15" >15</option>
								<option value="20" >20</option>
								<option value="25">25</option>
								<option value="30">30</option>
							</select>
						</li>
					</ul>
				</div>
				</div>
			</div>
		</form>
	</div>
</div>

<%@ include file="admin_tail.jsp" %>
<script type="text/javascript" src="${resourcePath}/js/admin_sd_pofol.js"></script>

