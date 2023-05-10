import { Button } from "@mui/material";
import styled from "styled-components";

export const TitleContainer = styled.div`
  margin-top: 2vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 2rem;
`;

export const Container = styled.div`
  margin-top: 3vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const FormWrapper = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const FormRow = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 16px;
  align-items: center;
`;

export const FormRow2 = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 16px;
`;

export const ButtonGroup = styled.div`
  font-size: 0.8rem;
  color: gray;
  margin-left: auto;
  margin-right: 5px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const StatusWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-grow: 1;
`;

export const PreviewWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 16px;
`;

export const ButtonSpace = styled.div`
  width: 4px;
  height: auto;
  display: inline-block;
`;

export const CommonSpace = styled.div`
  width: 10px;
  height: auto;
  display: inline-block;
`;

export const CommonButton = styled(Button)`
  && {
    color: #fff;
    background-color: #fbd385;
    width: auto;
    &:hover {
      background-color: #ffbe3f;
    }
  }
`;

export const WriteButton = styled(Button)`
  && {
    color: #fff;
    background-color: #fbd385;
    width: auto;
    margin-left: auto;
    &:hover {
      background-color: #ffbe3f;
    }
  }
`;

export const EditorWrapper = styled.div`
  .ck.ck-editor__editable:not(.ck-editor__nested-editable) {
    min-height: 500px;
    width: 700px;
  }
`;
