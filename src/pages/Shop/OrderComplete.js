import styled from "styled-components";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Button,
  ThemeProvider,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Link } from "react-router-dom";
import { MYPAGE, SHOP } from "../../constants/PageURL";
import { useLocation } from "react-router-dom";
import { CustomTheme } from "../../assets/Theme/CustomTheme";

const OrderComplete = ({ orderCompleted }) => {
  const location = useLocation();
  const orderState = location.state.orderState;
  const error_msg = location.state.error_msg;

  if ({ orderState } === true) {
    return (
      <ThemeProvider theme={CustomTheme}>
        <OrderStyle>
          <h1>주문/결제</h1>
          <Table sx={{ mt: 3 }}>
            <TableBody>
              <TableRow>
                <TableCell />
              </TableRow>
              <TableRow>
                <TableCell
                  align="center"
                  sx={{ height: 300, fontSize: "16px", color: "darkgray" }}
                >
                  <CheckCircleIcon
                    sx={{ color: "#17C047", width: 70, height: 70 }}
                  />
                  <br />
                  주문이 완료되었습니다.
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div style={{ textAlign: "center" }}>
            <Link to={MYPAGE.ORDERLIST} style={{ textDecoration: "none" }}>
              <Button className="success">구매내역 확인</Button>
            </Link>
          </div>
        </OrderStyle>
      </ThemeProvider>
    );
  } else {
    return (
      <ThemeProvider theme={CustomTheme}>
        <OrderStyle>
          <h1>주문/결제</h1>
          <Table sx={{ mt: 3 }}>
            <TableBody>
              <TableRow>
                <TableCell />
              </TableRow>
              <TableRow>
                <TableCell
                  align="center"
                  sx={{ height: 300, color: "darkgray", fontSize: "16px" }}
                >
                  <ErrorOutlineIcon
                    sx={{ color: "red", width: 70, height: 70 }}
                  />
                  <br />
                  주문이 거부되었습니다.
                  <br />
                  에러메세지 : {error_msg}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div style={{ textAlign: "center" }}>
            <Link to={SHOP.ORDER} style={{ textDecoration: "none" }}>
              <Button className="success">돌아가기</Button>
            </Link>
          </div>
        </OrderStyle>
      </ThemeProvider>
    );
  }
};
const OrderStyle = styled.div`
  width: 70vw;
  margin: 0 auto;
  padding-top: 20px;
  h1 {
    text-align: center;
  }
  .success {
    width: 200px;
    background-color: #fbd385;
    color: white;
    margin-top: 70px;
    &:hover {
      background-color: #facc73;
    }
    &:focus {
      background-color: #facc73;
    }
  }
`;
export default OrderComplete;
