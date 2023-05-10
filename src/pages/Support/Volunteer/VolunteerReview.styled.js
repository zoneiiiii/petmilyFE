import styled from "styled-components";
import { Button } from "@mui/material";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  min-width: 1200px;
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 2rem;
`;

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  width: 95%;
  max-width: 1200px;
  justify-items: center; // 변경된 부분
`;

export const CardContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  margin: 0 1rem; // 좌우 여백 추가
  margin-bottom: 1rem;
`;

export const ButtonContainer = styled.div`
  min-width: 1100px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 20px;
`;

export const VolunteerButton = styled(Button)`
  && {
    color: #fff;
    background-color: #fbd385;
    width: auto;
    &:hover {
      background-color: #ffbe3f;
    }
  }
`;
