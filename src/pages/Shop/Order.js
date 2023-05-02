import styled from "styled-components";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Button,
  IconButton,
  Checkbox,
} from "@material-ui/core";
const Order = () => {
  return (
    <>
      <CartStyle>
        <h1>주문/결제</h1>
      </CartStyle>
    </>
  );
};

const CartStyle = styled.div`
  width: 1000px;
  margin: 0 auto;
  padding-top: 20px;
  h1 {
    text-align: center;
  }
`;
export default Order;
