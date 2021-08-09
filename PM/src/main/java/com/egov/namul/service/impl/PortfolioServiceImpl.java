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

import com.egov.namul.mapper.PortfolioMapper;
import com.egov.namul.service.PortfolioService;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;

@Service("PortfolioService")
public class PortfolioServiceImpl extends EgovAbstractServiceImpl implements PortfolioService {
	
	@Resource(name="PortfolioMapper") PortfolioMapper portfolioMapper;
	
	@Override
	public int insertPortfolio(HashMap<String, Object> paramMap)
			throws Exception {
		return portfolioMapper.insertPortfolio(paramMap);
		
	}
	
	@Override
	public List<Map<String, Object>> selectPortfolio(HashMap<String, Object> paramMap)
			throws Exception {
		return portfolioMapper.selectPortfolio(paramMap);
	}
	
	@Override
	public List<Map<String, Object>> selectView(HashMap<String, Object> paramMap)
			throws Exception {
		
		return portfolioMapper.selectView(paramMap);
	}
	
	@Override
	public List<Map<String, Object>> selectViewGroup(HashMap<String, Object> paramMap) throws Exception{
		return portfolioMapper.selectViewGroup(paramMap);
	}
	
	@Override
	public List<Map<String, Object>> selectViewEnter(HashMap<String, Object> paramMap) throws Exception{
		return portfolioMapper.selectViewEnter(paramMap);
	}
	
	@Override
	public void updatePortfolio(HashMap<String, Object> paramMap) throws Exception{
		portfolioMapper.updatePortfolio(paramMap);
	}

	@Override
	public List<HashMap<String, Object>> selectProfessor(
			HashMap<String, Object> paramMap) throws Exception {
		return portfolioMapper.selectProfessor(paramMap);
	}
	
	@Override
	public List<HashMap<String, Object>> selectLeader(
			HashMap<String, Object> paramMap) throws Exception {
		return portfolioMapper.selectLeader(paramMap);
	}
	
	@Override
	public List<HashMap<String, Object>> selectEnter(
			HashMap<String, Object> paramMap) throws Exception {
		return portfolioMapper.selectEnter(paramMap);
	}
	
	@Override
	public void insertFile(HashMap<String, Object> paramMap) throws Exception {
		portfolioMapper.insertFile(paramMap);
	}

	@Override
	public int countPortfolio(HashMap<String, Object> paramMap)
			throws Exception {
		return portfolioMapper.countPortfolio(paramMap);
	}
	@Override
	public int countEvaluation(HashMap<String, Object> paramMap) throws Exception {
		return portfolioMapper.countEvaluation(paramMap);
	}
	@Override
	public int countComplain(HashMap<String, Object> paramMap) throws Exception {
		return portfolioMapper.countComplain(paramMap);
	}
	@Override
	public int countDone(HashMap<String, Object> paramMap) throws Exception {
		return portfolioMapper.countDone(paramMap);
	}
	@Override
	public int countWait(HashMap<String, Object> paramMap) throws Exception {
		return portfolioMapper.countWait(paramMap);
	}

	@Override
	public void updateStatus(HashMap<String, Object> paramMap) throws Exception {
		portfolioMapper.updateStatus(paramMap);
		
	}
	
	@Override
	public void insertPortfolioMember(HashMap<String, Object> paramMap) throws Exception{
		portfolioMapper.insertPortfolioMember(paramMap);
	}
	
	@Override
	public void updatecomplete(HashMap<String, Object> paramMap) throws Exception{
		portfolioMapper.updatecomplete(paramMap);
	}
	
	@Override
	public void deletePortfolioMember(HashMap<String, Object> paramMap) throws Exception{
		portfolioMapper.deletePortfolioMember(paramMap);
	}
	
	@Override
	public void deletecomplete(HashMap<String, Object> paramMap) throws Exception{
		portfolioMapper.deletecomplete(paramMap);
	}
	
	@Override
	public List<HashMap<String, Object>> xmllist(HashMap<String, Object> paramMap)throws Exception{
		return portfolioMapper.xmllist(paramMap);
	}
	
	@Override
	public String fileName() throws Exception {
		return portfolioMapper.fileName();
	}
	
	@Override
	public void shaHash(HashMap<String, Object> paramMap) throws Exception {
		portfolioMapper.shaHash(paramMap);
	}
	
	@Override
	public void deletePortfolio(HashMap<String, Object> paramMap)
			throws Exception {
		portfolioMapper.deletePortfolio(paramMap);
	}
	
	@Override
	public void deleteSha(HashMap<String, Object> paramMap) throws Exception {
		portfolioMapper.deleteSha(paramMap);
	}
}
