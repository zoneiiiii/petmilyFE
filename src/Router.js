import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BROWSER_PATH } from "./constants/path";
import {
  Main,
  Join,
  Login,
  MyPageInfo,
  ModifyInfo,
  MyPage,
  Donate,
  DonateApply,
  FindPW,
  ChangePW,
  VolunteerNotice,
  VolunteerNoticeDetail,
  VolunteerNoticeWrite,
  Layout,
} from "./pages/ImportPages";
import NotFound from "./pages/NotFound/NotFound";
import Loading from "./components/Loading/LoadingPage";

const Router = () => {
  return (
    <BrowserRouter>
      <React.Suspense fallback={<Loading />}>
        <Routes>
        <Route path={BROWSER_PATH.MAIN} element={<Layout/>}>
          <Route index element={<Main />} />
          <Route path={BROWSER_PATH.JOIN} element={<Join />} />
          <Route path={BROWSER_PATH.LOGIN} element={<Login />} />
          <Route exact path={BROWSER_PATH.MYPAGE} element={<MyPage />}>
            <Route index element={<MyPageInfo />} />
            <Route path={BROWSER_PATH.MODIFYINFO} element={<ModifyInfo />} />
          </Route>
          <Route path={BROWSER_PATH.SUPPORT} element={<Donate />} />
          <Route path={BROWSER_PATH.DONATEAPPLY} element={<DonateApply />} />
          <Route path={BROWSER_PATH.VOLUNTEER} element={<VolunteerNotice />} />
          <Route path={BROWSER_PATH.VOLUNTEERDETAIL} element={<VolunteerNoticeDetail />} />
          <Route path={BROWSER_PATH.VOLUNTEERWRITE} element={<VolunteerNoticeWrite />} />
          <Route path={BROWSER_PATH.FINDPW} element={<FindPW />} />
          <Route path={BROWSER_PATH.CHANGEPW} element={<ChangePW />} />
          <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  );
};

export default Router;
