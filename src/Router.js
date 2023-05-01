import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BROWSER_PATH } from "./constants/path";
import {
  Layout,
  Main,
  Join,
  Login,
  MyPageInfo,
  ModifyInfo,
  MyPage,
  MyPageAdoptReview,
  MyPageBoard,
  MyPageInquiry,
  MyPageQnA,
  MyPageQnADetail,
  Donate,
  DonateApply,
  FindPW,
  ChangePW,
  Product,
  Missing,
  FreeBoard,
} from "./pages/ImportPages";
import NotFound from "./pages/NotFound/NotFound";
import Loading from "./components/Loading/LoadingPage";

const Router = () => {
  return (
    <BrowserRouter>
      <React.Suspense fallback={<Loading />}>
        <Routes>
          <Route path={BROWSER_PATH.MAIN} element={<Layout />}>
            <Route index element={<Main />} />
            <Route path={BROWSER_PATH.JOIN} element={<Join />} />
            <Route path={BROWSER_PATH.LOGIN} element={<Login />} />
            <Route exact path={BROWSER_PATH.MYPAGE} element={<MyPage />}>
              <Route index element={<MyPageInfo />} />
              <Route path={BROWSER_PATH.MODIFYINFO} element={<ModifyInfo />} />
              <Route
                path={BROWSER_PATH.MYPAGEADOPTREVIEW}
                element={<MyPageAdoptReview />}
              />
              <Route
                path={BROWSER_PATH.MYPAGEBOARD}
                element={<MyPageBoard />}
              />
              <Route
                path={BROWSER_PATH.MYPAGEINQUIRY}
                element={<MyPageInquiry />}
              />
              <Route path={BROWSER_PATH.MYPAGEQNA} element={<MyPageQnA />} />
              <Route
                path={BROWSER_PATH.MYPAGEQNADETAIL}
                element={<MyPageQnADetail />}
              />
            </Route>
            <Route path={BROWSER_PATH.SUPPORT} element={<Donate />} />
            <Route path={BROWSER_PATH.DONATEAPPLY} element={<DonateApply />} />
            <Route path={BROWSER_PATH.FINDPW} element={<FindPW />} />
            <Route path={BROWSER_PATH.CHANGEPW} element={<ChangePW />} />
            <Route path={BROWSER_PATH.MISSING} element={<Missing />} />
            <Route path={BROWSER_PATH.FREEBOARD} element={<FreeBoard />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path={BROWSER_PATH.SUPPORT} element={<Donate />} />
          <Route path={BROWSER_PATH.DONATEAPPLY} element={<DonateApply />} />
          <Route path={BROWSER_PATH.FINDPW} element={<FindPW />} />
          <Route path={BROWSER_PATH.CHANGEPW} element={<ChangePW />} />
          <Route path={BROWSER_PATH.PRODUCT} element={<Product />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  );
};

export default Router;
