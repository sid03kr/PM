<%@ page language='java' contentType='text/html; charset=UTF-8' pageEncoding='UTF-8'%>
<%@ include file='head.jsp' %>

<form name="signform" action="" method="" enctype="multipart/form-data">
	<input type="hidden" class="page_type" value="평가확인">
	<input type="hidden" name="type" value="<%=(String)session.getAttribute("type")%>">
	<input type="hidden" name="no" value="<%=(String)request.getParameter("no")%>">
	<input type="hidden" name="score" value="<%=(String)request.getParameter("score")%>">
	<input type="hidden" name="status" value="<%=(String)request.getParameter("status")%>">
	<input type="hidden" name="answer" value="<%=(String)request.getParameter("answer")%>">
	<input type="hidden" name="sign" value="">
	<div>
		<div class="sub_tit">
			<button class="btn red" onclick="history.back()">취소</button> 
			<p class="sign_title">사인을 입력해주시기 바랍니다</p>
		</div>
		<div class="sign_content">
			<canvas id="signature"></canvas>
		</div>
		<div class="sign_btn">
			<button class="btn gray" id="clear">지우기</button> 
			
			<button class="btn point" id="save">확인</button> 
		</div>
	</div>
</form>



<script type="text/javascript" src="${resourcePath}/js/sigmature_pad.min.js"></script>
<%@ include file="tail.jsp" %>
<script>
	var canvas = $("#signature")[0];
	var signature = new SignaturePad(canvas, {
		minWidth : 2,
		maxWidth : 2,
		penColor : "rgb(0, 0, 0)"
	});
	 
	$("#clear").on("click", function() {
		signature.clear();
	});
 
	$("#save").on("click", function() {
		if (signature.isEmpty()) {
			alert("사인이 없습니다.");
		} else {
			alert("저장이 완료되었습니다.")
			upload();
		}
	});
	

		

	function resizeCanvas() {
		var ratio =  Math.max(window.devicePixelRatio || 1, 1);
		canvas.width = canvas.offsetWidth * ratio;
		canvas.height = canvas.offsetHeight * ratio;
		canvas.getContext("2d").scale(ratio, ratio);
		signature.clear(); // otherwise isEmpty() might return incorrect value
	}
	window.addEventListener("resize", resizeCanvas);
	resizeCanvas();
	
	function upload(){
		var url = contextPath + "/portsign/upload";
		$('input[name="sign"]').val(signature.toDataURL("image/png"));
		var formData = new FormData($("form[name='signform']")[0]);
		var data = signature.toDataURL("image/png");
		console.log(data);
		$.ajax({
			url : url,
			type : "post",
			dataType : "Json",
			data : formData,
			async: false,
			contentType: false,
			processData: false,
			success : function(data){
				var url = contextPath + "/portfolio/portfolioEditStatus";
				var no = $('input[name="no"]').val();
				var status = $('input[name="status"]').val();
				var score = $('input[name="score"]').val();
				
				if($('input[name="answer"]').val() != null && $('input[name="answer"]').val() != "" && $('input[name="answer"]').val() != "null") {
					var answer = $('input[name="answer"]').val();	
				}
				$.ajax({
					url : url,
					type : "post",
					dataType : "Json",
					data:{no:no,status:status,score:score,answer:answer},
					success : function(data){
						location.href=contextPath+"/index";
					},
					error: function() {
					}
				});
			}
		});
	}
</script>
