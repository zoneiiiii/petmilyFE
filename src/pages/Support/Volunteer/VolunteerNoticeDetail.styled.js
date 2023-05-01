import styled from 'styled-components';

const DetailContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  margin-top : 3%;
`;

const DetailTop = styled.div`
  display: flex;
`;

// const ImageSection = styled.div`

// `;

// const InfoSection = styled.div`

// `;

const Thumbnail = styled.img`
  width: 25%;
  height: 25%;
`;

const DetailInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 20px;
`;

const DetailMiddle = styled.div``;

const DetailBottom = styled.div``;

export {DetailBottom,DetailContainer,DetailInfo,DetailMiddle,DetailTop,Thumbnail}