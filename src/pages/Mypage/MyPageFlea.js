import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styleds from "styled-components";
import {
  Typography,
  ThemeProvider,
  Table,
  TableCell,
  TableHead,
  TableRow,
  Grid,
} from "@mui/material";
import { CustomTheme } from "../../assets/Theme/CustomTheme";
import { AuthContext } from "../../contexts/AuthContexts";
import axios from "axios";
import { COMMUNITY } from "../../constants/PageURL";

const MyPageFlea = () => {
  const { userNum } = useContext(AuthContext);
  const [flea, setFlea] = useState([]);
  const navigate = useNavigate();

  //fleaboard 무한스크롤 설정
  const [visibleCount, setVisibleCount] = useState(8); // 더보기 기능

  useEffect(() => {
    if (userNum) {
      // API 호출
      axios
        .get(`/mypage/flea/${userNum}`)
        .then((response) => {
          setFlea(response.data);
        })
        .catch((error) => {
          console.error("데이터 수신 오류 :", error);
        });
    }
  }, [userNum]);
  const handleLoadMore = () => {
    setVisibleCount(visibleCount + 6); // 더보기 클릭시 추가되는 아이템 개수
  };

  const visibleItems = flea.slice(0, visibleCount);
  const isLastPage = visibleCount >= flea.length; // 더 이상 불러올 상품이 없는 경우 true, 더보기 버튼 사라짐.
  if (flea.length === 0) {
    return (
      <ThemeProvider theme={CustomTheme}>
        <Typography
          className="myOrderListTitle"
          sx={titleSx}
          border={3}
          borderColor="#ffbd59"
          mb={4}
        >
          매매장터
        </Typography>
        <Grid sx={{ width: "940px", height: "50vh" }}>
          <Table
            aria-label="caption table"
            overflow="hidden"
            sx={{ border: "1px solid lightgray" }}
          >
            <TableHead>
              <TableRow>
                <TableCell colSpan={4} align="center" sx={{ height: 250 }}>
                  게시글이 없습니다.
                </TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </Grid>
      </ThemeProvider>
    );
  } else {
    return (
      <ThemeProvider theme={CustomTheme}>
        <Typography
          className="myOrderListTitle"
          sx={titleSx}
          border={3}
          borderColor="#ffbd59"
          mb={4}
        >
          매매장터
        </Typography>
        <Container className="result-container">
          <div className="articles-wrap">
            <div className="card-container">
              {visibleItems.map((item, index) => (
                <article className="flat-card" key={index}>
                  <Link
                    className="article-link"
                    to={COMMUNITY.FLEA_DETAIL(item.boardNum)}
                  >
                    <div className="card-photo">
                      <img
                        alt="noImg"
                        src={item.imgThumbnail}
                        onClick={() => navigate(COMMUNITY.FLEA_DETAIL)}
                      />
                    </div>
                    <div className="article-info">
                      <div className="article-title-content">
                        <span className="article-title">
                          {item.boardSubject}
                        </span>
                        <span className="article-content">
                          {item.boardContent}
                        </span>
                      </div>
                      <p className="article-price">
                        {item.boardCost
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        원
                      </p>
                      <section className="article-sub-info">
                        <span className="article-watch">
                          {item.boardStatus === true ? (
                            <p>판매중</p>
                          ) : (
                            <p style={{ color: "gray" }}>판매완료</p>
                          )}
                        </span>
                      </section>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
            {!isLastPage && (
              <div className="more-item">
                <button className="more-btn" onClick={handleLoadMore}>
                  더보기
                </button>
              </div>
            )}
          </div>
        </Container>
      </ThemeProvider>
    );
  }
};
const titleSx = {
  width: "200px",
  textAlign: "center",
  fontStyle: "normal",
  fontWeight: "bold",
  fontSize: "1.5rem",
  lineHeight: "50px",
};
//flea style
const Container = styleds.div`
width: 60vw;
// width: 1150px;
max-width: 1150px;
min-width: 790px;
border-radius: 8px;
border-width: 1px;
border-style: solid;
border-color: rgb(233, 236, 239);
border-image: initial;
margin: 0px auto 20px;
background: rgb(255, 255, 255);

.articles-wrap {
  padding: 0px 40px;
}

.articles-searchbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.article-kind {
  font-weight: 600;
  color: rgb(33, 37, 41);
  font-size: 40px;
  margin: 20px 0 40px 0;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  // justify-content: center;
  // align-items:center;
}

.flat-card {
  position: relative;
  text-align: left;
  display: inline-block;
  width: auto;
  min-width: 310px;
  max-width: 310px;
  margin: 0 20px 30px 20px;
  // margin-right: 45px;
  // margin-bottom: 30px;
  border: 1px solid rgb(233, 236, 239);
  border-radius: 9px 9px 0 0;
  box-shadow: 1px 1px 4px 0px rgb(233, 236, 239);
}

.article-link {
  display: block;
  color: rgb(33, 37, 41);
  text-decoration: none;
}

.card-photo {
  height: 260px;
  background-color: rgb(248, 249, 250);
  overflow: hidden;
  border-radius: 0.5rem;
  margin: 0.5rem;
}

img {
  width: 100%;
  // height: 100%
  display: block;
  transform: translate(0px, -13%);
}

.article-info {
  margin: 0.5rem;
}

.article-title {
  display: block;
  font-weight: 600;
  color: rgb(33, 37, 41);
  font-size: 22px;
  line-height: 30px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.article-content {
  display: none;
}

.article-price {
  font-weight: 600;
  color: rgb(255, 138, 61);
  font-size: 20px;
  line-height: 22px;
  // margin: 10px 5px;
}

.article-sub-info {
  position: absolute;
  right: 12px;
  bottom: 7px;
}

.article-watch {
  color: rgb(33, 37, 41);
  display: flex;
  font-size: 16px;
}

.watch-icon {
  width: 17px;
  margin: 4px 0px -1px 4px;
}

.more-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  cursor: pointer;
  width: 100%;
  background-color: #ffffff;
  color: rgb(134, 142, 150);
  font-size: 16px;
  border: none;
}

.more-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  cursor: pointer;
  width: 100%;
  border-top: 1px solid rgb(233, 236, 239);
  margin-top: 10px;
}

.loader {
  text-indent: -9999em;
  width: 24px;
  height: 24px;
  position: relative;
  transform: translateZ(0px);
  border-radius: 100%;
  background: linear-gradient(
    to right top,
    rgb(255, 138, 61) 25%,
    rgba(255, 255, 255, 0) 70%
  );
  animation: 1.4s linear 0s infinite normal none running animation;
}
`;
export default MyPageFlea;
