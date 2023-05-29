import { Button, Avatar } from "@mui/material";
import styled from "styled-components";

export const CommentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const CommentCount = styled.div`
  margin-top: 10px;
  font-size: 20px;
  margin-bottom: 10px;
`;

export const CommentList = styled.ul`
  padding: 0;
  margin: 16px 10;
  // border: 1px solid #ccc;
  border-radius: 4px;
`;

export const CommentItem = styled.li`
  display: flex;
  flex-direction: column;
  // align-items: center;
  border-bottom: 1px solid #ccc;
  list-style-type: none;
  margin: 16px 0;
`;

export const CommentProfile = styled.div`
  display: flex;
  align-items: center;
  list-style-type: none;
  margin-left: 10px;
  margin-top: 10px;
`;

export const CommentImg = styled(Avatar)`
  && {
    margin-right: 8px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-left: 10px;
  }
`;

export const CommentAuthor = styled.span`
  font-weight: bold;
  min-width: 5%;
`;
export const CommentInfo = styled.span`
  display: flex;
  flex-direction: column;
`;

export const CommentNickname = styled.span`
  font-weight: bold;
  min-width: 5%;
  margin-right: 8px;
`;

export const CommentContent = styled.span`
  white-space: pre-line;
`;

export const CommentButton = styled(Button)`
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

export const CommentDate = styled.span`
  font-size: 0.8rem;
  color: gray;
  margin-left: auto;
  margin-bottom: 5px;
  margin-top: 5px;
`;

export const CommentForm = styled.form`
  display: flex;
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

export const Reply = styled.div`
  font-size: 0.8rem;
  color: gray;
  margin-left: auto;
  margin-right: 5px;
  margin-bottom: 10px;
`;

export const ReplyButtonSpace = styled.div`
  width: 4px;
  height: auto;
  display: inline-block;
`;

export const ReplyButton = styled(Button)`
  && {
    color: #fff;
    background-color: #fbd385;
    width: auto;
    height: 30px;
    margin-left: auto;
    margin-top: 8px;
    &:hover {
      background-color: #ffbe3f;
    }
  }
`;

export const UpdateButton = styled(Button)`
  && {
    color: #fff;
    background-color: #bfbfbf;
    width: auto;
    height: 30px;
    margin-left: auto;
    margin-top: 8px;
    &:hover {
      background-color: #7f7f7f;
    }
  }
`;

export const DeleteButton = styled(Button)`
  && {
    color: #fff;
    background-color: #ff8282;
    width: auto;
    height: 30px;
    margin-left: auto;
    margin-top: 8px;
    &:hover {
      background-color: #ed4f4f;
    }
  }
`;

export const ReplyItem = styled(CommentItem)`
  margin-left: 40px; // 답글의 들여쓰기
`;

export const ReplyForm = styled.form`
  display: flex;
  margin-top: 5px;
  margin-bottom: 10px;
  flex-direction: column;
`;

export const ReplyInput = styled.textarea`
  flex: 1;
  padding: 8px 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: none;
  min-height: 100px;
  box-sizing: border-box;
`;

export const ReplySubmit = styled.div`
  align-items: right;
`;

export const EditForm = styled.form`
  display: flex;
  margin-top: 5px;
  flex-direction: column;
`;

export const EditInput = styled(CommentInput)`
  min-height: 100px;
`;

export const EditButton = styled(ReplyButton)``;

export const CommentContentWrapper = styled.div`
  margin-top: 10px;
  margin-left: 20px;
  min-height: 50px;
`;

export const SecretWrapper = styled.div`
  margin-top: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SecretCheckInput = styled.input`
  margin-left: 5px;
  width: 15px;
  height: 15px;
  accent-color: #fbd385;
`;
export const ReplySecretCheckInput = styled.input`
  margin-left: 5px;
  width: 15px;
  height: 15px;
  accent-color: #fbd385;
`;
