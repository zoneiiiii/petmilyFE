import styled from "styled-components";
import { Link } from "react-router-dom";
import BannerImg from "../../assets/images/Support/Donate/DonateImg.jpg";

const Container = styled.div`
  width: 70vw;
  margin: 0 auto;
  margin-top: 3%;
  min-width: 1000px;
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
  background-color: #fbd385;
  color: #ffffff;
  text-decoration: none;
  border-radius: 5px;
  &:hover {
      background-color: #AF935D;
    }
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
  border-top: 1px solid #ddd;
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
  flex-grow: 1;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const DonationItemlist = styled.div`
margin 20px 20px 10px 10px;
font-size : 18px;
`;

const TransparentDisclosure = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin: 40px 0;
  font-size: 20px;
  font-weight: bold;
  margin-top: 5%;
`;

const IconContainer = styled.div`
  font-size: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
`;
const TableTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  margin-top: 20px;
`;

const Table = styled.table`
  width: 100%;
  text-align: left;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  background-color: #fbd385;
  color: #ffffff;
  padding: 10px;
  border: 1px solid #fbd385;
  text-align: center;
`;

const TableRow = styled.tr`
  :nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const TableData = styled.td`
  padding: 10px 5px 5px 10px;
  border: 1px solid #dddddd;
  text-align: center;
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
  IconContainer,
  DonationItemlist,
  TableTitle,
  Table,
  TableHeader,
  TableRow,
  TableData,
};
