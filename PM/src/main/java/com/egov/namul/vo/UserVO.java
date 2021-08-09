package com.egov.namul.vo;

import com.fasterxml.jackson.annotation.JsonFormat;

/**
 * @author admin
 *
 */

public class UserVO {
	
	int _id;
	String _profile;
	String identifier;
	String type;
	String password;
	String name;
	@JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd")
	String birth;
	String gender;
	String phone;
	String email;
	String university;
	String universityMajor;
	String universityNumber;
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
	public String get_profile() {
		return _profile;
	}
	public void set_profile(String _profile) {
		this._profile = _profile;
	}
	public String getIdentifier() {
		return identifier;
	}
	public void setIdentifier(String identifier) {
		this.identifier = identifier;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getBirth() {
		return birth;
	}
	public void setBirth(String birth) {
		this.birth = birth;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getUniversity() {
		return university;
	}
	public void setUniversity(String university) {
		this.university = university;
	}
	public String getUniversityMajor() {
		return universityMajor;
	}
	public void setUniversityMajor(String universityMajor) {
		this.universityMajor = universityMajor;
	}
	public String getUniversityNumber() {
		return universityNumber;
	}
	public void setUniversityNumber(String universityNumber) {
		this.universityNumber = universityNumber;
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
	
	@Override
	public String toString() {
		return "UserVO [_id=" + _id + ", _profile=" + _profile
				+ ", identifier=" + identifier + ", type=" + type
				+ ", password=" + password + ", name=" + name + ", birth="
				+ birth + ", gender=" + gender + ", phone=" + phone
				+ ", email=" + email + ", university=" + university
				+ ", universityMajor=" + universityMajor
				+ ", universityNumber=" + universityNumber + ", createdAt="
				+ createdAt + ", updatedAt=" + updatedAt + ", deletedAt="
				+ deletedAt + "]";
	}
	

}
