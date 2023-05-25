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

  /**주문 내역 페이지 URL
   * @return "/mypage/orderlist"
   */
  ORDERLIST: "/mypage/orderlist",

  /** 주문 내역 상세페이지 URL
   ** 사용법: MYPAGE.ORDER_DETAIL(id)
   * @return "/mypage/order/:id" (id 없음)
   * @return "/mypage/order/" + id (id 존재)
   **/
  ORDER_DETAIL: (id) => {
    if (id === undefined) return "/mypage/order/:id";
    else return "/mypage/order/" + id;
  },

  /**입양 후기 페이지 URL
   * @return "/mypage/adoptreview"
   */
  ADOPT_REVIEW: "/mypage/adoptreview",

  /**입양 내역 페이지 URL
   * @return "/mypage/adopt"
   */
  ADOPTLIST: "/mypage/adoptlist",

  /**
   ** 내가 쓴 글 페이지 URL
   ** 사용법: MYPAGE.BOARD(id)
   * @return "/mypage/board/:id" (id 없음)
   * @return "/mypage/board/" + id (id 존재)
   **/
  BOARD: (id) => {
    if (id === undefined) return "/mypage/board/:id";
    else return "/mypage/board/" + id;
  },

  /**1:1 문의 페이지 URL
   * @return "/mypage/qna"
   */
  QNA: "/mypage/qna",

  /**1:1 문의 세부 페이지 URL
   * 사용법: MYPAGE.QNA(id)
   * @return "/mypage/board/:id" (id 없음)
   * @return "/mypage/board/" + id (id 존재)
   */
  QNA_DETAIL: (id) => {
    if (id === undefined) return "/mypage/qna/:id";
    else return "/mypage/qna/" + id;
  },

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

  /** 이벤트 페이지 URL
   ** 사용법: ABOUT.EVENT({page: page, limit: limit, search: search, search_mode: search_mode})
   ** parameter 우선순위: page > limit = search = search_mode
   * @return "/about/event/list" (parameter 없음)
   * @return "/about/event/list?page=" + page (page만 존재)
   * @return "/about/event/list?page=" + page + "&search=" + search + "&search_mode=" + search_mode (page, search 존재)
   * @return "/about/event/list?page=" + page + "&limit=" + limit (page, limit 존재)
   * @return "/about/event/list?page=" + page + "&limit=" + limit + "&search=" + search + "&search_mode=" + search_mode (모두 존재)
   * */
  EVENT: (props) => {
    if (!props || !props.page) return "/about/event/list";
    else if (!props.limit) {
      if (!props.search) return "/about/event/list?page=" + props.page;
      else
        return (
          "/about/event/list?page=" +
          props.page +
          "&search=" +
          props.search +
          "&search_mode=" +
          props.search_mode
        );
    } else if (!props.search)
      return "/about/event/list?page=" + props.page + "&limit=" + props.limit;
    else
      return (
        "/about/event/list?page=" +
        props.page +
        "&limit=" +
        props.limit +
        "&search=" +
        props.search +
        "&search_mode=" +
        props.search_mode
      );
  },

  /**
   ** 이벤트 상세 페이지 URL
   ** 사용법: ABOUT.EVENT_DETAIL({page: page, limit: limit, search: search, search_mode: search_mode})
   ** parameter 우선순위: page > limit = search = search_mode
   * @return "/about/event/view" (parameter 없음)
   * @return "/about/event/view?page=" + page (page만 존재)
   * @return "/about/event/view?page=" + page + "&search=" + search + "&search_mode=" + search_mode (page, search 존재)
   * @return "/about/event/view?page=" + page + "&limit=" + limit (page, limit 존재)
   * @return "/about/event/view?page=" + page + "&limit=" + limit + "&search=" + search + "&search_mode=" + search_mode (모두 존재)
   **/
  EVENT_DETAIL: (props) => {
    if (!props || !props.no) return "/about/event/view";
    else if (!props.page) return "/about/event/view?no=" + props.no;
    else if (!props.limit) {
      if (!props.search)
        return "/about/event/view?no=" + props.no + "&page=" + props.page;
      else
        return (
          "/about/event/view?no=" +
          props.no +
          "&page=" +
          props.page +
          "&search=" +
          props.search +
          "&search_mode=" +
          props.search_mode
        );
    } else if (!props.search)
      return (
        "/about/event/view?no=" +
        props.no +
        "&page=" +
        props.page +
        "&limit=" +
        props.limit
      );
    else
      return (
        "/about/event/view?no=" +
        props.no +
        "&page=" +
        props.page +
        "&limit=" +
        props.limit +
        "&search=" +
        props.search +
        "&search_mode=" +
        props.search_mode
      );
  },

  /**이벤트 작성 페이지 URL
   * @return "/about/event/write"
   */
  EVENT_WRITE: "/about/event/write",

  /** 공지사항 페이지 URL
   ** 사용법: ABOUT.NOTICE({page: page, limit: limit, search: search, search_mode: search_mode})
   ** parameter 우선순위: page > limit = search = search_mode
   * @return "/about/notice/list" (parameter 없음)
   * @return "/about/notice/list?page=" + page (page만 존재)
   * @return "/about/notice/list?page=" + page + "&search=" + search + "&search_mode=" + search_mode (page, search 존재)
   * @return "/about/notice/list?page=" + page + "&limit=" + limit (page, limit 존재)
   * @return "/about/notice/list?page=" + page + "&limit=" + limit + "&search=" + search + "&search_mode=" + search_mode (모두 존재)
   * */
  NOTICE: (props) => {
    if (!props || !props.page) return "/about/notice/list";
    else if (!props.limit) {
      if (!props.search) return "/about/notice/list?page=" + props.page;
      else
        return (
          "/about/notice/list?page=" +
          props.page +
          "&search=" +
          props.search +
          "&search_mode=" +
          props.search_mode
        );
    } else if (!props.search)
      return "/about/notice/list?page=" + props.page + "&limit=" + props.limit;
    else
      return (
        "/about/notice/list?page=" +
        props.page +
        "&limit=" +
        props.limit +
        "&search=" +
        props.search +
        "&search_mode=" +
        props.search_mode
      );
  },

  /**
   ** 공지사항 상세 페이지 URL
   ** 사용법: ABOUT.NOTICE_DETAIL({page: page, limit: limit, search: search, search_mode: search_mode})
   ** parameter 우선순위: page > limit = search = search_mode
   * @return "/about/notice/view" (parameter 없음)
   * @return "/about/notice/view?page=" + page (page만 존재)
   * @return "/about/notice/view?page=" + page + "&search=" + search + "&search_mode=" + search_mode (page, search 존재)
   * @return "/about/notice/view?page=" + page + "&limit=" + limit (page, limit 존재)
   * @return "/about/notice/view?page=" + page + "&limit=" + limit + "&search=" + search + "&search_mode=" + search_mode (모두 존재)
   **/
  NOTICE_DETAIL: (props) => {
    if (!props || !props.no) return "/about/notice/view";
    else if (!props.page) return "/about/notice/view?no=" + props.no;
    else if (!props.limit) {
      if (!props.search)
        return "/about/notice/view?no=" + props.no + "&page=" + props.page;
      else
        return (
          "/about/notice/view?no=" +
          props.no +
          "&page=" +
          props.page +
          "&search=" +
          props.search +
          "&search_mode=" +
          props.search_mode
        );
    } else if (!props.search)
      return (
        "/about/notice/view?no=" +
        props.no +
        "&page=" +
        props.page +
        "&limit=" +
        props.limit
      );
    else
      return (
        "/about/notice/view?no=" +
        props.no +
        "&page=" +
        props.page +
        "&limit=" +
        props.limit +
        "&search=" +
        props.search +
        "&search_mode=" +
        props.search_mode
      );
  },

  /**공지사항 작성페이지 URL
   * @return "/notice/write"
   */
  NOTICE_WRITE: "/about/activity/write",

  /**FAQ페이지 URL
   * @return "/faq"
   */
  FAQ: "/about/faq", // FAQ
};

/** ADOPT: 입양 관련 URL 리스트*/
export const ADOPT = {
  /**입양 후기 게시판 URL
   * @return "/adopt/review"
   */
  REVIEW: "/adopt/review",

  ADOPT: "/adopt",

  /**입양 후기 상세 페이지 URL
   * 사용법: ADOPT.REVIEW_DETAIL(id)
   * @return "/adopt/review/:id" (id 없음)
   * @return "/adopt/review/" + id (id 존재)
   **/
  REVIEW_DETAIL: (id) => {
    if (id === undefined) return "/adopt/review/:id";
    else return "/adopt/review/" + id;
  },

  /**입양 후기 작성 페이지 URL
   * @return "/adopt/review/write"
   */
  REVIEW_WRITE: "/adopt/review/write",

  REVIEW_MODIFY: "/adopt/review/modify",

  /**입양 신청 페이지 URL
   * @return "/adopt/application"
   */
  APPLICATION: "/adopt/application",

  /**입양 체크리스트 페이지 URL
   * @return "/adopt/checklist"
   */
  CHECKLIST: "/adopt/checklist",

  /**동물병원 위치 페이지 URL
   * @return "/location/hospital"
   */
  HOSPITAL_LOCATION: "/location/hospital",

  /**보호소 위치 페이지 URL
   * @return "/location/shelter"
   */
  SHELTER_LOCATION: "/location/shelter",

  /**유기동물 리스트 페이지 URL
   * @return "/adopt/animal"
   */
  ANIMAL_LIST: (id) => {
    if (id === undefined) return "/adopt/shelteranimal/:id";
    else return "/adopt/shelteranimal/" + id;
  },

  /**유기동물 리스트 상세 페이지 URL
   ** 사용법: ADOPT.ANIMAL_LIST_DETAIL(id)
   * @return "/adopt/animal/:id" (id 없음)
   * @return "/adopt/animal/" + id (id 존재)
   **/
  ANIMAL_LIST_DETAIL: (id) => {
    if (id === undefined) return "/adopt/animal/:id";
    else return "/adopt/animal/" + id;
  },
};

/** SHOP: SHOP관련 URL 리스트*/
export const SHOP = {
  /**상품리스트 페이지 URL
   * @return "/product"
   */
  PRODUCT: "/shop/product",

  /**상품 상세 페이지 URL
   ** 사용법: SHOP.PRODUCT_DETAIL(id)
   * @return "/product/:productId" (id 없음)
   * @return "/product/" + productId (id 존재)
   */
  PRODUCT_DETAIL: (id) => {
    if (id === undefined) return "/shop/product/:id";
    else return "/shop/product/" + id;
  },

  /**카트 페이지 URL
   * @return "/cart"
   */
  CART: "/shop/cart",

  /**주문 페이지 URL
   * @return "/order"
   */
  ORDER: "/shop/order",

  /**주문 완료 페이지 URL
   * @return "/order/complete"
   */
  ORDER_COMPLETE: "/shop/order/complete",
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
   * @return "/donate/volunteer/notice"
   */
  VOLUNTEER_NOTICE: "/donate/volunteer/notice",

  /**봉사 게시판 글작성 페이지 URL
   * @return "/donate/volunteer/notice/write"
   */
  VOLUNTEER_NOTICE_WRITE: "/donate/volunteer/notice/write",

  /**봉사 게시판 상세 페이지 URL
   ** 사용법: SUPPORT.VOLUNTEER_NOTICE_DETAIL(id)
   * @return "/donate/volunteer/notice/:id" (id 없음)
   * @return "/donate/volunteer/notice/" + id (id 존재)
   */
  VOLUNTEER_NOTICE_DETAIL: (id) => {
    if (id === undefined) return "/donate/volunteer/notice/:id";
    else return "/donate/volunteer/notice/" + id;
  },

  /**봉사 게시판 수정 페이지 URL
   ** 사용법: SUPPORT.VOLUNTEER_NOTICE_MODIFY(id)
   * @return "/donate/volunteer/notice/modify:id" (id 없음)
   * @return "/donate/volunteer/notice/modify/" + id (id 존재)
   */
  VOLUNTEER_NOTICE_MODIFY: (id) => {
    if (id === undefined) return "/donate/volunteer/notice/modify/:id";
    else return "/donate/volunteer/notice/modify/" + id;
  },

  /**봉사 후기 게시판 페이지 URL
   * @return "/donate/volunteer/review"
   */
  VOLUNTEER_REVIEW: "/donate/volunteer/review",

  /**봉사 후기 게시판 상세 페이지 URL
   * @return "/donate/volunteer/review/write"
   */
  VOLUNTEER_REVIEW_WRITE: "/donate/volunteer/review/write",

  /**봉사 후기 게시판 작성 페이지 URL
   **사용법: SUPPORT.VOLUNTEER_REVIEW_DETAIL(id)
   * @return "/donate/volunteer/review/:id" (id 없음)
   * @return "/donate/volunteer/review" +id (id 존재)
   */
  VOLUNTEER_REVIEW_DETAIL: (id) => {
    if (id === undefined) return "/donate/volunteer/review/:id";
    else return "/donate/volunteer/review/" + id;
  },

  /**봉사 후기 게시판 수정 페이지 URL
   ** 사용법: SUPPORT.VOLUNTEER_REVIEW_MODIFY(id)
   * @return "/donate/volunteer/review/modify:id" (id 없음)
   * @return "/donate/volunteer/review/modify/" + id (id 존재)
   */
  VOLUNTEER_REVIEW_MODIFY: (id) => {
    if (id === undefined) return "/donate/volunteer/review/modify/:id";
    else return "/donate/volunteer/review/modify/" + id;
  },
};

/** COMMUNITY: 커뮤니티 관련 URL 리스트*/
export const COMMUNITY = {
  /**목격 제보 게시판 페이지 URL
   * @return "/board/find"
   */
  FIND: "/board/find",

  /**목격 제보 게시판 상세 페이지 URL
   **사용법: COMMUNITY.FIND_DETAIL(id)
   * @return "/board/find/:id"
   */
  FIND_DETAIL: (id) => {
    if (id === undefined) return "/board/find/:id";
    else return "/board/find/" + id;
  },

  /**목격 제보 게시판 작성 페이지 URL
   * @return "/board/find/write"
   */
  FIND_WRITE: "/board/find/write",

  /**자유게시판 페이지 URL
   * @return "/board/free"
   */
  FREE: "/board/free",

  /**자유게시판 상세 페이지 URL
   **사용법: COMMUNITY.FREE_DETAIL(id)
   * @return "/board/free/:id" (id 없음)
   * @return "/board/free/ + id (id 존재)
   */
  FREE_DETAIL: (id) => {
    if (id === undefined) return "/board/free/:id";
    else return "/board/free/" + id;
  },

  /**자유게시판 작성 페이지 URL
   * @return "/board/free/write"
   */
  FREE_WRITE: "/board/free/write",

  /**매매장터 페이지 URL
   * @return "/board/flea"
   */
  FLEA: "/board/flea",

  /**매매장터 상세 페이지 URL
   **사용법: COMMUNITY.FLEA_DETAIL(id)
   * @return "/board/flea/:id" (id 없음)
   * @return "/board/flea/" + id (id 존재)
   */
  FLEA_DETAIL: (id) => {
    if (id === undefined) return "/board/flea/:id";
    else return "/board/flea/" + id;
  },

  /**매매장터 작성 페이지 URL
   * @return "/board/flea/write"
   */
  FLEA_WRITE: "/board/flea/write",

  /**실종 동물 게시판 페이지 URL
   * @return "/board/missing"
   */
  MISSING: "/board/missing",

  /**실종 동물 게시판 페이지 URL
   **사용법: COMMUNITY.MISSING_DETAIL(id)
   * @return "board/missing/:id" (id 없음)
   * @return "board/missing" + id (id 존재)
   */
  MISSING_DETAIL: (id) => {
    if (id === undefined) return "/board/missing/:id";
    else return "/board/missing/" + id;
  },

  /**실종 동물 게시판 페이지 URL
   * @return "/board/missing/:id"
   */
  MISSING_WRITE: "/board/missing/write",
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
   * @return "/admin/product/write"
   */
  PRODUCT_WRITE: "/admin/product/write",

  /**주문 관리 페이지 URL
   * @return "/admin/order"
   */
  ORDER: "/admin/order",

  /**게시글 관리 페이지 URL
   * @return "/admin/board"
   */
  BOARD: "/admin/board",
};
