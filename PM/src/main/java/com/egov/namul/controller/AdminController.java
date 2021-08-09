package com.egov.namul.controller;

import java.io.PrintWriter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

import com.egov.namul.service.AdminService;
import com.egov.namul.util.JsonUtil;
import com.egov.namul.vo.AdminVO;

@Controller
@RequestMapping(value="/admin")
public class AdminController {
	
	@Resource(name = "AdminService")
	private AdminService adminService;
	
	@Resource(name = "fileUploadProperty")
	Properties fileUploadProperty;
	
	@RequestMapping(value="/login")
	public void login(HttpServletRequest request, HttpServletResponse response, AdminVO vo) throws Exception{
		
		try{
		HttpSession session = request.getSession();
		vo.setPassword(request.getParameter("password"));
		vo.setIdentifier(request.getParameter("identifier"));
		
		List<Map<String, Object>> data = adminService.loginAdmin(vo);
		
		// Json Output 객체 선언
		PrintWriter jsonOut = null;
		// Json Output 인코딩 설정  
		response.setCharacterEncoding("UTF-8");
		response.setContentType("text/html; charset=UTF-8");
		// Json Output
		jsonOut = response.getWriter();
		
		System.out.println(data);
		if(data.size() > 0){
			vo = adminService.selectAdmin(vo);
			session.setAttribute("_id", vo.get_id());
			session.setAttribute("_profile", vo.get_profile());
			session.setAttribute("identifier", vo.getIdentifier());
			session.setAttribute("password", vo.getPassword());
			session.setAttribute("name", vo.getName());
			session.setAttribute("permission", vo.getPermission());
			session.setAttribute("position", vo.getPosition());
			session.setAttribute("resign", vo.getResign());
			session.setAttribute("createdAt", vo.getCreatedAt());
			session.setAttribute("updatedAt", vo.getUpdatedAt());
			session.setAttribute("deletedAt", vo.getDeletedAt());
			
			session.setMaxInactiveInterval(3600);
			
			jsonOut.write("{\"result\":"+JsonUtil.getJsonStringFromList(data)+",\"code\":1,\"url\":\"/admin_index\"}");
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
    public void logout(HttpServletResponse res,  HttpSession session) throws Exception {
		
		// Json Output 객체 선언
		PrintWriter jsonOut = null;
		// Json Output 인코딩 설정  
		res.setCharacterEncoding("UTF-8");
		res.setContentType("text/html; charset=UTF-8");
		// Json Output
		jsonOut = res.getWriter();
		
        session.invalidate();
        
        jsonOut.write("{\"result\":[],\"code\":0, \"msg\":\"로그아웃되었습니다.\", \"url\":\"/admin_login\"}");
        
        jsonOut.flush();
		// Json Output 종료
		jsonOut.close();
    }
	
	@RequestMapping(value="/listMapping")
	public void listMapping(HttpServletRequest req, HttpServletResponse res, ModelMap mv) throws Exception {
		
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
			
			if (req.getParameter("type").equals("professor")) {
				String type="professor";
				paramMap.put("type", type);
			}else if(req.getParameter("type").equals("enterprise")) {
				String type="enterprise";
				paramMap.put("type", type);
			}else {
				String type="student";
				paramMap.put("type", type);
			}
			
			// 검색식 name값 받아와야함  input type="hidden" 
			if (!req.getParameter("name").equals(null) && !req.getParameter("name").equals("")) {
				String name = req.getParameter("name");
				paramMap.put("name", name);
			}
			
			// 페이지 카운트
			int pageNo =1;
			if(req.getParameter("pageNo") != null) {
				pageNo =Integer.parseInt(req.getParameter("pageNo").toString());
			}
			int count = adminService.countList(paramMap);
			int postNum = Integer.parseInt(req.getParameter("postNum"));
			int pageNum = (int)Math.ceil((double)count/postNum);
			int displayPost = (pageNo -1) * postNum;
			
			paramMap.put("pageNum", pageNum);
			paramMap.put("displayPost", displayPost);
			paramMap.put("postNum", postNum);
			
			
			List<Map<String, Object>> resultList = adminService.listMapping(paramMap);
			
			System.out.println(resultList);
	        
			jsonOut.write("{\"result\":"+JsonUtil.getJsonArrayFromList(resultList)+",\"code\":1,\"pageNum\":"+pageNum+",\"count\":"+count+",\"url\":\"/admin_index\"}");
	        
	        jsonOut.flush();
			// Json Output 종료
			jsonOut.close();
			
		}catch(Exception e){
			e.printStackTrace();
		}
	}
	
	@RequestMapping(value="/userView")
	public void userView (HttpServletRequest req, HttpServletResponse res) throws Exception {
		try{
			PrintWriter jsonOut =null;
			res.setCharacterEncoding("UTF-8");
			res.setContentType("text/html; charset=UTF-8");
			jsonOut = res.getWriter();
			HashMap<String, Object> paramMap = new HashMap<String, Object>();
			
			
			String type = req.getParameter("type");
			paramMap.put("type", type);
		
			String _id = req.getParameter("_id");
			paramMap.put("_id", _id);
			
			HashMap<String, Object> data = adminService.userView(paramMap);
			paramMap.put("data", data);
			
			jsonOut.write("{\"result\":"+JsonUtil.getJsonStringFromMap(paramMap)+",\"code\":1,\"url\":\"/admin_index\"}");
	        jsonOut.flush();
			jsonOut.close();
			
		}catch(Exception e){
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
			
			String _id = req.getParameter("_id");
			paramMap.put("_id", _id);
			if (!req.getParameter("name").equals("") && !req.getParameter("name").equals(null)){
				String name = req.getParameter("name");
				paramMap.put("name", name);
			}
			if (!req.getParameter("birth").equals("") && !req.getParameter("birth").equals(null)){
				String birth = req.getParameter("birth");
				paramMap.put("birth", birth);
			}
			if (!req.getParameter("gender").equals("") && !req.getParameter("gender").equals(null)){
				String gender = req.getParameter("gender");
				paramMap.put("gender", gender);
			}
			if (!req.getParameter("phone").equals("") && !req.getParameter("phone").equals(null)){
				String phone = req.getParameter("phone");
				paramMap.put("phone", phone);
			}
			if (!req.getParameter("email").equals("") && !req.getParameter("email").equals(null)){
				String email = req.getParameter("email");
				paramMap.put("email", email);
			}
			if (!req.getParameter("university").equals("") && !req.getParameter("university").equals(null)){
				String university = req.getParameter("university");
				paramMap.put("university", university);
			}
			if (!req.getParameter("universityMajor").equals("") && !req.getParameter("universityMajor").equals(null)){
				String universityMajor = req.getParameter("universityMajor");
				paramMap.put("universityMajor", universityMajor);
			}
			if (!req.getParameter("universityNumber").equals("") && !req.getParameter("universityNumber").equals(null)){
				String universityNumber = req.getParameter("universityNumber");
				paramMap.put("universityNumber", universityNumber);
			}
				
			adminService.userUpdate(paramMap);		
				
			jsonOut.write("{\"result\":"+JsonUtil.getJsonStringFromMap(paramMap)+",\"code\":1,\"url\":\"/admin_index\"}");
			
			jsonOut.flush();
			// Json Output 종료
			jsonOut.close();
		
		}catch(Exception e) {
			e.printStackTrace();
		}
	}
	
	@RequestMapping(value="/deleteUser")
	public void deleteUser ( HttpServletRequest req, HttpServletResponse res) throws Exception {
		try{
			PrintWriter jsonOut =null;
			res.setCharacterEncoding("UTF-8");
			res.setContentType("text/html; charset=UTF-8");
			jsonOut = res.getWriter();
			HashMap<String, Object> paramMap = new HashMap<String, Object>();
			
			String  _id = req.getParameter("_id");
			paramMap.put("_id", _id);
			
			adminService.deleteUser(paramMap);
			
			jsonOut.write("{\"result\":[],\"code\":1, \"msg\":\"유저 데이터가 삭제되었습니다.\", \"url\":\"/admin_index\"}");
	        jsonOut.flush();
			jsonOut.close();
			
		}catch(Exception e){
			e.printStackTrace();
		}
	}
	
	@RequestMapping(value="/updatePw")
	public void updatePw (HttpServletRequest req, HttpServletResponse res) throws Exception {
		try{
			PrintWriter jsonOut =null;
			res.setCharacterEncoding("UTF-8");
			res.setContentType("text/html; charset=UTF-8");
			jsonOut = res.getWriter();
			HashMap<String, Object> paramMap = new HashMap<String, Object>();
			
			int  _id = Integer.parseInt(req.getParameter("_id"));
			paramMap.put("_id", _id);
			
			String password = req.getParameter("password");
			paramMap.put("password", password);
			
			String rePassword = req.getParameter("rePassword");
			
			System.out.println(password.equals(rePassword));
			
			if (password.equals(rePassword)){
				adminService.updatePw(paramMap);
				jsonOut.write("{\"result\":[],\"code\":1, \"msg\":\"비밀번호가 정상적으로 변경되었습니다.\", \"url\":\"/admin_sd\"}");
			}else {
				jsonOut.write("{\"result\":[],\"code\":1, \"msg\":\"비밀번호가 다릅니다.\", \"url\":\"/admin_sd\"}");
			}
	        jsonOut.flush();
			jsonOut.close();
			
		}catch(Exception e){
			e.printStackTrace();
		}
	}
	
	@RequestMapping(value="/userPofol")
	public void userPofol(HttpServletRequest req, HttpServletResponse res) throws Exception {
		try{
			PrintWriter jsonOut =null;
			res.setCharacterEncoding("UTF-8");
			res.setContentType("text/html; charset=UTF-8");
			jsonOut = res.getWriter();
			HashMap<String, Object> paramMap = new HashMap<String, Object>();
			
			int  _id = Integer.parseInt(req.getParameter("_id"));
			paramMap.put("_id", _id);
			String type = req.getParameter("type");
			paramMap.put("type", type);
			
			if(!req.getParameter("search").equals("") && !req.getParameter("search").equals(null)) {
				String search = req.getParameter("search");
				paramMap.put("search", search);
			}
			
			// 페이지 카운트
			int pageNo =1;
			if(req.getParameter("pageNo") != null) {
				pageNo =Integer.parseInt(req.getParameter("pageNo").toString());
			}
			int count = adminService.countPofolList(paramMap);
			int postNum = Integer.parseInt(req.getParameter("postNum"));
			int pageNum = (int)Math.ceil((double)count/postNum);
			int displayPost = (pageNo -1) * postNum;
			
			paramMap.put("pageNum", pageNum);
			paramMap.put("displayPost", displayPost);
			paramMap.put("postNum", postNum);
			
			List<Map<String, Object>> resultList = adminService.userPofol(paramMap);
			
			jsonOut.write("{\"result\":"+JsonUtil.getJsonArrayFromList(resultList)+",\"code\":1,\"pageNum\":"+pageNum+",\"count\":"+count+",\"url\":\"/admin_index\"}");
			
	        jsonOut.flush();
			jsonOut.close();
			
		}catch(Exception e){
			e.printStackTrace();
		}
	}
	
	@RequestMapping(value="/insertPofol")
	public void insertPofol (HttpServletRequest req, HttpServletResponse res) throws Exception {
		try{
			PrintWriter jsonOut =null;
			res.setCharacterEncoding("UTF-8");
			res.setContentType("text/html; charset=UTF-8");
			jsonOut = res.getWriter();
			HashMap<String, Object> paramMap = new HashMap<String, Object>();
			
			int _user = Integer.parseInt(req.getParameter("_user"));
			paramMap.put("_user", _user);
			
			int _professor = Integer.parseInt(req.getParameter("_professor"));
			paramMap.put("_professor", _professor);
			
			if(!req.getParameter("_leader").equals(null) && !req.getParameter("_leader").equals("")) {
				int _leader = Integer.parseInt(req.getParameter("_leader"));
				paramMap.put("_leader", _leader);
			}else {
				paramMap.put("_leader", _user);
			}
			
			paramMap.put("name", req.getParameter("name"));
			
			paramMap.put("type", req.getParameter("type"));
			
			paramMap.put("status", "wait");
			
			paramMap.put("startDate", req.getParameter("startDate"));
			
			paramMap.put("endDate", req.getParameter("endDate"));
			
			if(!req.getParameter("link").equals(null) && !req.getParameter("link").equals("")) {
				paramMap.put("link", req.getParameter("link"));
			}
			
			paramMap.put("content", req.getParameter("content"));
			
			adminService.insertPofol(paramMap);
			
			paramMap.put("portfolio", paramMap.get("_id"));
			System.out.println(req.getParameter("member"));
			
			if (null != req.getParameter("member")
					&& !"".equals(req.getParameter("member"))) {
				String arr[] = req.getParameter("member").split("\\|");
				for (int i = 0; i < arr.length; i++) {
					paramMap.put("member", arr[i]);
					
					adminService.insertPortfolioMember(paramMap);
				}
			}
			
			
			
			jsonOut.write("{\"result\":"+JsonUtil.getJsonStringFromMap(paramMap)+",\"code\":1,\"url\":\"/admin_index\"}");
			
	        jsonOut.flush();
			jsonOut.close();
			
		}catch(Exception e){
			e.printStackTrace();
		}
	}
	
	@RequestMapping(value="/listAdmin")
	public void listAdmin(HttpServletRequest req, HttpServletResponse res, ModelMap mv) throws Exception {
		
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
			
			// 검색식 name값 받아와야함  input type="hidden" 
			if (!req.getParameter("name").equals(null) && !req.getParameter("name").equals("")) {
				String name = req.getParameter("name");
				paramMap.put("name", name);
			}
			
			// 페이지 카운트
			int pageNo =1;
			if(req.getParameter("pageNo") != null) {
				pageNo =Integer.parseInt(req.getParameter("pageNo").toString());
			}
			int count = adminService.countAdminList(paramMap);
			int postNum = Integer.parseInt(req.getParameter("postNum"));
			int pageNum = (int)Math.ceil((double)count/postNum);
			int displayPost = (pageNo -1) * postNum;
			
			paramMap.put("pageNum", pageNum);
			paramMap.put("displayPost", displayPost);
			paramMap.put("postNum", postNum);
			
			
			List<Map<String, Object>> resultList = adminService.listAdmin(paramMap);
			
			jsonOut.write("{\"result\":"+JsonUtil.getJsonArrayFromList(resultList)+",\"code\":1,\"pageNum\":"+pageNum+",\"count\":"+count+",\"url\":\"/admin_index\"}");
	        
	        jsonOut.flush();
			// Json Output 종료
			jsonOut.close();
			
		}catch(Exception e){
			e.printStackTrace();
		}
	}
	
	@RequestMapping(value="/View")
	public void View (HttpServletRequest req, HttpServletResponse res) throws Exception {
		try{
			PrintWriter jsonOut =null;
			res.setCharacterEncoding("UTF-8");
			res.setContentType("text/html; charset=UTF-8");
			jsonOut = res.getWriter();
			HashMap<String, Object> paramMap = new HashMap<String, Object>();
					
			String _id = req.getParameter("_id");
			paramMap.put("_id", _id);
			
			HashMap<String, Object> data = adminService.View(paramMap);
			paramMap.put("data", data);
			
			jsonOut.write("{\"result\":"+JsonUtil.getJsonStringFromMap(paramMap)+",\"code\":1,\"url\":\"/admin_index\"}");
	        jsonOut.flush();
			jsonOut.close();
			
		}catch(Exception e){
			e.printStackTrace();
		}
	}
	
	@RequestMapping(value="/edit")
	public void edit ( HttpServletRequest req, HttpServletResponse res) throws Exception {
		try{
			PrintWriter jsonOut =null;
			res.setCharacterEncoding("UTF-8");
			res.setContentType("text/html; charset=UTF-8");
			jsonOut = res.getWriter();
			HashMap<String, Object> paramMap = new HashMap<String, Object>();
					
			String _id = req.getParameter("_id");
			paramMap.put("_id", _id);
			
			if(!req.getParameter("name").equals("") && !req.getParameter("name").equals(null)) {
				String name = req.getParameter("name");
				paramMap.put("name", name);
			}
			adminService.edit(paramMap);
			
			jsonOut.write("{\"result\":"+JsonUtil.getJsonStringFromMap(paramMap)+",\"code\":1,\"url\":\"/admin_index\"}");
	        jsonOut.flush();
			jsonOut.close();
			
		}catch(Exception e){
			e.printStackTrace();
		}
	}
	@RequestMapping(value="/deleteAdmin")
	public void deleteAdmin ( HttpServletRequest req, HttpServletResponse res) throws Exception {
		try{
			PrintWriter jsonOut =null;
			res.setCharacterEncoding("UTF-8");
			res.setContentType("text/html; charset=UTF-8");
			jsonOut = res.getWriter();
			HashMap<String, Object> paramMap = new HashMap<String, Object>();
			
			String  _id = req.getParameter("_id");
			paramMap.put("_id", _id);
			
			adminService.deleteAdmin(paramMap);
			
			jsonOut.write("{\"result\":[],\"code\":1, \"msg\":\"어드민 데이터가 삭제되었습니다.\", \"url\":\"/admin_index\"}");
	        jsonOut.flush();
			jsonOut.close();
			
		}catch(Exception e){
			e.printStackTrace();
		}
	}
	@RequestMapping(value="/adminPw")
	public void adminPw (HttpServletRequest req, HttpServletResponse res) throws Exception {
		try{
			PrintWriter jsonOut =null;
			res.setCharacterEncoding("UTF-8");
			res.setContentType("text/html; charset=UTF-8");
			jsonOut = res.getWriter();
			HashMap<String, Object> paramMap = new HashMap<String, Object>();
			
			int  _id = Integer.parseInt(req.getParameter("_id"));
			paramMap.put("_id", _id);
			
			String password = req.getParameter("password");
			paramMap.put("password", password);
			
			String rePassword = req.getParameter("rePassword");
			
			System.out.println(password.equals(rePassword));
			
			if (password.equals(rePassword)){
				adminService.adminPw(paramMap);
				jsonOut.write("{\"result\":[],\"code\":1, \"msg\":\"비밀번호가 정상적으로 변경되었습니다.\", \"url\":\"/admin_sd\"}");
			}else {
				jsonOut.write("{\"result\":[],\"code\":1, \"msg\":\"비밀번호가 다릅니다.\", \"url\":\"/admin_sd\"}");
			}
	        jsonOut.flush();
			jsonOut.close();
			
		}catch(Exception e){
			e.printStackTrace();
		}
	}
	
	@RequestMapping(value ="/register")
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
			String name = req.getParameter("name").toString();
			paramMap.put("name", name);
			String password = req.getParameter("password").toString();
			paramMap.put("password", password);	
			String rePassword = req.getParameter("rePassword").toString();
			
			if(!password.equals(rePassword)) {
				jsonOut.write("{\"result\":[],\"code\":0, \"msg\":\"password가 일치하지 않습니다. 다시 확인해주세요.\"}");
			}else {
				adminService.register(paramMap);
				jsonOut.write("{\"result\":"+JsonUtil.getJsonStringFromMap(paramMap)+",\"code\":1,\"url\":\"/home\"}");
			}
			
			jsonOut.flush();
			// Json Output 종료
			jsonOut.close();
			
		}catch(Exception e) { 
			e.printStackTrace();
		}
	}
	
	@RequestMapping(value = "/pofolList")
	public void portfolioList(HttpServletRequest req, HttpServletResponse res,
			ModelMap mv) throws Exception {
		try {
			PrintWriter jsonOut = null;
			res.setCharacterEncoding("UTF-8");
			res.setContentType("text/html; charset=UTF-8");
			jsonOut = res.getWriter();

			HashMap<String, Object> paramMap = new HashMap<String, Object>();
			if(!req.getParameter("name").equals(null) && !req.getParameter("name").equals(null)){
				String name = req.getParameter("name");
				paramMap.put("name", name);						
			}
			// 페이지 카운트
			int pageNo =1;
			if(req.getParameter("pageNo") != null) {
				pageNo =Integer.parseInt(req.getParameter("pageNo").toString());
			}
			int count = adminService.countPofolList(paramMap);
			int postNum = Integer.parseInt(req.getParameter("postNum"));
			int pageNum = (int)Math.ceil((double)count/postNum);
			int displayPost = (pageNo -1) * postNum;
			
			paramMap.put("pageNum", pageNum);
			paramMap.put("displayPost", displayPost);
			paramMap.put("postNum", postNum);
			
			List<Map<String, Object>> resultList = adminService.pofolList(paramMap);
			
			jsonOut.write("{\"result\":"+JsonUtil.getJsonArrayFromList(resultList)+",\"code\":1,\"pageNum\":"+pageNum+",\"count\":"+count+",\"url\":\"/admin_index\"}");

			jsonOut.flush();
			// Json Output 종료
			jsonOut.close();

		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	@RequestMapping(value="/idCheck")
	public void idCheck(HttpServletRequest request, HttpServletResponse response) throws Exception {
		try{
			HttpSession session = request.getSession();
			// Json Output 객체 선언
			PrintWriter jsonOut = null;
			// Json Output 인코딩 설정
			response.setCharacterEncoding("UTF-8");
			response.setContentType("text/html; charset=UTF-8");
			// Json Output
			jsonOut = response.getWriter();
			HashMap<String, Object> paramMap = new HashMap<String, Object>();
			
			if(!request.getParameter("identifier").equals("") && !request.getParameter("identifier").equals(null)) {
				String identifier = request.getParameter("identifier");
				paramMap.put("identifier", identifier);
			}
			
			int idCheck = adminService.idCheck(paramMap);
			
			if( idCheck == 0) {
				jsonOut.write("{\"result\":[],\"code\":1, \"msg\":\"사용가능한 아이디입니다.\"}");
			}else {
				jsonOut.write("{\"result\":[],\"code\":0, \"msg\":\"이미 사용중인 아이디입니다\"}");
			}
			
			jsonOut.flush();
			// Json Output 종료
			jsonOut.close();
		}catch(Exception e){
			e.printStackTrace();
		}
	}
		
}
