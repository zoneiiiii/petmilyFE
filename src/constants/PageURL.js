/**메인페이지 URL */
export const MAIN = "/";

/**계정 관련 URL 리스트 */
export const ACCOUNT = {
	/**로그인 페이지 URL
	 * @return "/login" */
	LOGIN: "/login",
	/**회원가입 페이지 URL
	 * @return "/join" */
	JOIN: "/join",
	/**비밀번호 찾기 페이지 URL
	 * @return "/findpw" */
	FIND_PW: "/findpw",
	/**비밀번호 변경 페이지 URL
	 * @return "/changepw" */
	CHANGE_PW: "/changepw",
};

/** MYPAGE: 마이페이지 관련 URL 리스트 */
export const MYPAGE = {
	/**마이페이지 정보 페이지 URL
	 * @return "/mypage"
	 */
	INFO: "/mypage",
	/**회원 정보 수정 페이지 URL
	 * @return "/mypage/modifyinfo"
	 */
	MODIFY_INFO: "/mypage/modifyinfo",
	/**구매 내역 페이지 URL
	 * @return "/mypage/orderlist"
	 */
	ORDERLIST: "/mypage/orderlist",
	/**
	 ** 활동내역 상세페이지 URL
	 ** 사용법: ABOUT.ACTIVITY_DETAIL(boardId)
	 * @param {string} boardId 게시판id
	 * @return "/mypage/order/:orderNum" (orderNum없음)
	 * @return "/mypage/order/" + orderNum (orderNum존재)
	 **/
	ORDER_DETAIL: (orderNum) => {
		if (orderNum === undefined) return "/mypage/order/list?orderNum=:orderNum";
		else return "/mypage/order/list?orderNum=" + orderNum;
	},
	/**입양 후기 페이지 URL
	 * @return "/mypage/adoptreview"
	 */
	ADOPT_REVIEW: "/mypage/adoptreview",
	/**입양 내역 페이지 URL
	 * @return "/mypage/adopt"
	 */
	ADOPT: "/mypage/adopt",
	/**
	 ** 내가 쓴 글 페이지 URL
	 ** 사용법: MYPAGE.BOARD(boardId)
	 * @param {string} boardId 게시판id
	 * @return "/mypage/board/:boardId" (boardId없음)
	 * @return "/mypage/board/" + boardId (boardId존재)
	 **/
	BOARD: (boardId) => {
		if (boardId === undefined) return "/mypage/board/:boardId";
		else return "/mypage/board/" + boardId;
	},
	/**1:1 문의 페이지 URL
	 * @return "/mypage/qna"
	 */
	QNA: "/mypage/qna",
	/**1:1 문의 세부 페이지 URL
	 * @return "/mypage/qna"
	 */
	QNA_DETAIL: "/mypage/qna",
	/**1:1 문의 작성 페이지 URL
	 * @return "/mypage/qna/write"
	 */
	QNA_WRITE: "/mypage/qna/write",
};

/** ABOUT: 소개 관련 URL 리스트*/
export const ABOUT = {
	/**프로젝트 소개 페이지 URL
	 * @return "/about" */
	ABOUT: "/about",
	/**입양 절차 안내 페이지 URL
	 * @return "/about/adoptprocess" */
	ADOPT_PROCESS: "/about/adoptprocess",
	/**공지사항 페이지 URL
	 * @return "/notice" */
	NOTICE: "/notice",
	/**
	 ** 공지사항 상세 페이지 URL
	 ** 사용법: ABOUT.NOTICE_DETAIL(boardId)
	 * @param {string} boardId 게시판id
	 * @return "/notice/:boardId" (boardId없음)
	 * @return "/notice/" + boardNum (boardId존재)
	 **/
	NOTICE_DETAIL: (boardNum) => {
		if (boardNum === undefined) return "/notice/:boardNum";
		else return "/notice/" + boardNum;
	},
	/**공지사항 작성 페이지 URL
	 * @return "/notice/write"
	 */
	NOTICE_WRITE: "/notice/write",
	/**활동내역 페이지 URL
	 * @return "/notice/write"
	 */
	ACTIVITY: "/activity",
	/**
	 ** 활동내역 상세페이지 URL
	 ** 사용법: ABOUT.ACTIVITY_DETAIL(boardId)
	 * @param {string} boardId 게시판id
	 * @return "/activity/:boardId" (boardId없음)
	 * @return "/activity/" + BoardId (boardId존재)
	 **/
	ACTIVITY_DETAIL: (BoardId) => {
		if (BoardId === undefined) return "/activity/:BoardId";
		else return "/activity/" + BoardId;
	},
	/**FAQ페이지 URL
	 * @return "/faq"
	 */
	FAQ: "/faq", // FAQ
};

/** ADOPT: 입양 관련 URL 리스트*/
export const ADOPT = {
	/**입양 후기 게시판 URL
	 * @return "/adopt/review"
	 */
	REVIEW: "/adopt/review",
	/**입양 후기 상세 페이지 URL
	 * @return "adopt/review/detail"
	 */
	REVIEW_DETAIL: "adopt/review/detail",
	/**입양 후기 작성 페이지 URL
	 * @return "/adopt/review/write"
	 */
	REVIEW_WRITE: "/adopt/review/write",
	/**입양 신청 페이지 URL
	 * @return "/adopt/application"
	 */
	APPLICATION: "/adopt/application",
	/**입양 체크리스트 페이지 URL
	 * @return "/adopt/checklist"
	 */
	CHECKLIST: "/adopt/checklist", // 입양 체크리스트
	/**동물병원 위치 페이지 URL
	 * @return "/location/hospital"
	 */
	HOSPITAL_LOCATION: "/location/hospital", // 동물 병원 위치
	/**보호소 위치 페이지 URL
	 * @return "/location/shelter"
	 */
	SHELTER_LOCATION: "/location/shelter", // 보호소 위치
	/**유기동물 리스트 페이지 URL
	 * @return "/adopt/animal"
	 */
	ANIMAL_LIST: "/adopt/animal", // 유기동물 리스트 + "/:ID": 유기동물 상세
};

/** SHOP: SHOP관련 URL 리스트*/
export const SHOP = {
	/**상품리스트 페이지 URL
	 * @return "/product"
	 */
	PRODUCT: "/product",
	/**카트 페이지 URL
	 * @return "/cart"
	 */
	CART: "/cart",
	/**주문 페이지 URL
	 * @return "/order"
	 */
	ORDER: "/order",
	/**주문 완료 페이지 URL
	 * @return "/order/complete"
	 */
	ORDER_COMPLETE: "/order/complete",
};

/** SUPPORT: 후원 관련 URL 리스트*/
export const SUPPORT = {
	/**기부 페이지 URL
	 * @return "/donate"
	 */
	DONATE: "/donate",
	/**기부 신청 페이지 URL
	 * @return "/donate/apply"
	 */
	APPLY: "/donate/apply",
	/**봉사 게시판 페이지 URL
	 * @return "/donate/volunteer"
	 */
	VOLUNTEER: "/donate/volunteer",
	/**봉사 게시판 글작성 페이지 URL
	 * @return "/donate/volunteer/write"
	 */
	VOLUNTEER_WRITE: "/donate/volunteer/write",
	/**봉사 게시판 상세 페이지 URL
	 * @return "/donate/volunteer/:id"
	 */
	VOLUNTEER_DETAIL: "/donate/volunteer/:id",
	/**봉사 후기 게시판 페이지 URL
	 * @return "/donate/volunteer/review"
	 */
	REVIEW: "/donate/volunteer/review",
	/**봉사 후기 게시판 글작성 페이지 URL
	 * @return "/donate/volunteer/review/write"
	 */
	REVIEW_WRITE: "/donate/volunteer/review/write",
	/**봉사 후기 게시판 상세 페이지 URL
	 * @return "/donate/volunteer/review:id"
	 */
	REVIEW_DETAIL: "/donate/volunteer/review:id",
};

/** COMMUNITY: 커뮤니티 관련 URL 리스트*/
export const COMMUNITY = {
	/**목격 제보 게시판 페이지 URL
	 * @return "/board/find"
	 */
	FIND: "/board/find",
	/**자유게시판 페이지 URL
	 * @return "/board/free"
	 */
	FREE: "/board/free",
	/**매매장터 페이지 URL
	 * @return "/board/flea"
	 */
	FLEA: "/board/flea",
	/**실종 동물 게시판 페이지 URL
	 * @return "board/missing"
	 */
	MISSING: "board/missing",
};

/** ADMIN: 관리자 관련 URL 리스트*/
export const ADMIN = {
	/**회원 관리 페이지 URL
	 * @return "/admin/member"
	 */
	MEMBER: "/admin/member",
	/**입양 관리 페이지 URL
	 * @return "/admin/adopt"
	 */
	ADOPT: "/admin/adopt",
	/**사용자 대쉬보드 페이지 URL
	 * @return "/admin/dashboard"
	 */
	DASHBOARD: "/admin/dashboard",
	/**1:1 문의 관리 페이지 URL
	 * @return "/admin/qna"
	 */
	QNA: "/admin/qna",
	/**상품 관리 페이지 URL
	 * @return "/admin/product"
	 */
	PRODUCT: "/admin/product",
	/**상품 입력 페이지 URL
	 * @return "/admin/product/form"
	 */
	PRODUCTFORM: "/admin/product/form",
	/**주문 관리 페이지 URL
	 * @return "/admin/order"
	 */
	ORDER: "/admin/order",
	/**게시글 관리 페이지 URL
	 * @return "/admin/board"
	 */
	BOARD: "/admin/board",
};
