import React, {useState, useEffect} from 'react';
import * as S from "./VolunteerNoticeDetail.styled"
import { useParams } from 'react-router-dom';
import { Popover, Button } from '@mui/material';
import axios from 'axios';
import NotFound from "../../NotFound/NotFound";
import Loading from "../../../components/Loading/LoadingPage";
import MapModal from '../../../components/Map/MapModal';
import Comment from '../../../components/Comment/Comment';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hour = String(date.getHours()).padStart(2, '0');
  const minute = String(date.getMinutes()).padStart(2, '0');
  return `${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분`;
}

const VolunteerNoticeDetail = () => {
  const [post, setPost] = useState(null);  // volunteer 데이터 객체 저장 상태값
  const [isLoading, setIsLoading] = useState(true); //로딩 상태
  const {id} = useParams(); //게시글 id
  const [isMapVisible, setIsMapVisible] = useState(false); // 맵 모달 상태 (열림, 닫힘)
  const [anchorEl, setAnchorEl] = useState(null); //클릭 위치에 모달 띄우기 위한 상태값

  useEffect(()=> { //게시글 Detail 호출
    const fetchPost = async () => {
    try{
      await axios.post(`http://localhost:8080/board/volunteer/${id}/increase-viewcount`); //조회수 증가
      const response = await axios.get(`http://localhost:8080/board/volunteer/${id}`); //게시글 Detail 데이터  호출
      setPost(response.data);
    }catch(error){
      console.error('Error fetching data : ', error);
    }finally{
      setIsLoading(false);
    }
  };
  fetchPost();
},[id]);

if (isLoading) {
  return <Loading/>; // 로딩 중일 때 표시할 컴포넌트
}

if(!post){
  return <NotFound/>; //존재하지 않는 번호를 넣었을 때 표시할 컴포넌트
}

const toggleMapModal = () => { //모달 상태 관리
  setIsMapVisible(!isMapVisible);
};

const handleMapButtonClick = (event) => { //버튼 클릭시 해당 위치에 모달창 띄우기
  setAnchorEl(event.currentTarget);
  toggleMapModal();
};

const handleClose = () => { // 닫기 버튼 클릭시 닫기
  setAnchorEl(null);
  toggleMapModal();
};

  return (
    <>
    <S.DetailContainer>
      <S.DetailTop>
        <S.Thumbnail src={post.imgThumbnail} alt="Thumbnail" />
        <S.DetailInfo>
          <h1>{post.volunteerSubject}</h1>
          {/* <p>조회수 : {post.volunteerCount}</p> */}
          <p>보호소 : {post.shelterName}</p>
          <p>활동기간: {formatDate(post.volunteerDate)}</p>
          <p>모집인원: {post.volunteerNumber} 명</p>
          <p>나이제한: {post.volunteerAge}</p>
          <p>
            주소: {post.volunteerAddr}
            <Button onClick={handleMapButtonClick}
            sx={{
              color: "#FBD385",
              height: "50%",
              "&:hover": { backgroundColor: "#FBD385", color: "#FFF"},}}>지도보기</Button>
          </p>
        </S.DetailInfo>
      </S.DetailTop>
      <hr />
      <S.DetailMiddle>
        <h2>글 내용</h2>
        <p>{post.volunteerContent}</p>
      </S.DetailMiddle>

      {/* Div 3 */}
      <S.DetailBottom>
        <hr/>
        <p>댓글 </p>
        <div style={{width: '100%'}}>
        <Comment/>
        </div>
      </S.DetailBottom>
        </S.DetailContainer>
        <Popover
        open={isMapVisible}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}>
        {isMapVisible && <MapModal address={post.volunteerAddr} onClose={handleClose} />}
        </Popover>
    </>
  )

}

export default VolunteerNoticeDetail;