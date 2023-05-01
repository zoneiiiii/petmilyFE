import React, {useState} from 'react';
import * as S from "./Comment.styled";

const Comment = () => {
    const [comments, setComments] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const formatDate = (dateString) => { //날짜 변환함수
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hour = String(date.getHours()).padStart(2, '0');
        const minute = String(date.getMinutes()).padStart(2, '0');
        return `${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분`;
      };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault(); // 기본동작인 새로 고침을 막아줌.
        if (inputValue.trim() === '') return;

        const newComment = {
            memberImg: "",
            memberNickname : '닉네임1', // 추후 memberNum을 통해 닉네임 가져오기.
            memberNum: 1, // 임시로 사용자 번호를 1로 설정
            boardId: 'free', // 예시로 사용하는 게시판 ID
            boardNum: 1, // 예시로 사용하는 게시글 번호
            commentContent: inputValue,
            commentCreate: new Date().toISOString(),
            commentUpdate: new Date().toISOString(),
            commentPnum: null,
        };
    
        setComments([...comments, newComment]);
        setInputValue('');
    }

    return (
        <S.CommentWrapper>
        <S.CommentList>
          {comments.map((comment, index) => (
            <S.CommentItem key={index}>
              <S.CommentImg>{comment.memberImg}</S.CommentImg>
              <S.CommentAuthor>{comment.memberNickname}</S.CommentAuthor>
              <S.CommentContent   dangerouslySetInnerHTML={{
              __html: comment.commentContent.replace(/\n/g, '<br />'),}}></S.CommentContent>
              <S.CommentDate>{formatDate(comment.commentCreate)}</S.CommentDate>
            </S.CommentItem>
          ))}
        </S.CommentList>
        <S.CommentForm onSubmit={handleSubmit}>
          <S.CommentInput
            type="text"
            placeholder="댓글 입력..."
            value={inputValue}
            onChange={handleInputChange}
          />
          <S.CommentButton type="submit" variant="contained">
            댓글쓰기
          </S.CommentButton>
        </S.CommentForm>
      </S.CommentWrapper>
    );
};

export default Comment;