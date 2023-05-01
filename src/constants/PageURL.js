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

/** MYPAGE: 마이페이지 관련 URL 리스트 */
export const MYPAGE = {
  /**마이페이지 정보 페이지 URL
   * @return "/mypage"
   */
  INFO: "/mypage",
  /**회원 정보 수정 페이지 URL
   * @return "/mypage/modify"
   */
  MODIFY_INFO: "/mypage/modify",
  /**구매 내역 페이지 URL
   * @return "/mypage/orderlist"
   */
  ORDER: "/mypage/orderlist",
  /**
   ** 활동내역 상세페이지 URL
   ** 사용법: ABOUT.ACTIVITY_DETAIL(boardId)
   * @param {string} boardId 게시판id
   * @return "/mypage/order/:orderNum" (orderNum없음)
   * @return "/mypage/order/" + orderNum (orderNum존재)
   **/
  ORDER_DETAIL: (orderNum) => {
    if (orderNum === undefined) return "/mypage/order/:orderNum";
    else return "/mypage/order/" + orderNum;
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
  /**1:1 문의 */
  INQUIRY: "/mypage/inquiry",
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
  REVIEW_DETAIL: "",
  REVIEW_WRITE: "/adopt/review/write", // 입양 후기 작성
  APPLICATION: "/adopt/application", // 입양 신청
  CHECKLIST: "/adopt/checklist", // 입양 체크리스트
  VET_LOCATION: "/location/vet", // 동물 병원 위치
  SHELTER_LOCATION: "/location/shelter", // 보호소 위치
  ANIMAL_LIST: "/adopt/animal", // 유기동물 리스트 + "/:ID": 유기동물 상세
};

/** SHOP: SHOP관련 URL 리스트*/
export const SHOP = {
  PRODUCT: "/product",
  CART: "/cart",
  ORDER: "/order",
  ORDER_COMPLETE: "/order/complete",
};

/** SUPPORT: 후원 관련 URL 리스트*/
export const SUPPORT = {
  DONATE: "/donate",
  APPLY: "/donate/apply",
};

/** COMMUNITY: 커뮤니티 관련 URL 리스트*/
export const COMMUNITY = {
  FIND: "/board/find",
  FREE: "/board/free",
  FLEA: "/board/flea",
  MISSING: "board/missing",
};

/** ADMIN: 관리자 관련 URL 리스트*/
export const ADMIN = {
  MEMBER: "/admin/member",
  ADOPT: "/admin/adopt",
  DASHBOARD: "/admin/dashboard",
  QNA: "/admin/qna",
  PRODUCT: "/admin/product",
  PRODUCTFORM: "/admin/product/form",
  ORDER: "/admin/order",
  BOARD: "/admin/board",
};
