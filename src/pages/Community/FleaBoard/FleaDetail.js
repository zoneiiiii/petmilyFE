import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  Button,
  ThemeProvider,
  Avatar,
} from "@mui/material";
import { CustomTheme } from "../../../assets/Theme/CustomTheme";
import { COMMUNITY } from '../../../constants/PageURL';
import Comment from "../../../components/Comment/Comment";
import Slider from "./Slider";
import DOMPurify from "dompurify";
import axios from "axios";
import { AuthContext } from "../../../contexts/AuthContexts";
import NotFound from "../../NotFound/NotFound";
import Loading from "../../../components/Loading/LoadingPage";

const FleaDetail = (props) => {
  const [data, setData] = useState([]); // DB 데이터 가져오는 변수
  const [isLoading, setIsLoading] = useState(true); //로딩 상태
  const { id } = useParams(); //게시글 id
  const { userNum } = useContext(AuthContext); // 로그인 상태 체크
  const navigate = useNavigate();
  // const [totalComents, setTotalComments] = useState(0); // 댓글 갯수 관리 변수

  // // 댓글 갯수 호출
  // const getData = (totalComents) => {
  //   setTotalComments(totalComents);
  //   console.log(totalComents);
  // }

  const Slider1 = data.imgThumbnail;
  // const Slider2 = 'https://picsum.photos/700/500';
  // const Slider3 = 'https://picsum.photos/700/500';
  const carouselImage = [Slider1, Slider1, Slider1];

  const profile = {
    profileImg: data.memberImg, // 사용자 프로필 이미지
    profileNickname: data.memberNickName, // 사용자 닉네임
    region: "관악구 신림동"
  }

  /* axios start */
  useEffect(() => {
    //게시글 Detail 호출
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/board/flea/${id}`
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
    return `${year}.${month}.${day} ${hour}:${minute}`;
  };

  const handleEdit = () => {
    //수정
    navigate(COMMUNITY.FLEA_MODIFY(id));
  };

  const handleDelete = async () => {
    // 삭제
    const result = window.confirm("정말 삭제하시겠습니까?");
    if (result) {
      try {
        await axios.delete(`http://localhost:8080/board/flea/${id}`, {
          withCredentials: true,
        });
        alert("게시물이 삭제되었습니다.");
        navigate(COMMUNITY.FLEA);
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
    navigate(COMMUNITY.FLEA);
  }

  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  return (
    <ThemeProvider theme={CustomTheme}>
      <Section className="result">
        <Container className="result-container">
          <article className="content">
            <h1 className="hide">캣타워 팝니다.</h1>
          </article>

          <section className="article-images">
            <h3 className="hide">이미지</h3>
            <Slider images={carouselImage} />
          </section>

          {/* 유저 프로필사진 & 닉네임 */}
          <section className="article-profile">
            <h3 className="hide">프로필</h3>
            <div className="space-between">
              <div style={{ display: 'flex' }}>
                <div className="article-profile-image">
                  <UserImg alt="프로필 이미지" src={profile.profileImg} />
                </div>
                <div className="article-profile-left">
                  <div className="nickname">{profile.profileNickname}</div>
                  {/* <div className="region">{profile.region}</div> */}
                </div>
              </div>
            </div>
          </section>

          <section className="article-description">
            <h1 property="schema:name" className="article-title" style={{ marginTop: '0px' }}>{data.boardSubject}</h1>
            <p className="article-category">
              " {data.boardCategory} . "
              <time> {formatDate(data.boardDate)} </time>
            </p>
            <p property="schema:priceValdUntil" datatype="xsd:date" content="2023-05-11"></p>
            <p className="article-price" property="schema:price" content="50000.0">
              {(data.boardCost).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
            </p>

            <div property="schema:description" className="article-detail">
              <DetailMiddle
                dangerouslySetInnerHTML={createMarkup(data.boardContent)}
              />
            </div>
            <p className="article-counts">조회 {data.boardCount}</p>

            <div className="article-btn">
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
            </div>
          </section>

          <section className="comment">
            <Comment boardId="flea" boardNum={id} />
          </section>
        </Container>
      </Section>
    </ThemeProvider>
  );
};

const Section = styled.section`
  background: #f8f9fa;
  padding: 30px 0 40px 0;
`

const Container = styled.div`
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

  .content {
    margin-top: 60px;
    padding-bottom: 0;
  }

  .hide {
    position: absolute;
    left: -9999px;
    top: -9999px;
  }

  .article-images {
    position: relative;
    width: 729px;
    margin: 0 auto;
  }

  .article-profile {
    width: 677px;
    margin: 0 auto;
    text-decoration: none;
    display: block;
    margin-top: 25px;
    padding-bottom: 10px;
    position: relative;
    border-bottom: 1px solid #e9ecef;
  }

  .article-profile-image {
    display: inline-block;

    img {
      width: 40px;
      height: 40px;
      object-fit: cover;
      -webkit-border-radius: 50%;
    }
  }

  .article-profile-left {
    display: inline-block;
    margin-left: 8px;

    .nickname {
      text-decoration: underline;
      text-underline-position:under;
      font-size: 20px;
      font-weight: 600;
      line-height: 2.7;
      letter-spacing: -0.6px;
      color: #212529;
    }
    .region {
      font-size: 13px;
      line-height: 1.46;
      letter-spacing: -0.6px;
      color: #212529;
    }
  }

  .space-between {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .article-description {
    padding: 32px 0;
    width: 677px;
    margin: 10px auto;
    
  }

  .article-title {
    margin-top: 16px;
    font-size: 23px;
    font-weight: 600;
    line-height: 1.5;
    letter-spacing: -0.6px;
  }

  .article-category {
    margin-top: 4px;
    font-size: 13px;
    line-height: 1.46;
    letter-spacing: -0.6px;
    color: #868e96;
  }

  .article-price {
    margin-top: 4px;
    font-size: 20px;
    font-weight: 600;
    line-height: 1.76;
    letter-spacing: -0.6px;
    color: rgb(255, 138, 61);
  }

  .article-detail {
    margin-bottom: 16px;
    margin-top: 8px;
  }

  .article-counts {
    font-size: 13px;
    line-height: 1.46;
    letter-spacing: -0.6px;
    color: #868e96;
  }

  .article-btn {
    height: 50px;
    border-bottom: 1px solid #e9ecef;
  }

  .comment {
    width: 700px;
    margin: 0 auto;
  }
`

const DetailMiddle = styled.div`
  padding-top: 15px;
  min-height: 300px;
  min-width: 700px;
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
    background-color: #FBD385;
    width: auto;
    height: 30px;
    margin-top: 5px;
    margin-bottom: 5px;
    &:hover {
      background-color: #AF935D;
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
      background-color: #B25B5B;
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
      background-color: #858585;
    }
  }
`;

const UserImg = styled(Avatar)`
  && {
    margin-right: 8px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-left: 5px;
  }
`;

export default FleaDetail;
