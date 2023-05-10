import styled from "styled-components";
import { Button } from "@mui/material";

export const DetailContainer = styled.div`
  width: 70vw;
  margin: 0 auto;
  margin-top: 3%;
`;
export const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 2rem;
`;

export const DetailTop = styled.div`
  display: flex;
  min-width: 70vw;
  border-top: 1px solid #ccc;
  padding-top: 7px;
`;

export const horizon = styled.hr`
  border-width: 1px 0px 0px 0px;
  border-style: solid;
  color: #ccc;
  height: 1px;
  min-width: 70vw;
`;

export const TopInfo = styled.div`
  display: flex;
  padding-top: 7px;
  border-top: 1px solid #ccc;
`;

export const TopNickname = styled.div``;

export const TopDate = styled.div`
  display: flex;
  align-items: center;
  margin-left: 16px;
  gap: 4px;
  font-size: 13px;
`;

export const TopViewCount = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  gap: 4px;
  font-size: 13px;
`;

export const DetailMiddle = styled.div`
  padding-top: 15px;
  min-height: 300px;
  min-width: 70vw;
`;

export const DetailBottom = styled.div`
  min-width: 70vw;
`;

export const ButtonsContainer = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  min-width: 70vw;
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
