import styled from "styled-components";
import { Button, Avatar } from "@mui/material";

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
  // min-width: 70vw;
  border-top: 1px solid #ccc;
  padding-top: 7px;
`;

export const horizon = styled.hr`
  border-width: 1px 0px 0px 0px;
  border-style: solid;
  color: #ccc;
  height: 1px;
  // min-width: 70vw;
`;

export const TopInfo = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
`;

export const UserImg = styled(Avatar)`
  && {
    margin-right: 8px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-left: 5px;
  }
`;

export const TopNickname = styled.div`
  font-weight: bold;
  align-items: center;
`;

export const TopDate = styled.div`
  display: flex;
  align-items: center;
  margin-left: 16px;
  gap: 4px;
  font-size: 15px;
  color: #808080;
`;

export const TopViewCount = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  gap: 4px;
  font-size: 15px;
`;

export const DetailMiddle = styled.div`
  padding-top: 15px;
  min-height: 300px;
  // min-width: 70vw;

  img {
    max-width: 100%;
    height: auto;
  }
`;

export const DetailBottom = styled.div`
  // min-width: 70vw;
`;

export const ButtonsContainer = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  // min-width: 70vw;
  display: flex;
  justify-content: flex-end;
`;

export const ButtonsSpace = styled.div`
  width: 4px;
  height: auto;
  display: inline-block;
`;

export const EditButton = styled(Button)`
  && {
    color: #fff;
    background-color: #FBD385;
    width: auto;
    height: 30px;
    margin-top: 5px;
    margin-bottom: 5px;
    &:hover {
      background-color: #AF935D;
    }
  }
`;

export const DeleteButton = styled(Button)`
  && {
    color: #fff;
    background-color: #ff8282;
    width: auto;
    height: 30px;
    margin-top: 5px;
    margin-bottom: 5px;
    &:hover {
      background-color: #B25B5B;
    }
  }
`;
export const ReturnButton = styled(Button)`
  && {
    color: #fff;
    background-color: #bfbfbf;
    width: auto;
    height: 30px;
    margin-top: 5px;
    margin-bottom: 5px;
    &:hover {
      background-color: #858585;
    }
  }
`;
