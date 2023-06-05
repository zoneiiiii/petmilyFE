import styled from "styled-components";
import * as React from "react";
import CustomButton from "../Login/CustomButton";
import { Link, useParams, useLocation } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { ADOPT } from "../../constants/PageURL";
import * as S from "../Support/Volunteer/VolunteerNoticeWrite.styled";
import DOMPurify from "dompurify";
import axios from "axios";
import {
  ThemeProvider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import { CustomTheme } from "../../assets/Theme/CustomTheme";
import Comment from "../../components/Comment/Comment";
import { AuthContext } from "../../contexts/AuthContexts";

const AdoptReviewDetail = () => {
  const { id } = useParams();
  const { userNum } = useContext(AuthContext);
  const location = useLocation();
  const [data, setData] = useState([]);
  const [writeId, setWriteId] = useState(false);
  const number = location.state;

  const formatDate = () => {
    console.log(data.reviewDate);
    const date = new Date(data.reviewDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    console.log(`${year}년 ${month}월 ${day}일`);
    return `${year}년 ${month}월 ${day}일`;
  };

  const profile = {
    profileImg: data.memberImg, // 사용자 프로필 이미지
    profileNickname: data.memberNickName, // 사용자 닉네임
  }

  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };
  useEffect(() => {
    axios
      .get(`/board/review/${number.boardNum}`)
      .then((response) => {
        setData(response.data);
        console.log(response.data);
        if (response.data.memberNum === userNum) {
          setWriteId(true);
        } else {
          setWriteId(false);
        }
      })
      .catch((error) => {
        console.error("error");
      });
  }, [userNum]);

  return (
    <ThemeProvider theme={CustomTheme}>
      <Section className="result">
        <MainContainer className="result-container">
          <Container>
            <Top>입양 후기 게시판</Top>
            <Head>
              <hr />
              <p className="title">{data.reviewSubject}</p>
              <div className="subtitle">
                {/* 유저 프로필사진 & 닉네임 */}
                <section className="article-profile">
                  <h3 className="hide">프로필</h3>
                  <div className="space-between">
                    <div style={{ display: "flex" }}>
                      <div className="article-profile-image">
                        {/* <img alt="프로필 이미지" src={profile.profileImg} /> */}
                      </div>
                      <div className="article-profile-left">
                        <div className="nickname">{number.nickName}</div>
                        {/* <div className="region">{profile.region}</div> */}
                      </div>
                      <p className="date">{formatDate(data.reviewDate)}</p>
                      <p className="cnt">조회수: {data.reviewCount}</p>
                    </div>
                  </div>
                </section>
              </div>
            </Head>
            <hr />
            <br />
            <Body>
              <DetailMiddle
                dangerouslySetInnerHTML={createMarkup(data.reviewContent)}
              />

              <ButtonsContainer>
                {writeId ? (
                  <div>
                    <Link
                      to={ADOPT.REVIEW_MODIFY}
                      state={{
                        boardNum: data.boardNum,
                      }}
                      style={{ textDecoration: "none" }}
                    >
                      <EditButton label="수정" value="삭제" variant="contained">
                        수정
                      </EditButton>
                    </Link>
                    <ButtonsSpace />
                    <Link to={ADOPT.REVIEW} style={{ textDecoration: "none" }}>
                      <DeleteButton
                        label="삭제"
                        value="삭제"
                        variant="contained"
                        onClick={() => {
                          axios.delete(`/board/review/${data.boardNum}`);
                          alert("삭제완료");
                        }}
                      >
                        삭제
                      </DeleteButton>
                    </Link>
                    <ButtonsSpace />
                  </div>
                ) : (
                  ""
                )}
                <Link to={ADOPT.REVIEW} style={{ textDecoration: "none" }}>
                  <ReturnButton label="돌아가기" value="작성취소" variant="contained">
                    돌아가기
                  </ReturnButton>
                </Link>
              </ButtonsContainer>
            </Body>
            <div style={{ width: "100%" }}>
              <Comment boardId="review" boardNum={id} />
            </div>
          </Container>
        </MainContainer>
      </Section>
    </ThemeProvider>
  );
};

// const Section = styled.section`
//   background: #f8f9fa;
//   padding: 30px 0 40px 0;
// `;
// const MainContainer = styled.div`
//   width: 60vw;
//   // width: 1150px;
//   max-width: 1150px;
//   min-width: 790px;
//   border-radius: 8px;
//   border-width: 1px;
//   border-style: solid;
//   border-color: rgb(233, 236, 239);
//   border-image: initial;
//   margin: 0px auto 20px;
//   background: rgb(255, 255, 255);
// `;
// const Container = styled.div`
//   margin: 30px;
//   .comment {
//     fullWidth;
//     margin: 0 auto;
//   }
// `;
// const Top = styled.h1`
//   font-size: 2rem;
//   font-weight: bold;
//   text-align: center;
//   margin-bottom: 2rem;
// `;
// const Body = styled.div`
//   margin: auto;
// `;
const Section = styled.section`
  background: #f8f9fa;
  padding: 30px 0 40px 0;
`;

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
`;

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
      width: 20%;
    }
    .date-cnt {
      display: flex;
    }

    .date {
      min-width: 50%;
      max-width: 60%;
      // width: 600px;
      text-align: right;
    }
    .cnt {
      text-align: right;
      float: right;
      min-width: 150px;
    }

    .article-profile {
      width: 100%;
      text-decoration: none;
      display: block;
      margin-top: 25px;
      position: relative;
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
      width: 100%;

      .nickname {
        text-decoration: underline;
        text-underline-position: under;
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

    .hide {
      position: absolute;
      left: -9999px;
      top: -9999px;
    }
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

export default AdoptReviewDetail;
