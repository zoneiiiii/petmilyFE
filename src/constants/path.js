const BROWSER_PATH = {
  MAIN: "/", // 메인페이지
  LOGIN: "/login", // 로그인페이지
  JOIN: "/join", // 회원가입
  MYPAGE: "/mypage", // 마이페이지
  MYPAGEINFO: "/mypage/info", //마이페이지 정보
  MODIFYINFO: "/mypage/modifyinfo", // 회원 정보 수정
  MYPAGEORDER: "/mypage/orderlist", // 구매 내역
  MYPAGEADOPTREVIEW: "/mypage/adoptreview", // 입양 후기
  MYPAGEADOPTLIST: "/mypage/adoptlist", // 입양 내역
  MYPAGEBOARD: "/mypage/board", // 게시판 쓴 글 목록, boardId: 게시판 id(free, missing, ...)
  MYPAGEINQUIRY: "/mypage/inquiry", // 1:1 문의
  FREE: "/board/free",
  FLEA: "/board/flea", // 더 추가해야함.
  SUPPORT: "/donate",
  DONATEAPPLY: "/donate/apply",
  FINDPW: "/findpw", //비밀번호찾기
  CHANGEPW: "/changepw", //비밀번호 변경
  MISSING: "/missing",  // 실종 동물 게시판
  FREEBOARD: "/freeboard",  // 자유 게시판
};

export { BROWSER_PATH };
