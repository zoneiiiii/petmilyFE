import styled from "styled-components";
import * as React from "react";
import CustomButton from "../Login/CustomButton";
import { Link, useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
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
} from "@mui/material";
import { CustomTheme } from "../../assets/Theme/CustomTheme";
import Comment from "../../components/Comment/Comment";

const AdoptReviewDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const [data, setData] = useState([]);
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
      })
      .catch((error) => {
        console.error("error");
      });
  }, []);
  console.log("data", data);
  return (
    <ThemeProvider theme={CustomTheme}>
      <Section className="result">
        <MainContainer className="result-container">
          <Container>
            <Top>입양 후기 게시판</Top>
            <Table sx={{ mt: 1 }}>
              <TableHead>
                <TableRow>
                  <TableCell
                    colSpan={4}
                    sx={{ width: 750, fontWeight: "bold", fontSize: "20px" }}
                  >
                    {data.reviewSubject}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ width: 600 }}>{data.memberNum}</TableCell>
                  <TableCell align="right" sx={{ color: "lightgray" }}>
                    {formatDate()}
                  </TableCell>
                  <TableCell align="right" sx={{ color: "lightgray" }}>
                    조회수 : {data.reviewCount}
                  </TableCell>
                  <TableCell align="right" sx={{ color: "lightgray" }}>
                    댓글 : 2
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={4} sx={{ height: 300 }}>
                    {/* <img
                      src="http://placeimg.com/300/300/animals/sepia"
                      alt="img"
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        width: "auto !important",
                        height: "auto",
                      }}
                    />
                    <br /> */}
                    <div
                      dangerouslySetInnerHTML={createMarkup(data.reviewContent)}
                    ></div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Body>
              <Link to={ADOPT.REVIEW} style={{ textDecoration: "none" }}>
                <CustomButton label="돌아가기" value="작성취소" />
              </Link>

              <Link to={ADOPT.REVIEW} style={{ textDecoration: "none" }}>
                <CustomButton
                  label="삭제"
                  value="작성취소"
                  onClick={() => {
                    axios.delete(`/board/review/${data.boardNum}`);
                    alert("삭제완료");
                  }}
                />
              </Link>

              <Link
                to={ADOPT.REVIEW_MODIFY}
                state={{
                  boardNum: data.boardNum,
                }}
                style={{ textDecoration: "none" }}
              >
                <CustomButton label="수정" value="작성취소" />
              </Link>
            </Body>

            <section className="comment">
              <Comment />
            </section>
          </Container>
        </MainContainer>
      </Section>
    </ThemeProvider>
  );
};

const Section = styled.section`
  padding: 30px 0 40px 0;
`;
const MainContainer = styled.div`
  width: 70vw;
  // width: 1150px;
  max-width: 1150px;
  min-width: 790px;
  margin: 0px auto 20px;
  background: rgb(255, 255, 255);
`;
const Container = styled.div`
  margin: 30px;
  .comment {
    fullWidth;
    margin: 0 auto;
  }
`;
const Top = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 2rem;
`;
const Body = styled.div`
  margin: auto;
`;

export default AdoptReviewDetail;
