import React  from "react";
import { useNavigate, Link } from "react-router-dom";
import * as S from "./NotFound.styled";

const NotFound = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
    };

  return (
    <S.NotFoundContainer>
      {/* <S.Image src="your_image_url_here" alt="Not Found" /> */}
      <S.Title>404</S.Title>
      <S.Message>잘못된 URL 이거나 페이지를 찾을 수 없습니다.</S.Message>
      <S.Buttons>
        <S.Button onClick={goBack}>돌아가기</S.Button>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <S.Button>홈</S.Button>
        </Link>
      </S.Buttons>
    </S.NotFoundContainer>
  );
};

export default NotFound;