// LoadingPage.styled.js
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const LoadingText = styled.div`
  font-size: 2rem;
  position: relative;
  font-weight : bold;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const SpinAnimation = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #000;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spin} 1s linear infinite;
  margin-right: 1rem;
`;