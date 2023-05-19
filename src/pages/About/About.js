import { Box, Button, ThemeProvider, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CustomTheme } from "../../assets/Theme/CustomTheme";
import { ADOPT } from "../../constants/PageURL";

const About = () => {
  const navigate = useNavigate();
  return (
    <ThemeProvider theme={CustomTheme}>
      <Box display={"flex"} justifyContent={"center"} flexWrap={"wrap"}>
        <Box sx={BoxSx}>
          <img alt="소개1" src="/images/About/about1.png" />
          <Typography
            sx={{
              ...TypographySx,
              fontSize: "1.4rem",
              justifySelf: "baseline",
            }}
            ml={5}
          >
            매년 11만 마리 이상의 동물이
            <br /> 소유자 등의 부주의 또는 고의적 유기로
            <br />
            버려지고 있습니다.
          </Typography>
        </Box>
        <Box sx={{ ...BoxSx, boxShadow: "none" }}>
          <Typography sx={TypographySx}>
            •<br />•<br />•
          </Typography>
        </Box>
        <Box sx={{ ...BoxSx, p: 5, justifyContent: "center" }}>
          <Typography sx={{ ...TypographySx, m: 5 }}>
            새로운 가족이 되어주세요!
          </Typography>
          <Box
            display={"flex"}
            alignContent={"flex-end"}
            justifyContent={"center"}
          >
            <img alt="소개3" src="/images/About/about2.png" />
            <Button
              variant="contained"
              sx={{
                fontSize: "1.5rem",
                fontWeight: 700,
                height: "80px",
                width: "300px",
                alignSelf: "flex-end",
                ml: 5,
                borderRadius: 5,
                textAlign: "center",
                verticalAlign: "center",
              }}
              onClick={() => navigate(ADOPT.ADOPT)}
            >
              입양 알아보기
            </Button>
          </Box>
        </Box>
        <Box sx={{ ...BoxSx, boxShadow: "none", mt: 30 }}>
          <img alt="소개3" src="/images/About/about3.png" />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

const BoxSx = {
  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  width: "1080px",
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  alignContent: "flex-end",
  pt: 5,
  pb: 10,
  mt: 5,
};

const TypographySx = {
  fontSize: "2rem",
  fontWeight: 600,
  color: "#B29E9E",
  alignSelf: "flex-end",
  justifySelf: "center",
};

export default About;
