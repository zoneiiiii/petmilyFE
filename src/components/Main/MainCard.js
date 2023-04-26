import React from 'react';
import * as S from './MainCard.styled';

const MainCard = ({ title, image, buttonText, link }) => {
  return (
    <S.Card href={link}>
      <S.BackgroundImage style={{ backgroundImage: `url(${image})` }}>
        <S.CardContent>
          <S.Title>{title}</S.Title>
          <S.Button>{buttonText}</S.Button>
        </S.CardContent>
      </S.BackgroundImage>
    </S.Card>
  );
};

export default MainCard;

// -- 이전 코드
// import React from 'react';
// import { Card, Typography, Link } from '@mui/material';
// import { styled } from '@mui/system';

// const CustomCard = styled(Card)({
//   backgroundColor: '#FFFFFF',
//   padding: 20,
//   marginTop:40,
//   marginBottom: 40,
//   display: 'flex',
//   flexDirection: 'column',
//   height : '15%',
// });

// const InfoContent = styled('div')({
//   display: 'flex',
//   flexDirection: 'column',
//   marginTop: 20,
//   paddingLeft: 50,
//   cursor: 'default',
// });

// const InfoImage = styled('img')({
//   maxWidth: '80%',
//   maxHeight: '10%',
//   width: '80%',
//   height: '50vh',
//   objectFit: 'cover',
//   borderRadius: 10,
//   marginTop: 20,
//   marginBottom: 20,
// });

// const InfoLink = styled(Link)({
//   fontSize: 30,
//   fontWeight: 'bold',
//   alignSelf: 'flex-end',
//   textDecoration: 'none',
//   marginRight : 20,
//   color: "#867777",
//     '&:hover': {
//         color: "#BFBFBF"
//     }
// });

// const InfoSection = ({ title, image, buttonText, link }) => {
//   return (
//     <CustomCard>
//       <InfoContent>
//         {/* <Typography variant="h5" component="div" style={{fontSize:30, fontWeight:'bold', color:'#867777'}}>
//           {title}
//         </Typography> */}
//         <InfoImage src={image} alt={title} />
//         </InfoContent>
//       <InfoLink href={link}>{buttonText}</InfoLink>
//     </CustomCard>
//   );
// };

// export default InfoSection;