import styled from "styled-components";
import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { ThemeProvider } from "@mui/material";
import { CustomTheme } from "../../assets/Theme/CustomTheme";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ADOPT } from "../../constants/PageURL";
import AdoptReview from "../Adopt/AdoptReview";

const MyPageAdoptReview = () => {
  // const [Image, setImage] = useState(
  //   "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  // );
  // const { id } = useParams();
  // const [reviewData, setReviewData] = useState([]);
  // const cards = [
  //   {
  //     id: 1,
  //     title: "밍키 잘 지내고 있어요! 밍키 잘 지내고 있어요!밍키 밍키 밍키 밍키",
  //     writter: "밍키맘",
  //     date: "2023.05.04",
  //     count: 34,
  //   },
  //   {
  //     id: 2,
  //     title: "펫밀리 입양후기",
  //     writter: "똘이엄마",
  //     date: "2023.05.04",
  //     count: 34,
  //   },
  //   {
  //     id: 3,
  //     title: "입양 3개월 후 남기는 후기",
  //     writter: "별맘",
  //     date: "2023.05.04",
  //     count: 34,
  //   },
  //   {
  //     id: 4,
  //     title: "아지 잘 지냅니다 :)",
  //     writter: "아지아지",
  //     date: "2023.05.04",
  //     count: 34,
  //   },
  //   {
  //     id: 5,
  //     title: "새 가족이 생겼어요!",
  //     writter: "패밀리",
  //     date: "2023.05.04",
  //     count: 34,
  //   },
  //   {
  //     id: 6,
  //     title: "똘이가 어느새 3살이 됐어요.",
  //     writter: "똘이엄마",
  //     date: "2023.05.04",
  //     count: 34,
  //   },
  //   {
  //     id: 7,
  //     title: "이름 같이 지어주세요!",
  //     writter: "초보엄마",
  //     date: "2023.05.04",
  //     count: 34,
  //   },
  //   {
  //     id: 8,
  //     title: "입양신청은 펫밀리에서!",
  //     writter: "나는유저",
  //     date: "2023.05.04",
  //     count: 34,
  //   },
  //   {
  //     id: 9,
  //     title: "초보 반려인의 후기",
  //     writter: "이기자",
  //     date: "2023.05.04",
  //     count: 34,
  //   },
  //   {
  //     id: 10,
  //     title: "서울보호소,입양 후기",
  //     writter: "삼기자",
  //     date: "2023.05.04",
  //     count: 34,
  //   },
  //   {
  //     id: 11,
  //     title: "건강해진 모모 봐주세요!",
  //     writter: "사기자",
  //     date: "2023.05.04",
  //     count: 34,
  //   },
  //   {
  //     id: 12,
  //     title: "골든 리트리버 입양했습니다.",
  //     writter: "오기자",
  //     date: "2023.05.04",
  //     count: 34,
  //   },
  //   {
  //     id: 13,
  //     title: "잘 지내고 있습니다.",
  //     writter: "ㅎㅎ",
  //     date: "2023.05.04",
  //     count: 34,
  //   },
  // ];

  // useEffect(() => {
  //   setReviewData(cards.filter((data) => data.id === parseInt(id))[0]);
  // }, [id]);

  return (
    <ThemeProvider theme={CustomTheme}>
      <Typography
        className="myOrderListTitle"
        sx={titleSx}
        border={3}
        borderColor="#ffbd59"
        mb={4}
      >
        입양 후기
      </Typography>
      <AdoptReview />
    </ThemeProvider>
  );
};
const titleSx = {
  width: "200px",
  textAlign: "center",
  fontStyle: "normal",
  fontWeight: "bold",
  fontSize: "1.5rem",
  lineHeight: "50px",
};
export default MyPageAdoptReview;
