import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Button } from "@mui/material";
import { Link } from "react-router-dom";

const CarouselMain = ({ images }) => {
  return (
    <Carousel
      indicatorContainerProps={{
        style: {
          position: "absolute",
          bottom: "10px",
          zIndex: 2,
          width: "100%",
        },
      }}
    >
      {images.map((image, index) => (
        <Paper key={index} elevation={0} style={{ height: "350px" }}>
          <img
            src={image}
            alt={`Slide ${index}`}
            style={{ height: "350px", width: "100%", objectFit: "cover" }}
          />
          {/* {images.map((image, index) => (
        <Paper key={index} elevation={0}>
          <img
            src={image}
            alt={`Slide ${index}`}
            style={{ maxHeight: "100%", width: "100%", objectFit: "cover" }}
          /> */}
          <Link to="/animallist">
            <Button
              variant="contained"
              color="warning"
              sx={{
                position: "absolute",
                bottom: 20,
                right: 50,
                borderRadius: "50px",
                minWidth: "unset",
                minHeight: "unset",
                padding: "16px",
                bgcolor: "#FBD385",
              }}
            >
              보호소에 아이들 보러 가기
            </Button>
          </Link>
        </Paper>
      ))}
    </Carousel>
  );
};

export default CarouselMain;
