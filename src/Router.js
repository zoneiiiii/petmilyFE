import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as PAGE_URL from "./constants/PageURL";
import * as Page from "./pages/ImportPages";
import NotFound from "./pages/NotFound/NotFound";
import Loading from "./components/Loading/LoadingPage";

const Router = () => {
  return (
    <BrowserRouter>
      <React.Suspense fallback={<Loading />}>
        <Routes>
          <Route path={PAGE_URL.MAIN} element={<Page.Layout />}>
            <Route index element={<Page.Main />} />
            <Route path={PAGE_URL.ACCOUNT.JOIN} element={<Page.Join />} />
            <Route path={PAGE_URL.ACCOUNT.LOGIN} element={<Page.Login />} />
            <Route
              path={PAGE_URL.MYPAGE.MODIFY_INFO}
              element={<Page.MyPage.ModifyInfo />}
            />
            <Route
              exact
              path={PAGE_URL.MYPAGE.INFO}
              element={<Page.MyPage.MyPage />}
            >
              <Route index element={<Page.MyPage.MyInfo />} />
              <Route
                path={PAGE_URL.MYPAGE.ORDER}
                element={<Page.MyPage.MyOrderList />}
              />
              <Route
                path={PAGE_URL.MYPAGE.ORDER_DETAIL()}
                element={<Page.MyPage.MyOrderDetail />}
              />
              <Route
                path={PAGE_URL.MYPAGE.ADOPT}
                element={<Page.MyPage.MyAdoptList />}
              />
              <Route
                path={PAGE_URL.MYPAGE.ADOPT_REVIEW}
                element={<Page.MyPage.MyAdoptReview />}
              />
            </Route>
            <Route path={PAGE_URL.SUPPORT.DONATE} element={<Page.Donate />} />
            <Route
              path={PAGE_URL.SUPPORT.APPLY}
              element={<Page.DonateApply />}
            />
            <Route path={PAGE_URL.ACCOUNT.FIND_PW} element={<Page.FindPW />} />
            <Route
              path={PAGE_URL.ACCOUNT.CHANGE_PW}
              element={<Page.ChangePW />}
            />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  );
};

export default Router;
