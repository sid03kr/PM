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

import com.egov.namul.mapper.AdminMapper;
import com.egov.namul.service.AdminService;
import com.egov.namul.vo.AdminVO;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.rte.fdl.idgnr.EgovIdGnrService;

@Service("AdminService")
public class AdminServiceImpl extends EgovAbstractServiceImpl implements AdminService {

	
	@Resource(name="AdminMapper")
	private AdminMapper adminMapper;

	@Resource(name = "egovIdGnrService")
	private EgovIdGnrService egovIdGnrService;
	
	@Override
	public AdminVO selectAdmin(AdminVO vo) throws Exception {
		AdminVO adminVO = adminMapper.selectAdmin(vo);
		if (adminVO == null)
			throw processException("info.nodata.msg");
		return adminVO;
	}
	
	@Override
	public List<Map<String, Object>> loginAdmin(AdminVO vo) throws Exception{
		return adminMapper.loginAdmin(vo);
	}
	@Override
	public int countList(HashMap<String, Object> paramMap) throws Exception {
		return adminMapper.countList(paramMap);
	}
	@Override
	public List<Map<String, Object>> listMapping(HashMap<String, Object> paramMap) throws Exception {
		return adminMapper.listMapping(paramMap);
	}
	@Override
	public HashMap<String, Object> userView(HashMap<String, Object> paramMap) throws Exception {
		return adminMapper.userView(paramMap);
	}
	@Override
	public void userUpdate(HashMap<String, Object> paramMap) throws Exception {
		adminMapper.userUpdate(paramMap);
	}
	@Override
	public void deleteUser(HashMap<String, Object> paramMap) throws Exception {
		adminMapper.deleteUser(paramMap);
	}
	@Override
	public void updatePw(HashMap<String, Object> paramMap) throws Exception {
		adminMapper.updatePw(paramMap);
	}
	@Override
	public List<Map<String, Object>> userPofol(HashMap<String, Object> paramMap)
			throws Exception {
		return adminMapper.userPofol(paramMap);
	}
	@Override
	public void insertPofol(HashMap<String, Object> paramMap) throws Exception {
		adminMapper.insertPofol(paramMap);
	}
	@Override
	public List<Map<String, Object>> listAdmin(HashMap<String, Object> paramMap)
			throws Exception {
		return adminMapper.listAdmin(paramMap);
	}
	@Override
	public HashMap<String, Object> View(HashMap<String, Object> paramMap)
			throws Exception {
		return adminMapper.View(paramMap);
	}
	@Override
	public void edit(HashMap<String, Object> paramMap) throws Exception {
		adminMapper.edit(paramMap);
	}
	@Override
	public void deleteAdmin(HashMap<String, Object> paramMap) throws Exception {
		adminMapper.deleteAdmin(paramMap);
	}
	@Override
	public void adminPw(HashMap<String, Object> paramMap) throws Exception {
		adminMapper.adminPw(paramMap);
	}
	@Override
	public void register(HashMap<String, Object> paramMap) throws Exception {
		adminMapper.register(paramMap);
	}
	@Override
	public List<Map<String, Object>> pofolList(HashMap<String, Object> paramMap)
			throws Exception {
		return adminMapper.pofolList(paramMap);
	}
	@Override
	public int idCheck(HashMap<String, Object> paramMap) throws Exception {
		return adminMapper.idCheck(paramMap);
	}
	@Override
	public void insertPortfolioMember(HashMap<String, Object> paramMap)
			throws Exception {
		adminMapper.insertPortfolioMember(paramMap);
	}
	@Override
	public int countAdminList(HashMap<String, Object> paramMap)
			throws Exception {
		return adminMapper.countAdminList(paramMap);
	}
	@Override
	public int countPofolList(HashMap<String, Object> paramMap)
			throws Exception {
		return adminMapper.countPofolList(paramMap);
	}
}
