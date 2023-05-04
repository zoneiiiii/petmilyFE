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
                path={BROWSER_PATH.MYPAGE.QNA_DETAIL()}
                element={<Page.MyPage.MyPageQnADetail />}
              />
            </Route>
<<<<<<< HEAD
            <Route path={BROWSER_PATH.SUPPORT} element={<Donate />} />
            <Route path={BROWSER_PATH.DONATEAPPLY} element={<DonateApply />} />
            <Route
              path={BROWSER_PATH.VOLUNTEER}
              element={<VolunteerNotice />}
            />
            <Route
              path={BROWSER_PATH.VOLUNTEERDETAIL}
              element={<VolunteerNoticeDetail />}
            />
            <Route
              path={BROWSER_PATH.VOLUNTEERWRITE}
              element={<VolunteerNoticeWrite />}
            />
            <Route path={BROWSER_PATH.FINDPW} element={<FindPW />} />
            <Route path={BROWSER_PATH.CHANGEPW} element={<ChangePW />} />
            <Route path={BROWSER_PATH.PRODUCT} element={<Product />} />
            <Route path="*" element={<NotFound />} />
=======
            {/* About */}
            <Route
              path={BROWSER_PATH.ABOUT.ABOUT}
              element={<Page.About.About />}
            />
            <Route
              path={BROWSER_PATH.ABOUT.ADOPT_PROCESS}
              element={<Page.About.AdoptProcess />}
            />
            <Route
              path={BROWSER_PATH.ABOUT.ACTIVITY}
              element={<Page.About.Activity />}
            />
            <Route
              path={BROWSER_PATH.ABOUT.ACTIVITY_DETAIL()}
              element={<Page.About.ActivityDetail />}
            />
            <Route path={BROWSER_PATH.ABOUT.FAQ} element={<Page.About.FAQ />} />
            <Route
              path={BROWSER_PATH.ABOUT.NOTICE}
              element={<Page.About.Notice />}
            />
            <Route
              path={BROWSER_PATH.ABOUT.NOTICE_DETAIL()}
              element={<Page.About.NoticeDetail />}
            />
            <Route
              path={BROWSER_PATH.ABOUT.NOTICE_WRITE}
              element={<Page.About.NoticeWrite />}
            />
            {/* Adopt */}
            <Route
              path={BROWSER_PATH.ADOPT.CHECKLIST}
              element={<Page.Adopt.AdoptChecklist />}
            />
            <Route
              path={BROWSER_PATH.ADOPT.ANIMAL_LIST}
              element={<Page.Adopt.AnimalList />}
            />
            <Route
              path={BROWSER_PATH.ADOPT.ANIMAL_LIST_DETAIL()}
              element={<Page.Adopt.AnimalListDetail />}
            />
            <Route
              path={BROWSER_PATH.ADOPT.APPLICATION}
              element={<Page.Adopt.AdoptApplication />}
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
              path={BROWSER_PATH.ADOPT.REVIEW}
              element={<Page.Adopt.AdoptReview />}
            />
            <Route
              path={BROWSER_PATH.ADOPT.REVIEW_DETAIL()}
              element={<Page.Adopt.AdoptReviewDetail />}
            />
            <Route
              path={BROWSER_PATH.ADOPT.REVIEW_WRITE}
              element={<Page.Adopt.AdoptReviewWrite />}
            />
            {/* Shop */}
            <Route
              path={BROWSER_PATH.SHOP.PRODUCT}
              element={<Page.Shop.Product />}
            />
            <Route
              path={BROWSER_PATH.SHOP.PRODUCT_DETAIL()}
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
              path={BROWSER_PATH.SUPPORT.VOLUNTEER_NOTICE_DETAIL()}
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
              path={BROWSER_PATH.SUPPORT.VOLUNTEER_REVIEW_DETAIL()}
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
              path={BROWSER_PATH.COMMUNITY.FIND_DETAIL()}
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
              path={BROWSER_PATH.COMMUNITY.FLEA_DETAIL()}
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
              path={BROWSER_PATH.COMMUNITY.FREE_DETAIL()}
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
              path={BROWSER_PATH.COMMUNITY.MISSING_DETAIL()}
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
              path={BROWSER_PATH.ADMIN.PRODUCT_WRITE}
              element={<Page.Admin.AdminProductWrite />}
            />
            <Route
              path={BROWSER_PATH.ADMIN.QNA}
              element={<Page.Admin.AdminQnA />}
            />
            <Route path="*" element={<Page.NotFound />} />
>>>>>>> 0123a7eebdddad5dd0624d6116664558afeec39c
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
