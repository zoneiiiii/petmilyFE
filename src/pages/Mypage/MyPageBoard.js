import styled from "styled-components";
import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import { Link } from "react-router-dom";
//백엔드 연결하고 수정할 예정
const MyPageBoard = () => {
  const [Image, setImage] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  );
  const cards = [1, 1, 1, 1];
  return (
    <>
      <MyPageAdoptStyle>
        <div className="navTitle">
          <h5>쓴 글 목록</h5>
        </div>
      </MyPageAdoptStyle>
      <Container maxWidth="xl">
        {/* End hero unit */}
        <Grid container spacing={3}>
          {cards.map((card) => (
            <Grid item key={card}>
              <Card sx={{ backgroundColor: "#F5F5ED", mt: 5 }}>
                <CardMedia
                  component="img"
                  sx={{
                    height: 200,
                    width: 200,
                    mt: 2,
                    ml: 1,
                    borderRadius: 50,
                  }}
                  image="https://source.unsplash.com/random"
                  alt="image"
                />
                <CardContent>
                  <Typography variant="body" color="text.secondary">
                    밍키 잘 지내고 있어요~!
                  </Typography>
                </CardContent>
                <CardHeader
                  avatar={<Avatar src={Image} />}
                  title="User1"
                  subheader="September 14, 2016"
                ></CardHeader>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};
const MyPageAdoptStyle = styled.div`
  .navTitle {
    border: 1px solid #fbd385;
    width: 200px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
export default MyPageBoard;
