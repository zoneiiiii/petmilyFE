import React, { useState, useEffect } from "react";
import * as S from "./Comment.styled";
import Pagination from "../Support/Volunteer/VolunteerPagination";
import DOMPurify from "dompurify"; //XSS 공격 방어 검증 라이브러리
import axios from "axios";

const Comment = ({ boardId, boardNum }) => {
  const [comments, setComments] = useState([]);
  const [inputValue, setInputValue] = useState(""); //댓글 입력 상태
  const [replyValue, setReplyValue] = useState(""); //답글 입력 상태
  const [secretChecked, setSecretChecked] = useState(false); // 댓글의 비밀댓글 체크 상태
  const [replySecretChecked, setReplySecretChecked] = useState(false); //대댓글 비밀댓글 체크 상태

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

  const encodedReplyValue = replyValue
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `/board/comment/${boardId}/${boardNum}`
        );
        const data = response.data;
        console.log("Received data: ", data);
        // <-- 댓글, 답글 정렬 로직
        const originalComments = data.filter(
          (comment) => comment.commentPnum === null
        );
        const replyComments = data.filter(
          (comment) => comment.commentPnum !== null
        );

        // 원 댓글에 대해 답글을 찾아 추가
        for (let comment of originalComments) {
          const replies = replyComments.filter(
            (reply) => reply.commentPnum === comment.commentNum
          );
          const replyIdx = originalComments.indexOf(comment);
          originalComments.splice(replyIdx + 1, 0, ...replies);
        }
        // setComments(data);
        setComments(originalComments);
        // -->
      } catch (error) {
        console.error("댓글 불러오기 실패 : ", error.response || error.message);
      }
    };

    fetchComments();
  }, [boardId, boardNum]);

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

  const handleCheckboxChange = (e) => {
    //비밀댓글 체크박스 벨류 상태 수정
    if (e.target.name === "isSecret") {
      setSecretChecked(e.target.checked);
    }
  };

  const handleReplyInputChange = (e) => {
    //답글 입력 이벤트 벨류 상태 수정
    setReplyValue(e.target.value);
  };

  const handleReplyCheckboxChange = (e) => {
    //비밀댓글 체크박스 벨류 상태 수정
    if (e.target.name === "isReplySecret") {
      setReplySecretChecked(e.target.checked);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // 기본동작인 새로 고침을 막아줌.
    if (inputValue.trim() === "") return;

    const newComment = {
      boardId: boardId, //  props로 전달받은 게시판 ID
      boardNum: boardNum, //  props로 전달받은 게시글 번호
      commentContent: DOMPurify.sanitize(encodedInputValue), //XSS 검증
      commentPnum: null,
      showReplyInput: false, // 답글 입력 UI를 표시할지 여부
      commentIsSecret: secretChecked, // 비밀 댓글 여부
    };

    try {
      const { data: createdComment } = await axios.post(
        "/board/comment/write",
        newComment
      );
      setComments([...comments, createdComment]);
    } catch (error) {
      console.error("Error:", error);
    }

    setInputValue("");
    setSecretChecked(false);
  };

  const handleReplySubmit = async (e, index) => {
    e.preventDefault();
    const newComments = [...comments];

    if (replyValue.trim() === "") return;

    const newReply = {
      boardId: boardId, // props로 전달받은 게시판 ID
      boardNum: boardNum, //  props로 전달받은 게시글 번호
      commentContent: DOMPurify.sanitize(encodedReplyValue),
      commentPnum: comments[index].commentNum, // 부모 댓글 번호 설정
      commentIsSecret: replySecretChecked,
    };

    // 답글을 해당 댓글 바로 다음에 추가
    try {
      const { data: createdComment } = await axios.post(
        "/board/comment/write",
        newReply
      );
      const insertIndex = newComments
        .slice(index + 1)
        .findIndex((comment) => comment.commentPnum === null);
      if (insertIndex !== -1) {
        newComments.splice(index + 1 + insertIndex, 0, createdComment);
      } else {
        newComments.push(createdComment);
      }
    } catch (error) {
      console.error("Error:", error);
    }
    newComments[index].showReplyInput = false; // 답글 입력 창 닫기

    setComments(newComments);
    setReplyValue("");
    setReplySecretChecked(false);
  };

  const handleReplyClick = (index) => {
    //답글 버튼 클릭시 답글 폼 표시 / 답글 상태 관리
    const newComments = [...comments];
    newComments[index].showReplyInput = !newComments[index].showReplyInput;
    setComments(newComments);
  };

  const handleDeleteClick = async (index) => {
    const commentIdToDelete = comments[index].commentNum;

    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        await axios.delete(`/board/comment/${commentIdToDelete}`);
        const newComments = [...comments];
        newComments.splice(index, 1);
        setComments(newComments);
      } catch (error) {
        console.error("Error:", error);
      }
    }
    // const newComments = [...comments];
    // newComments.splice(index, 1);
    // setComments(newComments);
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
                    <S.SecretWrapper>
                      비밀 댓글
                      <S.SecretCheckInput
                        type="checkbox"
                        name="isSecret"
                        defaultChecked={comment.commentIsSecret}
                        onChange={handleCheckboxChange}
                      />
                      <S.Reply>
                        <S.EditButton type="submit" variant="contained">
                          수정완료
                        </S.EditButton>
                        <S.ReplyButtonSpace />
                        <S.DeleteButton
                          onClick={() => handleEditClick(index)}
                          variant="contained"
                        >
                          취소
                        </S.DeleteButton>
                      </S.Reply>
                    </S.SecretWrapper>
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
                <S.DeleteButton onClick={() => handleDeleteClick(index)}>
                  삭제
                </S.DeleteButton>
              </S.Reply>

              {comment.showReplyInput && (
                <S.ReplyForm onSubmit={(e) => handleReplySubmit(e, index)}>
                  <S.ReplyInput
                    type="text"
                    placeholder="답글 입력..."
                    value={replyValue}
                    onChange={handleReplyInputChange}
                  />
                  <S.SecretWrapper>
                    비밀 댓글
                    <S.ReplySecretCheckInput
                      type="checkbox"
                      name="isReplySecret"
                      checked={replySecretChecked}
                      onChange={handleReplyCheckboxChange}
                    />
                    <S.ReplyButton type="submit" variant="contained">
                      답글쓰기
                    </S.ReplyButton>
                  </S.SecretWrapper>
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
        <S.SecretWrapper>
          비밀 댓글
          <S.SecretCheckInput
            type="checkbox"
            name="isSecret"
            checked={secretChecked}
            onChange={handleCheckboxChange}
          />
          <S.CommentButton type="submit" variant="contained">
            댓글쓰기
          </S.CommentButton>
        </S.SecretWrapper>
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
