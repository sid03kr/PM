<%@ page language='java' contentType='text/html; charset=UTF-8' pageEncoding='UTF-8'%>
<%@ include file='head.jsp' %>
<link rel='stylesheet' type='text/css' href='${resourcePath}/summernote/summernote-lite.css'>

<input type="hidden" class="page_type" value="포트폴리오 관리">
<div class="pofol_upload">
	<div class="sub_tit">
		<button class="btn btn_cancel">취소</button>
		포트폴리오 등록
		<input type="hidden" data-dialog = "my_save">
		<button class="btn point" id="btn_portfolioInsert">저장</button>
	</div>
	<form id="fileForm" name="" action="" method="" enctype="multipart/form-data">
	<input type="hidden" name="status" value="wait">
	<input type="hidden" name="member" value="">
		<ul>
			<li class="w50">
				<p class="mr_5">종류</p> 
				<div>
					<label>
						<input class="group_type" type="radio"  name="type" value="personal" checked >개인
					</label>
					<label>
						<input class="group_type" type="radio"  name="type" value="group">그룹
					</label>
				</div>
			</li>
			<li class="w50">
				<p>담당</br>교수</p>
				<input type="hidden"  name="_professor" 	>
				<input type="text" name="name_professor" readonly>
				<button class="btn br_0" data-dialog="professor_find" >찾기</button>
			</li>
			<li class="w100 li_member">
				<p>그룹</br>리더</p>
				<input type="hidden" name="_leader">
				<input type="text" name="name_leader" readonly>
				<button class="btn br_0" data-dialog="leader_find">찾기</button>
			</li>
			<li class="w100 li_group">
				<p>참여</br>인원</p>
				<input type="hidden" name ="_group">
				<input type="text" name ="name_member" style="width:58%" value="" readonly>
				
				<button class="btn br_0" id="btn_init">리셋</button>
				
				<button class="btn br_0" data-dialog="member_find">찾기</button>
			</li>
			<li class="w100">
				<p>제목</p>
				<input type="text" name="name">
				<button id="start_button" onclick="startButton(event)" style="display: inline-block;">
						<i class="ri-mic-line"></i>
					</button>
			</li>
						
			<li class="w100">
				<p>기간</p>
				<div>
					<input type="date" placeholder="시작일" name="startDate" id="" class="hasDatepicker mr_20">
					<input type="date" placeholder="종료일" name="endDate" id="" class="hasDatepicker">
				</div>
			</li>
			<li class="w100 sp" style="height:100%;display:contents;">

				<textarea class="form-control" id="summernote" name="content"></textarea>
			</li>
			<li class="w100">
				<p>노션</br>링크</p>
				<input type="text" name="link">
			</li>

			<li class="w100">
				<p>파일</br>첨부</p>
				<input type="text" id="fileName" name="fileName" class="file_name" value="">
				<input type="file" id="file_upload" name = "file" onchange="javascript:document.getElementById('fileName').value = this.value.split('\\')[this.value.split('\\').length-1]">
				<label for="file_upload" class="btn">파일첨부</label>
				<button class="btn reset">첨부초기화</button>
			</li>
			
			<!-- <li class="w100">
				<p>파일</br>검증</p>
				<input type="text" name="file_check" readonly>
			</li> -->
			 
			
		</ul>
	</form>
</div>


<!-- 팝업 -->

<div id="my_save" class="dialog">	
	<div class="dialog__overlay"></div>	
	<div class="dialog__content simple w75">	
		<div class="dialog_top">	
		</div>	
		<div class="dialog_body">	
			<p class='text'></p>	
		</div>	
		<div class="dialog_btn writer_btn">	
			<button class="btn  point writer_bt" data-dialog-close>확인</button>	
		</div>	
	</div>	
</div>	
 

<div id="professor_find" class="dialog">
	<div class="dialog__overlay"></div>
	<div class="dialog__content pop_find w90">
		<div class="dialog_top">
			<span>담당교수 찾기</span>
		</div>
		<div class="dialog_body">
			<form id="findProfessorForm" name="findProfessorForm"  action="" method="">
				<div>
					<input type="text" name="name" placeholder="이름을 입력해주세요">
					<button id="findProf"><i class="ri-search-line"></i></button>
				</div>
			</form>
			
			<ul id="Professor_list" class="search_list">
			
			</ul>
		</div>
		<div class="dialog_btn">
			<button class="btn btn_close" data-dialog-close>닫기</button>
			<!-- <button class="btn point btn_ok">확 인</button>-->
		</div>
	</div>
</div>

<div id="member_find" class="dialog">
	<div class="dialog__overlay"></div>
	<div class="dialog__content pop_find w90">
		<div class="dialog_top">
			<span>참여인원 찾기</span>
		</div>
		<div class="dialog_body">
			<form id="findMemberForm" name="findMemberForm"  action="" method="">
				<div>
					<input type="text" name="name" placeholder="이름을 입력해주세요">
					<button id="findMember"><i class="ri-search-line"></i></button>
				</div>
			</form>
			<ul id="Member_list" class="search_list">
				
			</ul>
		</div>
		<div class="dialog_btn">
			<button class="btn btn_close" data-dialog-close>닫기</button>
			<!-- <button class="btn point btn_ok">확 인</button>-->
		</div>
	</div>
</div>

<div id="leader_find" class="dialog">
	<div class="dialog__overlay"></div>
	<div class="dialog__content pop_find w90">
		<div class="dialog_top">
			<span>그룹리더 찾기</span>
		</div>
		<div class="dialog_body">
			<form id="findLeaderForm" name="findLeaderForm"  action="" method="">
				<div>
					<input type="text" name="name" placeholder="이름을 입력해주세요">
					<button id="findLeader"><i class="ri-search-line"></i></button>
				</div>
			</form>
			<ul id="Leader_list" class="search_list">
				
			</ul>
		</div>
		<div class="dialog_btn">
			<button class="btn btn_close" data-dialog-close>닫기</button>
			<!-- <button class="btn point btn_ok">확 인</button>-->
		</div>
	</div>
</div>

<%@ include file="tail.jsp" %>
<script src="https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.12/summernote-lite.js"></script>
<script>
//내용 stt 버튼 
var SttButton = function (context) {
  var ui = $.summernote.ui;
  // create button
  var button = ui.button({
    contents: '<i class="ri-mic-line"></i>',
    tooltip: 'hello',
    click: function () {
      // invoke insertText method with 'hello' on editor module.
      //context.invoke('editor.insertText', 'hello');
	  alert("stt 기능 작성");
    }
  });
  return button.render();   // return button as jquery object
}

$('#summernote').summernote({
	height: 300,                 // 에디터 높이
	minHeight: null,             // 최소 높이
	maxHeight: null,             // 최대 높이	
	toolbar: [
				['style', ['style']],
				['font', ['bold', 'underline', 'clear']],
				['color', ['color']],
				['para', ['ul', 'ol', 'paragraph']],
				['table', ['table']],
				['insert', ['link']],
				['view', ['codeview']],
				['mybutton', ['hello']]
			],
	buttons: {
		hello: SttButton
	},
	focus: true,                  // 에디터 로딩후 포커스를 맞출지 여부
	lang: "ko-KR",					// 한글 설정
	placeholder: '최대 2048자까지 쓸 수 있습니다',	//placeholder 설정
	callbacks: {	//여기 부분이 이미지를 첨부하는 부분
		onImageUpload : function(files) {
			uploadSummernoteImageFile(files[0],this);
			},
		onPaste: function (e) {
			var clipboardData = e.originalEvent.clipboardData;
			if (clipboardData && clipboardData.items && clipboardData.items.length) {
				var item = clipboardData.items[0];
				if (item.kind === 'file' && item.type.indexOf('image/') !== -1) {
					e.preventDefault();
				}
			}
		}
	}
});
function uploadSummernoteImageFile(file, el) {
	data = new FormData();
	data.append("file", file);
	$.ajax({
		data : data,
		type : "POST",
		url : contextPath + "/uploadSummernoteImageFile",
		enctype : 'multipart/form-data',
		contentType : false,
		processData : false,  
		success : function(data) {
			//항상 업로드된 파일의 url이 있어야 한다.
			$(el).summernote('insertImage', data.url);
			
			
		}
	});
}
</script>
<script>
(function() {
	//IE11 patch
	if (window.NodeList && !NodeList.prototype.forEach) {
	  NodeList.prototype.forEach = Array.prototype.forEach;
	}
	var dlgtrigger = document.querySelectorAll( '[data-dialog]' );
	dlgtrigger.forEach(function(item, index) {
		somedialog = document.getElementById( item.getAttribute( 'data-dialog' ) ),
		dlg = new DialogFx( somedialog );
		item.addEventListener( 'click', dlg.toggle.bind(dlg) );
	})

})();
</script>

<script type="text/javascript" src="${resourcePath}/js/write.js"></script>