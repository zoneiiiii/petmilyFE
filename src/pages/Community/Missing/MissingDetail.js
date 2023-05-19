import styled from "styled-components";
import React, { useState, useEffect } from "react";
import Comment from "../../../components/Comment/Comment";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import NotFound from "../../NotFound/NotFound";
import Loading from "../../../components/Loading/LoadingPage";
import CustomButton from "../../Login/CustomButton";
import { COMMUNITY } from "../../../constants/PageURL";


const MissingDetail = () => {
  const [data, setData] = useState([]); // DB 데이터 가져오는 변수
  const [isLoading, setIsLoading] = useState(true); //로딩 상태
  const { id } = useParams(); //게시글 id

  /* axios start */
  useEffect(() => {
    //게시글 Detail 호출
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/board/missing/${id}`
        ); //게시글 Detail 데이터  호출
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data : ", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPost();
  }, [id]);
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
    const hour = String(date.getHours()).padStart(2, "0");
    const minute = String(date.getMinutes()).padStart(2, "0");
    return `${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분`;
  };


  return (
    <Section className="result">
      <MainContainer className="result-container">
        <Container>
          <Top>실종 동물 게시판</Top>
          <Head>
            <hr />
            <p className="title">{data.boardSubject}</p>
            <div className="subtitle">
              <p className="name">{data.memberNickName}</p>
              <p className="date">{formatDate(data.boardDate)}</p>
              <p className="cnt">조회수: {data.boardCount} · 댓글: 3</p>
            </div>
            <hr /><br />
          </Head>
          <Body>
            <div>
              <p># 실종 지역 : {data.boardLocation}</p>
              <p># 종류 : {data.boardSpecies}</p>
              <p># 성별 : {data.boardGender}</p>
              <p># 나이 : {data.boardAge} 살</p>
            </div>
            <img
              src="http://placeimg.com/300/300/animals/sepia"
              alt="img"
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                width: "auto !important",
                height: "auto",
              }}
            />
            <div>
              <br />
              <div>
                <br />
                {data.boardContent}
              </div>

            </div>
            <Link to={COMMUNITY.MISSING} style={{ textDecoration: "none" }}>
              <CustomButton label="돌아가기" value="작성취소" />
            </Link>
          </Body>


          <Comments>
            <hr />
            <p className="comment">댓글</p>
            <Comment />
          </Comments>
        </Container>

      </MainContainer>
    </Section>
  );
}
const Section = styled.section`
  background: #f8f9fa;
  padding: 30px 0 40px 0;
`

const MainContainer = styled.div`
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
`

const Container = styled.div`
margin: 30px ;
`;

const Top = styled.h1`
    font-size: 2rem;
    font-weight: bold;
    text-align: center;
    margin-bottom: 2rem;
`;

const Head = styled.div`

    .title {
        font-size: 1.5rem;
        font-weight: bold;
    }

    .subtitle {
        display: flex;
    flex-wrap: wrap;
    .name {
        width: 15%;
    }
    .date {
        width: 60%;
    }
    .cnt {
        text-align: right;
        width: 25%;
    }
    .comment {
        text-align: right;
        width: 5%;
    }
`;

const Body = styled.div`
    margin: auto;
`;

const Comments = styled.div`
    margin: 150px auto 20px auto;
    font-size: 2rem;
    font-weight: 700;
`;


//data : board_num,member_num,board_id,free_subject,free_content,
// free_count,free_img,free_date
const dummy = [
  {
    board_num: 1,
    member: "똘이엄마",
    free_count: "31",
    free_subject: "똘이를 찾았습니다ㅠㅠ",
    free_content: "도와주셔서 감사합니다ㅠㅠㅠ",
    free_date: "2023-04-30",
    free_img: "../../../../public/images/petmilyIcon.png"
  }];

export default MissingDetail;