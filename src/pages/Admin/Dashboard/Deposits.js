import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Title from "./Title";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import axios from "axios";

export default function Deposits() {
  const [totalCost, setTotalCost] = useState(0);
  const formatCurrency = (number) => {
    return number.toLocaleString("ko-KR", { currency: "KRW" }) + "원";
  };

  const fetchTotalCost = async () => {
    try {
      const response = await axios.get("/order/allOrdersCost");
      const totalCost = response.data;
      setTotalCost(totalCost);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTotalCost();
  }, []);

  return (
    <React.Fragment>
      <Title>누적 판매금</Title>
      <Typography component="p" variant="h4">
        {formatCurrency(totalCost)}
      </Typography>
      <Typography
        color="text.secondary"
        sx={{ flex: 1 }}
        style={{ marginTop: "16px" }}
      >
        {dayjs().locale("ko").format("YYYY-MM-DD dddd")}
      </Typography>
      <div></div>
    </React.Fragment>
  );
}
