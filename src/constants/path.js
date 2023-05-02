const BROWSER_PATH = {
  MAIN: "/", // 메인페이지
  LOGIN: "/login", // 로그인페이지
  JOIN: "/join", // 회원가입
  MYPAGE: "/mypage", // 마이페이지
  HOSPITALLOCATION: "/hospital", //병원위치정보
  MYPAGEINFO: "/mypage/info", //마이페이지 정보
  MODIFYINFO: "/mypage/modifyinfo", // 회원 정보 수정
  MYPAGEORDER: "/mypage/orderlist", // 구매 내역
  MYPAGEADOPTREVIEW: "/mypage/adoptreview", // 입양 후기
  MYPAGEADOPTLIST: "/mypage/adoptlist", // 입양 내역
  MYPAGEBOARD: "/mypage/board", // 게시판 쓴 글 목록, boardId: 게시판 id(free, missing, ...)
  MYPAGEINQUIRY: "/mypage/inquiry", // 1:1 문의
  MYPAGEQNA: "/mypage/inquiryqna", // 문의하기 작성
  MYPAGEQNADETAIL: "/mypage/inquirydetail", //문의하기 상세
  FREE: "/board/free",
  FLEA: "/board/flea", // 더 추가해야함.
  VOLUNTEER: "/board/volunteer", // 봉사 게시판
  VOLUNTEERWRITE: "/board/volunteer/write", //봉사 게시판 글작성
  VOLUNTEERDETAIL: "/board/volunteer/:id", // 봉사 게시판 Detail
  SUPPORT: "/donate",
  DONATEAPPLY: "/donate/apply",
  FINDPW: "/findpw", //비밀번호찾기
  CHANGEPW: "/changepw", //비밀번호 변경
  PRODUCT: "/product", //shop 상품리스트
  PRODUCTDETAIL: "/productdetail", //shop 상품 상세페이지
  MISSING: "/missing", // 실종 동물 게시판
  FREEBOARD: "/freeboard", // 자유 게시판
  FREEWRITE: "/freeboard/write", //자유 게시판 작성
  FREEDETAIL: "/freeboard/detail", //자유 게시판 상세보기
  FINDBOARD: "/findboard",  // 목격 제보 게시판
  FLEABOARD: "/fleaboard", // 매매장터 게시판
  CART: "/product/cart", //장바구니
  ORDER: "/product/order", //주문/결제
};

export { BROWSER_PATH };
