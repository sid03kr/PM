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

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.egov.namul.mapper.MenuMapper;
import com.egov.namul.service.MenuService;
import com.egov.namul.vo.MenuVO;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.rte.fdl.idgnr.EgovIdGnrService;

@Service("MenuService")
public class MenuServiceImpl extends EgovAbstractServiceImpl implements MenuService {


	@Resource(name="MenuMapper")
	private MenuMapper MenuDAO;

	@Resource(name = "egovIdGnrService")
	private EgovIdGnrService egovIdGnrService;

	@Override
	public void insertMenu(MenuVO vo) throws Exception {
		MenuDAO.insertMenu(vo);
	}

	@Override
	public void updateMenu(MenuVO vo) throws Exception {
		MenuDAO.updateMenu(vo);
	}

	@Override
	public void deleteMenu(MenuVO vo) throws Exception {
		MenuDAO.deleteMenu(vo);
	}

	@Override
	public MenuVO selectMenu(MenuVO vo) throws Exception {
		MenuVO resultVO = MenuDAO.selectMenu(vo);
		if (resultVO == null)
			throw processException("info.nodata.msg");
		return resultVO;
	}
	
	@Override
	public List<Map<String, Object>> selectMenuList(MenuVO vo) throws Exception{
		return MenuDAO.selectMenuList(vo);
	}
}
