package com.egov.namul.util;

import java.util.HashMap;

import org.apache.commons.mail.HtmlEmail;

public class MailUtil {
	
	public void sendMail(HashMap<String, Object> paramMap) throws Exception {
		
		String charSet = "utf-8";
		String hostSMTP = "smtp.gmail.com"; //네이버 이용시 smtp.naver.com
		String hostSMTPid = "tjddlfeh@gmail.com";
		String hostSMTPpwd = "@!sorkdksk1";

		// 보내는 사람 EMail, 제목, 내용
		String fromEmail = "tjddlfeh@naver.com";
		String fromName = "포트폴리오";
		String subject = "";
		String msg = "";

		subject = "임시 비밀번호 입니다.";
		msg += "<div align='center' style='border:1px solid black; font-family:verdana'>";
		msg += "<h3 style='color: blue;'>";
		msg += paramMap.get("identifier") + "님의 임시 비밀번호 입니다. 비밀번호를 변경하여 사용하세요.</h3>";
		msg += "<p>임시 비밀번호 : ";
		msg += paramMap.get("password") + "</p></div>";

		// 받는 사람 E-Mail 주소
		String mail = paramMap.get("email").toString();
		try {
			HtmlEmail email = new HtmlEmail();
			email.setDebug(true);
			email.setCharset(charSet);
			email.setSSL(true);
			email.setHostName(hostSMTP);
			email.setSmtpPort(465); //네이버 이용시 587 구글 465

			email.setAuthentication(hostSMTPid, hostSMTPpwd);
			email.setTLS(true);
			email.addTo(mail, charSet);
			email.setFrom(fromEmail, fromName, charSet);
			email.setSubject(subject);
			email.setHtmlMsg(msg);
			email.send();
		} catch (Exception e) {
			System.out.println("메일발송 실패 : " + e);
		}
	}
}
