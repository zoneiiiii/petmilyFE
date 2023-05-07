import React, { useState } from "react";
import * as S from "./Comment.styled";
import Pagination from "../Support/Volunteer/VolunteerPagination";
import DOMPurify from "dompurify"; //XSS 공격 방어 검증 라이브러리

const Comment = () => {
  const [comments, setComments] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const itemsPerPage = 10;
  const [page, setPage] = useState(1);

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const displayComments = comments.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const encodedInputValue = inputValue
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  const formatDate = (dateString) => {
    //날짜 변환함수
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hour = String(date.getHours()).padStart(2, "0");
    const minute = String(date.getMinutes()).padStart(2, "0");
    return `${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분`;
  };

  const handleInputChange = (e) => {
    //댓글 입력 이벤트 벨류 상태 수정
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // 기본동작인 새로 고침을 막아줌.
    if (inputValue.trim() === "") return;

    const newComment = {
      memberImg: "https://picsum.photos/300/300",
      memberNickname: "닉네임1", // 추후 memberNum을 통해 닉네임 가져오기.
      memberNum: 1, // 임시로 사용자 번호를 1로 설정
      boardId: "volunteer", // 예시로 사용하는 게시판 ID
      boardNum: 1, // 예시로 사용하는 게시글 번호
      commentContent: DOMPurify.sanitize(encodedInputValue), //XSS 검증
      commentCreate: new Date().toISOString(),
      commentUpdate: new Date().toISOString(),
      commentPnum: null,
      showReplyInput: false, // 답글 입력 UI를 표시할지 여부
    };

    setComments([...comments, newComment]);
    setInputValue("");
  };

  const handleReplySubmit = (e, index) => {
    e.preventDefault();
    const newComments = [...comments];
    const replyInputValue = e.target.replyInput.value;
    const encodedreplyInputValue = replyInputValue
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    if (replyInputValue.trim() === "") return;

    const newReply = {
      memberImg: "https://picsum.photos/300/300",
      memberNickname: "닉네임1", // 추후 memberNum을 통해 닉네임 가져오기.
      memberNum: 1, // 임시로 사용자 번호를 1로 설정
      boardId: "volunteer", // 예시로 사용하는 게시판 ID
      boardNum: 1, // 예시로 사용하는 게시글 번호
      commentContent: DOMPurify.sanitize(encodedreplyInputValue),
      commentCreate: new Date().toISOString(),
      commentUpdate: new Date().toISOString(),
      commentPnum: comments[index].commentNum, // 부모 댓글 번호 설정
    };

    // 답글을 해당 댓글 바로 다음에 추가
    newComments.splice(index + 1, 0, newReply);
    newComments[index].showReplyInput = false; // 답글 입력 창 닫기
    setComments(newComments);
    e.target.replyInput.value = "";
  };

  const handleReplyClick = (index) => {
    //답글 버튼 클릭시 답글 폼 표시 / 답글 상태 관리
    const newComments = [...comments];
    newComments[index].showReplyInput = !newComments[index].showReplyInput;
    setComments(newComments);
  };

  const handleDeleteClick = (index) => {
    const newComments = [...comments];
    newComments.splice(index, 1);
    setComments(newComments);
  };

  const handleEditClick = (index) => {
    // 수정 클릭시 수정 폼 표시
    const newComments = [...comments];
    newComments[index].showEditForm = !newComments[index].showEditForm;
    if (newComments[index].showEditForm) {
      // 인코딩된 값을 수정 폼에 사용하도록 변경
      newComments[index].commentContent = newComments[index].commentContent
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">");
    } else {
      // 취소 버튼 클릭시 다시 인코딩된 값을 사용하도록 변경
      newComments[index].commentContent = newComments[index].commentContent
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
    }
    setComments(newComments);
  };

  const handleEditSubmit = (e, index) => {
    //수정 완료 시
    e.preventDefault();
    const newComments = [...comments];
    const editInputValue = e.target.editInput.value;
    const encodedEditInputValue = editInputValue
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    if (editInputValue.trim() === "") return;

    newComments[index].commentContent = DOMPurify.sanitize(
      encodedEditInputValue
    );
    newComments[index].commentUpdate = new Date().toISOString();
    newComments[index].showEditForm = false; // 수정 폼 닫기
    setComments(newComments);
  };

  return (
    <S.CommentWrapper>
      <S.CommentCount> 💬 {comments.length}개의 댓글</S.CommentCount>
      <S.CommentList>
        {displayComments.map((comment, index) => {
          const isReply = comment.commentPnum !== null;
          const CommentItemComponent = isReply ? S.ReplyItem : S.CommentItem;

          return (
            <CommentItemComponent key={index}>
              <S.CommentProfile>
                <S.CommentImg src={comment.memberImg}></S.CommentImg>
                <S.CommentInfo>
                  <S.CommentAuthor>{comment.memberNickname}</S.CommentAuthor>
                  <S.CommentDate>
                    {formatDate(comment.commentCreate)}
                  </S.CommentDate>
                </S.CommentInfo>
              </S.CommentProfile>

              <S.CommentContentWrapper>
                {!comment.showEditForm ? (
                  <S.CommentContent
                    dangerouslySetInnerHTML={{
                      __html: comment.commentContent.replace(/\n/g, "<br />"),
                    }}
                  ></S.CommentContent>
                ) : (
                  <S.EditForm onSubmit={(e) => handleEditSubmit(e, index)}>
                    <S.EditInput
                      type="text"
                      defaultValue={comment.commentContent}
                      name="editInput"
                    />
                    <S.Reply>
                      <S.EditButton type="submit" variant="contained">
                        수정완료
                      </S.EditButton>
                      <S.ReplyButtonSpace />
                      <S.EditButton
                        onClick={() => handleEditClick(index)}
                        variant="contained"
                      >
                        취소
                      </S.EditButton>
                    </S.Reply>
                  </S.EditForm>
                )}
              </S.CommentContentWrapper>

              <S.Reply>
                {!isReply && ( //답글이 아닐 경우에만 답글 버튼 표시
                  <>
                    <S.ReplyButton onClick={() => handleReplyClick(index)}>
                      답글
                    </S.ReplyButton>
                    <S.ReplyButtonSpace />
                  </>
                )}
                <S.ReplyButton onClick={() => handleEditClick(index)}>
                  수정
                </S.ReplyButton>
                <S.ReplyButtonSpace />
                <S.ReplyButton onClick={() => handleDeleteClick(index)}>
                  삭제
                </S.ReplyButton>
              </S.Reply>

              {comment.showReplyInput && (
                <S.ReplyForm onSubmit={(e) => handleReplySubmit(e, index)}>
                  <S.ReplyInput
                    type="text"
                    placeholder="답글 입력..."
                    name="replyInput"
                  />
                  <S.ReplyButton type="submit" variant="contained">
                    답글쓰기
                  </S.ReplyButton>
                </S.ReplyForm>
              )}
            </CommentItemComponent>
          );
        })}
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
      <Pagination
        count={Math.ceil(comments.length / itemsPerPage)}
        page={page}
        onChange={handleChangePage}
      />
    </S.CommentWrapper>
  );
};

export default Comment;
