import styled from "styled-components";
import * as React from "react";
import CustomButton from "../Login/CustomButton";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { ADOPT } from "../../constants/PageURL";
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
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(dummy.filter((data) => data.id === parseInt(id))[0]);
  }, [id]);
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
                    {data.title}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ width: 600 }}>{data.writter}</TableCell>
                  <TableCell align="right" sx={{ color: "lightgray" }}>
                    {data.date}
                  </TableCell>
                  <TableCell align="right" sx={{ color: "lightgray" }}>
                    조회수 : {data.count}
                  </TableCell>
                  <TableCell align="right" sx={{ color: "lightgray" }}>
                    댓글 : 2
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={4} sx={{ height: 300 }}>
                    <img
                      src="http://placeimg.com/300/300/animals/sepia"
                      alt="img"
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        width: "auto !important",
                        height: "auto",
                      }}
                    />
                    <br />
                    {data.content}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Body>
              <Link to={ADOPT.REVIEW} style={{ textDecoration: "none" }}>
                <CustomButton label="돌아가기" value="작성취소" />
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

const dummy = [
  {
    id: 1,
    title: "밍키 잘 지내고 있어요! 밍키 잘 지내고 있어요!밍키 밍키 밍키 밍키",
    content: "밍키 건강히 잘 지내고 있어요!",
    writter: "밍키맘",
    date: "2023.05.04",
    count: 34,
  },
  {
    id: 2,
    title: "펫밀리 입양후기",
    content: "꼭 펫밀리에서 입양하세요!",
    writter: "똘이엄마",
    date: "2023.05.04",
    count: 34,
  },
  {
    id: 3,
    title: "입양 3개월 후 남기는 후기",
    content: "어느새 입양 승인을 받은지 3개월이 지났습니다.",
    writter: "별맘",
    date: "2023.05.04",
    count: 34,
  },
  {
    id: 4,
    title: "아지 잘 지냅니다 :)",
    content: "아지 잘 지내요!",
    writter: "아지아지",
    date: "2023.05.04",
    count: 34,
  },
  {
    id: 5,
    title: "새 가족이 생겼어요!",
    content: "귀여운 막내동생이 생겼어요.",
    writter: "패밀리",
    date: "2023.05.04",
    count: 34,
  },
  {
    id: 6,
    title: "똘이가 어느새 3살이 됐어요.",
    content: "펫밀리를 알게된 지 3년이 지났네요.",
    writter: "똘이엄마",
    date: "2023.05.04",
    count: 34,
  },
  {
    id: 7,
    title: "이름 같이 지어주세요!",
    content: "이름을 뭘로 지어줘야 할 지 너무나 고민입니다.",
    writter: "초보엄마",
    date: "2023.05.04",
    count: 34,
  },
  {
    id: 8,
    title: "입양신청은 펫밀리에서!",
    content: "펫밀리 추천합니다.",
    writter: "나는유저",
    date: "2023.05.04",
    count: 34,
  },
  {
    id: 9,
    title: "초보 반려인의 후기",
    content: "알아야 할 지식들이 정말 많네요.",
    writter: "이기자",
    date: "2023.05.04",
    count: 34,
  },
  {
    id: 10,
    title: "서울보호소,입양 후기",
    content: "서울보호소에 있는 친구를 입양했습니다.",
    writter: "삼기자",
    date: "2023.05.04",
    count: 34,
  },
  {
    id: 11,
    title: "건강해진 모모 봐주세요!",
    content: "건강해진 모모입니다.",
    writter: "사기자",
    date: "2023.05.04",
    count: 34,
  },
  {
    id: 12,
    title: "골든 리트리버 입양했습니다.",
    content: "골든리트리버 입양했어요!.",
    writter: "오기자",
    date: "2023.05.04",
    count: 34,
  },
  {
    id: 13,
    title: "잘 지내고 있습니다.",
    content: "안녕하세요. 다들 잘 지내시죠?",
    writter: "ㅎㅎ",
    date: "2023.05.04",
    count: 34,
  },
];

export default AdoptReviewDetail;