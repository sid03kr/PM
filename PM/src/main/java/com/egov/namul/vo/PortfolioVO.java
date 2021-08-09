package com.egov.namul.vo;

import com.fasterxml.jackson.annotation.JsonFormat;

/**
 * @author admin
 *
 */
public class PortfolioVO {
	int _id;
	int _user;
	int _enterprise;
	int _professor;
	int _leader;
	int _file;
	String fileName;
	String fileType;
	int fileSize;
	String fileUrl;
	String name;
	String type;
	String status;
	@JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm:ss")
	String startDate;
	@JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm:ss")
	String endDate;
	String link;
	String score;
	String professorSignature;
	String studentSignature;
	String number1;
	String number2;
	String number3;
	String content;
	String complain;
	String answer;
	
	String blockchainHashcode;
	@JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm:ss")
	String createdAt;
	@JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm:ss")
	String updatedAt;
	@JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm:ss")
	String deletedAt;
	
	
	public int get_id() {
		return _id;
	}
	public void set_id(int _id) {
		this._id = _id;
	}
	public int get_user() {
		return _user;
	}
	public void set_user(int _user) {
		this._user = _user;
	}
	public int get_enterprise() {
		return _enterprise;
	}
	public void set_enterprise(int _enterprise) {
		this._enterprise = _enterprise;
	}
	public int get_professor() {
		return _professor;
	}
	public void set_professor(int _professor) {
		this._professor = _professor;
	}
	public int get_leader() {
		return _leader;
	}
	public void set_leader(int _leader) {
		this._leader = _leader;
	}
	public int get_file() {
		return _file;
	}
	public void set_file(int _file) {
		this._file = _file;
	}
	public String getFileName() {
		return fileName;
	}
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}
	public String getFileType() {
		return fileType;
	}
	public void setFileType(String fileType) {
		this.fileType = fileType;
	}
	public int getFileSize() {
		return fileSize;
	}
	public void setFileSize(int fileSize) {
		this.fileSize = fileSize;
	}
	public String getFileUrl() {
		return fileUrl;
	}
	public void setFileUrl(String fileUrl) {
		this.fileUrl = fileUrl;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getStartDate() {
		return startDate;
	}
	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}
	public String getEndDate() {
		return endDate;
	}
	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}
	public String getLink() {
		return link;
	}
	public void setLink(String link) {
		this.link = link;
	}
	public String getScore() {
		return score;
	}
	public void setScore(String score) {
		this.score = score;
	}
	public String getProfessorSignature() {
		return professorSignature;
	}
	public void setProfessorSignature(String professorSignature) {
		this.professorSignature = professorSignature;
	}
	public String getStudentSignature() {
		return studentSignature;
	}
	public void setStudentSignature(String studentSignature) {
		this.studentSignature = studentSignature;
	}
	public String getNumber1() {
		return number1;
	}
	public void setNumber1(String number1) {
		this.number1 = number1;
	}
	public String getNumber2() {
		return number2;
	}
	public void setNumber2(String number2) {
		this.number2 = number2;
	}
	public String getNumber3() {
		return number3;
	}
	public void setNumber3(String number3) {
		this.number3 = number3;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getComplain() {
		return complain;
	}
	public void setComplain(String complain) {
		this.complain = complain;
	}
	public String getAnswer() {
		return answer;
	}
	public void setAnswer(String answer) {
		this.answer = answer;
	}
	public String getBlockchainHashcode() {
		return blockchainHashcode;
	}
	public void setBlockchainHashcode(String blockchainHashcode) {
		this.blockchainHashcode = blockchainHashcode;
	}
	public String getCreatedAt() {
		return createdAt;
	}
	public void setCreatedAt(String createdAt) {
		this.createdAt = createdAt;
	}
	public String getUpdatedAt() {
		return updatedAt;
	}
	public void setUpdatedAt(String updatedAt) {
		this.updatedAt = updatedAt;
	}
	public String getDeletedAt() {
		return deletedAt;
	}
	public void setDeletedAt(String deletedAt) {
		this.deletedAt = deletedAt;
	}
	
	
	}
