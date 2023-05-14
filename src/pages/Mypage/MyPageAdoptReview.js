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

const MyPageAdoptReview = () => {
  const [Image, setImage] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  );
  const { id } = useParams();
  const [reviewData, setReviewData] = useState([]);
  const cards = [
    {
      num: 3,
      img: "https://source.unsplash.com/random/?programming",
      subject: "밍키 잘 지내고 있어요~",
      nickname: "User1",
      date: "September 14, 2023",
      profile: { Image },
    },
    {
      num: 2,
      img: "https://source.unsplash.com/random/?programming",
      subject: "밍키 잘 지내고 있어요~",
      nickname: "User1",
      date: "September 14, 2023",
      profile: { Image },
    },
    {
      num: 1,
      img: "https://source.unsplash.com/random/?programming",
      subject: "밍키 잘 지내고 있어요~",
      nickname: "User1",
      date: "September 14, 2023",
      profile: { Image },
    },
  ];

  useEffect(() => {
    setReviewData(cards.filter((data) => data.num === parseInt(id))[0]);
  }, [id]);

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

      <Grid>
        {/* maxWidth="xl" */}

        <Grid container spacing={3} sx={{ width: "70vw" }}>
          {cards.map((card) => (
            <Grid item key={card.num}>
              <Link
                to={ADOPT.REVIEW_DETAIL(card.num)}
                style={{ textDecoration: "none" }}
              >
                <Card sx={{ backgroundColor: "#F5F5ED" }}>
                  <CardMedia
                    component="img"
                    sx={{
                      height: 200,
                      width: 200,
                      mt: 2,
                      ml: 1,
                      borderRadius: 50,
                    }}
                    image={card.img}
                    alt="image"
                  />
                  <CardContent>
                    <Typography variant="body" color="text.secondary">
                      {card.subject}
                    </Typography>
                  </CardContent>
                  <CardHeader
                    avatar={<Avatar src={card.profile} />}
                    title={card.nickname}
                    subheader={card.date}
                  ></CardHeader>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Grid>
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
