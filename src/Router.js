import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import * as Page from "./pages/ImportPages";
import * as BROWSER_PATH from "./constants/PageURL";

const Router = () => {
  return (
    <BrowserRouter>
      <React.Suspense fallback={<Page.Main.Loading />}>
        <ScrollToTop />
        <Routes>
          <Route path={BROWSER_PATH.MAIN} element={<Page.Main.Layout />}>
            <Route index element={<Page.Main.Main />} />
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
            {/* About */}
            <Route
              exact
              path={BROWSER_PATH.ABOUT.ABOUT}
              element={<Page.About.Layout />}
            >
              <Route index element={<Page.About.Main />} />
              <Route
                path={BROWSER_PATH.ABOUT.ADOPT_PROCESS}
                element={<Page.About.AdoptProcess />}
              />
              <Route
                path={BROWSER_PATH.ABOUT.EVENT()}
                element={<Page.About.Event />}
              />
              <Route
                path={BROWSER_PATH.ABOUT.EVENT_DETAIL()}
                element={<Page.About.EventDetail />}
              />
              <Route
                path={BROWSER_PATH.ABOUT.EVENT_WRITE}
                element={<Page.About.EventWrite />}
              />
              <Route
                path={BROWSER_PATH.ABOUT.NOTICE()}
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
              <Route
                path={BROWSER_PATH.ABOUT.FAQ}
                element={<Page.About.FAQ />}
              />
            </Route>
            {/* Adopt */}
            <Route
              path={BROWSER_PATH.ADOPT.CHECKLIST}
              element={<Page.Adopt.AdoptChecklist />}
            />
            <Route
              exact
              path={BROWSER_PATH.ADOPT.ADOPT}
              element={<Page.Adopt.AnimalList />}
            >
              <Route index element={<Page.Adopt.AdoptInfo />} />
              <Route
                path={BROWSER_PATH.ADOPT.ANIMAL_LIST()}
                element={<Page.Adopt.ShelterAnimal />}
              />
              <Route
                path={BROWSER_PATH.ADOPT.ANIMAL_LIST_DETAIL()}
                element={<Page.Adopt.AnimalListDetail />}
              />
            </Route>

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
            <Route
              path={BROWSER_PATH.ADOPT.REVIEW_MODIFY}
              element={<Page.Adopt.AdoptReviewModify />}
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
              path={BROWSER_PATH.SUPPORT.VOLUNTEER_NOTICE_MODIFY()}
              element={<Page.Support.VolunteerNoticeModify />}
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
            <Route
              path={BROWSER_PATH.SUPPORT.VOLUNTEER_REVIEW_MODIFY()}
              element={<Page.Support.VolunteerReviewModify />}
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
              path={BROWSER_PATH.COMMUNITY.FIND_MODIFY()}
              element={<Page.Community.FindModify />}
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
              path={BROWSER_PATH.COMMUNITY.FLEA_MODIFY()}
              element={<Page.Community.FleaModify />}
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
              path={BROWSER_PATH.COMMUNITY.FREE_MODIFY()}
              element={<Page.Community.FreeModify />}
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
              path={BROWSER_PATH.COMMUNITY.MISSING_MODIFY()}
              element={<Page.Community.MissingModify />}
            />
            <Route
              path={BROWSER_PATH.COMMUNITY.MISSING_WRITE}
              element={<Page.Community.MissingWrite />}
            />

            <Route path="*" element={<Page.Main.NotFound />} />
          </Route>
          {/* Admin */}
          <Route
            path={BROWSER_PATH.ADMIN.ADMINLAYOUT}
            element={<Page.Admin.AdminLayout />}
          >
            <Route index element={<Page.Admin.AdminDashBoard />} />
            <Route
              path={BROWSER_PATH.ADMIN.ADOPT}
              element={<Page.Admin.AdminAdopt />}
            />
            <Route
              path={BROWSER_PATH.ADMIN.ADMIN_ADOPT()}
              element={<Page.Admin.AdminAdoptDetail />}
            />
            <Route
              path={BROWSER_PATH.ADMIN.BOARD}
              element={<Page.Admin.AdminBoard />}
            />
            {/* <Route
              path={BROWSER_PATH.ADMIN.DASHBOARD}
              element={<Page.Admin.AdminDashBoard />}
            /> */}
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
            <Route
              path={BROWSER_PATH.ADMIN.DONATION}
              element={<Page.Admin.AdminDonation />}
            />
          </Route>
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  );
};

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}

export default Router;
