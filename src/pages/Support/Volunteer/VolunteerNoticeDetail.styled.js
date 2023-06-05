import styled from "styled-components";
import { Button } from "@mui/material";

export const DetailContainer = styled.div`
  // width: 75%;
  // margin: 0 auto;
  // margin-top: 3%;
  width: 60vw;
  // width: 1150px;
  max-width: 1150px;
  min-width: 790px;
  border-radius: 8px;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(233, 236, 239);
  border-image: initial;
  margin: 0px auto 20px;
  background: rgb(255, 255, 255);
`;
export const Section = styled.section`
  background: #f8f9fa;
  padding: 30px 0 40px 0;
`;

export const DetailTop = styled.div`
  display: flex;
  // height: 45vh;
  min-height: 400px;
  // min-width: 1050px;

  padding-top: 7px;
  margin-bottom: 7px;
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
  margin-top: 5px;
  height: 1px;
  // min-width: 1050px;
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
`;

export const DetailMiddle = styled.div`
  padding-top: 15px;
  min-height: 300px;

  // min-width: 1050px;
  img {
    max-width: 100%;
    height: auto;
  }
`;

export const DetailBottom = styled.div`
  // min-width: 1050px;
`;

export const ButtonsContainer = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  // min-width: 1050px;
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

// export const DeleteButton = styled(Button)`
//   && {
//     color: #fff;
//     background-color: #ff8282;
//     width: auto;
//     height: 30px;
//     margin-top: 5px;
//     margin-bottom: 5px;
//     &:hover {
//       background-color: #ed4f4f;
//     }
//   }
// `;
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
