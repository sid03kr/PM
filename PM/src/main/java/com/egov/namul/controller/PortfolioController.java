package com.egov.namul.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.PrintWriter;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Properties;
import java.util.UUID;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.io.IOUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.egov.namul.service.PortfolioService;
import com.egov.namul.util.JsonUtil;
import com.egov.namul.util.sha256;

@Controller
@RequestMapping(value = "/portfolio")
public class PortfolioController {

	@Resource(name = "PortfolioService")
	PortfolioService portfolioService;
	@Resource(name = "fileUploadProperty")
	Properties fileUploadProperty;

	// 회원가입 입력 post
	@RequestMapping(value = "portfolioInsert")
	public void portfolioInsert(HttpServletRequest request, HttpServletResponse res, ModelMap mv) throws Exception {
		try {
			HttpSession session = request.getSession();

			// Json Output 객체 선언
			PrintWriter jsonOut = null;
			// Json Output 인코딩 설정
			res.setCharacterEncoding("UTF-8");
			res.setContentType("text/html; charset=UTF-8");
			// Json Output
			jsonOut = res.getWriter();

			// 글 작성 구현
			int _user = Integer.parseInt(request.getSession()
					.getAttribute("_id").toString());
			int _professor = Integer.parseInt(request.getParameter("_professor").toString());
			String name = request.getParameter("name").toString();
			String type = request.getParameter("type").toString();
			// 초기 작성글이기 때문에 view에서 hidden 값으로 초기 evaluation 설정함
			String status = request.getParameter("status").toString();
			String startDate = request.getParameter("startDate").toString();
			String endDate = request.getParameter("endDate").toString();

			String link = null;
			String content = null;
			int _leader = 0;

			// link 값이 null이 아니면 link 값 변수에 입력
			if (request.getParameter("link").toString() != null) {
				link = request.getParameter("link").toString();
			}
			// content 값이 null이 아니면 content 값 변수에 입력
			if (request.getParameter("content") != null) {
				content = request.getParameter("content").toString().replace("&amp;", "&")
						.replace("&lt;", "<").replace("&gt;", ">").replace("&nbsp;", " ");
			}
			new Exception();

			// 리더 값이 없으면 입력한 자신이 리더 변수에 추가 아니면 _leader 값이 변수에 입력.

			if (request.getParameter("_leader") == null
					|| request.getParameter("_leader").equals("")) {

				_leader = Integer.parseInt(request.getSession()
						.getAttribute("_id").toString());
			} else {
				_leader = Integer.parseInt(request.getParameter("_leader")
						.toString());
			}
			HashMap<String, Object> paramMap = new HashMap<String, Object>();

			paramMap.put("_user", _user);
			paramMap.put("_professor", _professor);
			paramMap.put("_leader", _leader);
			paramMap.put("name", name);
			paramMap.put("type", type);
			paramMap.put("status", status);
			paramMap.put("startDate", startDate);
			paramMap.put("endDate", endDate);
			paramMap.put("link", link);
			paramMap.put("content", content);
			

			portfolioService.insertPortfolio(paramMap);
			System.out.println("paramMap: " +paramMap);
			System.out.println("portfolio : " + paramMap.get("_id"));
			paramMap.put("portfolio", paramMap.get("_id"));
			if (null != request.getParameter("member")
					&& !"".equals(request.getParameter("member"))) {
				String arr[] = request.getParameter("member").split("\\|");
				for (int i = 0; i < arr.length; i++) {
					paramMap.put("member", arr[i]);
					portfolioService.insertPortfolioMember(paramMap);
				}
			}

			jsonOut.write("{\"result\":"
					+ JsonUtil.getJsonStringFromMap(paramMap)
					+ ",\"code\":1,\"url\":\"/index\"}");

			jsonOut.flush();
			// Json Output 종료
			jsonOut.close();

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@RequestMapping(value = "uploadFile")
	public void uploadFile(MultipartHttpServletRequest mreq,
			HttpServletResponse res, ModelMap mv) throws Exception {
		try {
			HttpSession session = mreq.getSession();
			// Json Output 객체 선언
			PrintWriter jsonOut = null;
			// Json Output 인코딩 설정
			res.setCharacterEncoding("UTF-8");
			res.setContentType("text/html; charset=UTF-8");
			// Json Output
			jsonOut = res.getWriter();

			HashMap<String, Object> paramMap = new HashMap<String, Object>();

			String fileName = "";
			if (null != mreq.getParameter("fileName").toString()
					&& !"".equals(mreq.getParameter("fileName").toString())) {
				fileName = mreq.getParameter("fileName").toString();
			}

			// file upload 구현
			String covertuId = "";
			String uploadPath = fileUploadProperty
					.getProperty("file.uploadportfolio.path");
			String originalEx = "";
			String filePath = "";
			int fileSize = 0;
			String nullpoint = null;

			final Map<String, MultipartFile> files = mreq.getFileMap();

			File saveFolder = new File(uploadPath);
			if (!saveFolder.exists() || saveFolder.isFile()) {
				System.out.println("폴더 없어서 폴더 만들기 성공");
				saveFolder.mkdirs();
			}
			Iterator<Entry<String, MultipartFile>> itr = files.entrySet()
					.iterator();
			MultipartFile file;

			while (itr.hasNext()) {
				Entry<String, MultipartFile> entry = itr.next();
				file = entry.getValue();

				if (!"".equals(file.getOriginalFilename())) {
					fileSize = Math.toIntExact(file.getSize());
					int maxSize = 10 * 1024 * 1024;
					if (fileSize > maxSize) {
						// json 출력문으로 변환해야할것!
					}

					Calendar cal = Calendar.getInstance();

					int year = cal.get(Calendar.YEAR);
					int month = cal.get(Calendar.MONTH) + 1;
					int date = cal.get(Calendar.DATE);
					int hour = cal.get(Calendar.HOUR_OF_DAY);
					int minute = cal.get(Calendar.MINUTE);
					int second = cal.get(Calendar.SECOND);

					// 서버에 저장할 파일이름 파일이름을 년 월 일 시 분 초 까지로
					covertuId = UUID.randomUUID().toString().replace("-", "")
							+ year + month + date + hour + minute + second;
					originalEx = file.getOriginalFilename().substring(
							file.getOriginalFilename().lastIndexOf(".") + 1);

					covertuId = covertuId + "." + originalEx;

					// 서버 파일 경로
					filePath = uploadPath + covertuId;
					file.transferTo(new File(filePath.replaceAll(" ", "")));

				}
			}
			System.out.println(fileName);
			if(covertuId.length() > 0){
				 System.out.println("파일있음실행");
				paramMap.put("fileName", fileName);
				paramMap.put("fileType", originalEx);
				paramMap.put("fileSize", fileSize);
				paramMap.put("fileUrl", covertuId);
				portfolioService.insertFile(paramMap);

				String shaHash = sha256.SHA256(covertuId);
				paramMap.put("shaHash", shaHash);
				portfolioService.shaHash(paramMap);
			}else{
				System.out.println("파일없음 실행");
				paramMap.put("fileName", nullpoint);
				paramMap.put("fileType", nullpoint);
				paramMap.put("fileSize", fileSize);
				paramMap.put("fileUrl", nullpoint);
				portfolioService.insertFile(paramMap);
				//return;
			}

			jsonOut.write("{\"result\":"
					+ JsonUtil.getJsonStringFromMap(paramMap)
					+ ",\"code\":1,\"url\":\"/index\"}");

			jsonOut.flush();
			// Json Output 종료
			jsonOut.close();
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	@RequestMapping(value = "/portfolioView/load")
	public ResponseEntity<byte[]> imageshow(HttpServletRequest request,
			ModelMap model) throws Exception {
		HttpSession session = request.getSession();
		request.setCharacterEncoding("UTF-8");

		String fileName = "";
		fileName = request.getParameter("file").toString();

		String uploadPath = fileUploadProperty
				.getProperty("file.uploadportfolio.path");

		InputStream in = null;
		ResponseEntity<byte[]> entity = null;

		if (fileName.equals("") || fileName == null) {
			return null;
		}

		try {
			/* 요청된 확장자를 제한할 수 있습니다. */
			/* 보안적인 요소를 더 추가할 수 있습니다. */
			/* 대용량을 다운로드 내보낼시 속도제어가 필요합니다. */

			HttpHeaders headers = new HttpHeaders();
			in = new FileInputStream(uploadPath + fileName);

			// 알려지지 않은 파일 타입.
			headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
			headers.add("Content-Disposition", "attatchment; filename=\""
					+ new String(fileName.getBytes("UTF-8"), "ISO-8859-1")
					+ "\"");

			entity = new ResponseEntity<byte[]>(IOUtils.toByteArray(in),
					headers, HttpStatus.CREATED);
		} catch (Exception e) {
			e.printStackTrace();
			entity = new ResponseEntity<byte[]>(HttpStatus.BAD_REQUEST);
		} finally {
			in.close();
		}

		return entity;
	}

	// 교수 찾기 리스트 구현
	@RequestMapping(value = "/findenter")
	public void findEnter(HttpServletRequest req, HttpServletResponse res,
			ModelMap mv) throws Exception {
		HttpSession session = req.getSession();
		// Json Output 객체 선언
		PrintWriter jsonOut = null;
		// Json Output 인코딩 설정
		res.setCharacterEncoding("UTF-8");
		res.setContentType("text/html; charset=UTF-8");
		// Json Output
		jsonOut = res.getWriter();

		String name = req.getParameter("name").toString();
		// req에서 name 입력받는다.

		HashMap<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("name", name);
		// paramMap에 req로 받은 name 값을 추가한다.

		List<HashMap<String, Object>> professorList = portfolioService
				.selectEnter(paramMap);
		// selectMapper 를 호출해서 List에 호출한다

		mv.addAttribute("enterList", professorList);

		System.out.println(professorList);

		if (professorList.size() > 0) {
			jsonOut.write("{\"result\":" + JsonUtil.getJsonStringFromMap(mv)
					+ ",\"code\":1,\"url\":\"/index\"}");
		} else {
			jsonOut.write("{\"result\":[],\"code\":0, \"msg\":\"일치하는 기업정보가 없습니다.\"}");
		}

		// model 에 professorList 를 저장한다

		jsonOut.flush();
		// Json Output 종료
		jsonOut.close();
	}

	// 교수 찾기 리스트 구현
	@RequestMapping(value = "/findProfessor")
	public void findProfessor(HttpServletRequest req, HttpServletResponse res,
			ModelMap mv) throws Exception {
		HttpSession session = req.getSession();
		// Json Output 객체 선언
		PrintWriter jsonOut = null;
		// Json Output 인코딩 설정
		res.setCharacterEncoding("UTF-8");
		res.setContentType("text/html; charset=UTF-8");
		// Json Output
		jsonOut = res.getWriter();

		HashMap<String, Object> paramMap = new HashMap<String, Object>();

		if (null != req.getParameter("name")
				&& !"".equals(req.getParameter("name"))) {
			String name = req.getParameter("name").toString();
			paramMap.put("name", name);
		}

		List<HashMap<String, Object>> professorList = portfolioService
				.selectProfessor(paramMap);

		mv.addAttribute("professorList", professorList);

		System.out.println(professorList);

		if (professorList.size() > 0) {
			jsonOut.write("{\"result\":" + JsonUtil.getJsonStringFromMap(mv)
					+ ",\"code\":1,\"url\":\"/index\"}");
		} else {
			jsonOut.write("{\"result\":[],\"code\":0, \"msg\":\"일치하는 회원정보가 없습니다.\"}");
		}

		// model 에 professorList 를 저장한다

		jsonOut.flush();
		// Json Output 종료
		jsonOut.close();
	}

	// 리더 찾기 리스트 구현
	@RequestMapping(value = { "/findLeader", "/findMember" })
	public void findLader(HttpServletRequest req, HttpServletResponse res, ModelMap mv) throws Exception {
		HttpSession session = req.getSession();
		// Json Output 객체 선언
		PrintWriter jsonOut = null;
		// Json Output 인코딩 설정
		res.setCharacterEncoding("UTF-8");
		res.setContentType("text/html; charset=UTF-8");
		// Json Output
		jsonOut = res.getWriter();
		String name = req.getParameter("name").toString();
		// req에서 name 입력받는다.

		HashMap<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("name", name);
		// paramMap에 req로 받은 name 값을 추가한다.

		List<HashMap<String, Object>> leaderList = portfolioService
				.selectLeader(paramMap);
		// selectLeader Mapper 를 호출해서 List에 호출한다

		mv.addAttribute("leaderList", leaderList);
		// model 에 leaderList를 저장한다

		jsonOut.write("{\"result\":" + JsonUtil.getJsonStringFromMap(mv)
				+ ",\"code\":1,\"url\":\"/index\"}");

		jsonOut.flush();
		// Json Output 종료
		jsonOut.close();
	}

	// 인덱스 리스트 출력 구현
	@RequestMapping(value = "/portfolioList")
	public void portfolioList(HttpServletRequest req, HttpServletResponse res,
			ModelMap mv) throws Exception {
		try {

			// Json Output 객체 선언
			PrintWriter jsonOut = null;
			// Json Output 인코딩 설정
			res.setCharacterEncoding("UTF-8");
			res.setContentType("text/html; charset=UTF-8");
			// Json Output
			jsonOut = res.getWriter();

			HttpSession session = req.getSession();
			Integer _user = null;
			Integer _professor = null;
			Integer _enterprise = null;
			Integer pageNo = null;

			String name = null;
			String content = null;
			String writer = null;
			String year = null;
			String month = null;
			String start_Date = null;
			String end_Date = null;
			String status = null;

			// users 의 session 값의 type 별로 _id 값을 주입받아 portfolios 의 디비값으로 각각 뿌려주는
			// if문
			if (req.getSession().getAttribute("type").equals("student")) {
				_user = Integer.parseInt(req.getSession().getAttribute("_id")
						.toString());
			}
			if (req.getSession().getAttribute("type").equals("professor")) {
				_professor = Integer.parseInt(req.getSession()
						.getAttribute("_id").toString());
			}
			if (req.getSession().getAttribute("type").equals("enterprise")) {
				_enterprise = Integer.parseInt(req.getSession()
						.getAttribute("_id").toString());
			}
			if (req.getParameter("name") != null) {
				name = req.getParameter("name").toString();
			}
			if (req.getParameter("content") != null) {
				content = req.getParameter("content").toString();
			}
			if (req.getParameter("writer") != null) {
				writer = req.getParameter("writer").toString();
			}
			if (req.getParameter("year") != null) {
				year = req.getParameter("year").toString();
			}
			if (req.getParameter("month") != null) {
				month = req.getParameter("month").toString();
			}
			if (req.getParameter("start_Date") != null) {
				start_Date = req.getParameter("start_Date").toString();
			}
			if (req.getParameter("end_Date") != null) {
				end_Date = req.getParameter("end_Date").toString();
			}
			if (req.getParameter("status") != null) {
				status = req.getParameter("status").toString();
			}

			HashMap<String, Object> paramMap = new HashMap<String, Object>();
			// portfolioService.xmllist(paramMap);

			paramMap.put("_user", _user);
			paramMap.put("_enterprise", _enterprise);
			paramMap.put("_professor", _professor);
			paramMap.put("name", name);
			paramMap.put("content", content);
			paramMap.put("writer", writer);
			paramMap.put("year", year);
			paramMap.put("month", month);
			paramMap.put("start_Date", start_Date);
			paramMap.put("end_Date", end_Date);
			paramMap.put("status", status);

			// jsp 단에서 num 값으로 입력받게해주면됨.
			// req로 입력받은 num 호출
			if (req.getParameter("pageNo") != null) {
				pageNo = Integer
						.parseInt(req.getParameter("pageNo").toString());
			} else {
				pageNo = 1;
			}
			// 게시물 총 갯수
			int count = portfolioService.countPortfolio(paramMap);
			System.out.println(count);
			// 한 페이지에 출력할 게시물 갯수
			int postNum = 8;
			// 하단 페이징 번호 ([ 게시물 총 갯수 / 한 페이지에 출력할 갯수 ] 의 올림)
			int pageNum = (int) Math.ceil((double) count / postNum);
			// 츨력할 게시물
			int displayPost = (pageNo - 1) * postNum;

			paramMap.put("pageNum", pageNum);
			paramMap.put("displayPost", displayPost);
			paramMap.put("postNum", postNum);

			int countEvaluation = portfolioService.countEvaluation(paramMap);
			int countDone = portfolioService.countDone(paramMap);
			int countWait = portfolioService.countWait(paramMap);
			int countComplain = portfolioService.countComplain(paramMap);

			List<Map<String, Object>> resultList = portfolioService
					.selectPortfolio(paramMap);

			jsonOut.write("{\"result\":"
					+ JsonUtil.getJsonArrayFromList(resultList)
					+ ",\"code\":1,\"pageNum\":" + pageNum
					+ ",\"countEvaluation\":" + countEvaluation
					+ ",\"countComplain\":" + countComplain + ",\"countWait\":"
					+ countWait + ",\"countDone\":" + countDone + ",\"count\":"
					+ count + ",\"url\":\"/index\"}");

			jsonOut.flush();
			// Json Output 종료
			jsonOut.close();

		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	// 상세 정보 보기 구현
	@RequestMapping(value = "/portfolioView")
	public void portfolioView(HttpServletRequest req, HttpServletResponse res,
			ModelMap mv) throws Exception {
		try {
			HttpSession session = req.getSession();
			PrintWriter jsonOut = null;
			res.setCharacterEncoding("UTF-8");
			res.setContentType("text/html; charset=UTF-8");
			jsonOut = res.getWriter();

			String portfolioId = req.getParameter("no").toString();

			HashMap<String, Object> paramMap = new HashMap<String, Object>();
			paramMap.put("portfolioId", portfolioId);

			List<Map<String, Object>> resultList = portfolioService
					.selectView(paramMap);

			List<Map<String, Object>> userList = portfolioService
					.selectViewGroup(paramMap);

			List<Map<String, Object>> enterList = portfolioService
					.selectViewEnter(paramMap);

			mv.addAttribute("resultList", resultList);
			mv.addAttribute("userList", userList);
			mv.addAttribute("enterList", enterList);

			System.out.println(resultList);

			jsonOut.write("{\"result\":" + JsonUtil.getJsonStringFromMap(mv)
					+ ",\"code\":1,\"url\":\"/index\"}");

			jsonOut.flush();
			// Json Output 종료
			jsonOut.close();

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	// 수정페이지 입력 구현
	@RequestMapping(value = "/portfolioEditReq")
	public void portfolioEditReq(HttpServletRequest req,
			HttpServletResponse res, ModelMap mv) throws Exception {
		try {
			// Json Output 객체 선언
			PrintWriter jsonOut = null;
			// Json Output 인코딩 설정
			res.setCharacterEncoding("UTF-8");
			res.setContentType("text/html; charset=UTF-8");
			// Json Output
			jsonOut = res.getWriter();
			HttpSession session = req.getSession();
			int portfolioId = Integer.parseInt(req.getParameter("no")
					.toString());
			String status = req.getParameter("status").toString();

			HashMap<String, Object> paramMap = new HashMap<String, Object>();
			

			// 글 작성 구현
			if(req.getSession().getAttribute("permission").equals("admin")) {
				int _user = Integer.parseInt(req.getParameter("_id").toString());
				paramMap.put("_user", _user);
			}else {
				int _user = Integer.parseInt(req.getSession().getAttribute("_id").toString());
				paramMap.put("_user", _user);
			}
			int _professor = Integer.parseInt(req.getParameter("_professor")
					.toString());
			String name = req.getParameter("name").toString();
			String type = req.getParameter("type").toString();
			// 초기 작성글이기 때문에 view에서 hidden 값으로 초기 evaluation 설정함
			String startDate = req.getParameter("startDate").toString();
			String endDate = req.getParameter("endDate").toString();

			String link = null;
			String content = null;
			int _leader = 0;

			// link 값이 null이 아니면 link 값 변수에 입력
			if (req.getParameter("link").toString() != null) {
				link = req.getParameter("link").toString();
			}
			// content 값이 null이 아니면 content 값 변수에 입력
			if (req.getParameter("content") != null) {
				content = req.getParameter("content").toString().replace("&amp;", "&")
						.replace("&lt;", "<").replace("&gt;", ">").replace("&nbsp;", " ");
			}
			new Exception();

			// 리더 값이 없으면 입력한 자신이 리더 변수에 추가 아니면 _leader 값이 변수에 입력.

			if (req.getParameter("_leader") == null
					|| req.getParameter("_leader").equals("")) {
				_leader = Integer.parseInt(req.getSession().getAttribute("_id")
						.toString());
			} else {
				_leader = Integer.parseInt(req.getParameter("_leader")
						.toString());
			}

			paramMap.put("portfolioId", portfolioId);
			
			paramMap.put("_professor", _professor);
			paramMap.put("_leader", _leader);
			paramMap.put("name", name);
			paramMap.put("type", type);
			paramMap.put("status", status);
			paramMap.put("startDate", startDate);
			paramMap.put("endDate", endDate);
			paramMap.put("link", link);
			paramMap.put("content", content);

			paramMap.put("portfolio", portfolioId);
			portfolioService.deletePortfolioMember(paramMap);
			if (null != req.getParameter("member")
					&& !"".equals(req.getParameter("member"))) {
				String arr[] = req.getParameter("member").split("\\|");
				for (int i = 0; i < arr.length; i++) {
					paramMap.put("member", arr[i]);
					portfolioService.insertPortfolioMember(paramMap);
				}
			}

			portfolioService.updatePortfolio(paramMap);

			jsonOut.write("{\"result\":"
					+ JsonUtil.getJsonStringFromMap(paramMap)
					+ ",\"code\":1,\"url\":\"/index\"}");

			jsonOut.flush();
			// Json Output 종료
			jsonOut.close();

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@RequestMapping(value = "/portfolioEditStatus")
	public void portfolioEditStatus(HttpServletRequest req, HttpServletResponse res, ModelMap mv) throws Exception {
		try {
			// Json Output 객체 선언
			PrintWriter jsonOut = null;
			// Json Output 인코딩 설정
			res.setCharacterEncoding("UTF-8");
			res.setContentType("text/html; charset=UTF-8");
			// Json Output
			jsonOut = res.getWriter();
			HttpSession session = req.getSession();
			HashMap<String, Object> paramMap = new HashMap<String, Object>();

			int portfolioId = Integer.parseInt(req.getParameter("no")	.toString());
			String status = req.getParameter("status").toString();
			String score = req.getParameter("score").toString();
			
			System.out.println(req.getParameter("answer"));
			if (null != req.getParameter("answer") && !"".equals(req.getParameter("answer"))) {
				String answer = req.getParameter("answer").toString();
				paramMap.put("answer", answer);
			}
			if (null != req.getParameter("complain")	&& !"".equals(req.getParameter("complain"))) {
				String complain = req.getParameter("complain");
				paramMap.put("complain", complain);
			}
			
			paramMap.put("portfolioId", portfolioId);
			paramMap.put("status", status);
			paramMap.put("score", score);

			portfolioService.updateStatus(paramMap);


			jsonOut.write("{\"result\":"+ JsonUtil.getJsonStringFromMap(paramMap)+ ",\"code\":1,\"url\":\"/index\"}");

			jsonOut.flush();
			// Json Output 종료
			jsonOut.close();

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@RequestMapping(value = "/portfoliocomplete")
	public void portfoliocomplete(HttpServletRequest req,
			HttpServletResponse res, ModelMap mv) throws Exception {
		try {
			HttpSession session = req.getSession();
			HashMap<String, Object> paramMap = new HashMap<String, Object>();

			int portfolioId = Integer.parseInt(req.getParameter("no")
					.toString());
			paramMap.put("_portfolio", portfolioId);
			portfolioService.deletecomplete(paramMap);
			System.out.println(portfolioId);

			String arr[] = req.getParameter("enter").split("\\|");
			for (int i = 0; i < arr.length; i++) {
				paramMap.put("enter", arr[i]);
				portfolioService.updatecomplete(paramMap);
			}

			// Json Output 객체 선언
			PrintWriter jsonOut = null;
			// Json Output 인코딩 설정
			res.setCharacterEncoding("UTF-8");
			res.setContentType("text/html; charset=UTF-8");
			// Json Output
			jsonOut = res.getWriter();

			jsonOut.write("{\"result\":"
					+ JsonUtil.getJsonStringFromMap(paramMap)
					+ ",\"code\":1,\"url\":\"/index\"}");

			jsonOut.flush();
			// Json Output 종료
			jsonOut.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	

	@RequestMapping(value = "/deletePortfolio")
	public void deletePortfolio(HttpServletRequest req,
			HttpServletResponse res, ModelMap mv) throws Exception {

		try {
			// Json Output 객체 선언
			PrintWriter jsonOut = null;
			// Json Output 인코딩 설정
			res.setCharacterEncoding("UTF-8");
			res.setContentType("text/html; charset=UTF-8");
			// Json Output
			jsonOut = res.getWriter();

			HttpSession session = req.getSession();
			HashMap<String, Object> paramMap = new HashMap<String, Object>();

			int _id = Integer.parseInt(req.getParameter("no").toString());
			paramMap.put("_id", _id);

			portfolioService.deletePortfolio(paramMap);

			jsonOut.write("{\"result\":[],\"code\":1, \"msg\":\"게시글이 삭제되었습니다.\"}");

			jsonOut.flush();
			// Json Output 종료
			jsonOut.close();

		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	@RequestMapping(value="/deleteSha")
	public void deleteSha (HttpServletRequest req, HttpServletResponse res) throws Exception {
		try {
			// Json Output 객체 선언
			PrintWriter jsonOut = null;
			// Json Output 인코딩 설정
			res.setCharacterEncoding("UTF-8");
			res.setContentType("text/html; charset=UTF-8");
			// Json Output
			jsonOut = res.getWriter();

			HttpSession session = req.getSession();
			HashMap<String, Object> paramMap = new HashMap<String, Object>();

			int portfolioId = Integer.parseInt(req.getParameter("no")	.toString());
			paramMap.put("portfolioId", portfolioId);
			
			portfolioService.deleteSha(paramMap);

			jsonOut.write("{\"result\":[],\"code\":1, \"msg\":\"sha 삭제되었습니다.\"}");

			jsonOut.flush();
			// Json Output 종료
			jsonOut.close();

		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	// 파일 sha검증
	@RequestMapping(value="/shaVerifi")
	public void shaVerifi( HttpServletRequest req, HttpServletResponse res) throws Exception {
		try {
			// Json Output 객체 선언
			PrintWriter jsonOut = null;
			// Json Output 인코딩 설정
			res.setCharacterEncoding("UTF-8");
			res.setContentType("text/html; charset=UTF-8");
			// Json Output
			jsonOut = res.getWriter();

			HttpSession session = req.getSession();
			HashMap<String, Object> paramMap = new HashMap<String, Object>();

			int portfolioId = Integer.parseInt(req.getParameter("no")	.toString());
			paramMap.put("portfolioId", portfolioId);
			
			
			String shaHash = req.getParameter("shaHash").toString();
			String fileUrl = req.getParameter("fileUrl").toString();
			String verifi = sha256.SHA256(fileUrl);
			
			if (shaHash.equals(verifi)) {
				jsonOut.write("{\"result\":[],\"code\":1, \"msg\":\"일치\"}");
			}else {
				jsonOut.write("{\"result\":[],\"code\":0, \"msg\":\"불일치.\"}");
			}

			jsonOut.flush();
			// Json Output 종료
			jsonOut.close();

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
