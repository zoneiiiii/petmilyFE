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

const MyPageOrderList = () => {
  const pageLimit = 10;
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(
    dayjs(dayjs().subtract(6, "month").startOf("date").toDate())
  );
  const [endDate, setEndDate] = useState(dayjs().endOf("date"));
  const [searchKeyword, setSearchKeyword] = useState("");
  const [queryData, setQueryData] = useState(orderlist);
  const [dateList, setDateList] = useState([
    ...new Set(orderlist.map((product) => product.orderDate)),
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
      orderlist.filter(
        (data) =>
          data.productName.includes(searchKeyword) &&
          dayjs(data.orderDate) >= startDate &&
          dayjs(data.orderDate) <= endDate
      )
    );
  }, [startDate, endDate, searchKeyword]);

  // 검색결과에 따른 날짜리스트 변경
  useEffect(() => {
    setDateList([
      ...new Set(
        queryData.map((product) =>
          dayjs(product.orderDate).format("YYYY-MM-DD")
        )
      ),
    ]);
  }, [queryData]);
  const ShowMore = () => {};

  return (
    <ThemeProvider theme={CustomTheme}>
      <Typography
        className="myOrderListTitle"
        sx={titleSx}
        border={3}
        borderColor="ffbd59.main"
        mb={4}
      >
        주문 내역
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
          <Box key={index} className="MyOrderList" mt={2} mb={2}>
            <Box p={2} border={2} borderRadius={2} borderColor="ffbd59.main">
              <Box
                className="MyOrderDate"
                sx={dateSx}
                borderBottom={2}
                // borderRadius={2}
                borderColor="ffbd59.main"
                width={"fit-content"}
                pl={2}
                pr={2}
                mb={2}
                lineHeight={1.5}
              >
                {date}
              </Box>
              <Table size="small" padding="normal" sx={{ minWidth: "800px" }}>
                <TableHead>
                  <TableRow>
                    <TableCell sx={thSx}>상품 이미지</TableCell>
                    <TableCell sx={thSx}>상품명</TableCell>
                    <TableCell sx={thSx}>구매 수량</TableCell>
                    <TableCell sx={thSx}>총 구매가</TableCell>
                    <TableCell sx={thSx}>주문 현황</TableCell>
                    <TableCell sx={thSx}></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {queryData
                    .filter(
                      (product) =>
                        dayjs(product.orderDate) >=
                          dayjs(date).startOf("date") &&
                        dayjs(product.orderDate) <= dayjs(date).endOf("date")
                    )
                    .map((row, index2) => (
                      <TableRow key={index2}>
                        <TableCell sx={tdSx}>
                          <img
                            src={row.productImg}
                            alt="noImg"
                            height={"100px"}
                            onClick={() => navigate(MYPAGE.INFO)}
                          />
                        </TableCell>
                        <TableCell sx={tdSx}>{row.productName}</TableCell>
                        <TableCell sx={tdSx}>
                          {parseInt(row.quantity).toLocaleString()}
                        </TableCell>
                        <TableCell sx={tdSx}>
                          {(
                            parseInt(row.cost) * parseInt(row.quantity)
                          ).toLocaleString()}
                          원
                        </TableCell>
                        <TableCell sx={tdSx}>{row.orderState}</TableCell>
                        <TableCell sx={tdSx}>
                          <Button
                            variant="contained"
                            onClick={() =>
                              navigate(MYPAGE.ORDER_DETAIL(row.orderNum))
                            }
                          >
                            상세보기
                          </Button>
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
          <Button align="center" onClick={ShowMore}>
            상품 더보기
          </Button>
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
  verticalAlign: "middle",
  fontStyle: "normal",
  fontWeight: "bold",
  fontSize: "1.5rem",
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

export default MyPageOrderList;
