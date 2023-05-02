import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as Page from "./pages/ImportPages";
import * as BROWSER_PATH from "./constants/PageURL";

const Router = () => {
  return (
    <BrowserRouter>
      <React.Suspense fallback={<Page.Loading />}>
        <Routes>
          <Route path={BROWSER_PATH.MAIN} element={<Page.Layout />}>
            <Route index element={<Page.Main />} />
            <Route
              path={BROWSER_PATH.ACCOUNT.JOIN}
              element={<Page.Account.Join />}
            />
            <Route
              path={BROWSER_PATH.ACCOUNT.LOGIN}
              element={<Page.Account.Login />}
            />
            <Route
              path={BROWSER_PATH.ACCOUNT.FIND_PW}
              element={<Page.Account.FindPW />}
            />
            <Route
              path={BROWSER_PATH.ACCOUNT.CHANGE_PW}
              element={<Page.Account.ChangePW />}
            />
            <Route
              path={BROWSER_PATH.MYPAGE.MODIFY_INFO}
              element={<Page.MyPage.ModifyInfo />}
            />
            <Route
              exact
              path={BROWSER_PATH.MYPAGE.INFO}
              element={<Page.MyPage.MyPage />}
            >
              <Route index element={<Page.MyPage.MyPageInfo />} />
              <Route
                path={BROWSER_PATH.MYPAGE.ORDERLIST}
                element={<Page.MyPage.MyPageOrderList />}
              />
              <Route
                path={BROWSER_PATH.MYPAGE.ORDER_DETAIL()}
                element={<Page.MyPage.MyPageOrderDetail />}
              />
              <Route
                path={BROWSER_PATH.MYPAGE.ADOPT_REVIEW}
                element={<Page.MyPage.MyPageAdoptReview />}
              />
              <Route
                path={BROWSER_PATH.MYPAGE.BOARD()}
                element={<Page.MyPage.MyPageBoard />}
              />
              <Route
                path={BROWSER_PATH.MYPAGE.QNA}
                element={<Page.MyPage.MyPageInquiry />}
              />
              <Route
                path={BROWSER_PATH.MYPAGE.QNA_WRITE}
                element={<Page.MyPage.MyPageQnA />}
              />
              <Route
                path={BROWSER_PATH.MYPAGE.QNA_DETAIL}
                element={<Page.MyPage.MyPageQnADetail />}
              />
            </Route>
            <Route
              path={BROWSER_PATH.ABOUT.ABOUT}
              elememt={<Page.About.About />}
            />
            <Route
              path={BROWSER_PATH.ABOUT.ACTIVITY}
              elememt={<Page.About.Activity />}
            />
            <Route
              path={BROWSER_PATH.ABOUT.ACTIVITY_DETAIL()}
              elememt={<Page.About.ActivityDetail />}
            />
            <Route
              path={BROWSER_PATH.ABOUT.ADOPT_PROCESS}
              elememt={<Page.About.AdoptProcess />}
            />
            <Route
              path={BROWSER_PATH.ABOUT.ABOUT}
              elememt={<Page.About.ApplicationForm />}
            />
            <Route
              path={BROWSER_PATH.ABOUT.ABOUT}
              elememt={<Page.About.About />}
            />
            <Route path={BROWSER_PATH.ABOUT.FAQ} elememt={<Page.About.FAQ />} />
            <Route
              path={BROWSER_PATH.ABOUT.NOTICE}
              elememt={<Page.About.Notice />}
            />
            <Route
              path={BROWSER_PATH.ABOUT.NOTICE_DETAIL()}
              elememt={<Page.About.NoticeDetail />}
            />
            <Route
              path={BROWSER_PATH.ABOUT.NOTICE_WRITE}
              elememt={<Page.About.NoticeWrite />}
            />
            <Route
              path={BROWSER_PATH.ADOPT.HOSPITAL_LOCATION}
              element={<Page.Adopt.HospitalLocation />}
            />
            <Route
              path={BROWSER_PATH.SUPPORT.DONATE}
              element={<Page.Support.Donate />}
            />
            <Route
              path={BROWSER_PATH.SUPPORT.APPLY}
              element={<Page.Support.DonateApply />}
            />
            <Route
              path={BROWSER_PATH.SUPPORT.VOLUNTEER}
              element={<Page.Support.VolunteerNotice />}
            />
            <Route
              path={BROWSER_PATH.SUPPORT.VOLUNTEER_DETAIL}
              element={<Page.Support.VolunteerNoticeDetail />}
            />
            <Route
              path={BROWSER_PATH.SUPPORT.VOLUNTEER_WRITE}
              element={<Page.Support.VolunteerNoticeWrite />}
            />
            <Route
              path={BROWSER_PATH.SHOP.PRODUCT}
              element={<Page.Shop.Product />}
            />
            <Route path="*" element={<Page.NotFound />} />
          </Route>
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  );
};

export default Router;
