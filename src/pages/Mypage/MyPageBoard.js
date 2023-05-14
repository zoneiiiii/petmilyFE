import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import MissingBoard from "../Community/Missing/MissingBoard";
import FreeBoard from "../Community/FreeBoard/FreeBoard";
import FleaBoard from "../Community/FleaBoard/FleaBoard";
import FindBoard from "../Community/FindBoard/FindBoard";
import VolunteerReview from "../Support/Volunteer/VolunteerReview";
import { Typography, ThemeProvider } from "@mui/material";
import { CustomTheme } from "../../assets/Theme/CustomTheme";

//board_num, member_num, board_id, subject, content, count, date, state

const dummy = [
  {
    board_id: "missing",
  },
  {
    board_id: "find",
  },
  {
    board_id: "flea",
  },
  {
    board_id: "free",
  },
  {
    board_id: "review",
  },
];

const MyPageBoard = () => {
  const { id } = useParams();
  const [data, setData] = useState([]); // DB 데이터 가져오는 변수

  useEffect(() => {
    setData(dummy.filter((data) => data.board_id === parseInt(id))[0]);
  }, [id]);

  return (
    <ThemeProvider theme={CustomTheme}>
      {id === "missing" ? (
        <>
          <Typography
            className="myOrderListTitle"
            sx={titleSx}
            border={3}
            borderColor="#ffbd59"
            mb={4}
          >
            실종 동물 게시판
          </Typography>
          <MissingBoard />
        </>
      ) : id === "find" ? (
        <>
          <Typography
            className="myOrderListTitle"
            sx={titleSx}
            border={3}
            borderColor="#ffbd59"
            mb={4}
          >
            목격 제보 게시판
          </Typography>
          <FindBoard />
        </>
      ) : id === "free" ? (
        <>
          <Typography
            className="myOrderListTitle"
            sx={titleSx}
            border={3}
            borderColor="#ffbd59"
            mb={4}
          >
            자유게시판
          </Typography>
          <FreeBoard />
        </>
      ) : id === "flea" ? (
        <>
          <Typography
            className="myOrderListTitle"
            sx={titleSx}
            border={3}
            borderColor="#ffbd59"
            mb={4}
          >
            매매 장터
          </Typography>
          <FleaBoard />
        </>
      ) : (
        <>
          <Typography
            className="myOrderListTitle"
            sx={titleSx}
            border={3}
            borderColor="#ffbd59"
            mb={4}
          >
            봉사 후기
          </Typography>
          <VolunteerReview />
        </>
      )}
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
export default MyPageBoard;
