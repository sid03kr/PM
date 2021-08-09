package com.egov.namul.util;

import java.util.Calendar;

import javax.servlet.http.HttpServletRequest;

public class Common {
	public static void common(HttpServletRequest request) {
		System.out.println("Common 실행");
	}
	
	public static String now(){
		//현재시간
		java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String now = formatter.format(new java.util.Date());
		return now;
	}
	
	public static String min5(){
		//5분전
		Calendar min52 = Calendar.getInstance();
		min52.add(Calendar.MINUTE , -5);
		String min5 = new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(min52.getTime());
		return min5;
	}
	
	public static String min10(){
		//10분전
		Calendar min102 = Calendar.getInstance();
		min102.add(Calendar.MINUTE , -10);
		String min10 = new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(min102.getTime());
		return min10;
	}
	
	public static String day(){
		//1일전
		Calendar day2 = Calendar.getInstance();
		day2.add(Calendar.DATE , -1);
		String day = new java.text.SimpleDateFormat("yyyy-MM-dd").format(day2.getTime());
		return day;
	}

	public static String week(){
		//1주일전
		Calendar week2 = Calendar.getInstance();
		week2.add(Calendar.DATE , -7);
		String week = new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(week2.getTime());
		return week;
	}
}
