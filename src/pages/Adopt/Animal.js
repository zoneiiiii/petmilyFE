import * as React from "react";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { ADOPT } from "../../constants/PageURL";

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
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "180px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5F5ED",
      }}
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
      onClick={handleOnClick}
    >
      <img
        src={profile}
        title={desertionNo}
        style={{
          width: "160px",
          height: "160px ",
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
