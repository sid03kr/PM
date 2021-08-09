<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="common/head.sub.jsp" %>

<% String st_type = (String)session.getAttribute("type"); %>

<script type="text/javascript" src="${resourcePath}/js/menu.js"></script>
<header>
	<div class="tit"><span class="page_name">&nbsp</span>
		<button>
			<i class="ri-menu-line"></i>
		</button>
<!-- 		<span class="head_ar alarm_data">1</span> -->
		<div class="hidden_mu">
			<div class="pf">
				<a href="${contextPath}/index">
					<i class="ri-folder-4-line"></i>
					<p>포트폴리오관리<span class="alarm_data">1</span></p>
				</a>
			</div>
			<div class="alarm">
				<a href="${contextPath}/index">
					<i class="ri-file-edit-line"></i>
					<p>평가관리<span class="alarm_data">1</span></p>
				</a>
			</div>
			<div>
				<a href="${contextPath}/mypage">
					<i class="ri-user-fill"></i>
					<p>마이페이지</p>
				</a>
			</div>
		</div>
	</div>
</header>
<div class='content'>

<script> 
$(document).ready(function(){
	$('.tit > button').live('click', function(){
		$('.hidden_mu').animate({
			height:'toggle',
		}, 200);
	});
	
	var title = $('.page_type').val();
	$('.page_name').text(title);
	
	if(title == "회원가입"){	
		$('#hd_button').css('display','none');	
		$('.head_ar').css('display','none');	
	}
});

if('<%=st_type%>' =="student"){
	$('.hidden_mu > .alarm').css("display","none");	
	$('header .hidden_mu > div').css("width","calc(100% / 2)");
}else{
	$('.hidden_mu > .pf').css("display","none");	
	$('header .hidden_mu > div').css("width","calc(100% / 2)");
}
</script>

