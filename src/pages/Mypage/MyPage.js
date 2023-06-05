import { Outlet, useLocation, useNavigate } from "react-router-dom";
import MyPageNav from "./MyPageNav";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { ACCOUNT } from "../../constants/PageURL";
import LoadingPage from "../Loading/LoadingPage";

const MyPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pageRef = useRef();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const ads = [
    { id: 1, image: "/images/Ad1.png", link: "#" },
    { id: 2, image: "/images/Ad2.png", link: "#" },
    { id: 3, image: "/images/Ad3.png", link: "#" },
    { id: 4, image: "/images/Ad4.png", link: "#" },
  ];

  const randomAdIndex = Math.floor(Math.random() * ads.length);
  const randomAd = ads[randomAdIndex];

  useEffect(() => {
    if (!isLoggedIn) {
      console.log("axios");
      axios
        .get("/check-login")
        .then((response) => {
          if (!response.data) {
            alert("로그인 해주세요.");
            navigate(ACCOUNT.LOGIN);
          } else {
            setIsLoggedIn(true);
          }
        })
        .catch((error) => console.error("에러발생! :", error));
    }
  }, [location]);

  return isLoggedIn ? (
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
            <a href={randomAd.link}>
              <img alt="ad" src={randomAd.image} />
            </a>
          </div>
        </AdContainer>
      </PageSizeLimit>
    </MyPageLayout>
  ) : (
    <LoadingPage />
  );
};

const MyPageLayout = styled.div`
  display: flex;
  max-width: 100vw;
  justify-content: center;
  background: "#f8f9fa";
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
  background: "#fff";
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
