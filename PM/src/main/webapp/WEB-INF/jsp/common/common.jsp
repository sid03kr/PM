<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ page import="javax.servlet.http.HttpServletRequest" %>
<%@ page import="java.io.*"%>
<%@ page import="com.egov.namul.util.Common" %>
<% Common common = new Common(); %>
<% String thisPath = "/"+request.getRequestURI().split("jsp/")[1].split(".jsp")[0];%>
<% String cssPath = request.getRequestURI().split("jsp/")[1].split(".jsp")[0].replace("/", "");%>
<html lang="ko">
<c:set var="now" value="<% common.now(); %>" />
<c:set var="week" value="<% common.week(); %>" />
<c:set var="min5" value="<% common.min5(); %>" />
<c:set var="contextPath" value="${pageContext.request.contextPath}" />
<c:set var="resourcePath" value="${contextPath}/resource" />
<c:set var="jspPath" value="${contextPath}/WEB-INF/jsp"/>
<c:set var="jsonPath" value="${jspPath}/json"/>
<c:set var="thisPath" value="<%=thisPath %>" />
<c:set var="cssPath" value="<%=cssPath %>" />
