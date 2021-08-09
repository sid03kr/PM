/*
$('.admin_out').click(function() {
	alert_pop("로그아웃하시겠습니까?", 1,"취소","확인",function(){
		var url = contextPath + "/user/logout"
		$.ajax({
		url : url,  //controller url
		type : "post",  // method type
		dataType : "Json",  //data type
		success : function(data){
			location.href= contextPath+"/admin_login";
		},
		error: function(request,status,error){
	        alert("code = "+ request.status + " message = " + request.responseText + " error = " + error); // 실패 시 처리
	       }
		});
	})	;
})
*/

$('.admin_out').click(function() {
    if(confirm("로그아웃하시겠습니까?") == true){
        var url = contextPath + "/user/logout"
		$.ajax({
			url : url,  //controller url
			type : "post",  // method type
			dataType : "Json",  //data type
			success : function(data){
			location.href= contextPath+"/admin_login";
		},
		error: function(request,status,error){
	        alert("code = "+ request.status + " message = " + request.responseText + " error = " + error); // 실패 시 처리
	       }
		});
    }
    else{
        return ;
    }
});


