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

import com.egov.namul.vo.UserVO;

import egovframework.rte.psl.dataaccess.mapper.Mapper;

@Repository
@Mapper("UserMapper")
public interface UserMapper {
	

	void deleteUser(UserVO vo) throws Exception;

	UserVO selectUser(UserVO vo) throws Exception;

	List<Map<String, Object>> loginUser(UserVO vo) throws Exception;

	void userUpdate(HashMap<String, Object> paramMap) throws Exception;

	void register(HashMap<String, Object> paramMap) throws Exception;

	String checkId(HashMap<String, Object> paramMap) throws Exception;

	String find_id(HashMap<String, Object> paramMap) throws Exception;

	void emailPw(HashMap<String, Object> paramMap) throws Exception;

	void insertProfile(HashMap<String, Object> paramMap) throws Exception;
	
	HashMap<String, Object> findUser(HashMap<String, Object> paramMap) throws Exception;

	void noneProfile(HashMap<String, Object> paramMap)throws Exception;


}
