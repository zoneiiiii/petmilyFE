import "../../Styles/Footer.css";
import { Link } from "react-router-dom";
import { CustomTheme } from "../../assets/Theme/CustomTheme";
import { ThemeProvider, Typography } from "@mui/material";
import { ABOUT } from "../../constants/PageURL";

const Footer = () => {
  return (
    <ThemeProvider theme={CustomTheme}>
      <footer className="footer">
        <div className="footer_contents">
          <h2>PETMILY</h2>
          <Typography
            component={"p"}
            sx={{
              fontSize: "13px",
              color: "gray",
              lineHeight: "15px",
            }}
          >
            ©Petmily. All rights reserved
            <br />
            We love our users🎔
            <br />
          </Typography>
          <span className="reverse_p">
            <img
              className="github"
              alt="github"
              src="/images/navigator/Github.png"
            />
            <img alt="facebook" src="/images/navigator/Facebook.png" />
            <img alt="instargram" src="/images/navigator/Instagram.png" />
            <img alt="twitter" src="/images/navigator/Twitter.png" />
          </span>
        </div>
        <div className="footer_contents2">
          <Link
            to={ABOUT.FAQ}
            style={{
              textDecoration: "none",
              color: "black",
            }}
          >
            <h3>문의하기</h3>
          </Link>
          <Link
            to={ABOUT.ABOUT}
            style={{ textDecoration: "none", color: "black" }}
          >
            <h3>서비스소개</h3>
          </Link>
          <Link to="#" style={{ textDecoration: "none", color: "black" }}>
            <h3>개인정보처리방침</h3>
          </Link>
          <Link to="#" style={{ textDecoration: "none", color: "black" }}>
            <h3>이용약관</h3>
          </Link>
        </div>
      </footer>
    </ThemeProvider>
  );
};

export default Footer;
