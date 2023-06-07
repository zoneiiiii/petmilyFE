import React, { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { ADMIN } from "../../../constants/PageURL";
import { Link } from "react-router-dom";
import axios from "axios";

const OrderChart = () => {
  const [chartType, setChartType] = useState("quantity");
  const [period, setPeriod] = useState("day");
  const [selectedMonth, setSelectedMonth] = useState("전체");
  const [selectedData, setSelectedData] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [orderlistData, setOrderlistData] = useState([]);
  const [cachedData, setCachedData] = useState(null); //get요청 중복 방지를 위한 캐시 데이터 상태 추가

  const handleChartTypeChange = (event, newChartType) => {
    if (newChartType !== null) {
      setChartType(newChartType);
      setSelectedMonth("전체"); // 선택된 월을 "전체"로 변경
      setSelectedData([]); // 데이터 초기화

      // 캐시된 데이터가 있으면 사용
      if (cachedData) {
        let filteredData;
        if (newChartType === "quantity") {
          filteredData = aggregateOrderListData(orderlistData, period);
        } else if (newChartType === "cost") {
          filteredData = aggregateOrderData(orderData, period);
        }
        setSelectedData(filteredData);
      } else {
        const fetchData = async () => {
          const [orderResponse, orderlistResponse] = await Promise.all([
            axios.get("/order/allOrdersASC"),
            axios.get("/order/allOrderlists"),
          ]);
          const orderData = orderResponse.data;
          const orderlistData = orderlistResponse.data;

          setOrderData(orderData);
          setOrderlistData(orderlistData);

          let filteredData;
          if (newChartType === "quantity") {
            filteredData = aggregateOrderListData(orderlistData, period);
          } else if (newChartType === "cost") {
            filteredData = aggregateOrderData(orderData, period);
          }
          setSelectedData(filteredData);
          setCachedData(filteredData); // 데이터 캐싱
        };

        fetchData();
      }
    }
  };

  const handlePeriodChange = (event, newPeriod) => {
    if (newPeriod !== null) {
      setPeriod(newPeriod);
      setSelectedMonth("전체");
      setSelectedData([]);
    }
  };

  const handleMonthChange = (event) => {
    const selectedMonth = event.target.value;
    setSelectedMonth(selectedMonth);

    const fetchData = async () => {
      const orderResponse = await axios.get("/order/allOrdersASC");
      const orderlistResponse = await axios.get("/order/allOrderlists");
      const orderData = orderResponse.data;
      const orderlistData = orderlistResponse.data;

      setOrderData(orderData);
      setOrderlistData(orderlistData);

      let filteredData;
      if (selectedMonth !== "전체") {
        const monthFilteredOrderData = orderData.filter((item) => {
          const date = new Date(item.orderDate);
          const yearMonth = `${date.getFullYear()}-${(date.getMonth() + 1)
            .toString()
            .padStart(2, "0")}`;
          return yearMonth === selectedMonth;
        });
        const monthFilteredOrderlistData = orderlistData.filter((item) => {
          const order = orderData.find(
            (order) => order.orderNum === item.orderNum
          );
          if (order) {
            const date = new Date(order.orderDate);
            const yearMonth = `${date.getFullYear()}-${(date.getMonth() + 1)
              .toString()
              .padStart(2, "0")}`;
            return yearMonth === selectedMonth;
          }
          return false;
        });
        if (chartType === "quantity") {
          filteredData = aggregateOrderListData(
            monthFilteredOrderlistData,
            period
          );
        } else if (chartType === "cost") {
          filteredData = aggregateOrderData(monthFilteredOrderData, period);
        }
      } else {
        if (chartType === "quantity") {
          filteredData = aggregateOrderListData(orderlistData, period);
        } else if (chartType === "cost") {
          filteredData = aggregateOrderData(orderData, period);
        }
      }
      setSelectedData(filteredData);
    };

    fetchData();
  };

  const getMonths = () => {
    const monthsSet = new Set();
    orderData.forEach((item) => {
      const date = new Date(item.orderDate);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      monthsSet.add(`${year}-${month.toString().padStart(2, "0")}`);
    });
    return Array.from(monthsSet);
  };

  const renderTooltipContent = (props) => {
    const { payload, label } = props;

    if (payload && payload.length) {
      const value = payload[0].value;
      let tooltipValue = `${value.toLocaleString()}`;

      if (chartType === "quantity") {
        tooltipValue = `${tooltipValue} (수량)`;
      } else if (chartType === "cost") {
        tooltipValue = `${tooltipValue}원 (가격)`;
      }

      return (
        <div
          className="custom-tooltip"
          style={{
            backgroundColor: "#fff",
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        >
          <p className="label">{`${label}`}</p>
          <p className="value">{tooltipValue}</p>
        </div>
      );
    }

    return null;
  };

  const aggregateOrderData = (data, period) => {
    const aggregation = new Map();

    data.forEach((item) => {
      const date = new Date(item.orderDate);
      let key;

      switch (period) {
        case "day":
          key = date.toLocaleDateString("ko-KR", { timeZone: "Asia/Seoul" });
          break;
        case "month":
          key =
            date.getFullYear().toString() +
            "-" +
            (date.getMonth() + 1).toString().padStart(2, "0");
          break;
        case "year":
          key = date.getFullYear().toString();
          break;
        default:
          throw new Error(`Invalid period: ${period}`);
      }

      const existing = aggregation.get(key);
      if (existing) {
        existing.totalCost += item.totalCost;
      } else {
        aggregation.set(key, {
          date: key,
          totalCost: item.totalCost,
        });
      }
    });

    const filteredData = Array.from(aggregation.values()).filter(
      (item) => item.totalCost !== 0
    );

    return filteredData;
  };

  const aggregateOrderListData = (data, period) => {
    const aggregation = new Map();

    data.forEach((item) => {
      const order = orderData.find((order) => order.orderNum === item.orderNum);

      if (order) {
        const date = new Date(order.orderDate);
        let key;

        switch (period) {
          case "day":
            key = date.toLocaleDateString("ko-KR", { timeZone: "Asia/Seoul" });
            break;
          case "month":
            key = `${date.getFullYear()}-${(date.getMonth() + 1)
              .toString()
              .padStart(2, "0")}`;
            break;
          case "year":
            key = date.getFullYear().toString();
            break;
          default:
            throw new Error(`Invalid period: ${period}`);
        }

        const existing = aggregation.get(key);
        if (existing) {
          existing.quantity += item.quantity;
        } else {
          aggregation.set(key, {
            date: key,
            quantity: item.quantity,
          });
        }
      }
    });

    let filteredData = Array.from(aggregation.values());

    if (period === "month") {
      filteredData.sort((a, b) => {
        const aDate = new Date(a.date);
        const bDate = new Date(b.date);
        return aDate - bDate;
      });
    } else if (period === "day") {
      filteredData = filteredData.sort((a, b) => {
        const aDate = new Date(a.date);
        const bDate = new Date(b.date);
        if (aDate.getMonth() !== bDate.getMonth()) {
          return aDate.getMonth() - bDate.getMonth();
        }
        return aDate.getDate() - bDate.getDate();
      });
    }

    return filteredData;
  };

  useEffect(() => {
    const fetchData = async () => {
      const [orderResponse, orderlistResponse] = await Promise.all([
        axios.get("/order/allOrdersASC"),
        axios.get("/order/allOrderlists"),
      ]);
      const orderData = orderResponse.data;
      const orderlistData = orderlistResponse.data;

      setOrderData(orderData);
      setOrderlistData(orderlistData);

      let filteredData;
      if (chartType === "quantity") {
        filteredData = aggregateOrderListData(orderlistData, period);
      } else if (chartType === "cost") {
        filteredData = aggregateOrderData(orderData, period);
      }
      setSelectedData(filteredData);
      const months = getMonths();

      if (months.length > 0) {
        setSelectedMonth("전체");
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Typography
        variant="h6"
        component="div"
        color="primary"
        style={{ marginBottom: "16px" }}
      >
        주문 통계
      </Typography>
      <ToggleButtonGroup
        value={chartType}
        exclusive
        onChange={handleChartTypeChange}
        aria-label="Chart Type"
        style={{ marginBottom: "16px" }}
      >
        <ToggleButton value="quantity" aria-label="Quantity">
          수량
        </ToggleButton>
        <ToggleButton value="cost" aria-label="Cost">
          가격
        </ToggleButton>
      </ToggleButtonGroup>
      <div>
        <ToggleButtonGroup
          value={period}
          exclusive
          onChange={handlePeriodChange}
          aria-label="Period"
          style={{ marginBottom: "16px" }}
        >
          <ToggleButton value="day" aria-label="Day">
            일별
          </ToggleButton>
          <ToggleButton value="month" aria-label="Month">
            월별
          </ToggleButton>
          <ToggleButton value="year" aria-label="Year">
            년별
          </ToggleButton>
        </ToggleButtonGroup>
        {period === "day" && (
          <Select
            value={selectedMonth}
            onChange={handleMonthChange}
            style={{ marginLeft: "16px" }}
            sx={{
              height: "45px",
            }}
          >
            <MenuItem value="전체">전체</MenuItem>
            {getMonths().map((month) => (
              <MenuItem key={month} value={month}>
                {month}
              </MenuItem>
            ))}
          </Select>
        )}
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={
            selectedMonth === "전체"
              ? chartType === "quantity"
                ? aggregateOrderListData(orderlistData, period)
                : aggregateOrderData(orderData, period)
              : selectedData
          }
          margin={{ top: 16, right: 16, bottom: 0, left: 24 }}
        >
          <XAxis dataKey="date" tick={{ fontSize: 10 }} />
          <YAxis
            tickFormatter={(value) => `${value.toLocaleString()}`}
            allowDecimals={false}
            tick={{ fontSize: 12 }}
          />
          <Legend />
          <Tooltip content={renderTooltipContent} />
          <Area
            type="monotone"
            dataKey={chartType === "quantity" ? "quantity" : "totalCost"}
            stroke="#fbd385"
            fill="#fbd385"
            fillOpacity={0.3}
          />
        </AreaChart>
      </ResponsiveContainer>
      <div style={{ textAlign: "right", marginTop: "30px" }}>
        <Link to={ADMIN.ORDER}>주문 관리 이동</Link>
      </div>
    </div>
  );
};

export default OrderChart;
