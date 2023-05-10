import styled from "styled-components";
import { Button } from "@mui/material";

export const DetailContainer = styled.div`
  width: 75%;
  margin: 0 auto;
  margin-top: 3%;
`;

export const DetailTop = styled.div`
  display: flex;
  height: 40vh;
  min-height: 400px;
  min-width: 1050px;
  border-top: 1px solid #ccc;
  padding-top: 7px;
`;

export const ImageSection = styled.div`
  width: 50%;
  display: flex;
  justify-content: left;
  align-items: center;
`;

export const TitleSection = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
`;

export const horizon = styled.hr`
  border-width: 1px 0px 0px 0px;
  border-style: solid;
  color: #ccc;
  height: 1px;
  min-width: 1050px;
`;

export const InfoSection = styled.div`
  width: 50%;
`;

export const Thumbnail = styled.img`
  width: 90%;
  height: 90%;
  object-fit: cover;
`;

export const DetailInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 20px;
`;

export const DetailMiddle = styled.div`
  padding-top: 15px;
  min-height: 300px;
  min-width: 1050px;
`;

export const DetailBottom = styled.div`
  min-width: 1050px;
`;

export const ButtonsContainer = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  min-width: 1050px;
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
