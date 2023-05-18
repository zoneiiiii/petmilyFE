import * as React from "react";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { ADOPT } from "../../constants/PageURL";
import {
  Card,
  Grid,
  Pagination,
  Container,
  ThemeProvider,
} from "@mui/material";
import styled from "styled-components";
import { CustomTheme } from "../../assets/Theme/CustomTheme";

function Animal({
  desertionNo,
  filename,
  happenDt,
  happenPlace,
  kindCd,
  colorCd,
  age,
  weight,
  noticeNo,
  noticeSdt,
  noticeEdt,
  profile,
  processState,
  sexCd,
  neuterYn,
  specialMark,
  careNm,
  careTel,
  careAddr,
  orgNm,
  chargeNm,
  officetel,
}) {
  console.log(profile);
  const navigate = useNavigate();
  const [isHover, setIsHover] = React.useState(false);
  const handleHover = () => setIsHover(true);
  const handleLeave = () => setIsHover(false);
  const handleOnClick = () => {
    navigate(ADOPT.ANIMAL_LIST_DETAIL(desertionNo), {
      state: {
        desertionNo: desertionNo,
        filename: filename,
        happenDt: happenDt,
        happenPlace: happenPlace,
        kindCd: kindCd,
        colorCd: colorCd,
        age: age,
        weight: weight,
        noticeNo: noticeNo,
        noticeSdt: noticeSdt,
        noticeEdt: noticeEdt,
        profile: profile,
        processState: processState,
        sexCd: sexCd,
        neuterYn: neuterYn,
        specialMark: specialMark,
        careNm: careNm,
        careTel: careTel,
        careAddr: careAddr,
        orgNm: orgNm,
        chargeNm: chargeNm,
        officetel: officetel,
      },
    });
  };

  return (
    // <div
    // style={{
    //   position: "relative",
    //   width: "100%",
    //   height: "100px",
    //   display: "flex",
    //   justifyContent: "center",
    //   alignItems: "center",
    //   backgroundColor: "#F5F5ED",
    //   borderRadius: "5px",
    // }}
    // onMouseEnter={handleHover}
    // onMouseLeave={handleLeave}
    // onClick={handleOnClick}
    // >
    <ThemeProvider theme={CustomTheme}>
      <Card
        xs={10}
        sm={6}
        md={2}
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          cursor: "pointer",
          marginRight: "10px",
          transition: "all 0.3s ease-out",
          transform: isHover ? "scale(1.05)" : "scale(1)",
        }}
        onClick={handleOnClick}
        onMouseEnter={handleHover}
        onMouseLeave={handleLeave}
      >
        <CardImage src={profile} />
        <div>
          <CardTitle>{desertionNo}</CardTitle>
          {/* <CardWritter>{age}</CardWritter> */}
          <CardCount> {kindCd}</CardCount>
        </div>
      </Card>
    </ThemeProvider>
    /* <img
        src={profile}
        title={desertionNo}
        style={{
          width: "160px",
          height: "160px ",
          objectFit: "cover",
       
          cursor: "pointer",
          borderRadius: "10px",
        }}
      /> */

    // </div>
  );
}
export default Animal;
const CardImage = styled.img`
  width: 100%;
  height: 200px;
`;

const CardTitle = styled.p`
  font-weight: bold;
  font-size: 16px;
  text-align: center;
  margin-bottom: 5px;
  line-height: 1.4em;
  height: 2.8em;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const CardWritter = styled.p`
  font-size: 14px;
  color: #888;
  float: left;
  margin-left: 10px;
`;

const CardCount = styled.p`
  font-size: 14px;
  color: #888;
  float: right;
  margin-right: 10px;
`;
