import styled from 'styled-components';

const Card = styled.a`
  position: relative;
  width: 100%;
  height: 50vh;
  margin-bottom: 5%;
  text-decoration: none;
  overflow: hidden;
`;

const BackgroundImage = styled.div`
  width: 100%;
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const CardContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: white;
  background-color: rgba(0, 0, 0, 0);
  transition: background-color 0.3s, font-size 0.3s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
`;

const Title = styled.h3`
  display: none;
`;

const Button = styled.span`
  font-size: 1.2rem;
  font-weight: bold;


  ${CardContent}:hover & {
    font-size: 1.4rem;
    text-docoration : underline;
  }
`;

export { Card, BackgroundImage, CardContent, Title, Button };
