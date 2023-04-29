const BROWSER_PATH = {
    MAIN : "/", // 메인페이지
    LOGIN : "/login", // 로그인페이지
    JOIN : "/join", // 회원가입
    MYPAGE : "/mypage", // 마이페이지
    MYPAGEINFO : "/mypage/info", //마이페이지 정보
    MODIFYINFO : "/mypage/modifyinfo", // 회원 정보 수정
    MYPAGEORDER : "/mypage/orderlist", // 구매 내역
    MYPAGEADOPTREVIEW: "/mypage/adoptreview", // 입양 후기
    MYPAGEADOPTLIST: "/mypage/adoptlist", // 입양 내역
    MYPAGEBOARD: "/mypage/board", // 게시판 쓴 글 목록, boardId: 게시판 id(free, missing, ...)
    MYPAGEINQUIRY: "/mypage/inquiry", // 1:1 문의
    FREE : "/board/free", // 자유 게시판
    FLEA : "/board/flea", // 플리마켓
    VOLUNTEER : "/board/volunteer", // 봉사 게시판
    VOLUNTEERWRITE : "/board/volunteer/write", //봉사 게시판 글작성
    VOLUNTEERDETAIL : "/board/volunteer/detail", // 봉사 게시판 Detail
    SUPPORT: "/donate", //기부
    DONATEAPPLY : "/donate/apply", // 기부 신청
    FINDPW: "/findpw", //비밀번호찾기
    CHANGEPW: "/changepw", //비밀번호 변경
};

export { BROWSER_PATH };
