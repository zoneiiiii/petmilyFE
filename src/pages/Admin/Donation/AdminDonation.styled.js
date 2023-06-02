import styled from "styled-components";

const Container = styled.div`
  width: 80vw;
  margin: 0 auto;
  margin-top: 3%;
  min-width: 1000px;
`;

const TotalDonation = styled.p`
  text-align: right;
  font-size: 1.25rem;
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
  align-items: center;
  gap: 20px;
  width: 100%;
  margin-bottom: 40px;
`;

const TableTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  margin-top: 20px;
`;

const Table = styled.table`
  width: 90%;
  text-align: left;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  background-color: #fbd385;
  //   color: #ffffff;
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
  TotalDonation,
  RecentDonations,
  DonationColumn,
  TableTitle,
  Table,
  TableHeader,
  TableRow,
  TableData,
};
