import { Link, Outlet } from "react-router-dom";
import MyPageNav from "./MyPageNav";
import styled from "styled-components";

const MyPage = () => {
  const member = {
    name: "이기자",
    nickname: "",
  };
  return (
    <MyPageLayout className="MyPageLayout">
      <MyPageNav />
      <MyPageContainer
        className="MyPageContainer"
        width={window.innerWidth - 160 - 16 + "px"} // 브라우저 화면 너비 - MyPageNav 너비 - 브라우저 자체 margin
      >
        <div className="MyPageNickname">
          <h1>{member.nickname === "" ? member.name : member.nickname}</h1>
        </div>
        <Outlet />
      </MyPageContainer>
      <Link to="/">메인페이지</Link>
    </MyPageLayout>
  );
};

const MyPageLayout = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const MyPageContainer = styled.div`
  width: ${(props) => props.width};
`;

export default MyPage;
