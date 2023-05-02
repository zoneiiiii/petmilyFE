import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import * as Page from "./pages/ImportPages";
import * as BROWSER_PATH from "./constants/PageURL";

const Router = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
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
            {/* MyPage */}
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
                path={BROWSER_PATH.MYPAGE.ADOPTLIST}
                element={<Page.MyPage.MyPageAdoptList />}
              />
              <Route
                path={BROWSER_PATH.MYPAGE.BOARD()}
                element={<Page.MyPage.MyPageBoard />}
              />
              <Route
                path={BROWSER_PATH.MYPAGE.QNA}
                element={<Page.MyPage.MyPageQnA />}
              />
              <Route
                path={BROWSER_PATH.MYPAGE.QNA_WRITE}
                element={<Page.MyPage.MyPageQnAWrite />}
              />
              <Route
                path={BROWSER_PATH.MYPAGE.QNA_DETAIL}
                element={<Page.MyPage.MyPageQnADetail />}
              />
            </Route>
            {/* About */}
            <Route
              path={BROWSER_PATH.ABOUT.ABOUT}
              elememt={<Page.About.About />}
            />
            <Route
              path={BROWSER_PATH.ABOUT.ADOPT_PROCESS}
              elememt={<Page.About.AdoptProcess />}
            />
            <Route
              path={BROWSER_PATH.ABOUT.ACTIVITY}
              elememt={<Page.About.Activity />}
            />
            <Route
              path={BROWSER_PATH.ABOUT.ACTIVITY_DETAIL()}
              elememt={<Page.About.ActivityDetail />}
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
            {/* Adopt */}
            <Route
              path={BROWSER_PATH.ADOPT.CHECKLIST}
              elememt={<Page.Adopt.AdoptChecklist />}
            />
            <Route
              path={BROWSER_PATH.ADOPT.ANIMAL_LIST}
              elememt={<Page.Adopt.AnimalList />}
            />
            <Route
              path={BROWSER_PATH.ADOPT.ANIMAL_LIST_DETAIL}
              elememt={<Page.Adopt.AnimalListDetail />}
            />
            <Route
              path={BROWSER_PATH.ADOPT.APPLICATION}
              elememt={<Page.Adopt.AdoptApplication />}
            />
            <Route
              path={BROWSER_PATH.ADOPT.HOSPITAL_LOCATION}
              element={<Page.Adopt.HospitalLocation />}
            />
            <Route
              path={BROWSER_PATH.ADOPT.SHELTER_LOCATION}
              element={<Page.Adopt.ShelterLocation />}
            />
            <Route
              path={BROWSER_PATH.ADOPT.ADOPT_REVIEW}
              elememt={<Page.Adopt.AdoptReview />}
            />
            <Route
              path={BROWSER_PATH.ADOPT.ADOPT_REVIEW_DETAIL}
              elememt={<Page.Adopt.AdoptReviewDetail />}
            />
            <Route
              path={BROWSER_PATH.ADOPT.ADOPT_REVIEW_WRITE}
              elememt={<Page.Adopt.AdoptReviewWrite />}
            />
            {/* Shop */}
            <Route
              path={BROWSER_PATH.SHOP.PRODUCT}
              element={<Page.Shop.Product />}
            />
            <Route
              path={BROWSER_PATH.SHOP.PRODUCT_DETAIL}
              element={<Page.Shop.ProductDetail />}
            />
            <Route path={BROWSER_PATH.SHOP.CART} element={<Page.Shop.Cart />} />
            <Route
              path={BROWSER_PATH.SHOP.ORDER}
              element={<Page.Shop.Order />}
            />
            <Route
              path={BROWSER_PATH.SHOP.ORDER_COMPLETE}
              element={<Page.Shop.OrderComplete />}
            />
            {/* Support */}
            <Route
              path={BROWSER_PATH.SUPPORT.DONATE}
              element={<Page.Support.Donate />}
            />
            <Route
              path={BROWSER_PATH.SUPPORT.APPLY}
              element={<Page.Support.DonateApply />}
            />
            <Route
              path={BROWSER_PATH.SUPPORT.VOLUNTEER_NOTICE}
              element={<Page.Support.VolunteerNotice />}
            />
            <Route
              path={BROWSER_PATH.SUPPORT.VOLUNTEER_NOTICE_DETAIL}
              element={<Page.Support.VolunteerNoticeDetail />}
            />
            <Route
              path={BROWSER_PATH.SUPPORT.VOLUNTEER_NOTICE_WRITE}
              element={<Page.Support.VolunteerNoticeWrite />}
            />
            <Route
              path={BROWSER_PATH.SUPPORT.VOLUNTEER_REVIEW}
              element={<Page.Support.VolunteerReview />}
            />
            <Route
              path={BROWSER_PATH.SUPPORT.VOLUNTEER_REVIEW_DETAIL}
              element={<Page.Support.VolunteerReviewDetail />}
            />
            <Route
              path={BROWSER_PATH.SUPPORT.VOLUNTEER_REVIEW_WRITE}
              element={<Page.Support.VolunteerReviewWrite />}
            />
            {/* Community */}
            <Route
              path={BROWSER_PATH.COMMUNITY.FIND}
              element={<Page.Community.FindBoard />}
            />
            <Route
              path={BROWSER_PATH.COMMUNITY.FIND_DETAIL}
              element={<Page.Community.FindDetail />}
            />
            <Route
              path={BROWSER_PATH.COMMUNITY.FIND_WRITE}
              element={<Page.Community.FindWrite />}
            />
            <Route
              path={BROWSER_PATH.COMMUNITY.FLEA}
              element={<Page.Community.FleaBoard />}
            />
            <Route
              path={BROWSER_PATH.COMMUNITY.FLEA_DETAIL}
              element={<Page.Community.FleaDetail />}
            />
            <Route
              path={BROWSER_PATH.COMMUNITY.FLEA_WRITE}
              element={<Page.Community.FleaWrite />}
            />
            <Route
              path={BROWSER_PATH.COMMUNITY.FREE}
              element={<Page.Community.FreeBoard />}
            />
            <Route
              path={BROWSER_PATH.COMMUNITY.FREE_DETAIL}
              element={<Page.Community.FreeDetail />}
            />
            <Route
              path={BROWSER_PATH.COMMUNITY.FREE_WRITE}
              element={<Page.Community.FreeWrite />}
            />
            <Route
              path={BROWSER_PATH.COMMUNITY.MISSING}
              element={<Page.Community.Missing />}
            />
            <Route
              path={BROWSER_PATH.COMMUNITY.MISSING_DETAIL}
              element={<Page.Community.MissingDetail />}
            />
            <Route
              path={BROWSER_PATH.COMMUNITY.MISSING_WRITE}
              element={<Page.Community.MissingWrite />}
            />
            {/* Admin */}
            <Route
              path={BROWSER_PATH.ADMIN.ADOPT}
              element={<Page.Admin.AdminAdopt />}
            />
            <Route
              path={BROWSER_PATH.ADMIN.BOARD}
              element={<Page.Admin.AdminBoard />}
            />
            <Route
              path={BROWSER_PATH.ADMIN.DASHBOARD}
              element={<Page.Admin.AdminDashBoard />}
            />
            <Route
              path={BROWSER_PATH.ADMIN.MEMBER}
              element={<Page.Admin.AdminMember />}
            />
            <Route
              path={BROWSER_PATH.ADMIN.ORDER}
              element={<Page.Admin.AdminOrder />}
            />
            <Route
              path={BROWSER_PATH.ADMIN.PRODUCT}
              element={<Page.Admin.AdminProduct />}
            />
            <Route
              path={BROWSER_PATH.ADMIN.PRODUCTFORM}
              element={<Page.Admin.AdminProductWrite />}
            />
            <Route
              path={BROWSER_PATH.ADMIN.QNA}
              element={<Page.Admin.AdminQnA />}
            />

            <Route path="*" element={<Page.NotFound />} />
          </Route>
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  );
};

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default Router;
