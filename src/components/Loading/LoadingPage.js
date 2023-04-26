import React from 'react';
import * as S from './LoadingPage.styled';

const LoadingPage = () => {
  return (
    <S.LoadingContainer>
      <S.LoadingText>
        로딩중입니다
        <S.DotAnimation>.</S.DotAnimation>
        <S.DotAnimation delay="0.2s">.</S.DotAnimation>
        <S.DotAnimation delay="0.4s">.</S.DotAnimation>
      </S.LoadingText>
    </S.LoadingContainer>
  );
};

export default LoadingPage;