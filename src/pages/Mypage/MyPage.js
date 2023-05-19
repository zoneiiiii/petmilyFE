import { Outlet } from "react-router-dom";
import MyPageNav from "./MyPageNav";
import styled from "styled-components";
import { useRef } from "react";

const MyPage = () => {
  const pageRef = useRef();
  return (
    <MyPageLayout className="MyPageLayout">
      <PageSizeLimit>
        <NavContainer>
          <MyPageNav />
        </NavContainer>
        <MyPageContainer className="MyPageContainer" ref={pageRef}>
          <Outlet />
        </MyPageContainer>
        <AdContainer>
          <div>
            <img alt="ad" src="http://placehold.it/160x600" />
          </div>
        </AdContainer>
      </PageSizeLimit>
    </MyPageLayout>
  );
};

const MyPageLayout = styled.div`
  display: flex;
  max-width: 100vw;
  justify-content: center;
  background: "#ff0000";
`;

const PageSizeLimit = styled.div`
  min-width: fit-content;
  width: 100%;
  max-width: 1400px;
  display: flex;
`;

const NavContainer = styled.div`
  box-sizing: border-box;
  width: 15%;
  min-width: 200px;
  padding: 40px 20px;
  display: flex;
  justify-content: flex-end;
  flex-shrink: 0;
`;

const MyPageContainer = styled.div`
  box-sizing: border-box;
  width: 70%;
  min-width: fit-content;
  justify-self: center;
  padding: 40px 20px;
`;

const AdContainer = styled.div`
  box-sizing: border-box;
  width: 15%;
  min-width: 200px;
  padding: 40px 20px;
  display: flex;
  justify-content: flex-start;
  flex-shrink: 0;
`;

export default MyPage;
