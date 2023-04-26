// LoadingPage.styled.js
import styled, { keyframes } from 'styled-components';

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const LoadingText = styled.div`
  font-size: 1.5rem;
  position: relative;
`;

const dotFadeInOut = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

export const DotAnimation = styled.span`
  animation: ${dotFadeInOut} 1s infinite;
  opacity: 0;
  ${({ delay }) => delay && `animation-delay: ${delay};`}
`;

