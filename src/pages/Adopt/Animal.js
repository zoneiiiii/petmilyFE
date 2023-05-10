/* eslint-disable jsx-a11y/alt-text */
import Modal from "@mui/material/Modal";
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { useLayoutEffect, useState, useEffect } from "react";

function Animal({
  desertionNo,
  profile,
  title,
  kindCd,
  age,
  careAddr,
  processState,
}) {
  console.log(profile);

  const [isHover, setIsHover] = React.useState(false);
  const handleHover = () => setIsHover(true);
  const handleLeave = () => setIsHover(false);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
      }}
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
    >
      <img
        src={profile}
        title={desertionNo}
        style={{
          width: "150px",
          height: "150px",
          objectFit: "cover",
          transition: "all 0.3s ease-out",
          transform: isHover ? "scale(1.1)" : "scale(1)",
          cursor: "pointer",
        }}
      />
      {isHover ? (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "95%",
            height: "95%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10,
            backgroundColor: "rgba(0,0,0,0.8)",
            cursor: "pointer",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="h7"
            component="span"
            sx={{
              color: "white",
              p: 2,
              animation: isHover ? "none" : "$fadeInOut 2s ease-out infinite",
            }}
          >
            {processState}
          </Typography>
          <Typography
            variant="h7"
            component="span"
            sx={{
              color: "white",
              p: 2,
              animation: isHover ? "none" : "$fadeInOut 2s ease-out infinite",
            }}
          >
            {age}
          </Typography>
        </div>
      ) : null}
    </div>
  );
}
export default Animal;
