import { Outlet } from "react-router-dom";
import AnimalListNav from "./AnimalListNav";
import styled from "styled-components";

const AnimalList = () => {
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
