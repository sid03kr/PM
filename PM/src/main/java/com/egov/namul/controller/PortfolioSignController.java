package com.egov.namul.controller;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Properties;
import java.util.UUID;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.egov.namul.service.SignService;

@Controller
@RequestMapping(value="/portsign")
public class PortfolioSignController {
	
	@Resource(name = "fileUploadProperty")
	Properties fileUploadProperty;
	@Resource(name = "SignService")
	SignService signservice;
	
	@RequestMapping(value = "upload")
	public void upload(MultipartHttpServletRequest request, HttpServletResponse response) throws Exception{
		try{
		HashMap<String, Object> paramMap = new HashMap<String, Object>();
		
		String no = request.getParameter("no");
		String type = request.getParameter("type");
		String image = request.getParameter("sign").split(",")[1];
		byte[] imageBytes = javax.xml.bind.DatatypeConverter.parseBase64Binary(image);
		
		String uploadPath = fileUploadProperty.getProperty("file.uploadportfolio.path");
		Calendar cal = Calendar.getInstance();
		 
		int year = cal.get(Calendar.YEAR);
		int month = cal.get(Calendar.MONTH)+1;
		int date = cal.get(Calendar.DATE);
		int hour = cal.get(Calendar.HOUR_OF_DAY);
		int minute = cal.get(Calendar.MINUTE);
		int second  = cal.get(Calendar.SECOND);
		 
		// 서버에 저장할 파일이름 파일이름을 년 월 일 시 분 초 까지로 
		String covertuId = UUID.randomUUID().toString().replace("-", "")+year+month+date+hour + minute+ second+".png";
		Path destinationFile = Paths.get(uploadPath, covertuId);
		Files.write(destinationFile, imageBytes);
		
		paramMap.put("type", type+"Signature");
		paramMap.put("no", no);
		paramMap.put("filename", covertuId);
		signservice.uploadsign(paramMap);
		
		
		}catch(Exception e){
			e.printStackTrace();
		}
		
	}
}
