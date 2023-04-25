import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BROWSER_PATH } from './constants/path';
import {Main, Login, MyPageInfo, ModifyInfo} from './pages/ImportPages';


const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={BROWSER_PATH.MAIN} element={<Main />} />
        <Route path={BROWSER_PATH.LOGIN} element={<Login />} />
        <Route path={BROWSER_PATH.MYPAGE} element={<MyPageInfo/>}/> 
        <Route path={BROWSER_PATH.MYPAGEINFO} element={<MyPageInfo/>}/>
        <Route path={BROWSER_PATH.MODIFYINFO} element={<ModifyInfo/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;