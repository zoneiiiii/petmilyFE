import styled from "styled-components";
import { Button } from "@mui/material";

export const DetailContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  margin-top: 3%;
`;

export const DetailTop = styled.div`
  display: flex;
`;

// const ImageSection = styled.div`

// `;

// const InfoSection = styled.div`

// `;

export const Thumbnail = styled.img`
  width: 25%;
  height: 25%;
`;

export const DetailInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 20px;
`;

export const DetailMiddle = styled.div``;

export const DetailBottom = styled.div``;

export const ButtonsContainer = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  justify-content: flex-end;
`;

export const ButtonsSpace = styled.div`
  width: 4px;
  height: auto;
  display: inline-block;
`;

export const Buttons = styled(Button)`
  && {
    color: #fff;
    background-color: #fbd385;
    width: auto;
    height: 30px;
    margin-top: 5px;
    margin-bottom: 5px;
    &:hover {
      background-color: #ffbe3f;
    }
  }
`;
