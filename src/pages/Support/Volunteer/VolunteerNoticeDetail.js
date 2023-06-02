import React, { useState, useEffect, useContext } from "react";
import * as S from "./VolunteerNoticeDetail.styled";
import { useParams, useNavigate } from "react-router-dom";
import {
  Popover,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  ThemeProvider,
} from "@mui/material";
import axios from "axios";
import NotFound from "../../NotFound/NotFound";
import Loading from "../../../components/Loading/LoadingPage";
import MapModal from "../../../components/Map/MapModal";
import Comment from "../../../components/Comment/Comment";
import { SUPPORT } from "../../../constants/PageURL";
import DOMPurify from "dompurify";
import { CustomTheme } from "../../../assets/Theme/CustomTheme";
import { AuthContext } from "../../../contexts/AuthContexts";
import styled from "styled-components";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}년 ${month}월 ${day}일`;
};

const VolunteerNoticeDetail = () => {
  const [post, setPost] = useState(null); // volunteer 데이터 객체 저장 상태값
  const [isLoading, setIsLoading] = useState(true); //로딩 상태
  const { id } = useParams(); //게시글 id
  const { userNum } = useContext(AuthContext);
  const [isMapVisible, setIsMapVisible] = useState(false); // 맵 모달 상태 (열림, 닫힘)
  const [anchorEl, setAnchorEl] = useState(null); //클릭 위치에 모달 띄우기 위한 상태값
  const navigate = useNavigate();

  useEffect(() => {
    //게시글 Detail 호출
    const fetchPost = async () => {
      try {
        await axios.post(
          `http://localhost:8080/board/volunteer/${id}/increase-viewcount`
        ); //조회수 증가
        const response = await axios.get(
          `http://localhost:8080/board/volunteer/${id}`
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

  const toggleMapModal = () => {
    //모달 상태 관리
    setIsMapVisible(!isMapVisible);
  };

  const handleMapButtonClick = (event) => {
    //버튼 클릭시 해당 위치에 모달창 띄우기
    setAnchorEl(event.currentTarget);
    toggleMapModal();
  };

  const handleClose = () => {
    // 닫기 버튼 클릭시 닫기
    setAnchorEl(null);
    toggleMapModal();
  };

  const handleEdit = () => {
    //수정
    navigate(SUPPORT.VOLUNTEER_NOTICE_MODIFY(id));
  };
  const handleReturn = () => {
    //수정
    navigate(SUPPORT.VOLUNTEER_NOTICE);
  };

  const handleDelete = async () => {
    // 삭제
    const result = window.confirm("정말 삭제하시겠습니까?");
    if (result) {
      try {
        await axios.delete(`http://localhost:8080/board/volunteer/${id}`, {
          withCredentials: true,
        });
        alert("게시물이 삭제되었습니다.");
        navigate(SUPPORT.VOLUNTEER_NOTICE);
      } catch (error) {
        if (error.response) {
          alert("해당 게시글을 삭제할 권한이 없습니다.");
        } else {
          console.error("Error deleting post: ", error);
        }
      }
    }
  };

  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  return (
    <ThemeProvider theme={CustomTheme}>
      <S.Section className="result">
        <S.DetailContainer>
          <Container>
            <S.DetailTop>
              <S.ImageSection>
                <S.Thumbnail src={post.imgThumbnail} alt="Thumbnail" />
              </S.ImageSection>
              <S.InfoSection>
                <S.DetailInfo>
                  <S.TitleSection>
                    <h1>{post.volunteerSubject}</h1>
                  </S.TitleSection>
                  <TableContainer align="center" sx={{ width: "100%" }}>
                    <Table sx={{ maxWidth: 700 }}>
                      <TableBody>
                        <TableRow>
                          <TableCell
                            align="center"
                            sx={{
                              fontWeight: "bold",
                              width: "100px",
                            }}
                          >
                            보호소
                          </TableCell>
                          <TableCell>{post.shelterName}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell align="center" sx={{ fontWeight: "bold" }}>
                            활동기간
                          </TableCell>
                          <TableCell>
                            {formatDate(post.volunteerStartPeriod)} ~{" "}
                            {formatDate(post.volunteerEndPeriod)}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell align="center" sx={{ fontWeight: "bold" }}>
                            모집인원
                          </TableCell>
                          <TableCell>{post.volunteerNumber} 명</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell align="center" sx={{ fontWeight: "bold" }}>
                            나이제한
                          </TableCell>
                          <TableCell>{post.volunteerAge}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell align="center" sx={{ fontWeight: "bold" }}>
                            모집상태
                          </TableCell>
                          <TableCell>
                            {post.volunteerStatus ? "모집중" : "모집완료"}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell
                            align="center"
                            sx={{
                              fontWeight: "bold",
                              borderBottom: "none",
                            }}
                          >
                            주소 &nbsp;
                            <Button
                              onClick={handleMapButtonClick}
                              size="small"
                              sx={{
                                color: "#FBD385",
                                height: "50%",
                                "&:hover": {
                                  backgroundColor: "#FBD385",
                                  color: "#FFF",
                                },
                              }}
                            >
                              지도보기
                            </Button>
                          </TableCell>
                          <TableCell
                            sx={{
                              borderBottom: "none",
                              alignItems: "center",
                            }}
                          >
                            {post.volunteerAddr} {post.volunteerAddrDetail}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </S.DetailInfo>
              </S.InfoSection>
            </S.DetailTop>
            <S.horizon />
            <S.DetailMiddle
              dangerouslySetInnerHTML={createMarkup(post.volunteerContent)}
            />
            <S.ButtonsContainer>
              {post.memberNum === userNum && (
                <>
                  <S.EditButton onClick={handleEdit} variant="contained">
                    수정
                  </S.EditButton>
                  <S.ButtonsSpace />
                  <S.DeleteButton onClick={handleDelete} variant="contained">
                    삭제
                  </S.DeleteButton>
                  <S.ButtonsSpace />
                </>
              )}
              <S.ReturnButton onClick={handleReturn}>돌아가기</S.ReturnButton>
            </S.ButtonsContainer>
            {/* <S.DetailBottom>
            <S.horizon />
            <h2>댓글 </h2>
            <S.horizon />
            <div style={{ width: "90%" }}>
              <Comment boardId="volunteer" boardNum={id} />
            </div>
          </S.DetailBottom> */}

            <div style={{ width: "100%" }}>
              <Comment boardId="review" boardNum={id} />
            </div>
          </Container>
        </S.DetailContainer>
        <Popover
          open={isMapVisible}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          {isMapVisible && (
            <MapModal address={post.volunteerAddr} onClose={handleClose} />
          )}
        </Popover>
      </S.Section>
    </ThemeProvider>
  );
};

export default VolunteerNoticeDetail;
const Container = styled.div`
  margin: 20px;
`;
