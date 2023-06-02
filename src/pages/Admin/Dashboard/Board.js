import React, { useState, useEffect } from "react";
import { ADMIN } from "../../../constants/PageURL";
import { Link } from "react-router-dom";
import { Box, Typography, Grid, Paper } from "@mui/material";
import axios from "axios";

const Board = () => {
  const [adoptCount, setAdoptCount] = useState(0);
  const [missingCount, setMissingCount] = useState(0);
  const [findCount, setFindCount] = useState(0);
  const [freeCount, setFreeCount] = useState(0);
  const [fleaCount, setFleaCount] = useState(0);
  const [volunteerCount, setVolunteerCount] = useState(0);
  const [volunteerReviewCount, setVolunteerReviewCount] = useState(0);

  const boardData = [
    { name: "입양후기 게시판", count: adoptCount },
    { name: "실종동물 게시판", count: missingCount },
    { name: "목격제보 게시판", count: findCount },
    { name: "자유게시판", count: freeCount },
    { name: "매매장터", count: fleaCount },
    { name: "봉사 게시판", count: volunteerCount },
    { name: "봉사후기 게시판", count: volunteerReviewCount },
  ];

  useEffect(() => {
    Promise.all([
      axios.get("/board/review/count"),
      axios.get("/board/missing/count"),
      axios.get("/board/find/count"),
      axios.get("/board/free/count"),
      axios.get("/board/flea/count"),
      axios.get("/board/volunteer/count"),
      axios.get("/donate/volunteer/review/count"),
    ])
      .then(
        ([
          adoptRes,
          missingRes,
          findRes,
          freeRes,
          fleaRes,
          volunteerRes,
          volunteerReviewRes,
        ]) => {
          setAdoptCount(adoptRes.data);
          setMissingCount(missingRes.data);
          setFindCount(findRes.data);
          setFreeCount(freeRes.data);
          setFleaCount(fleaRes.data);
          setVolunteerCount(volunteerRes.data);
          setVolunteerReviewCount(volunteerReviewRes.data);
        }
      )
      .catch((error) => {
        console.error("axios 오류 : ", error);
      });
  }, []);

  return (
    <React.Fragment>
      <Typography variant="h6" component="div" color="primary" sx={{ mb: 2 }}>
        게시판 현황
      </Typography>

      <Grid container spacing={2}>
        {boardData.map((board) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={board.name}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 100,
                alignItems: "center",
              }}
            >
              <Typography variant="h7" sx={{ fontWeight: "bold" }}>
                {board.name}
              </Typography>
              <Box sx={{ flexGrow: 1 }} />
              <Typography variant="body2" color="text.primary">
                총 게시글 수
              </Typography>
              <Typography
                variant="h6"
                color="text.primary"
                sx={{ fontWeight: "bold" }}
              >
                {board.count}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Box textAlign="right" mt={3}>
        <Link to={ADMIN.BOARD}>게시판 관리 이동</Link>
      </Box>
    </React.Fragment>
  );
};

export default Board;
