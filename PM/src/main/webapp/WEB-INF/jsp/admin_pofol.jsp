<%@ page language='java' contentType='text/html; charset=UTF-8' pageEncoding='UTF-8'%>
<%@ include file='admin_head.jsp' %>

<div class="content pofol_list">
	<form name="pofol_list" action="" method="" onsubmit="">
		<input type="hidden" name="type" >
		<input type="hidden" name="pageNo" value="1">
		<input type="hidden" name="count">
		<div>
			<p class="title">포트폴리오 목록</p>
			<div class="add_btn">
				<a href="${contextPath}/admin_pofol_add" class="am_bg_point"><i class="ri-add-line"></i>데이터 추가</a>
			</div>
		</div>
		<div class="search">
			<button class="btn reset_btn">초기화</button>
			<input type="text" name="name" placeholder="포트폴리오명 검색">
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
							<th>시작일</th>
							<th>종료일</th>
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

<%@ include file="admin_tail.jsp" %>
<script type="text/javascript" src="${resourcePath}/js/admin_pofol.js"></script>