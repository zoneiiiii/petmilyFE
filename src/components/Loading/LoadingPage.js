import React from 'react';
import * as S from './LoadingPage.styled';

const LoadingPage = () => {
  return (
    <S.LoadingContainer>
      <S.LoadingText>
      <S.SpinAnimation />
        LOADING
      </S.LoadingText>
    </S.LoadingContainer>
  );
};

export default LoadingPage;