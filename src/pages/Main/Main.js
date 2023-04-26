import React from "react";
import { BROWSER_PATH } from "../../constants/path";
import { Link } from "react-router-dom";

function Main() {
  return (
    <div>
      <h1>메인페이지 작성</h1>
      <Link to={BROWSER_PATH.MYPAGE}>마이페이지</Link>
    </div>
  );
}

export default Main;
