import { Outlet, useLocation } from "react-router-dom";
import MyPageNav from "./MyPageNav";
import styled from "styled-components";
import { MYPAGE } from "../../constants/PageURL";

const NotShowNickName = [MYPAGE.MODIFY_INFO, MYPAGE.INQUIRY];

const MyPage = () => {
  const location = useLocation();
  const member = {
    name: "이기자",
    nickname: "NickName",
  };
  return (
    <MyPageLayout className="MyPageLayout">
      <MyPageNav />
      <MyPageContainer className="MyPageContainer">
        {!NotShowNickName.some((path) => path === location.pathname) && (
          <MyPageNickname className="MyPageNickname">
            <h1>{member.nickname === "" ? member.name : member.nickname}</h1>
          </MyPageNickname>
        )}
        <Outlet />
      </MyPageContainer>
    </MyPageLayout>
  );
};

const MyPageLayout = styled.div`
  display: flex;

  .MyPageNav {
    flex-shrink: 0;
  }
`;

const MyPageNickname = styled.div`
  font-size: 2rem;
  display: flex;
  flex-direction: column;
  h1 {
    display: block;
    text-decoration-line: underline;
    text-decoration-color: #ffbd59;
    text-underline-offset: 20px; /* 밑줄과 텍스트의 간격 조절 */
    text-decoration-thickness: 3px; /* 밑줄 두께 지정 */
    padding-bottom: 20px;
    margin-bottom: 20px;
  }
`;

const MyPageContainer = styled.div`
  margin: 40px;
  flex-grow: 1;
`;

export default MyPage;
