import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";
import { Link } from "react-router-dom";

const Slider = ({ images }) => {
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
        <Paper
          key={index}
          elevation={0}
          sx={{
            position: 'relative',
            width: '677px',
            height: '500px',
            margin: '0 auto',
            borderRadius: '8px',
            overflow: 'hidden',
          }}>
          {index === 1 ? (
            <img
              src={image}
              alt={`Slide ${index}`}
              style={{ height: "500px", width: "100%", objectFit: "cover" }}
            />
          ) : index === 2 ? (
            <img
              src={image}
              alt={`Slide ${index}`}
              style={{ height: "500px", width: "100%", objectFit: "cover" }}
            />
          ) : (
            <img
              src={image}
              alt={`Slide ${index}`}
              style={{ height: "500px", width: "100%", objectFit: "cover" }}
            />
          )}
        </Paper>
      ))
      }
    </Carousel >
  );
};

export default Slider;
