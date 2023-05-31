import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CustomTheme } from "../../../assets/Theme/CustomTheme";
import {
    ThemeProvider,
    Grid,
    Card,
} from '@mui/material';
import { COMMUNITY } from '../../../constants/PageURL';
import SearchBar from "../../../components/common/SearchBar";
import CustomButton from "../../Login/CustomButton";
import NotFound from "../../NotFound/NotFound";
import Loading from "../../../components/Loading/LoadingPage";
import { AuthContext } from "../../../contexts/AuthContexts";
import axios from "axios";


const FleaBoard = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]); // DB 데이터 가져오는 변수
    const { loggedIn } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true); //로딩 상태
    const [visibleCount, setVisibleCount] = React.useState(9);  // 더보기 기능

    const handleLoadMore = () => {
        setVisibleCount(visibleCount + 6);  // 더보기 클릭시 추가되는 아이템 개수
    };

    const visibleItems = data.slice(0, visibleCount);
    const isLastPage = visibleCount >= data.length;    // 더 이상 불러올 상품이 없는 경우 true, 더보기 버튼 사라짐.

    /* axios start */
    useEffect(() => {
        //게시글 목록 호출
        const fetchPost = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8080/board/flea`
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


    return (
        <ThemeProvider theme={CustomTheme}>
            <Section className="result">
                <Container className="result-container">
                    <div className="articles-wrap">
                        <div className="articles-searchbar">
                            <p className="article-kind">중고장터</p>
                            <SearchContainer>
                                <SearchBar />
                            </SearchContainer>
                        </div>
                        <div className="card-container">
                            {visibleItems.map((item, index) => (
                                <article className="flat-card" key={index}>
                                    <Link className="article-link" to={COMMUNITY.FLEA_DETAIL(item.boardNum)} >
                                        <div className="card-photo">
                                            <img alt="noImg" src={item.imgThumbnail} onClick={() => navigate(COMMUNITY.FLEA_DETAIL)} />
                                        </div>
                                        <div className="article-info">
                                            <div className="article-title-content">
                                                <span className="article-title">{item.boardSubject}</span>
                                                <span className="article-content">{item.boardContent}</span>
                                            </div>
                                            <p className="article-price">
                                                {(item.boardCost).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
                                            </p>
                                            <section className="article-sub-info">
                                                <span className="article-watch">
                                                    {(item.boardStatus === true) ?
                                                        (<p>판매중</p>) :
                                                        (<p style={{ color: "gray" }}>판매완료</p>)}
                                                </span>
                                            </section>
                                        </div>
                                    </Link>
                                </article>
                            ))}
                        </div>
                        {!isLastPage && (
                            <div className="more-item">
                                <button className="more-btn" onClick={handleLoadMore}>더보기</button>
                            </div>
                        )}

                        {/* {!isLastPage && (
                        <div className="more-btn" onclick={handleLoadMore} >
                            <span className="more-text">더보기</span>
                            <div className="more-loading" style={{ display: 'none' }}>
                                <div className="loader"></div>
                            </div>
                        </div>
                    )} */}
                    </div>
                    {loggedIn === true ?
                        <Link to={COMMUNITY.FLEA_WRITE}>
                            <CustomButton label="글쓰기" value="글쓰기">
                                글쓰기
                            </CustomButton>
                        </Link> : <></>
                    }
                </Container>
            </Section >
        </ThemeProvider>
    );
}

const Section = styled.section`
    // margin-top: 24px;
    background: #f8f9fa;
    padding: 30px 0 40px 0;
`

const SearchContainer = styled.div`
    margin: 50px 40px 10px 0;
    float: right;
      `;

const Container = styled.div`
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
        align-items:center;
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
        background: linear-gradient(to right top, rgb(255, 138, 61) 25%, rgba(255, 255, 255, 0) 70%);
        animation: 1.4s linear 0s infinite normal none running animation;
    }
`

export default FleaBoard;