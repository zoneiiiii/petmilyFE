import { Box, Button, ThemeProvider, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CustomTheme } from "../../assets/Theme/CustomTheme";
import { ADOPT, COMMUNITY, SUPPORT, SHOP } from "../../constants/PageURL";
import { Fade } from "react-reveal";

const About = () => {
  const navigate = useNavigate();
  return (
    <ThemeProvider theme={CustomTheme}>
      <Box display={"flex"} justifyContent={"center"} flexWrap={"wrap"}>
        <Fade Bottom>
          <Box align="center" mt={20} height="300px">
            <img
              alt="로고"
              src="/images/petLogo.png"
              width="230px"
              height="70px"
            />
            <p style={{ fontSize: "1.5rem", color: "gray", margintop: 10 }}>
              펫밀리, <strong style={{ color: "black" }}>입양의 가치</strong>를
              알리다.
            </p>
          </Box>
        </Fade>
        <Fade Bottom>
          <img
            alt="소개1"
            src="/images/About/about.jpg"
            width="800px"
            height="500px"
            style={{ borderRadius: "10px" }}
          />
          <Typography
            sx={{
              ...TypographySx,
              fontSize: "1.4rem",
              justifySelf: "baseline",
            }}
            ml={5}
          >
            매년 11만 마리 이상의 동물들이
            <br /> 소유자의 부주의 또는 고의적 유기로 버려지고 있습니다.
          </Typography>
        </Fade>
        <Fade Bottom>
          <Box sx={BoxSx}>
            <img
              alt="소개1"
              src="/images/About/chart.png"
              heigth="300px"
              style={{ margintop: 20, paddingTop: 5 }}
            />
            <Typography sx={{ ...TypographySx, fontSize: "1.4rem" }}>
              동물들이 더이상 안타까운 죽음을 맞이하지 않도록
              <br />
              소중한 생명을 지켜주세요.
            </Typography>
          </Box>
        </Fade>
        <Fade Bottom>
          <Box sx={BoxSx}>
            <img
              alt="소개1"
              src="/images/About/about4.png"
              style={{ borderRadius: "30px" }}
            />
            <div
              style={{
                marginTop: "150px",
                marginLeft: "50px",
                textAlign: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: "1.4rem",
                }}
              >
                전국 보호소에 있는
                <br />
                유기 동물들을 볼 수 있습니다.
              </Typography>
              <Button onClick={() => navigate(ADOPT.ADOPT)}>
                보호 동물 보러가기
              </Button>
            </div>
          </Box>
        </Fade>
        <Fade Bottom>
          <Box sx={BoxSx}>
            <div
              style={{
                marginTop: "150px",
                marginRight: "90px",
                textAlign: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: "1.4rem",
                }}
              >
                유기동물들의
                <br />
                새로운 가족이 되어주세요.
              </Typography>
              <Button onClick={() => navigate(ADOPT.APPLICATION)}>
                입양 신청하기
              </Button>
            </div>
            <img alt="소개1" src="/images/About/about2.png" />
          </Box>
        </Fade>
        <Fade Bottom>
          <Box sx={BoxSx}>
            <img
              alt="소개1"
              src="/images/About/about5.jpg"
              style={{ borderRadius: "30px" }}
            />
            <div
              style={{
                marginTop: "150px",
                marginLeft: "50px",
                textAlign: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: "1.4rem",
                }}
              >
                실종 동물 찾기, 중고장터 등
                <br />
                각종 커뮤니티를 이용해보세요!
              </Typography>
              <Button onClick={() => navigate(COMMUNITY.MISSING)}>
                커뮤니티 둘러보기
              </Button>
            </div>
          </Box>
        </Fade>
        <Fade Bottom>
          <Box sx={BoxSx}>
            <div
              style={{
                marginTop: "150px",
                marginRight: "90px",
                textAlign: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: "1.4rem",
                }}
              >
                반려동물을 위한
                <br />
                다양한 물품을 판매합니다.
              </Typography>
              <Button onClick={() => navigate(SHOP.PRODUCT)}>
                반려용품 보러가기
              </Button>
            </div>
            <img
              alt="소개1"
              src="/images/About/about6.png"
              style={{ borderRadius: "30px" }}
            />
          </Box>
        </Fade>

        <Fade Bottom>
          <Box sx={BoxSx}>
            <img
              alt="소개1"
              src="/images/About/about7.png"
              style={{ borderRadius: "30px" }}
            />
            <div
              style={{
                marginTop: "150px",
                marginLeft: "50px",
                textAlign: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: "1.4rem",
                }}
              >
                유기동물을 향한
                <br />
                사랑과 관심을 표현하세요.
              </Typography>
              <Button onClick={() => navigate(SUPPORT.DONATE)}>후원하기</Button>
            </div>
          </Box>
        </Fade>
        <Fade Bottom>
          <Box sx={{ ...BoxSx, boxShadow: "none" }}>
            <div style={{ textAlign: "center" }}>
              <img alt="소개3" src="/images/About/about3.png" />
              <br />
              <h2>❝ 사지말고 입양하세요 ❞</h2>
              <p>펫밀리는 건강한 입양 문화를 지향합니다.</p>
            </div>
          </Box>
        </Fade>
      </Box>
    </ThemeProvider>
  );
};

const BoxSx = {
  width: "1080px",
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  alignContent: "flex-end",
  pt: 5,
  pb: 10,
  mt: 20,
};

const TypographySx = {
  fontSize: "2rem",
  fontWeight: 600,
  color: "#B29E9E",
  alignSelf: "flex-end",
  justifySelf: "center",
  marginTop: "20px",
  textAlign: "center",
};

export default About;
