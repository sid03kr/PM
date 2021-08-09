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
package com.egov.namul.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;



public interface PortfolioService {

	int insertPortfolio(HashMap<String, Object> paramMap) throws Exception;

	List<Map<String, Object>> selectPortfolio(HashMap<String, Object> paramMap) throws Exception;
	
	List<Map<String, Object>> selectView(HashMap<String, Object> paramMap) throws Exception;
	
	List<Map<String, Object>> selectViewGroup(HashMap<String, Object> paramMap) throws Exception;
	
	List<Map<String, Object>> selectViewEnter(HashMap<String, Object> paramMap) throws Exception;

	void updatePortfolio(HashMap<String, Object> paramMap)throws Exception;

	List<HashMap<String, Object>> selectProfessor(HashMap<String, Object> paramMap)throws Exception;
	
	List<HashMap<String, Object>> selectEnter(HashMap<String, Object> paramMap)throws Exception;

	List<HashMap<String, Object>> selectLeader(HashMap<String, Object> paramMap)throws Exception;
	
	void insertFile(HashMap<String, Object> paramMap) throws Exception;

	int countPortfolio(HashMap<String, Object> paramMap) throws Exception;

	int countEvaluation(HashMap<String, Object> paramMap) throws Exception;
	
	int countDone(HashMap<String, Object> paramMap) throws Exception;
	
	int countComplain(HashMap<String, Object> paramMap) throws Exception;
	
	int countWait(HashMap<String, Object> paramMap) throws Exception;

	void updateStatus(HashMap<String, Object> paramMap) throws Exception;

	void insertPortfolioMember(HashMap<String, Object> paramMap) throws Exception;
	
	void updatecomplete(HashMap<String, Object> paramMap) throws Exception;
	
	void deletePortfolioMember(HashMap<String, Object> paramMap) throws Exception;
	
	void deletecomplete(HashMap<String, Object> paramMap) throws Exception;
	
	List<HashMap<String, Object>> xmllist(HashMap<String, Object> paramMap)throws Exception;

	String fileName() throws Exception;

	void shaHash(HashMap<String, Object> paramMap) throws Exception;

	void deletePortfolio(HashMap<String, Object> paramMap) throws Exception;

	void deleteSha(HashMap<String, Object> paramMap) throws Exception;
}
