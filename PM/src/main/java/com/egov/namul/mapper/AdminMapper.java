/*
 * Copyright 2011 MOPAS(Ministry of Public Administration and Security).
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
package com.egov.namul.mapper;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.egov.namul.vo.AdminVO;

import egovframework.rte.psl.dataaccess.mapper.Mapper;

@Repository
@Mapper("AdminMapper")
public interface AdminMapper {

	AdminVO selectAdmin(AdminVO vo) throws Exception;

	List<Map<String, Object>> loginAdmin(AdminVO vo) throws Exception;

	int countList(HashMap<String, Object> paramMap) throws Exception;

	List<Map<String, Object>> listMapping(HashMap<String, Object> paramMap) throws Exception;

	HashMap<String, Object> userView(HashMap<String, Object> paramMap) throws Exception;

	void userUpdate(HashMap<String, Object> paramMap) throws Exception;

	void deleteUser(HashMap<String, Object> paramMap) throws Exception;

	void updatePw(HashMap<String, Object> paramMap) throws Exception;

	List<Map<String, Object>> userPofol(HashMap<String, Object> paramMap) throws Exception;

	void insertPofol(HashMap<String, Object> paramMap) throws Exception;

	List<Map<String, Object>> listAdmin(HashMap<String, Object> paramMap) throws Exception;

	HashMap<String, Object> View(HashMap<String, Object> paramMap) throws Exception;

	void edit(HashMap<String, Object> paramMap) throws Exception;

	void deleteAdmin(HashMap<String, Object> paramMap) throws Exception;

	void adminPw(HashMap<String, Object> paramMap) throws Exception;

	void register(HashMap<String, Object> paramMap) throws Exception;

	List<Map<String, Object>> pofolList(HashMap<String, Object> paramMap) throws Exception;

	int idCheck(HashMap<String, Object> paramMap) throws Exception;

	void insertPortfolioMember(HashMap<String, Object> paramMap) throws Exception;

	int countAdminList(HashMap<String, Object> paramMap) throws Exception;

	int countPofolList(HashMap<String, Object> paramMap) throws Exception;

}
 