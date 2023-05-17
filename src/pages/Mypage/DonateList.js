import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { CustomTheme } from "../../assets/Theme/CustomTheme";
import { ThemeProvider, Typography, Box, Button } from "@mui/material";
import SearchBar from "../../components/common/SearchBar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { CustomDatePicker } from "../../components/common/CustomDatePicker";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { MYPAGE } from "../../constants/PageURL";

const DonateList = () => {
  const pageLimit = 10;
  const navigate = useNavigate();
  const [donor, setDonor] = useState("");
  const [startDate, setStartDate] = useState(
    dayjs(dayjs().subtract(6, "month").startOf("date").toDate())
  );
  const [endDate, setEndDate] = useState(dayjs().endOf("date"));
  const [searchKeyword, setSearchKeyword] = useState("");
  const [queryData, setQueryData] = useState(dummy);
  const [dateList, setDateList] = useState([
    ...new Set(dummy.map((donate) => donate.donationDate)),
  ]);
  const resetDate = () => {
    setStartDate(dayjs(dayjs().subtract(6, "month").startOf("date").toDate()));
    setEndDate(dayjs().endOf("date"));
  };
  // 검색에 따른 데이터 조회
  useEffect(() => {
    searchKeyword && console.log(searchKeyword);
    console.log(
      startDate.format("YYYY-MM-DD"),
      startDate,
      endDate.format("YYYY-MM-DD"),
      endDate
    );
    setQueryData(
      dummy.filter(
        (data) =>
          data.donationName.includes(searchKeyword) &&
          dayjs(data.donationDate) >= startDate &&
          dayjs(data.donationDate) <= endDate
      )
    );
  }, [startDate, endDate, searchKeyword]);

  // 검색결과에 따른 날짜리스트 변경
  useEffect(() => {
    setDateList([
      ...new Set(
        queryData.map((data) => dayjs(data.donationDate).format("YYYY-MM-DD"))
      ),
    ]);
  }, [queryData]);
  const ShowMore = () => {};

  return (
    <ThemeProvider theme={CustomTheme}>
      {donor ? (
        <Box>no donor!</Box>
      ) : (
        <Box>
          <Typography
            className="myOrderListTitle"
            sx={titleSx}
            border={3}
            borderColor="ffbd59.main"
            mb={4}
          >
            기부 내역
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box display={"flex"}>
              <CustomDatePicker
                label="Start Date"
                defaultValue={dayjs(startDate)}
                value={startDate}
                onChange={(date) => setStartDate(date)}
                maxDate={endDate}
                width={"205px"}
                sx={{ mr: 2 }}
              />
              <CustomDatePicker
                label="End Date"
                defaultValue={dayjs(endDate)}
                value={endDate}
                onChange={(date) => setEndDate(date)}
                maxDate={endDate}
                minDate={startDate}
                width={"205px"}
              />
              <Button
                title="reset"
                onClick={resetDate}
                sx={{
                  minWidth: "40px",
                }}
              >
                <AutorenewIcon onClick={resetDate} />
              </Button>
            </Box>
            <SearchBar
              setValue={setSearchKeyword}
              value={searchKeyword}
              width={"250px"}
            />
          </Box>
          {dateList.map((date, index) => {
            return (
              <Box key={index} className="MyOrderList">
                <Typography
                  className="MyOrderDate"
                  sx={dateSx}
                  mt={4}
                  mb={4}
                  pl={4}
                  border={2}
                  borderRadius={2}
                  borderColor="ffbd59.main"
                >
                  {date}
                </Typography>
                <Box
                  p={2}
                  border={2}
                  borderRadius={2}
                  borderColor="ffbd59.main"
                >
                  <Table
                    size="small"
                    padding="normal"
                    sx={{ minWidth: "800px" }}
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell sx={thSx}>기부자명</TableCell>
                        <TableCell sx={thSx}>기부명</TableCell>
                        <TableCell sx={thSx}>기부금액</TableCell>
                        <TableCell sx={thSx}>결제수단</TableCell>
                        <TableCell sx={thSx}>기부상세일자</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {queryData
                        .filter(
                          (donation) =>
                            dayjs(donation.donationDate) >=
                              dayjs(date).startOf("date") &&
                            dayjs(donation.donationDate) <=
                              dayjs(date).endOf("date")
                        )
                        .map((row, index2) => (
                          <TableRow key={index2}>
                            <TableCell sx={tdSx}>{row.donationDonor}</TableCell>
                            <TableCell sx={tdSx}>{row.donationName}</TableCell>
                            <TableCell sx={tdSx}>
                              {parseInt(row.donationCost).toLocaleString()}원
                            </TableCell>
                            <TableCell sx={tdSx}>{"카카오페이"}</TableCell>
                            <TableCell sx={tdSx}>
                              {dayjs(row.donationDate).format(
                                "YY-MM-DD HH:mm:ss"
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </Box>
              </Box>
            );
          })}
          {dateList.length === pageLimit && (
            <Box mt={5} sx={{ display: "flex", justifyContent: "center" }}>
              <Button color="primary" align="center" onClick={ShowMore}>
                기부내역 더보기
              </Button>
            </Box>
          )}
        </Box>
      )}
    </ThemeProvider>
  );
};

const titleSx = {
  width: "200px",
  textAlign: "center",
  fontStyle: "normal",
  fontWeight: "bold",
  fontSize: "1.5rem",
  lineHeight: "50px",
};

const dateSx = {
  fontStyle: "normal",
  fontWeight: "bold",
  fontSize: "1.5rem",
  lineHeight: "50px",
};

const thSx = {
  fontWeight: "bold",
  textAlign: "center",
  fontSize: "1.2rem",
};
const tdSx = {
  fontSize: "1rem",
  fontWeight: 600,
  textAlign: "center",
};

const dummy = [
  {
    donationNum: 6,
    donationDonor: "믿음보호소",
    donationName: "반려묘식비기부",
    donationTel: "02-123-4567",
    donationEmail: "trust@naver.com",
    donationCost: 6000,
    donationDate: "2023-05-02 18:30:27",
    paymentNum: 6,
  },
  {
    donationNum: 5,
    donationDonor: "사랑보호소",
    donationName: "반려견식비기부",
    donationTel: "02-123-4567",
    donationEmail: "love@naver.com",
    donationCost: 5000,
    donationDate: "2023-05-02 17:30:27",
    paymentNum: 5,
  },
  {
    donationNum: 4,
    donationDonor: "행복보호소",
    donationName: "반려코브라식비기부",
    donationTel: "02-123-4567",
    donationEmail: "happy@naver.com",
    donationCost: 4000,
    donationDate: "2023-03-02 16:30:27",
    paymentNum: 4,
  },
  {
    donationNum: 3,
    donationDonor: "가족보호소",
    donationName: "반려도마뱀식비기부",
    donationTel: "02-123-4567",
    donationEmail: "family@naver.com",
    donationCost: 3000,
    donationDate: "2023-02-02 15:30:27",
    paymentNum: 3,
  },
  {
    donationNum: 2,
    donationDonor: "무새보호소",
    donationName: "반려앵무새식비기부",
    donationTel: "02-123-4567",
    donationEmail: "parrot@naver.com",
    donationCost: 2000,
    donationDate: "2023-01-02 14:30:27",
    paymentNum: 2,
  },
  {
    donationNum: 1,
    donationDonor: "행복보호소",
    donationName: "반려견식비기부",
    donationTel: "02-123-4567",
    donationEmail: "happy@naver.com",
    donationCost: 1000,
    donationDate: "2022-12-02 13:30:27",
    paymentNum: 1,
  },
];

const orderlist = [
  {
    orderNum: 5,
    productName: "유기농 강아지 사료 3kg",
    cost: 49000,
    quantity: 10,
    orderDate: "2023-04-30",
    orderState: "배송중",
    productImg: "/images/product.png",
  },
  {
    orderNum: 4,
    productName: "저렴이 강아지 사료 5kg",
    cost: 49000,
    quantity: 10,
    orderDate: "2023-04-30",
    orderState: "배송완료",
    productImg: "/images/product.png",
  },
  {
    orderNum: 3,
    productName: "일반 강아지 사료 3kg",
    cost: 49000,
    quantity: 10,
    orderDate: "2023-04-29",
    orderState: "배송중",
    productImg: "/images/product.png",
  },
  {
    orderNum: 2,
    productName: "일반 고양이 사료 3kg",
    cost: 49000,
    quantity: 10,
    orderDate: "2023-04-28",
    orderState: "배송중",
    productImg: "/images/product.png",
  },
  {
    orderNum: 1,
    productName: "유기농 고양이 사료 3kg",
    cost: 49000,
    quantity: 10,
    orderDate: "2023-04-26",
    orderState: "배송중",
    productImg: "/images/product.png",
  },
];

export default DonateList;
