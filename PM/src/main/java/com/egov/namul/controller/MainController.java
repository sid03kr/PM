/*
 * Copyright 2008-2009 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.egov.namul.controller;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import egovframework.rte.fdl.property.EgovPropertyService;

/**
 * @Class Name : EgovSampleController.java
 * @Description : EgovSample Controller Class
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2009.03.16           최초생성
 *
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2009. 03.16
 * @version 1.0
 * @see
 *
 *  Copyright (C) by MOPAS All right reserved.
 */

@Controller
public class MainController {


	/** EgovPropertyService */
	@Resource(name = "propertiesService")
	protected EgovPropertyService propertiesService;
	
	@RequestMapping(value = "/home")
	public String Home(){
		System.out.println("home");
		return "login";
	}
	
	@RequestMapping(value = "/join_student")
	public String join_student(){
		System.out.println("join_student");
		return "join_student";
	}
	
	@RequestMapping(value="{page}")
	public String page(@PathVariable("page") String page, HttpServletRequest request, HttpServletResponse response) 
	throws Exception {
		
		System.out.println("PathVariable : "+page);

		// 페이지 이동 시 마다 세션 검사
		HttpSession session = request.getSession();
		long refresh_time = session.getLastAccessedTime(); // 세션 마지막 요청 시간
		long now_time = System.currentTimeMillis(); // 현재 시간
		long diff_time = (now_time - refresh_time) / 1000;
		
		String resPath = "home";
		if ( page.equals("find_id")){
			resPath ="find_id";
		}else if (page.equals("find_pw")) {
			resPath = "find_pw";
		}else if (page.equals("certification")) {
			resPath = "certification";
		}else if(page.equals("userFind")) {
			resPath = "userFind";
		}else if(page.equals("admin_login")) {
			resPath = "admin_login";
		}
		
		
		if(session.getAttribute("name") != null && diff_time < session.getMaxInactiveInterval()) resPath = page;
		System.out.println("Single : "+resPath);
		
		return resPath;
	}
	
	@RequestMapping(value="{path}/{page}")
	public String doublepage(@PathVariable("path") String path, @PathVariable("page") String page, HttpServletRequest request, HttpServletResponse response) 
	throws Exception {
		// 페이지 이동 시 마다 세션 검사
		
		HttpSession session = request.getSession();
		long refresh_time = session.getLastAccessedTime(); // 세션 마지막 요청 시간
		long now_time = System.currentTimeMillis(); // 현재 시간
		long diff_time = (now_time - refresh_time) / 1000;
		
		String resPath = "home";

		if(null != session.getAttribute("name") && diff_time < session.getMaxInactiveInterval()) resPath = path+"/"+page;
		
		System.out.println("Double : "+resPath);
		return resPath;	
	}

}
