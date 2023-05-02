import { lazy } from "react";
// default
export const Layout = lazy(() => import("../Layout/Layout"));
export const Main = lazy(() => import("./Main/Main"));
export const Loading = lazy(() => import("./Loading/LoadingPage"));
export const NotFound = lazy(() => import("./NotFound/NotFound"));

/**
 **ChangePW
 **FindPW
 **Login
 **Join
 */
export const Account = {
  ChangePW: lazy(() => import("./Login/ChangePW")),
  FindPW: lazy(() => import("./Login/FindPW")),
  Login: lazy(() => import("./Login/Login")),
  Join: lazy(() => import("./Join/Join")),
};

/**
 ** ModifyInfo
 ** MyPage
 ** MyPageAdoptList
 ** MyPageAdoptReview
 ** MyPageBoard
 ** MyPageInfo
 ** MyPageOrderDetail
 ** MyPageOrderList
 ** MyPageQnA
 ** MyPageQnADetail
 ** MyPageQnAWrite
 */
export const MyPage = {
  ModifyInfo: lazy(() => import("./Mypage/ModifyInfo")),
  MyPage: lazy(() => import("./Mypage/MyPage")),
  MyPageAdoptList: lazy(() => import("./Mypage/MyPageAdoptList")),
  MyPageAdoptReview: lazy(() => import("./Mypage/MyPageAdoptReview")),
  MyPageBoard: lazy(() => import("./Mypage/MyPageBoard")),
  MyPageInfo: lazy(() => import("./Mypage/MyPageInfo")),
  MyPageOrderDetail: lazy(() => import("./Mypage/MyPageOrderDetail")),
  MyPageOrderList: lazy(() => import("./Mypage/MyPageOrderList")),
  MyPageQnA: lazy(() => import("./Mypage/MyPageQnA")),
  MyPageQnADetail: lazy(() => import("./Mypage/MyPageQnADetail")),
  MyPageQnAWrite: lazy(() => import("./Mypage/MyPageQnAWrite")),
};

/**
 ** About
 ** Process
 ** Notice
 ** NoticeDetail
 ** NoticeWrite
 ** Activity
 ** ActivityDetail
 ** FAQ
 */
export const About = {
  About: lazy(() => import("./About/About")),
  Activity: lazy(() => import("./About/Activity")),
  ActivityDetail: lazy(() => import("./About/ActivityDetail")),
  AdoptProcess: lazy(() => import("./About/AdoptProcess")),
  Notice: lazy(() => import("./About/Notice")),
  NoticeDetail: lazy(() => import("./About/NoticeDetail")),
  NoticeWrite: lazy(() => import("./About/NoticeWrite")),
  FAQ: lazy(() => import("./About/FAQ")),
};

/**
 ** AdoptApplication
 ** AdoptChecklist
 ** AdoptReview
 ** AdoptReviewDetail
 ** AdoptReviewWrite
 ** AnimalList
 ** AnimalListDetail
 ** HospitalLocation
 ** ShelterLocation
 */
export const Adopt = {
  AdoptApplication: lazy(() => import("./Adopt/AdoptApplication")),
  AdoptChecklist: lazy(() => import("./Adopt/AdoptChecklist")),
  AdoptReview: lazy(() => import("./Adopt/AdoptReview")),
  AdoptReviewDetail: lazy(() => import("./Adopt/AdoptReviewDetail")),
  AdoptReviewWrite: lazy(() => import("./Adopt/AdoptReviewWrite")),
  AnimalList: lazy(() => import("./Adopt/AnimalList")),
  AnimalListDetail: lazy(() => import("./Adopt/AnimalListDetail")),
  HospitalLocation: lazy(() => import("./Adopt/HospitalLocation")),
  ShelterLocation: lazy(() => import("./Adopt/ShelterLocation")),
};

/**
 ** Cart
 ** Order
 ** OrderComplete
 ** Product
 ** ProductDetail
 */
export const Shop = {
  Cart: lazy(() => import("./Shop/Cart")),
  Order: lazy(() => import("./Shop/Order")),
  OrderComplete: lazy(() => import("./Shop/OrderComplete")),
  Product: lazy(() => import("./Shop/Product")),
  ProductDetail: lazy(() => import("./Shop/ProductDetail")),
};

/**
 ** Donate
 ** DonateApply
 ** VolunteerNotice
 ** VolunteerNoticeDetail
 ** VolunteerNoticeWrite
 ** VolunteerReview
 ** VolunteerReviewDetail
 ** VolunteerReviewWrite
 */
export const Support = {
  Donate: lazy(() => import("./Support/Donate")),
  DonateApply: lazy(() => import("./Support/DonateApply")),
  VolunteerNotice: lazy(() => import("./Support/Volunteer/VolunteerNotice")),
  VolunteerNoticeDetail: lazy(() =>
    import("./Support/Volunteer/VolunteerNoticeDetail")
  ),
  VolunteerNoticeWrite: lazy(() =>
    import("./Support/Volunteer/VolunteerNoticeWrite")
  ),
  VolunteerReview: lazy(() => import("./Support/Volunteer/VolunteerReview")),
  VolunteerReviewDetail: lazy(() =>
    import("./Support/Volunteer/VolunteerReview")
  ),
  VolunteerReviewWrite: lazy(() =>
    import("./Support/Volunteer/VolunteerReview")
  ),
};

/**
 ** FindBoard
 ** FindDetail
 ** FindWrite
 ** FleaBoard
 ** FleaDetail
 ** FleaWrite
 ** FreeBoard
 ** FreeDetail
 ** FreeWrite
 ** Missing
 ** MissingDetail
 ** MissingWrite
 */
export const Community = {
  FindBoard: lazy(() => import("./Community/FindBoard/FindBoard")),
  FindDetail: lazy(() => import("./Community/FindBoard/FindDetail")),
  FindWrite: lazy(() => import("./Community/FindBoard/FindWrite")),
  FleaBoard: lazy(() => import("./Community/FleaBoard/FleaBoard")),
  FleaDetail: lazy(() => import("./Community/FleaBoard/FleaDetail")),
  FleaWrite: lazy(() => import("./Community/FleaBoard/FleaWrite")),
  FreeBoard: lazy(() => import("./Community/FreeBoard/FreeBoard")),
  FreeDetail: lazy(() => import("./Community/FreeBoard/FreeDetail")),
  FreeWrite: lazy(() => import("./Community/FreeBoard/FreeWrite")),
  Missing: lazy(() => import("./Community/Missing/MissingBoard")),
  MissingDetail: lazy(() => import("./Community/Missing/MissingDetail")),
  MissingWrite: lazy(() => import("./Community/Missing/MissingWrite")),
};

/**
 ** AdminAdopt
 ** AdminBoard
 ** AdminDashBoard
 ** AdminMember
 ** AdminOrder
 ** AdminProduct
 ** AdminProductWrite
 ** AdminQnA
 */
export const Admin = {
  AdminAdopt: lazy(() => import("./Admin/AdminAdopt")),
  AdminBoard: lazy(() => import("./Admin/AdminBoard")),
  AdminDashBoard: lazy(() => import("./Admin/AdminDashBoard")),
  AdminMember: lazy(() => import("./Admin/AdminMember")),
  AdminOrder: lazy(() => import("./Admin/AdminOrder")),
  AdminProduct: lazy(() => import("./Admin/AdminProduct")),
  AdminProductWrite: lazy(() => import("./Admin/AdimProductWrite")),
  AdminQnA: lazy(() => import("./Admin/AdminQnA")),
};
