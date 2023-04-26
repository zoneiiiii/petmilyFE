import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BROWSER_PATH } from "./constants/path";
import {
  Main,
  Login,
  MyPageInfo,
  ModifyInfo,
  MyPage,
} from "./pages/ImportPages";

const Router = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path={BROWSER_PATH.MAIN} element={<Main />} />
          <Route path={BROWSER_PATH.LOGIN} element={<Login />} />
          <Route exact path={BROWSER_PATH.MYPAGE} element={<MyPage />}>
            <Route index element={<MyPageInfo />} />
            <Route path={BROWSER_PATH.MODIFYINFO} element={<ModifyInfo />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
