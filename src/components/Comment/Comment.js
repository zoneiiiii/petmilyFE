import React, { useState, useEffect, useContext } from "react";
import * as S from "./Comment.styled";
import Pagination from "../Support/Volunteer/VolunteerPagination";
import DOMPurify from "dompurify"; //XSS 공격 방어 검증 라이브러리
import axios from "axios";
import LockIcon from "@mui/icons-material/Lock";
import { AuthContext } from "../../contexts/AuthContexts";

const Comment = ({ boardId, boardNum }) => {
  const [comments, setComments] = useState([]);
  const [inputValue, setInputValue] = useState(""); //댓글 입력 상태
  const [replyValue, setReplyValue] = useState(""); //답글 입력 상태
  const [secretChecked, setSecretChecked] = useState(false); // 댓글의 비밀댓글 체크 상태
  const [replySecretChecked, setReplySecretChecked] = useState(false); //대댓글 비밀댓글 체크 상태
  const { userNum, loggedIn } = useContext(AuthContext);

  const itemsPerPage = 10;
  const [page, setPage] = useState(1);
  const [totalComments, setTotalComments] = useState(0);

  const commentCountRef = React.useRef(null);
  const handleChangePage = (event, value) => {
    setPage(value);
    commentCountRef.current.scrollIntoView(); //페이지클릭 시 스크롤 이동
    window.scrollBy(0, -100); //헤더때문에 가려져서 -100만큼 추가 이동.
  };

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
        const comments = response.data;

        const originalComments = comments.filter(
          (comment) => comment.commentPnum === null
        );
        const replyComments = comments.filter(
          (comment) => comment.commentPnum !== null
        );

        const orderedComments = [];

        originalComments.forEach((comment) => {
          orderedComments.push(comment);

          const correspondingReplies = replyComments.filter(
            (reply) => reply.commentPnum === comment.commentNum
          );
          correspondingReplies.forEach((reply) => {
            orderedComments.push(reply);
          });
        });

        setComments(orderedComments);
        setTotalComments(orderedComments.length);
      } catch (error) {
        console.error("댓글 불러오기 실패: ", error.response || error.message);
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
    e.preventDefault();
    if (!loggedIn) {
      alert("로그인 후 이용 가능합니다");
      return;
    }
    if (inputValue.trim() === "") return;

    const newComment = {
      boardId: boardId,
      boardNum: boardNum,
      commentContent: DOMPurify.sanitize(encodedInputValue),
      commentPnum: null,
      showReplyInput: false,
      commentIsSecret: secretChecked,
    };

    try {
      const { data: createdComment } = await axios.post(
        "/board/comment/write",
        newComment
      );

      const updatedComments = [...comments, createdComment].sort(
        (a, b) => a.commentNum - b.commentNum
      );
      setComments(updatedComments);
      setTotalComments(totalComments + 1);

      const lastPage = Math.ceil(updatedComments.length / itemsPerPage);
      setPage(lastPage);
    } catch (error) {
      console.error("Error:", error);
    }

    setInputValue("");
    setSecretChecked(false);
  };

  const handleReplySubmit = async (e, commentNum) => {
    e.preventDefault();

    if (replyValue.trim() === "") return;

    const newReply = {
      boardId: boardId,
      boardNum: boardNum,
      commentContent: DOMPurify.sanitize(encodedReplyValue),
      commentPnum: commentNum,
      commentIsSecret: replySecretChecked,
    };

    try {
      const { data: createdComment } = await axios.post(
        "/board/comment/write",
        newReply
      );

      const parentCommentIndex = comments.findIndex(
        (comment) => comment.commentNum === commentNum
      );
      let insertIndex = parentCommentIndex + 1;

      while (
        insertIndex < comments.length &&
        comments[insertIndex].commentPnum === commentNum
      ) {
        insertIndex++;
      }

      const newComments = [...comments];
      newComments.splice(insertIndex, 0, createdComment);

      newComments[parentCommentIndex].showReplyInput = false;
      setComments(newComments);
      setTotalComments(totalComments + 1);
    } catch (error) {
      console.error("Error:", error);
    }

    setReplyValue("");
    setReplySecretChecked(false);
  };

  const handleReplyClick = (commentNum) => {
    setComments(
      comments.map((comment) => {
        if (comment.commentNum === commentNum) {
          return { ...comment, showReplyInput: !comment.showReplyInput };
        }
        return comment;
      })
    );
  };

  const handleDeleteClick = async (commentNum) => {
    const commentIndex = comments.findIndex(
      (comment) => comment.commentNum === commentNum
    );

    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        await axios.delete(`/board/comment/${commentNum}`);
        const newComments = [...comments];
        newComments.splice(commentIndex, 1);
        setComments(newComments);
        setTotalComments(totalComments - 1);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const handleEditClick = (commentNum) => {
    setComments(
      comments.map((comment) => {
        if (comment.commentNum === commentNum) {
          return { ...comment, showEditForm: !comment.showEditForm };
        }
        return comment;
      })
    );
  };

  const handleEditSubmit = async (e, commentNum) => {
    //수정 완료 시
    e.preventDefault();
    const commentToEdit = comments.find(
      (comment) => comment.commentNum === commentNum
    );
    const editInputValue = e.target.editInput.value;
    const isSecretChecked = e.target.isSecret.checked;
    const encodedEditInputValue = editInputValue
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    if (editInputValue.trim() === "") return;

    const updatedCommentData = {
      commentContent: DOMPurify.sanitize(encodedEditInputValue),
      commentIsSecret: isSecretChecked,
    };

    try {
      const response = await axios.put(
        `/board/comment/${commentToEdit.commentNum}`,
        updatedCommentData
      );

      const updatedComment = response.data;

      const newComments = comments.map((comment) =>
        comment.commentNum === commentNum ? updatedComment : comment
      );
      setComments(newComments);
    } catch (error) {
      console.error("수정 실패 :", error);
    }

    commentToEdit.showEditForm = false; // 수정 폼 닫기
  };

  const displayComments = comments.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <S.CommentWrapper ref={commentCountRef}>
      <S.CommentCount> 💬 {totalComments}개의 댓글</S.CommentCount>
      <S.CommentList>
        {displayComments.map((comment, index) => {
          const isReply = comment.commentPnum !== null;
          const CommentItemComponent = isReply ? S.ReplyItem : S.CommentItem;

          return (
            <CommentItemComponent key={comment.commentNum}>
              <S.CommentProfile>
                <S.CommentImg src={comment.memberImg}></S.CommentImg>
                <S.CommentInfo>
                  <S.CommentAuthor>
                    {comment.memberNickname}{" "}
                    {comment.commentIsSecret && (
                      <LockIcon
                        sx={{
                          color: "#808080",
                          width: 15,
                          height: 15,
                          verticalAlign: "top",
                        }}
                      />
                    )}
                  </S.CommentAuthor>
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
                  <S.EditForm
                    onSubmit={(e) => handleEditSubmit(e, comment.commentNum)}
                  >
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
                          onClick={() => handleEditClick(comment.commentNum)}
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
                {!isReply &&
                  loggedIn && ( //답글이 아닐 경우에만, 로그인 상태일 경우에만 답글 버튼 표시
                    <>
                      <S.ReplyButton
                        onClick={() => handleReplyClick(comment.commentNum)}
                      >
                        답글
                      </S.ReplyButton>
                      <S.ReplyButtonSpace />
                    </>
                  )}
                {comment.memberNum === userNum && ( //댓글 작성자와 현재 로그인한 사용자가 같을 경우에만 표시
                  <>
                    <S.DeleteButton
                      onClick={() => handleDeleteClick(comment.commentNum)}
                    >
                      삭제
                    </S.DeleteButton>
                    <S.ReplyButtonSpace />
                    <S.UpdateButton
                      onClick={() => handleEditClick(comment.commentNum)}
                    >
                      수정
                    </S.UpdateButton>
                  </>
                )}
              </S.Reply>

              {comment.showReplyInput && (
                <S.ReplyForm
                  onSubmit={(e) => handleReplySubmit(e, comment.commentNum)}
                >
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
          readOnly={!loggedIn}
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
