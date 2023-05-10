import React, { useState, useEffect } from "react";
import * as S from "./VolunteerReviewDetail.styled";
import { useParams, useNavigate } from "react-router-dom";
import {} from "@mui/material";
import axios from "axios";
import NotFound from "../../NotFound/NotFound";
import Loading from "../../../components/Loading/LoadingPage";
import Comment from "../../../components/Comment/Comment";
import { SUPPORT } from "../../../constants/PageURL";
import DOMPurify from "dompurify";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
};

const VolunteerReviewDetail = () => {
  const [post, setPost] = useState(null); // volunteer 데이터 객체 저장 상태값
  const [isLoading, setIsLoading] = useState(true); //로딩 상태
  const { id } = useParams(); //게시글 id
  const navigate = useNavigate();

  useEffect(() => {
    //게시글 Detail 호출
    const fetchPost = async () => {
      try {
        await axios.post(
          `http://localhost:8080/donate/volunteer/review/${id}/increase-viewcount`
        ); //조회수 증가
        const response = await axios.get(
          `http://localhost:8080/donate/volunteer/review/${id}`
        ); //게시글 Detail 데이터  호출
        setPost(response.data);
      } catch (error) {
        console.error("Error fetching data : ", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (isLoading) {
    return <Loading />; // 로딩 중일 때 표시할 컴포넌트
  }

  if (!post) {
    return <NotFound />; //존재하지 않는 번호를 넣었을 때 표시할 컴포넌트
  }

  const handleEdit = () => {
    //수정
    navigate(SUPPORT.VOLUNTEER_REVIEW_MODIFY(id));
  };

  const handleDelete = async () => {
    // 삭제
    const result = window.confirm("정말 삭제하시겠습니까?");
    if (result) {
      try {
        await axios.delete(
          `http://localhost:8080/donate/volunteer/review/${id}`
        );
        alert("게시물이 삭제되었습니다.");
        navigate(SUPPORT.VOLUNTEER_REVIEW);
      } catch (error) {
        console.error("Error deleting post: ", error);
      }
    }
  };

  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  return (
    <S.DetailContainer>
      <S.Title>봉사 후기 게시판</S.Title>
      <S.DetailTop>
        <h2>제목 {post.reviewSubject}</h2>
      </S.DetailTop>
      <S.TopInfo>
        <S.TopNickname>밍키맘{post.memberNum}</S.TopNickname>
        <S.TopDate>
          <AccessTimeIcon sx={{ color: "#808080", width: 18, height: 18 }} />
          {formatDate(post.reviewDate)}
        </S.TopDate>
        <S.TopViewCount>
          <VisibilityOutlinedIcon
            sx={{ color: "#808080", width: 18, height: 18 }}
          />{" "}
          {post.reviewCount}
        </S.TopViewCount>
      </S.TopInfo>
      <S.horizon />
      <S.DetailMiddle>
        <div dangerouslySetInnerHTML={createMarkup(post.reviewContent)} />
      </S.DetailMiddle>
      <S.ButtonsContainer>
        <S.Buttons onClick={handleEdit} variant="contained">
          수정
        </S.Buttons>
        <S.ButtonsSpace />
        <S.Buttons onClick={handleDelete} variant="contained">
          삭제
        </S.Buttons>
      </S.ButtonsContainer>

      <S.DetailBottom>
        <S.horizon />
        <h2>댓글 </h2>
        <S.horizon />
        <div style={{ width: "100%" }}>
          <Comment />
        </div>
      </S.DetailBottom>
    </S.DetailContainer>
  );
};

export default VolunteerReviewDetail;
