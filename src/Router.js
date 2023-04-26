import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BROWSER_PATH } from './constants/path';
import {Main, Login, MyPageInfo, ModifyInfo, Donate} from './pages/ImportPages';
import NotFound from "./pages/NotFound/NotFound";
import Loading from "./components/Loading/LoadingPage"


const Router = () => {
  return (
    <BrowserRouter>
    <React.Suspense fallback={<Loading/>}>
      <Routes>
        <Route path={BROWSER_PATH.MAIN} element={<Main />} />
        <Route path={BROWSER_PATH.LOGIN} element={<Login />} />
        <Route path={BROWSER_PATH.MYPAGE} element={<MyPageInfo/>}/> 
        <Route path={BROWSER_PATH.MYPAGEINFO} element={<MyPageInfo/>}/>
        <Route path={BROWSER_PATH.MODIFYINFO} element={<ModifyInfo/>}/>
        <Route path={BROWSER_PATH.SUPPORT} element={<Donate/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
      </React.Suspense>
    </BrowserRouter>
  );
};

export default Router;