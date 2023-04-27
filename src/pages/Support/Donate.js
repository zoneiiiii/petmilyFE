import React, {useState, useEffect} from 'react';
import * as S from './Donate.styled';
import VolunteerActivismOutlinedIcon from '@mui/icons-material/VolunteerActivismOutlined';


const Donate = () => {
    const dummyDonations = [
        { date: '2022.04.22', name: '홍길동', amount: 1000000 },
        { date: '2022.04.23', name: '나눔재단', amount: 50000 },
        { date: '2022.04.24', name: '김기자', amount: 500000 },
        { date: '2022.04.24', name: '이기자', amount: 300000 },
        { date: '2022.04.24', name: '박기자', amount: 100000 },
        { date: '2022.04.25', name: '강기자', amount: 200000 },
        { date: '2022.04.25', name: '정기사', amount: 80000 },
        { date: '2022.04.25', name: '윤기자', amount: 50000 },
        { date: '2022.04.26', name: '사랑재단', amount: 300000 },
        { date: '2022.04.26', name: '복지재단', amount: 300000 },

      ];
    
      const leftDonations = dummyDonations.slice(0, 5); //좌측 기부내역 표시
      const rightDonations = dummyDonations.slice(5, 10); //우측 기부내역 표시

      const formatCurrency = (number) => { //3번째 자릿수 마다 ',' 와 마지막에 '원' 붙혀주는 함수
        return number.toLocaleString('ko-KR', { currency: 'KRW' }) + '원';
      };

      return (
        <S.Container>
          <S.Banner>
            <S.DonateButton to="/donate/apply">기부하기</S.DonateButton>
          </S.Banner>
          <S.TotalDonation>누적 기부금 : {formatCurrency(2880000)}</S.TotalDonation>
          <S.RecentDonations>
            <S.DonationColumn>
              {leftDonations.map((donation, index) => (
                <S.DonationItem key={index}>
                <span>{donation.date}</span> {donation.name}님{' '}
                <span>{formatCurrency(donation.amount)}</span>
            </S.DonationItem>
      ))}
    </S.DonationColumn>
    <S.DonationColumn>
      {rightDonations.map((donation, index) => (
        <S.DonationItem key={index}>
          <span>{donation.date}</span> {donation.name}님{' '}
          <span>{formatCurrency(donation.amount)}</span>
        </S.DonationItem>
      ))}
    </S.DonationColumn>
          </S.RecentDonations>
          <S.TransparentDisclosure>
          <S.IconContainer>
             <VolunteerActivismOutlinedIcon fontSize="large" />
          </S.IconContainer>
            저희 펫밀리는 <br/>
            기부금 현황과 사용내역을<br/>
            투명하게 공개합니다.
          </S.TransparentDisclosure>
        </S.Container>
      );
}

export default Donate;