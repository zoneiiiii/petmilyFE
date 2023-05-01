import { lazy } from "react";
export const Layout = lazy(() => import("../Layout"));
export const Main = lazy(() => import("./Main/Main"));
export const Join = lazy(() => import("./Join/Join"));
export const Login = lazy(() => import("./Login/Login"));

export const MyPage = {
  MyPage: lazy(() => import("./Mypage/MyPage")), //마이페이지 들어갔을때 기본적으로 회원정보 표시하기 위함.
  MyInfo: lazy(() => import("./Mypage/MyPageInfo")),
  ModifyInfo: lazy(() => import("./Mypage/ModifyInfo")),
  MyOrderList: lazy(() => import("./Mypage/MyPageOrderList")),
  MyOrderDetail: lazy(() => import("./Mypage/MyPageOrderDetail")),
  MyAdoptList: lazy(() => import("./Mypage/MyPageAdoptList")),
  MyAdoptReview: lazy(() => import("./Mypage/MyPageAdoptReview")),
};

export const Donate = lazy(() => import("./Support/Donate"));
export const FindPW = lazy(() => import("./Login/FindPW"));
export const ChangePW = lazy(() => import("./Login/ChangePW"));
export const DonateApply = lazy(() => import("./Support/DonateApply"));

export const Loading = lazy(() => import("./Loading/LoadingPage"));
export const NotFound = lazy(() => import("./NotFound/NotFound"));

//아래에 import할 페이지 함수 생성

// export {
//   Layout,
//   Main,
//   Join,
//   Login,
//   MyPageList,
//   MyPage,
//   MyPageInfo,
//   ModifyInfo,
//   MyPageOrder,
//   MyPageOrderDetail,
//   MyPageAdoptList,
//   MyPageAdoptReview,
//   Donate,
//   FindPW,
//   ChangePW,
//   DonateApply,
// };
