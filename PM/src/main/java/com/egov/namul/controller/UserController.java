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
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.egov.namul.service.UserService;
import com.egov.namul.util.JsonUtil;
import com.egov.namul.util.MailUtil;
import com.egov.namul.vo.UserVO;


@Controller
@ResponseBody
@RequestMapping(value = "/user")
public class UserController {
	
	@Resource(name = "UserService")
	private UserService userService;
	@Resource(name = "fileUploadProperty")
	Properties fileUploadProperty;
	
	@RequestMapping(value = "/login")
	public void login(HttpServletRequest request, HttpServletResponse response, UserVO vo) throws Exception{
		
		try{
		HttpSession session = request.getSession();
		vo.setPassword(request.getParameter("password"));
		vo.setIdentifier(request.getParameter("identifier"));
		
		List<Map<String, Object>> data = userService.loginUser(vo);
		
		// Json Output 객체 선언
		PrintWriter jsonOut = null;
		// Json Output 인코딩 설정  
		response.setCharacterEncoding("UTF-8");
		response.setContentType("text/html; charset=UTF-8");
		// Json Output
		jsonOut = response.getWriter();
		
		if(data.size() > 0){
			vo = userService.selectUser(vo);
			session.setAttribute("_id", vo.get_id());
			session.setAttribute("_profile", vo.get_profile());
			session.setAttribute("identifier", vo.getIdentifier());
			session.setAttribute("type", vo.getType());
			session.setAttribute("password", vo.getPassword());
			session.setAttribute("name", vo.getName());
			session.setAttribute("birth", vo.getBirth());
			session.setAttribute("gender", vo.getGender());
			session.setAttribute("phone", vo.getPhone());
			session.setAttribute("email", vo.getEmail());
			session.setAttribute("university", vo.getUniversity());
			session.setAttribute("universityMajor", vo.getUniversityMajor());
			session.setAttribute("universityNumber", vo.getUniversityNumber());
			session.setAttribute("createdAt", vo.getCreatedAt());
			session.setAttribute("updatedAt", vo.getUpdatedAt());
			session.setAttribute("deletedAt", vo.getDeletedAt());
			
			// remember me 구현
			if(request.getParameter("rememberMe") == null) {
				session.setMaxInactiveInterval(3600);
			}else {
				session.setMaxInactiveInterval(60*60*24*7);
			}
			
			jsonOut.write("{\"result\":"+JsonUtil.getJsonStringFromList(data)+",\"code\":1,\"url\":\"/index\"}");
		}else{
			jsonOut.write("{\"result\":[],\"code\":0, \"msg\":\"Please check your ID or Password\"}");
		}
		jsonOut.flush();
		// Json Output 종료
		jsonOut.close();
		}catch (Exception e) {
			e.printStackTrace();
		}
	}

	// 로그아웃 구현
	@RequestMapping(value="/logout")
    public void logout(HttpServletResponse response,  HttpSession session) throws Exception {
		
		// Json Output 객체 선언
		PrintWriter jsonOut = null;
		// Json Output 인코딩 설정  
		response.setCharacterEncoding("UTF-8");
		response.setContentType("text/html; charset=UTF-8");
		// Json Output
		jsonOut = response.getWriter();
		
        session.invalidate();
        
        jsonOut.write("{\"result\":[],\"code\":0, \"msg\":\"로그아웃되었습니다.\", \"url\":\"/home\"}");
        
        jsonOut.flush();
		// Json Output 종료
		jsonOut.close();
    }
	
	// 회원가입 데이터 입력 post 
	@RequestMapping(value ="/insetRegister")
	public  void postRegister(HttpServletRequest req, HttpServletResponse res, ModelMap mm) throws Exception {
		
		try{		
			HttpSession session = req.getSession();
			// Json Output 객체 선언
			PrintWriter jsonOut = null;
			// Json Output 인코딩 설정  
			res.setCharacterEncoding("UTF-8");
			res.setContentType("text/html; charset=UTF-8");
			// Json Output
			jsonOut = res.getWriter();
			
			HashMap<String, Object> paramMap = new HashMap<String, Object>();
			
			String identifier = req.getParameter("identifier").toString();
			paramMap.put("identifier", identifier);
			String type = req.getParameter("type").toString();
			paramMap.put("type", type);		
			String name = req.getParameter("name").toString();
			paramMap.put("name", name);
			String password = req.getParameter("password").toString();
			paramMap.put("password", password);	
			String rePassword = req.getParameter("rePassword").toString();
			
			/*
			if(!req.getParameter("_profile").equals(null) && !req.getParameter("_profile").equals("")) {
				String _profile = req.getParameter("_profile").toString();
				paramMap.put("_profile", _profile);	
			}
			*/
			if(!req.getParameter("birth").equals(null) && !req.getParameter("birth").equals("")) {
				String birth = req.getParameter("birth").toString();
				paramMap.put("birth", birth);		
			}
			if(!req.getParameter("gender").equals(null) && !req.getParameter("gender").equals("")) {
				String gender = req.getParameter("gender").toString();
				paramMap.put("gender", gender);	
			}  
			if(!req.getParameter("phone").equals(null) && !req.getParameter("phone").equals("")) {
				String phone = req.getParameter("phone").toString();
				paramMap.put("phone", phone);	
			}
			if(!req.getParameter("email").equals(null) && !req.getParameter("email").equals("")) {
				String email = req.getParameter("email").toString();
				paramMap.put("email", email);	
			}
			if(!req.getParameter("university").equals(null) && !req.getParameter("university").equals("")) {
				String university = req.getParameter("university").toString();
				paramMap.put("university", university);	
			}
			if(!req.getParameter("universityMajor").equals(null) && !req.getParameter("universityMajor").equals("")) {
				String universityMajor = req.getParameter("universityMajor").toString();
				paramMap.put("universityMajor", universityMajor);	
			}
			if(!req.getParameter("universityNumber").equals(null) && !req.getParameter("universityNumber").equals("")) {
				String universityNumber = req.getParameter("universityNumber").toString();
				paramMap.put("universityNumber", universityNumber);
			}
				
			
			if(!password.equals(rePassword)) {
				jsonOut.write("{\"result\":[],\"code\":0, \"msg\":\"password가 일치하지 않습니다. 다시 확인해주세요.\"}");
			}else {
				userService.register(paramMap);
				jsonOut.write("{\"result\":"+JsonUtil.getJsonStringFromMap(paramMap)+",\"code\":1,\"url\":\"/home\"}");
			}
			
			jsonOut.flush();
			// Json Output 종료
			jsonOut.close();
			
		}catch(Exception e) { 
			e.printStackTrace();
		}
			
	}
		
	@RequestMapping(value="myEditReq")
	public void myEditReq(HttpServletRequest req,HttpServletResponse res, ModelMap mv) throws Exception {
		
		try{
			HttpSession session = req.getSession();
			// Json Output 객체 선언
			PrintWriter jsonOut = null;
			// Json Output 인코딩 설정  
			res.setCharacterEncoding("UTF-8");
			res.setContentType("text/html; charset=UTF-8");
			// Json Output
			jsonOut = res.getWriter();
			
			HashMap<String, Object> paramMap = new HashMap<String, Object>();
			
			String birth = null;
			String gender = null;
			String phone = null;
			String email = null;
			String university = null;
			String universityMajor = null;
			String universityNumber = null;
			
			int _id = Integer.parseInt(req.getSession().getAttribute("_id").toString());
			String password = String.valueOf(req.getParameter("password"));
			String rePassword = req.getParameter("rePassword").toString();
			String name = String.valueOf(req.getParameter("name"));
			
			if (req.getParameter("birth").toString() != null){
				birth = String.valueOf(req.getParameter("birth"));
			}
			if (req.getParameter("gender").toString() != null){
				gender = String.valueOf(req.getParameter("gender"));
			}
			if (req.getParameter("phone").toString() != null){
				phone = String.valueOf(req.getParameter("phone"));
			}
			if (req.getParameter("email").toString() != null){
				email = String.valueOf(req.getParameter("email"));
			}
			if (req.getParameter("university").toString() != null){
				university = String.valueOf(req.getParameter("university"));
			}
			if (req.getParameter("universityMajor").toString() != null){
				universityMajor = String.valueOf(req.getParameter("universityMajor"));
			}
			if (req.getParameter("universityNumber").toString() != null){
				universityNumber = String.valueOf(req.getParameter("universityNumber"));
			}
			
			if(!password.equals(rePassword)) {
				jsonOut.write("{\"result\":[],\"code\":0, \"msg\":\"password가 일치하지 않습니다. 다시 확인해주세요.\"}");
			}else {
			
				
	
				paramMap.put("_id", _id);
				paramMap.put("password", password);
				paramMap.put("name", name);
				paramMap.put("birth", birth);
				paramMap.put("gender", gender);
				paramMap.put("phone", phone);
				paramMap.put("email", email);
				paramMap.put("university", university);
				paramMap.put("universityMajor", universityMajor);
				paramMap.put("universityNumber", universityNumber);
				// Mapper 에서 updatedAt 만 now()로 추가 설정 createdAt 은 빼고 
				
				userService.userUpdate(paramMap);		
				
				jsonOut.write("{\"result\":"+JsonUtil.getJsonStringFromMap(paramMap)+",\"code\":1,\"url\":\"/index\"}");
			}
			
			jsonOut.flush();
			// Json Output 종료
			jsonOut.close();
		
		}catch(Exception e) {
			e.printStackTrace();
		}
	}
	
	@RequestMapping(value="/findId")
	public void findId(HttpServletRequest req, HttpServletResponse res)throws Exception {
		try{
			HttpSession session = req.getSession();
			// Json Output 객체 선언
			PrintWriter jsonOut = null;
			// Json Output 인코딩 설정  
			res.setCharacterEncoding("UTF-8");
			res.setContentType("text/html; charset=UTF-8");
			// Json Output
			jsonOut = res.getWriter();
			
			String name = req.getParameter("name").toString();
			String phone = req.getParameter("phone").toString();
			String birth = req.getParameter("birth").toString();
			String byear="";
			String bmonth="";
			String bday="";
			
			if(birth.length() == 8) {
				byear = birth.substring(0,4);
				bmonth = birth.substring(4,6);
				bday = birth.substring(6,8);
			}
			
			birth = (byear+"-"+bmonth+"-"+bday);
			
			
			HashMap<String, Object> paramMap = new HashMap<String, Object>();
			
			paramMap.put("name", name);
			paramMap.put("phone", phone);
			paramMap.put("birth", birth);
			
			
			String find_id = userService.find_id(paramMap);		
			
			paramMap.put("find_id", find_id);
			
			if(find_id == null) {
				jsonOut.write("{\"result\":[],\"code\":0, \"msg\":\"일치하는 회원정보가 없습니다.\"}");
			}else{
				jsonOut.write("{\"result\":"+JsonUtil.getJsonStringFromMap(paramMap)+",\"code\":1,\"url\":\"/login\"}");
				
			}
			
			jsonOut.flush();
			// Json Output 종료
			jsonOut.close();
		}catch(Exception e){
			e.printStackTrace();
		}
	}

	// 비밀번호 찾기 구현  회원 대조 and 비밀번호 암호화 and mail send
	@RequestMapping(value = "/findpw")
	public void findPwPOST(HttpServletRequest req, HttpServletResponse res) throws Exception{
		
		try{
			HttpSession session = req.getSession();
			// Json Output 객체 선언
			PrintWriter jsonOut = null;
			// Json Output 인코딩 설정  
			res.setCharacterEncoding("UTF-8");
			res.setContentType("text/html; charset=UTF-8");
			// Json Output
			jsonOut = res.getWriter();
			
			
			HashMap<String, Object> paramMap = new HashMap<String, Object>();
			
			String identifier = req.getParameter("identifier").toString();
			String email = req.getParameter("email").toString();
			String phone = req.getParameter("phone").toString();
			
			paramMap.put("identifier", identifier);
			paramMap.put("email", email);
			paramMap.put("phone", phone);
			
			String checkId = userService.checkId(paramMap);
			
			paramMap.put("checkId", checkId);
		
			if(checkId == null){
				jsonOut.write("{\"result\":[],\"code\":0, \"msg\":\"일치하는 회원정보가 없습니다. 다시 확인해주세요\"}");
			}else{
				// 임시 비밀번호 생성
				 char[] charSet = new char[] { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F',
			                'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' };
				
				String password ="";
				int idx = 0;
				for (int i = 0; i< 10; i++) {
					idx = (int) (charSet.length * Math.random());
					password += charSet[idx];
				}
				paramMap.put("password", password);
				int _id = Integer.parseInt(checkId);
				
				paramMap.put("_id", _id);
								
				// email 전송 구현
				MailUtil mail = new MailUtil();
				mail.sendMail(paramMap);
				
				userService.emailPw(paramMap);
				
				jsonOut.write("{\"result\":"+JsonUtil.getJsonStringFromMap(paramMap)+",\"code\":1,\"url\":\"/login\"}");
			}

			jsonOut.flush();
			// Json Output 종료
			jsonOut.close();
		}catch(Exception e) {
			e.printStackTrace();
		}
	}
	
	@RequestMapping(value="uploadFile")
	public void uploadFile(MultipartHttpServletRequest mreq, HttpServletResponse res, ModelMap mv) throws Exception {
		HttpSession session = mreq.getSession();
		// Json Output 객체 선언
		PrintWriter jsonOut = null;
		// Json Output 인코딩 설정  
		res.setCharacterEncoding("UTF-8");
		res.setContentType("text/html; charset=UTF-8");
		// Json Output
		jsonOut = res.getWriter();
		
		HashMap<String, Object> paramMap = new HashMap<String, Object>();
		
		String identifier = mreq.getParameter("identifier");
		
		// file upload 구현
		String covertuId = "";
		String uploadPath = fileUploadProperty.getProperty("file.uploadportfolio.path");
		String originalEx ="";
		String filePath ="";
		int fileSize=0;
		String nullpoint  = null;
		
		final Map<String, MultipartFile> files = mreq.getFileMap();
		
		File saveFolder = new File(uploadPath);
		if(!saveFolder.exists()||saveFolder.isFile()) {
			saveFolder.mkdirs();
		}
		Iterator<Entry<String, MultipartFile>> itr = files.entrySet().iterator();
		MultipartFile file;
		
		while(itr.hasNext()) {
			Entry<String, MultipartFile> entry = itr.next();
			file = entry.getValue();
			
			if(!"".equals(file.getOriginalFilename())) {
				fileSize = Math.toIntExact(file.getSize());
				int maxSize= 10* 1024 * 1024;
				if(fileSize > maxSize) {
					// json 출력문으로 변환해야할것!
				}
				
				
				Calendar cal = Calendar.getInstance();
				 
				int year = cal.get(Calendar.YEAR);
				int month = cal.get(Calendar.MONTH)+1;
				int date = cal.get(Calendar.DATE);
				int hour = cal.get(Calendar.HOUR_OF_DAY);
				int minute = cal.get(Calendar.MINUTE);
				int second  = cal.get(Calendar.SECOND);
				 
				// 서버에 저장할 파일이름 파일이름을 년 월 일 시 분 초 까지로 
				covertuId = UUID.randomUUID().toString().replace("-", "")+year+month+date+hour + minute+ second;
				originalEx = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf(".")+1); 
				
				covertuId = covertuId+"."+originalEx;
				 
				//서버 파일 경로
				filePath = uploadPath+covertuId;
				file.transferTo(new File(filePath.replaceAll(" ","")));
				
			}					 
		}
		
		if(covertuId.length() > 0){
			System.out.println("if 실행");
			paramMap.put("fileUrl", covertuId);
			paramMap.put("identifier", identifier);
			userService.insertProfile(paramMap);
		}else{
			System.out.println("else 실행");
			paramMap.put("fileUrl", nullpoint);
			paramMap.put("identifier", identifier);
			userService.insertProfile(paramMap);
			//return;
		}
		
		System.out.println(paramMap);
		
		jsonOut.write("{\"result\":"+JsonUtil.getJsonStringFromMap(paramMap)+",\"code\":1,\"url\":\"/index\"}");
		
		jsonOut.flush();
		// Json Output 종료
		jsonOut.close();
				
	}
	// 파일 보기/ 다운로드 구현
	@RequestMapping(value = "/profileView/load")
	 public ResponseEntity<byte[]> imageshow(HttpServletRequest request, ModelMap model) throws Exception {
		 HttpSession session = request.getSession();
	    request.setCharacterEncoding("UTF-8");
	    
	    String fileName="";
	    fileName=request.getParameter("file").toString();
	    
        String uploadPath = fileUploadProperty.getProperty("file.uploadprofile.path");
   
        InputStream in = null;
        ResponseEntity<byte[]> entity = null;
        
        if(fileName.equals("")||fileName==null){
        	return null;
        }
        
        try {
            /*요청된 확장자를 제한할 수 있습니다.*/
        	/*보안적인 요소를 더 추가할 수 있습니다.*/
        	/*대용량을 다운로드 내보낼시 속도제어가 필요합니다.*/
        
            HttpHeaders headers = new HttpHeaders();
            in = new FileInputStream(uploadPath + fileName);

            //알려지지 않은 파일 타입.
            headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
            headers.add("Content-Disposition", "attatchment; filename=\"" + 
                    new String(fileName.getBytes("UTF-8"), "ISO-8859-1") + 
                    "\"");
             
            entity = new ResponseEntity<byte[]>(IOUtils.toByteArray(in), headers, HttpStatus.CREATED);
        } catch(Exception e) {
            e.printStackTrace();
            entity = new ResponseEntity<byte[]>(HttpStatus.BAD_REQUEST);
        } finally {
            in.close();
        }
        
        return entity;
    }
		
	 @RequestMapping(value="/userfind")
	 public void findUser(HttpServletRequest req, HttpServletResponse res, ModelMap mv) throws Exception{
		 try{
			 HttpSession session = req.getSession();
			 // Json Output 객체 선언
			 PrintWriter jsonOut = null;
			 // Json Output 인코딩 설정  
			 res.setCharacterEncoding("UTF-8");
			 res.setContentType("text/html; charset=UTF-8");
			 // Json Output
			 jsonOut = res.getWriter();
		 	
		 	 HashMap<String, Object> paramMap = new HashMap<String, Object>();
			
			 String _id = session.getAttribute("_id").toString();
			 //String _id = req.getParameter("no").toString();
			 paramMap.put("_id", _id);
			
		 	 HashMap<String, Object> data = userService.findUser(paramMap);
		 	 paramMap.put("data",data);
			
			 jsonOut.write("{\"result\":"+JsonUtil.getJsonStringFromMap(paramMap)+",\"code\":1,\"url\":\"/index\"}");
			
			 jsonOut.flush();
			 // Json Output 종료
			 jsonOut.close();
		 }catch(Exception e){
			 e.printStackTrace();
		 }
	 }
	 
	 
	@RequestMapping(value="/noneProfile")
	public void noneProfile (HttpServletRequest req, HttpServletResponse res) throws Exception{
		 try{
			 HttpSession session = req.getSession();
			 // Json Output 객체 선언
			 PrintWriter jsonOut = null;
			 // Json Output 인코딩 설정  
			 res.setCharacterEncoding("UTF-8");
			 res.setContentType("text/html; charset=UTF-8");
			 // Json Output
			 jsonOut = res.getWriter();
		 	
		 	 HashMap<String, Object> paramMap = new HashMap<String, Object>();
			
		 	 int _id = Integer.parseInt(req.getSession().getAttribute("_id").toString());
		 	 paramMap.put("_id", _id);
	 	 	
		 	 userService.noneProfile(paramMap);
			
			 jsonOut.write("{\"result\":"+JsonUtil.getJsonStringFromMap(paramMap)+",\"code\":1,\"url\":\"/index\"}");
			
			 jsonOut.flush();
			 // Json Output 종료
			 jsonOut.close();
		 }catch(Exception e){
			 e.printStackTrace();
		 }
	}
}
