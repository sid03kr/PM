<%@ page language='java' contentType='text/html; charset=UTF-8' pageEncoding='UTF-8'%>
<%@ include file='admin_head.jsp' %>


<div class="content am_student">
	<form name="am_student" action="" method="" onsubmit="" class="pos">
		<input type="hidden" name="type" value="enterprise">
		<input type="hidden" name="pageNo" value="1">
		<input type="hidden" name="count">
		<div class="guide_msg pos_a sky_blue w100 none">
			<span class="chk_cnt"></span> items selected 
			<button class="btn_del_msg red fl_right mt15 fz_14 pa5">삭제</button>
		</div>
		
		<div>
			<p class="title">기업목록</p>
			<div class="add_btn">
				<a href="${contextPath}/admin_sd_add?type=enterprise" class="am_bg_point"><i class="ri-add-line"></i>데이터 추가</a>
			</div>
		</div>
		<div class="search">
			<button class="btn reset_btn">초기화</button>
			<input type="text" name="name" placeholder="사용자 이름 검색">
		</div>
		<div class="list">
			<div>
				<table>
					<thead>
						<tr>
							<th>
								<input type="checkbox" name="admin_sd_ck_all" id="sd_all">
								<label for="sd_all"></label>
							</th>
							<th>Act</th>
							<th>계정</th>
							<th>프로필</th>
							<th>이름</th>
							<th>기업</th>
							<th>부서</th>
							<th>사번</th>
							<th>생일</th>
							<th>성별</th>
							<th>연락처</th>
						</tr>
					</thead>
					<tbody id="userList">
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
<script type="text/javascript" src="${resourcePath}/js/admin_enterprise.js"></script>