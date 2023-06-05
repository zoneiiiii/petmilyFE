import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { COMMUNITY } from '../../../constants/PageURL';
import styled from "styled-components";
import { CustomTheme } from "../../../assets/Theme/CustomTheme";
import {
    ThemeProvider,
    Grid,
    Card,
    Container,
} from '@mui/material';
import SearchBar from "../../../components/common/SearchBar";
import Pagination from "@mui/material/Pagination";
import CustomButton from "../../Login/CustomButton";
import NotFound from "../../NotFound/NotFound";
import Loading from "../../../components/Loading/LoadingPage";
import { AuthContext } from "../../../contexts/AuthContexts";
import axios from "axios";

const FindBoard = () => {
    const [data, setData] = useState([]); // DB 데이터 가져오는 변수
    const [page, setPage] = useState(1); // 현재 페이지 관리하는 상태 변수
    const itemsPerPage = 12; // 한페이지에 보여줄 페이지의 개수
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const cards = data.slice(startIndex, endIndex); // 현재 페이지에 해당하는 카드 데이터 계산
    const [maxPageNum, setMaxPageNum] = useState(1);
    const { loggedIn } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true); //로딩 상태

    /* pagenation start */
    const handleChange = (event, value) => {
        //페이지 변경 시 호출, 새 페이지의 번호를 value에 저장함.
        setPage(value);
        console.log(data);
    };

    const getPageNum = () => {
        const maxLength = data.length;
        return setMaxPageNum(Math.ceil(maxLength / itemsPerPage));
    }

    useEffect(() => {
        getPageNum();
    });
    /* pagenation end */

    /* axios start */
    useEffect(() => {
        //게시글 목록 호출
        const fetchPost = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8080/board/find`
                ); //게시글 데이터 호출
                setData(response.data);
            } catch (error) {
                console.error("Error fetching data : ", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchPost();
    }, []);
    /* axios end */

    if (isLoading) {
        return <Loading />; // 로딩 중일 때 표시할 컴포넌트
    }

    if (!data) {
        return <NotFound />; //존재하지 않는 번호를 넣었을 때 표시할 컴포넌트
    }

    const formatDate = (dateString) => {
        //날짜 변환함수
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}/${month}/${day}`;
    };

    return (
        <ThemeProvider theme={CustomTheme}>
            <Section className="result">
                <MainContainer className="result-container">
                    <ContainerBox>
                        <Top>목격 제보 게시판</Top>

                        <Container sx={{ py: '30px' }} maxWidth="60vw">
                            <SearchContainer>
                                <SearchBar />
                            </SearchContainer>
                            <Grid container spacing={4} columns={8}>
                                {data
                                    .slice(
                                        (page - 1) * itemsPerPage,
                                        (page - 1) * itemsPerPage + itemsPerPage
                                    )
                                    .map((card) => {
                                        return (
                                            <Grid item xs={10} sm={6} md={2} key={card.boardNum}>
                                                <Link to={COMMUNITY.FIND_DETAIL(card.boardNum)} style={{ textDecoration: "none" }}>
                                                    <Card
                                                        sx={{
                                                            height: "100%",
                                                            display: "flex",
                                                            flexDirection: "column",
                                                            border: "1px solid rgb(233, 236, 239)",
                                                            boxShadow: "1px 1px 4px 0px rgb(233, 236, 239)"
                                                        }}
                                                    >
                                                        <CardImage src={card.imgThumbnail} />
                                                        <div>
                                                            <CardTitle>{card.boardSubject}</CardTitle>
                                                            <CardWritter>{card.memberNickName}</CardWritter>
                                                            <CardDate>{formatDate(card.boardDate)}</CardDate>
                                                            <CardCount>조회 {card.boardCount}</CardCount>
                                                        </div>
                                                    </Card>
                                                </Link>
                                            </Grid>
                                        );
                                    })}
                            </Grid>
                            {loggedIn === true ?
                                <Link to={COMMUNITY.FIND_WRITE}>
                                    <CustomButton label="글쓰기" value="글쓰기">
                                        글쓰기
                                    </CustomButton>
                                </Link> : <></>
                            }
                        </Container>
                        <Pagination
                            color="primary"
                            page={page}
                            count={maxPageNum}
                            onChange={handleChange}
                            showFirstButton
                            showLastButton
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                margin: '50px 0 0 0px'
                            }}
                        />
                    </ContainerBox >
                </MainContainer>
            </Section>
        </ThemeProvider >
    );
};

const Section = styled.section`
  background: #f8f9fa;
  padding: 30px 0 40px 0;
`

const MainContainer = styled.div`
  width: 1008px;
  max-width: 1150px;
  min-width: 790px;
  border-radius: 8px;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(233, 236, 239);
  border-image: initial;
  margin: 0px auto 20px;
  background: rgb(255, 255, 255);
`

const Top = styled.h1`
      font-size: 2rem;
      font-weight: bold;
      text-align: center;
      margin-bottom: 2rem;
      `;

const SearchContainer = styled.div`
  float: right;
  margin-left: auto;
  margin-bottom: 20px;
`;

const CardImage = styled.img`
    width: auto;
    height: 196px;
    object-fit: cover;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    border: 1px solid #ccc;
    border-radius: 0.5rem;
    margin: 0.5rem;
  `;

const CardTitle = styled.p`
      font-weight: bold;
      font-size: 1.1rem;
      margin: 0.3em 0.5em 0em 0.5em;
      line-height: 1.2em;
      height: 2.4em;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      `;

const CardWritter = styled.p`
      font-size: 14px;
      color: #888;
      margin-left: 10px
      `;

const CardCount = styled.p`
      font-size: 14px;
      color: #888;
      float: right;
      margin-right: 10px;
      `

const CardDate = styled.p`
font-size: 14px;
color: #888;
float: left;
margin-left: 10px
`

const ContainerBox = styled.div`
    margin-bottom: 20px;
    
`

export default FindBoard;
