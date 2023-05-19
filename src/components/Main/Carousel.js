import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";
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
        <Paper key={index} elevation={0} sx={{ height: "400px" }}>
          {index === 1 ? (
            <Link to="/about/event/list">
              <img
                src={image}
                alt={`Slide ${index}`}
                style={{ height: "400px", width: "100%", objectFit: "cover" }}
              />
            </Link>
          ) : index === 2 ? (
            <Link to="/donate">
              <img
                src={image}
                alt={`Slide ${index}`}
                style={{ height: "400px", width: "100%", objectFit: "cover" }}
              />
            </Link>
          ) : (
            <img
              src={image}
              alt={`Slide ${index}`}
              style={{ height: "400px", width: "100%", objectFit: "cover" }}
            />
          )}
        </Paper>
      ))}
    </Carousel>
  );
};

export default CarouselMain;
