/*
$(document).ready(function(){
	var url = contextPath + "/menu/list";
	$.ajax({
		url : url,
		type : "post",
		dataType : "json",
		async : false,
		success : function(data){
			var html = '';
			var code = '';
			var cnt = 0;
			var pcode = '';
			var pcnt = 0;
			var child = 0;
			if(data.code == 1){
				var data = data.result[0];
				for(var i=0; i<data.length; i++){
					if(i == 0) {
						code = data[i].me_code;
						pcode = code;
						html += "<li><a href='#' target='_parent'>"+data[i].me_name+"</a>";
					}else{
						if(code == data[i].me_pcode.substr(0, 2)){
							if(cnt == 0) {
								html += "<div class='line point'></div>";
								html += "<ul class='sub'>";
							}
							
							if(pcode == data[i].me_pcode.substr(0, pcode.length) && pcode != code){
								if(pcnt == 0) {
									html += "<ul>";
								}else if(pcode.length < data[i].me_pcode.length){
									child++;
									html += "<ul>";
								}
								html += "<li><a href='#' target='_parent' data-dialog='"+data[i].me_url+"'>"+data[i].me_name+"</a>";
								pcnt++;
								pcode = data[i].me_pcode;
							}else{
								if(pcnt > 0) {
									html += "</li></ul></li>";
									if(child > 0) for(var j=0; j<child; j++) html += "</li></ul></li>";
								}
								pcode = data[i].me_code;
								html += "<li><a href='#' target='_parent' data-dialog='"+data[i].me_url+"'>"+data[i].me_name+"</a>";
								pcnt = 0;
								child = 0;
							}
							cnt++;
						}else{
							if(pcnt > 0) html += "</li></ul></li>";
							else if(cnt > 0) html += "</li></ul></li>";
							else html += "</li>";
							
							html += "<li><a href='#' target='_parent'>"+data[i].me_name+"</a>";
							code = data[i].me_code;
							pcode = code;
							cnt = 0;
							child = 0;
						}
					}
				}
				if(cnt > 0) html += "</ul></li>";
				else html += "</li>";
				
				html += "<li><a href='#' data-dialog='pop_search' target='_parent'>장치검색</a><div class='line point'></div></li>";
				$('ul.menu').html(html);
			}else location.href = contextPath+"/home";
		}
	});
});
*/