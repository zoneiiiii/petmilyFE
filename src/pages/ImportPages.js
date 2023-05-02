import { lazy } from "react";
// default
export const Layout = lazy(() => import("../Layout/Layout"));
export const Main = lazy(() => import("./Main/Main"));
export const Loading = lazy(() => import("./Loading/LoadingPage"));
export const NotFound = lazy(() => import("./NotFound/NotFound"));

/**
 **Login
 **Join
 **FindPW
 **ChangePW
 */
export const Account = {
	Login: lazy(() => import("./Login/Login")),
	Join: lazy(() => import("./Join/Join")),
	FindPW: lazy(() => import("./Login/FindPW")),
	ChangePW: lazy(() => import("./Login/ChangePW")),
};

/**
 ** MyPage
 ** MyPageInfo
 ** ModifyInfo
 ** MyPageOrderList
 ** MyPageOrderDetail
 ** MyPageAdoptList
 ** MyPageAdoptReview
 ** MyPageBoard
 ** MyPageInquiry
 ** MyPageQnA
 ** MyPageQnADetail
 */
export const MyPage = {
	MyPage: lazy(() => import("./Mypage/MyPage")),
	MyPageInfo: lazy(() => import("./Mypage/MyPageInfo")),
	ModifyInfo: lazy(() => import("./Mypage/ModifyInfo")),
	MyPageOrderList: lazy(() => import("./Mypage/MyPageOrderList")),
	MyPageOrderDetail: lazy(() => import("./Mypage/MyPageOrderDetail")),
	MyPageAdoptList: lazy(() => import("./Mypage/MyPageAdoptList")),
	MyPageAdoptReview: lazy(() => import("./Mypage/MyPageAdoptReview")),
	MyPageBoard: lazy(() => import("./Mypage/MyPageBoard")),
	MyPageInquiry: lazy(() => import("./Mypage/MyPageInquiry")),
	MyPageQnA: lazy(() => import("./Mypage/MyPageQnA")),
	MyPageQnADetail: lazy(() => import("./Mypage/MyPageQnADetail")),
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
	Process: lazy(() => import("./About/AdoptProcess")),
	Notice: lazy(() => import("./About/Notice")),
	NoticeDetail: lazy(() => import("./About/NoticeDetail")),
	NoticeWrite: lazy(() => import("./About/NoticeWrite")),
	Activity: lazy(() => import("./About/Activity")),
	ActivityDetail: lazy(() => import("./About/ActivityDetail")),
	FAQ: lazy(() => import("./About/FAQ")),
};

/**
 ** AdoptChecklist
 ** AdoptApplication
 ** ShelterLocation
 ** HospitalLocation
 ** AnimalList
 ** AnimalListDetail
 ** AdoptReview
 ** AdoptReviewDetail
 ** AdoptReviewWrite
 */
export const Adopt = {
	// AdoptChecklist: lazy(() => import("./Adopt/AdoptChecklist")),
	// AdoptApplication: lazy(() => import("./Adopt/AdoptApplication")),
	// ShelterLocation: lazy(() => import("./Adopt/ShelterLocation")),
	HospitalLocation: lazy(() => import("./Adopt/HospitalLocation")),
	// AnimalList: lazy(() => import("./Adopt/AnimalList")),
	// AnimalListDetail: lazy(() => import("./Adopt/AnimalListDetail")),
	// AdoptReview: lazy(() => import("./Adopt/AdoptReview")),
	// AdoptReviewDetail: lazy(() => import("./Adopt/ReviewDetail")),
	// AdoptReviewWrite: lazy(() => import("./Adopt/ReviewWrite")),
};

/**
 * Product
 ** ProductDetail
 ** Cart
 ** Order
 ** OrderComplete
 */
export const Shop = {
	Product: lazy(() => import("./Shop/Product")),
	// ProductDetail: lazy(() => import("./Shop/ProductDetail")),
	// Cart: lazy(() => import("./Shop/Cart")),
	// Order: lazy(() => import("./Shop/Order")),
	// OrderComplete: lazy(() => import("./Shop/OrderComplete")),
};

/**
 ** Donate
 ** DonateApply
 ** VolunteerNotice
 ** VolunteerNoticeWrite
 ** VolunteerNoticeDetail
 */
export const Support = {
	Donate: lazy(() => import("./Support/Donate")),
	DonateApply: lazy(() => import("./Support/DonateApply")),
	VolunteerNotice: lazy(() => import("./Support/Volunteer/VolunteerNotice")),
	VolunteerNoticeWrite: lazy(() => import("./Support/Volunteer/VolunteerNoticeWrite")),
	VolunteerNoticeDetail: lazy(() => import("./Support/Volunteer/VolunteerNoticeDetail")),
};

/**
 ** Missing
 ** MissingDetail
 ** MissingWrite
 ** FreeBoard
 ** FreeBoardDetail
 ** FreeBoardWrite
 ** FindBoard
 ** FindBoardDetail
 ** FindBoardWrite
 ** FleaBoard
 ** FleaBoardDetail
 ** FleaBoardWrite
 */
export const Community = {
	Missing: lazy(() => import("./Community/Missing/Missing")),
	// MissingDetail: lazy(() => import("./Community/Missing/MissingDetail")),
	// MissingWrite: lazy(() => import("./Community/Missing/MissingWrite")),
	FreeBoard: lazy(() => import("./Community/FreeBoard/FreeBoard")),
	// FreeBoardDetail: lazy(() => import("./Community/FreeBoard/FreeBoardDetail")),
	// FreeBoardWrite: lazy(() => import("./Community/FreeBoard/FreeBoardWrite")),
	// FindBoard: lazy(() => import("./Community/FindBoard/FindBoard")),
	// FindBoardDetail: lazy(() => import("./Community/FindBoard/FindBoardDetail")),
	// FindBoardWrite: lazy(() => import("./Community/FindBoard/FindBoardWrite")),
	// FleaBoard: lazy(() => import("./Community/FleaBoard/FleaBoard")),
	// FleaBoardDetail: lazy(() => import("./Community/FleaBoard/FleaBoardDetail")),
	// FleaBoardWrite: lazy(() => import("./Community/FleaBoard/FleaBoardWrite")),
};

// admin
