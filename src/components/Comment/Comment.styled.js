import { Button, Avatar  } from "@mui/material";
import styled from "styled-components";

export const CommentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const CommentList = styled.ul`
  padding: 0;
  margin: 16px 10;
`;

export const CommentItem = styled.li`
  display: flex;
  align-items: center;
  border-bottom : 1px solid #ccc;
  list-style-type: none;
  margin-top: 16px;
  margin-bottom: 16px
`;

export const CommentImg = styled(Avatar)`
  && {
    margin-right: 8px;
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }
`;

export const CommentAuthor = styled.span`
  font-weight: bold;
  min-width : 5%;
`;

export const CommentContent = styled.span`
  margin-left: 8px;
  white-space: pre-line;
`;

export const CommentButton = styled(Button)`
    &&{
    color: #fff;
    background-color: #fbd385;
    width: auto;
    margin-left: auto;
    margin-top: 8px;
    &:hover {
      background-color: #ffbe3f;
    }
  }
`;

export const CommentDate = styled.span`
  font-size: 0.8rem;
  color: gray;
  margin-left: auto;
`;

export const CommentForm = styled.form`
  display: flex;
  margin-top: 16px;
  flex-direction: column;
  
`;

export const CommentInput = styled.textarea`
  flex: 1;
  padding: 8px 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: none;
  width: 100%;
  min-height: 150px;
  box-sizing: border-box;
`;

export const CommentSubmit = styled.div`
align-items: right;
`;