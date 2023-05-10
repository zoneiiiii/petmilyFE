import { Outlet, useLocation } from "react-router-dom";
import AnimalListNav from "./AnimalListNav";
import styled from "styled-components";
import { MYPAGE } from "../../constants/PageURL";

const NotShowNickName = [MYPAGE.MODIFY_INFO, MYPAGE.INQUIRY];

const AnimalList = () => {
  const location = useLocation();
  return (
    <MyPageLayout className="MyPageLayout">
      <AnimalListNav />
      <MyPageContainer className="MyPageContainer">
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
const MyPageContainer = styled.div`
  margin: 40px;
  flex-grow: 1;
`;

export default AnimalList;
