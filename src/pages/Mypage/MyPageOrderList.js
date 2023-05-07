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
    dayjs(dayjs().subtract(6, "month").toDate())
  );
  const [endDate, setEndDate] = useState(dayjs());
  const [value, setValue] = useState();
  const resetDate = () => {
    setStartDate(dayjs(dayjs().subtract(6, "month").toDate()));
    setEndDate(dayjs());
  };
  useEffect(() => {
    value && console.log(value);
    //  console.log(startDate.format("YYYY-MM-DD"), endDate.format("YYYY-MM-DD"));
  }, [startDate, endDate, value]);

  const dateList = [...new Set(orderlist.map((product) => product.orderDate))];

  const ShowMore = () => { };

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
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <CustomDatePicker
            label="Start Date"
            defaultValue={dayjs(startDate)}
            value={startDate}
            onChange={(date) => setStartDate(date)}
            maxDate={endDate}
            sx={{ mr: 2 }}
          />
          <CustomDatePicker
            label="End Date"
            defaultValue={dayjs(endDate)}
            value={endDate}
            onChange={(date) => setEndDate(date)}
            maxDate={dayjs()}
            minDate={startDate}
          />
          <Button
            onClick={resetDate}
            sx={{
              minWidth: "40px",
            }}
          >
            <AutorenewIcon onClick={resetDate} />
          </Button>
        </Box>
        <SearchBar theme={CustomTheme} setValue={setValue} value={value} />
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
            <Box p={2} border={2} borderRadius={2} borderColor="ffbd59.main">
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
                  {orderlist
                    .filter((product) => {
                      return product.orderDate === date;
                    })
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
                          {parseInt(row.cost).toLocaleString()}원
                        </TableCell>
                        <TableCell sx={tdSx}>{row.orderState}</TableCell>
                        <TableCell sx={tdSx}>
                          <Button
                            variant="contained"
                            color="fbd385"
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
          <Button color="primary" align="center" onClick={ShowMore}>
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
    productName: "마이 프로틴 5kg",
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
