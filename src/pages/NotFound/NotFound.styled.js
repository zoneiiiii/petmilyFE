import styled from "styled-components";

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Image = styled.img`
  width: 300px;
  height: auto;
`;

const Title = styled.h1`
  font-size: 5rem;
`;

const Message = styled.p`
  font-size: 1.5rem;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-around;
  width: 300px;
  margin-top: 20px;
`;

const Button = styled.button`
  border: none;
  background-color: transparent;
  color: #1c1c1c;
  font-weight : bold;
  font-size: 20px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export { NotFoundContainer, Image, Title, Message, Buttons, Button };
