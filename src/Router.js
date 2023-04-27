import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BROWSER_PATH } from './constants/path';
import {Main, Login, Join, MyPageInfo, ModifyInfo} from './pages/ImportPages';


const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={BROWSER_PATH.MAIN} element={<Main />} />
        <Route path={BROWSER_PATH.LOGIN} element={<Login />} />
        <Route path={BROWSER_PATH.JOIN} element={<Join />} />
      </Routes>

      <Routes>
        <Route path={BROWSER_PATH.MYPAGE} element={<MyPageInfo/>}>
          <Route path={BROWSER_PATH.MYPAGEINFO} element={<MyPageInfo/>}/>
          <Route path={BROWSER_PATH.MODIFYINFO.toLowerCase()} element={<ModifyInfo/>}/>
        </Route>  
      </Routes>
    </BrowserRouter>
  );
};

export default Router;