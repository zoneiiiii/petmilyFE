import styled from 'styled-components';
import { Link } from 'react-router-dom';
import BannerImg from '../../assets/images/Support/Donate/card1.jpg';

const Container = styled.div`
  width: 80%;
  margin: 0 auto;
  margin-top : 3%;
`;

const Banner = styled.div`
  position: relative;
  width: 100%;
  height: 50vh;
  background-image: url(${BannerImg});
  background-size: cover;
  background-position: center;
`;

const DonateButton = styled(Link)`
  position: absolute;
  right: 20px;
  bottom: 20px;
  padding: 10px 20px;
  background-color: #FBD385;
  color: #FFFFFF;
  text-decoration: none;
  border-radius: 5px;
`;

const TotalDonation = styled.p`
  text-align: right;
  font-size: 1.5rem;
  font-weight: bold;
  margin: 20px 0;
`;

const RecentDonations = styled.div`
  display: flex;
  justify-content: space-between;
`;

const DonationColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 49%;
`;

const DonationItem = styled.div`
  flex-basis: 49%;
  font-size: 1rem;
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const TransparentDisclosure = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin: 40px 0;
  font-size : 20px;
  font-weight : bold;
  margin-top : 5%
`;

const IconContainer = styled.div`
  font-size: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
`;

export {
  Container,
  Banner,
  DonateButton,
  TotalDonation,
  RecentDonations,
  DonationColumn,
  DonationItem,
  TransparentDisclosure,
  IconContainer
};
