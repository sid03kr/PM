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
package com.egov.namul.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.egov.namul.mapper.UserMapper;
import com.egov.namul.service.UserService;
import com.egov.namul.vo.UserVO;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.rte.fdl.idgnr.EgovIdGnrService;

@Service("UserService")
public class UserServiceImpl extends EgovAbstractServiceImpl implements UserService {

	
	@Resource(name="UserMapper")
	private UserMapper userMapper;

	@Resource(name = "egovIdGnrService")
	private EgovIdGnrService egovIdGnrService;
	
	
	@Override
	public void userUpdate(HashMap<String, Object> paramMap) throws Exception{
		userMapper.userUpdate(paramMap);
		
	}
	
	@Override
	public void deleteUser(UserVO vo) throws Exception {
		userMapper.deleteUser(vo);
	}

	@Override
	public UserVO selectUser(UserVO vo) throws Exception {
		UserVO userVO = userMapper.selectUser(vo);
		if (userVO == null)
			throw processException("info.nodata.msg");
		return userVO;
	}
	
	@Override
	public List<Map<String, Object>> loginUser(UserVO vo) throws Exception{
		return userMapper.loginUser(vo);
	}
	
	@Override
	public void register(HashMap<String, Object> paramMap) throws Exception {
		userMapper.register(paramMap);
	}
	@Override
	public String checkId(HashMap<String, Object> paramMap) throws Exception {
		return userMapper.checkId(paramMap);
	}
	@Override
	public String find_id(HashMap<String, Object> paramMap) throws Exception {
		return userMapper.find_id(paramMap);
	}
	@Override
	public void emailPw(HashMap<String, Object> paramMap) throws Exception {
		userMapper.emailPw(paramMap)	;
	}
	
	@Override
	public void insertProfile(HashMap<String, Object> paramMap)
			throws Exception {
		userMapper.insertProfile(paramMap);
	}
	@Override
	public HashMap<String, Object> findUser(HashMap<String, Object> paramMap) throws Exception {
		return userMapper.findUser(paramMap);
	}
	
	@Override
	public void noneProfile(HashMap<String, Object> paramMap) throws Exception {
		userMapper.noneProfile(paramMap);
	}
	
}
