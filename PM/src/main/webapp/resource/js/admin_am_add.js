$('#register').click(function() {
	var data = $('form[name="am_am_add"]').serialize();
	
	$.ajax({
		type:'post',
		url: contextPath+"/admin/register",
		dataType: 'json',
		async:false,
		data : data,
		success: function(data) {
			location.href = contextPath + "/admin_am"
		},
		error: function() {
			console.log("error");
		}
	});
})