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

const dummyData = [
  { date: "2023-01-01", quantity: 5, cost: 15000 },
  { date: "2023-01-01", quantity: 3, cost: 90000 },
  { date: "2023-01-02", quantity: 8, cost: 24000 },
  { date: "2023-01-03", quantity: 2, cost: 18000 },
  { date: "2023-01-04", quantity: 2, cost: 18900 },
  { date: "2023-01-05", quantity: 2, cost: 19900 },
  { date: "2023-01-06", quantity: 2, cost: 10900 },
  { date: "2023-01-07", quantity: 2, cost: 13900 },
  { date: "2023-01-08", quantity: 2, cost: 11800 },
  { date: "2023-01-09", quantity: 2, cost: 17800 },
  { date: "2023-01-11", quantity: 2, cost: 17600 },
  { date: "2023-01-12", quantity: 2, cost: 17600 },
  { date: "2023-01-13", quantity: 2, cost: 17600 },
  { date: "2023-01-14", quantity: 2, cost: 17600 },
  { date: "2023-01-15", quantity: 2, cost: 6760 },
  { date: "2023-01-16", quantity: 2, cost: 6760 },
  { date: "2023-01-17", quantity: 2, cost: 6760 },
  { date: "2023-01-18", quantity: 2, cost: 6760 },
  { date: "2023-01-19", quantity: 2, cost: 6760 },
  { date: "2023-01-20", quantity: 2, cost: 6760 },
  { date: "2023-01-21", quantity: 2, cost: 6060 },
  { date: "2023-01-22", quantity: 2, cost: 6000 },
  { date: "2023-01-23", quantity: 2, cost: 6000 },
  { date: "2023-01-24", quantity: 2, cost: 6000 },
  { date: "2023-01-25", quantity: 2, cost: 6000 },
  { date: "2023-01-26", quantity: 2, cost: 6000 },
  { date: "2023-01-27", quantity: 2, cost: 6000 },
  { date: "2023-01-28", quantity: 2, cost: 6000 },
  { date: "2023-01-29", quantity: 2, cost: 6000 },
  { date: "2023-01-30", quantity: 2, cost: 6000 },
  { date: "2023-01-31", quantity: 2, cost: 6000 },
  { date: "2023-02-01", quantity: 2, cost: 6000 },
  { date: "2023-02-02", quantity: 2, cost: 6000 },
  { date: "2023-02-03", quantity: 2, cost: 6000 },
  { date: "2023-02-04", quantity: 2, cost: 6000 },
  { date: "2023-02-10", quantity: 2, cost: 6000 },
  // ...more data
];

const aggregateData = (data, period) => {
  const aggregation = new Map();

  data.forEach((item) => {
    const date = new Date(item.date);
    let key;

    switch (period) {
      case "day":
        key = date.toISOString().split("T")[0];
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
      existing.quantity += item.quantity;
      existing.cost += item.cost;
    } else {
      aggregation.set(key, {
        date: key,
        quantity: item.quantity,
        cost: item.cost,
      });
    }
  });

  return Array.from(aggregation.values());
};

const OrderChart = () => {
  const [chartType, setChartType] = useState("quantity");
  const [period, setPeriod] = useState("day");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedData, setSelectedData] = useState([]);

  const handleChartTypeChange = (event, newChartType) => {
    if (newChartType !== null) {
      setChartType(newChartType);
    }
  };

  const handlePeriodChange = (event, newPeriod) => {
    if (newPeriod !== null) {
      setPeriod(newPeriod);
      setSelectedMonth("");
      setSelectedData([]);
    }
  };

  const handleMonthChange = (event) => {
    const selectedMonth = event.target.value;
    setSelectedMonth(selectedMonth);
    const filteredData = aggregateData(
      dummyData.filter((item) => {
        const date = new Date(item.date);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const formattedMonth = `${year}-${month.toString().padStart(2, "0")}`;
        return formattedMonth.startsWith(selectedMonth);
      }),
      period
    );
    setSelectedData(filteredData);
  };

  const getMonths = () => {
    const monthsSet = new Set();
    dummyData.forEach((item) => {
      const date = new Date(item.date);
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

  useEffect(() => {
    const filteredData = aggregateData(dummyData, period);
    setSelectedData(filteredData);
  }, [period]);

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
          data={selectedMonth ? selectedData : aggregateData(dummyData, period)}
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
            dataKey={chartType}
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
