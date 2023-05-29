import { lazy } from "react";
// Main
import Layout from "../Layout";
import MainPage from "./Main/Main";
import Loading from "./Loading/LoadingPage";
import NotFound from "./NotFound/NotFound";

// Account
import ChangePWPage from "./Login/ChangePW";
import FindPWPage from "./Login/FindPW";
import LoginPage from "./Login/Login";
import JoinPage from "./Join/Join";

// MyPage
import ModifyInfo from "./Mypage/ModifyInfo";
import MyPageLayout from "./Mypage/MyPage";
import MyPageAdoptList from "./Mypage/MyPageAdoptList";
import MyPageAdoptReview from "./Mypage/MyPageAdoptReview";
import MyPageBoard from "./Mypage/MyPageBoard";
import MyPageInfo from "./Mypage/MyPageInfo";
import MyPageOrderDetail from "./Mypage/MyPageOrderDetail";
import MyPageOrderList from "./Mypage/MyPageOrderList";
import MyPageQnA from "./Mypage/MyPageQnA";
import MyPageQnADetail from "./Mypage/MyPageQnADetail";
import MyPageQnAWrite from "./Mypage/MyPageQnAWrite";

// About
import AboutLayout from "./About/AboutLayout";
import AboutMain from "./About/About";
import AdoptProcess from "./About/AdoptProcess";
import Event from "./About/Event";
import EventDetail from "./About/EventDetail";
import EventWrite from "./About/EventWrite";
import Notice from "./About/Notice";
import NoticeDetail from "./About/NoticeDetail";
import NoticeWrite from "./About/NoticeWrite";
import FAQ from "./About/FAQ";

// Adopt
import AdoptApplication from "./Adopt/AdoptApplication";
import AdoptChecklist from "./Adopt/AdoptChecklist";
import AdoptReview from "./Adopt/AdoptReview";
import AdoptReviewDetail from "./Adopt/AdoptReviewDetail";
import AdoptReviewWrite from "./Adopt/AdoptReviewWrite";
import AnimalList from "./Adopt/AnimalList";
import ShelterAnimal from "./Adopt/ShelterAnimal";
import AnimalListDetail from "./Adopt/AnimalListDetail";
import HospitalLocation from "./Adopt/HospitalLocation";
import ShelterLocation from "./Adopt/ShelterLocation";
import AdoptInfo from "./Adopt/AdoptInfo";
import AnimalListNav from "./Adopt/AnimalListNav";
import AdoptReviewModify from "./Adopt/AdoptReviewModify";

// Shop
import Cart from "./Shop/Cart";
import Order from "./Shop/Order";
import OrderComplete from "./Shop/OrderComplete";
import Product from "./Shop/Product";
import ProductDetail from "./Shop/ProductDetail";

// Support
import Donate from "./Support/Donate";
import DonateApply from "./Support/DonateApply";
import VolunteerNotice from "./Support/Volunteer/VolunteerNotice";
import VolunteerNoticeDetail from "./Support/Volunteer/VolunteerNoticeDetail";
import VolunteerNoticeWrite from "./Support/Volunteer/VolunteerNoticeWrite";
import VolunteerReview from "./Support/Volunteer/VolunteerReview";
import VolunteerReviewDetail from "./Support/Volunteer/VolunteerReviewDetail";
import VolunteerReviewWrite from "./Support/Volunteer/VolunteerReviewWrite";

// Community
import FindBoard from "./Community/FindBoard/FindBoard";
import FindDetail from "./Community/FindBoard/FindDetail";
import FindWrite from "./Community/FindBoard/FindWrite";
import FindModify from "./Community/FindBoard/FindModify";
import FleaBoard from "./Community/FleaBoard/FleaBoard";
import FleaDetail from "./Community/FleaBoard/FleaDetail";
import FleaWrite from "./Community/FleaBoard/FleaWrite";
import FleaModify from "./Community/FleaBoard/FleaModify";
import FreeBoard from "./Community/FreeBoard/FreeBoard";
import FreeDetail from "./Community/FreeBoard/FreeDetail";
import FreeWrite from "./Community/FreeBoard/FreeWrite";
import FreeModify from "./Community/FreeBoard/FreeModify";
import Missing from "./Community/Missing/MissingBoard";
import MissingDetail from "./Community/Missing/MissingDetail";
import MissingWrite from "./Community/Missing/MissingWrite";
import MissingModify from "./Community/Missing/MissingModify";

// Admin
import AdminAdopt from "./Admin/AdminAdopt";
import AdminBoard from "./Admin/AdminBoard";
import AdminDashBoard from "./Admin/AdminDashBoard";
import AdminMember from "./Admin/AdminMember";
import AdminOrder from "./Admin/AdminOrder";
import AdminProduct from "./Admin/AdminProduct";
import AdminProductWrite from "./Admin/AdminProductWrite";
import AdminQnA from "./Admin/AdminQnA";

/**
 ** Layout
 ** Main
 ** Loading
 ** NotFound
 */
export const Main = {
  Layout: Layout,
  Main: MainPage,
  Loading: Loading,
  NotFound: NotFound,
};

// export const Layout = lazy(() => import("../Layout/Layout"));
// export const Main = lazy(() => import("./Main/Main"));
// export const Loading = lazy(() => import("./Loading/LoadingPage"));
// export const NotFound = lazy(() => import("./NotFound/NotFound"));

/**
 **ChangePW
 **FindPW
 **Login
 **Join
 */
export const Account = {
  ChangePW: ChangePWPage,
  FindPW: FindPWPage,
  Login: LoginPage,
  Join: JoinPage,
  // ChangePW: lazy(() => import("./Login/ChangePW")),
  // FindPW: lazy(() => import("./Login/FindPW")),
  // Login: lazy(() => import("./Login/Login")),
  // Join: lazy(() => import("./Join/Join")),
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
  ModifyInfo: ModifyInfo,
  MyPage: MyPageLayout,
  MyPageAdoptList: MyPageAdoptList,
  MyPageAdoptReview: MyPageAdoptReview,
  MyPageBoard: MyPageBoard,
  MyPageInfo: MyPageInfo,
  MyPageOrderDetail: MyPageOrderDetail,
  MyPageOrderList: MyPageOrderList,
  MyPageQnA: MyPageQnA,
  MyPageQnADetail: MyPageQnADetail,
  MyPageQnAWrite: MyPageQnAWrite,
  // ModifyInfo: lazy(() => import("./Mypage/ModifyInfo")),
  // MyPage: lazy(() => import("./Mypage/MyPage")),
  // MyPageAdoptList: lazy(() => import("./Mypage/MyPageAdoptList")),
  // MyPageAdoptReview: lazy(() => import("./Mypage/MyPageAdoptReview")),
  // MyPageBoard: lazy(() => import("./Mypage/MyPageBoard")),
  // MyPageInfo: lazy(() => import("./Mypage/MyPageInfo")),
  // MyPageOrderDetail: lazy(() => import("./Mypage/MyPageOrderDetail")),
  // MyPageOrderList: lazy(() => import("./Mypage/MyPageOrderList")),
  // MyPageQnA: lazy(() => import("./Mypage/MyPageQnA")),
  // MyPageQnADetail: lazy(() => import("./Mypage/MyPageQnADetail")),
  // MyPageQnAWrite: lazy(() => import("./Mypage/MyPageQnAWrite")),
};

/**
 ** About
 ** Layout
 ** AdoptProcess
 ** Event
 ** EventDetail
 ** EventWrite
 ** FAQ
 ** Notice
 ** NoticeDetail
 ** NoticeWrite
 */
export const About = {
  Layout: AboutLayout,
  Main: AboutMain,
  AdoptProcess: AdoptProcess,
  Event: Event,
  EventDetail: EventDetail,
  EventWrite: EventWrite,
  Notice: Notice,
  NoticeDetail: NoticeDetail,
  NoticeWrite: NoticeWrite,
  FAQ: FAQ,
  // Layout: lazy(() => import("./About/AboutLayout")),
  // About: lazy(() => import("./About/About")),
  // AdoptProcess: lazy(() => import("./About/AdoptProcess")),
  // Event: lazy(() => import("./About/Event")),
  // EventDetail: lazy(() => import("./About/EventDetail")),
  // Event: lazy(() => import("./About/EventWrite")),
  // Notice: lazy(() => import("./About/Notice")),
  // NoticeDetail: lazy(() => import("./About/NoticeDetail")),
  // NoticeWrite: lazy(() => import("./About/NoticeWrite")),
  // FAQ: lazy(() => import("./About/FAQ")),
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
  AdoptApplication: AdoptApplication,
  AdoptChecklist: AdoptChecklist,
  AdoptReview: AdoptReview,
  AdoptReviewDetail: AdoptReviewDetail,
  AdoptReviewWrite: AdoptReviewWrite,
  AnimalList: AnimalList,
  ShelterAnimal: ShelterAnimal,
  AnimalListDetail: AnimalListDetail,
  HospitalLocation: HospitalLocation,
  ShelterLocation: ShelterLocation,
  AdoptInfo: AdoptInfo,
  AnimalListNav: AnimalListNav,
  AdoptReviewModify: AdoptReviewModify,
  // AdoptApplication: lazy(() => import("./Adopt/AdoptApplication")),
  // AdoptChecklist: lazy(() => import("./Adopt/AdoptChecklist")),
  // AdoptReview: lazy(() => import("./Adopt/AdoptReview")),
  // AdoptReviewDetail: lazy(() => import("./Adopt/AdoptReviewDetail")),
  // AdoptReviewWrite: lazy(() => import("./Adopt/AdoptReviewWrite")),
  // AnimalList: lazy(() => import("./Adopt/AnimalList")),
  // AnimalListDetail: lazy(() => import("./Adopt/AnimalListDetail")),
  // HospitalLocation: lazy(() => import("./Adopt/HospitalLocation")),
  // ShelterLocation: lazy(() => import("./Adopt/ShelterLocation")),
};

/**
 ** Cart
 ** Order
 ** OrderComplete
 ** Product
 ** ProductDetail
 */
export const Shop = {
  Cart: Cart,
  Order: Order,
  OrderComplete: OrderComplete,
  Product: Product,
  ProductDetail: ProductDetail,
  // Cart: lazy(() => import("./Shop/Cart")),
  // Order: lazy(() => import("./Shop/Order")),
  // OrderComplete: lazy(() => import("./Shop/OrderComplete")),
  // Product: lazy(() => import("./Shop/Product")),
  // ProductDetail: lazy(() => import("./Shop/ProductDetail")),
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
  Donate: Donate,
  DonateApply: DonateApply,
  VolunteerNotice: VolunteerNotice,
  VolunteerNoticeDetail: VolunteerNoticeDetail,
  VolunteerNoticeWrite: VolunteerNoticeWrite,
  VolunteerReview: VolunteerReview,
  VolunteerReviewDetail: VolunteerReviewDetail,
  VolunteerReviewWrite: VolunteerReviewWrite,
  VolunteerNoticeModify: lazy(() =>
    import("./Support/Volunteer/VolunteerNoticeModify")
  ),
  VolunteerReviewModify: lazy(() =>
    import("./Support/Volunteer/VolunteerReviewModify")
  ),
  // Donate: lazy(() => import("./Support/Donate")),
  // DonateApply: lazy(() => import("./Support/DonateApply")),
  // VolunteerNotice: lazy(() => import("./Support/Volunteer/VolunteerNotice")),
  // VolunteerNoticeDetail: lazy(() => import("./Support/Volunteer/VolunteerNoticeDetail")),
  // VolunteerNoticeWrite: lazy(() => import("./Support/Volunteer/VolunteerNoticeWrite")),
  // VolunteerNoticeModify: lazy(() => import("./Support/Volunteer/VolunteerNoticeModify")),
  // VolunteerReview: lazy(() => import("./Support/Volunteer/VolunteerReview")),
  // VolunteerReviewDetail: lazy(() => import("./Support/Volunteer/VolunteerReview")),
  // VolunteerReviewWrite: lazy(() => import("./Support/Volunteer/VolunteerReview")),
};

/**
 ** FindBoard
 ** FindDetail
 ** FindWrite
 ** FindModify
 ** FleaBoard
 ** FleaDetail
 ** FleaWrite
 ** FleaModify
 ** FreeBoard
 ** FreeDetail
 ** FreeWrite
 ** FreeModify
 ** Missing
 ** MissingDetail
 ** MissingWrite
 ** MissingModify
 */
export const Community = {
  FindBoard: FindBoard,
  FindDetail: FindDetail,
  FindWrite: FindWrite,
  FindModify: FindModify,
  FleaBoard: FleaBoard,
  FleaDetail: FleaDetail,
  FleaWrite: FleaWrite,
  FleaModify: FleaModify,
  FreeBoard: FreeBoard,
  FreeDetail: FreeDetail,
  FreeWrite: FreeWrite,
  FreeModify: FreeModify,
  Missing: Missing,
  MissingDetail: MissingDetail,
  MissingWrite: MissingWrite,
  MissingModify: MissingModify,
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
  AdminAdopt: AdminAdopt,
  AdminBoard: AdminBoard,
  AdminDashBoard: AdminDashBoard,
  AdminMember: AdminMember,
  AdminOrder: AdminOrder,
  AdminProduct: AdminProduct,
  AdminProductWrite: AdminProductWrite,
  AdminQnA: AdminQnA,
};
