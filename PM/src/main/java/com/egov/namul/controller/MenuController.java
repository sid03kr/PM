package com.egov.namul.controller;

import java.io.PrintWriter;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.egov.namul.service.MenuService;
import com.egov.namul.util.JsonUtil;
import com.egov.namul.vo.MenuVO;

@Controller
@RequestMapping(value = "/menu")
public class MenuController {
	@Resource(name = "MenuService")
	private MenuService MenuService;
	
	@RequestMapping(value = "/list")
	public void list(HttpServletRequest request, HttpServletResponse response, MenuVO vo) throws Exception{
		HttpSession session = request.getSession();
		vo.setUser_level((String)session.getAttribute("usertypecode"));
		List<Map<String, Object>> data = MenuService.selectMenuList(vo);
		// Json Output 객체 선언
		PrintWriter jsonOut = null;
		// Json Output 인코딩 설정
		response.setCharacterEncoding("UTF-8");
		response.setContentType("text/html; charset=UTF-8");
		// Json Output
		jsonOut = response.getWriter();
		if(data.size() > 0){
			jsonOut.write("{\"result\":["+JsonUtil.getJsonStringFromList(data)+"],\"code\":1}");
		}else{
			jsonOut.write("{\"result\":[],\"code\":0, \"msg\":\"MenuList Load Error!\"}");
		}
		jsonOut.flush();
		// Json Output 종료
		jsonOut.close();
	}
	
	@RequestMapping(value = "/about")
	public void console(){
		System.out.println("about");
	}
	
}
