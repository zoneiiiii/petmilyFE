import styled from "styled-components";
import React, { useState, useEffect, useContext } from "react";
import Comment from "../../../components/Comment/Comment";
import { useParams, useNavigate } from "react-router-dom";
import {
  Button,
  ThemeProvider,
} from "@mui/material";
import { CustomTheme } from "../../../assets/Theme/CustomTheme";
import DOMPurify from "dompurify";
import { AuthContext } from "../../../contexts/AuthContexts";
import NotFound from "../../NotFound/NotFound";
import Loading from "../../../components/Loading/LoadingPage";
import { COMMUNITY } from "../../../constants/PageURL";
import axios from "axios";

const FindDetail = () => {
  const [data, setData] = useState([]); // DB 데이터 가져오는 변수
  const [isLoading, setIsLoading] = useState(true); //로딩 상태
  const { id } = useParams(); //게시글 id
  const { userNum } = useContext(AuthContext); // 로그인 상태 체크
  const navigate = useNavigate();

  /* axios start */
  useEffect(() => {
    //게시글 Detail 호출
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/board/find/${id}`
        ); //게시글 Detail 데이터  호출
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data : ", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPost();
  }, [id]);
  /* axios end */

  if (isLoading) {
    return <Loading />; // 로딩 중일 때 표시할 컴포넌트
  }

  if (!data) {
    return <NotFound />; //존재하지 않는 번호를 넣었을 때 표시할 컴포넌트
  }

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

  const handleEdit = () => {
    //수정
    navigate(COMMUNITY.FIND_MODIFY(id));
  };

  const handleDelete = async () => {
    // 삭제
    const result = window.confirm("정말 삭제하시겠습니까?");
    if (result) {
      try {
        await axios.delete(`http://localhost:8080/board/find/${id}`, {
          withCredentials: true,
        });
        alert("게시물이 삭제되었습니다.");
        navigate(COMMUNITY.FIND);
      } catch (error) {
        if (error.response) {
          alert("해당 게시글을 삭제할 권한이 없습니다.");
        } else {
          console.error("Error deleting post: ", error);
        }
      }
    }
  };

  const handleReturn = () => {
    // 돌아가기
    navigate(COMMUNITY.FIND);
  }

  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  return (
    <ThemeProvider theme={CustomTheme}>
      <Section className="result">
        <MainContainer className="result-container">
          <Container>
            <Top>목격 제보 게시판</Top>
            <Head>
              <hr />
              <p className="title">{data.boardSubject}</p>
              <div className="subtitle">
                <p className="name">{data.memberNickName}</p>
                <p className="date">{formatDate(data.boardDate)}</p>
                <p className="cnt">조회수: {data.boardCount} · 댓글: 3</p>
              </div>
              <hr /><br />
            </Head>
            <Body>
              <div>
                <br />
                <p>#목격지역: {data.boardLocation}</p>
                <p>#추정 종: {data.boardSpecies}</p>
                <p># 성별 : {data.boardGender}</p>
                <p># 나이 : {data.boardAge} 살</p>
              </div>
              <img
                src={data.imgThumbnail}
                alt="img"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  width: "auto !important",
                  height: "auto",
                }}
              />
              <DetailMiddle
                dangerouslySetInnerHTML={createMarkup(data.boardContent)}
              />
              <ButtonsContainer>
                {data.memberNum === userNum && (
                  <div>
                    <EditButton onClick={handleEdit} variant="contained">
                      수정
                    </EditButton>
                    <ButtonsSpace />
                    <DeleteButton onClick={handleDelete} variant="contained">
                      삭제
                    </DeleteButton>
                    <ButtonsSpace />
                  </div>
                )}
                <ReturnButton onClick={handleReturn} variant="contained">
                  돌아가기
                </ReturnButton>
              </ButtonsContainer>
            </Body>


            <Comments>
              <hr />
              <p className="comment">댓글</p>
              <Comment />
            </Comments>
          </Container>
        </MainContainer>
      </Section>
    </ThemeProvider>
  );
}
const Section = styled.section`
  background: #f8f9fa;
  padding: 30px 0 40px 0;
`

const MainContainer = styled.div`
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
`

const Container = styled.div`
margin: 30px;
`;

const Top = styled.h1`
    font-size: 2rem;
    font-weight: bold;
    text-align: center;
    margin-bottom: 2rem;
`;

const Head = styled.div`

    .title {
        font-size: 1.5rem;
        font-weight: bold;
    }

    .subtitle {
        display: flex;
    flex-wrap: wrap;
    .name {
        width: 15%;
    }
    .date {
        width: 60%;
    }
    .cnt {
        text-align: right;
        width: 25%;
    }
    .comment {
        text-align: right;
        width: 5%;
    }
`;

const Body = styled.div`
    margin: auto;
`;

const Comments = styled.div`
    // margin: 150px auto 20px auto;
    font-size: 2rem;
    font-weight: 700;
`;

const DetailMiddle = styled.div`
  padding-top: 15px;
  min-height: 300px;
  min-width: 1050px;
  img {
    max-width: 100%;
    height: auto;
  }
`;

const ButtonsContainer = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  min-width: 700px;
  display: flex;
  justify-content: flex-end;
`;

const ButtonsSpace = styled.div`
  width: 4px;
  height: auto;
  display: inline-block;
`;

const EditButton = styled(Button)`
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

const DeleteButton = styled(Button)`
  && {
    color: #fff;
    background-color: #ff8282;
    width: auto;
    height: 30px;
    margin-top: 5px;
    margin-bottom: 5px;
    &:hover {
      background-color: #ed4f4f;
    }
  }
`;

const ReturnButton = styled(Button)`
  && {
    color: #fff;
    background-color: #bfbfbf;
    width: auto;
    height: 30px;
    margin-top: 5px;
    margin-bottom: 5px;
    &:hover {
      background-color: #b2b0b0;
    }
  }
`;

export default FindDetail;