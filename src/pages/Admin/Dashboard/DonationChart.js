import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  ReferenceLine,
  Tooltip,
} from "recharts";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { ADMIN } from "../../../constants/PageURL";
import { Link } from "react-router-dom";
const MAX_DISPLAYED_DAILY_DATA = 31;

const groupByMonth = (data) => {
  const groupedData = data.reduce((result, item) => {
    const [year, month] = item.date.split("-");
    const key = `${year}-${month}`;

    if (!result[key]) {
      result[key] = {
        date: key,
        total: 0,
        member: 0,
        nonMember: 0,
      };
    }

    result[key].total += item.total;
    result[key].member += item.member;
    result[key].nonMember += item.nonMember;

    return result;
  }, {});

  return Object.values(groupedData);
};

const groupByMonthAndDay = (data) => {
  return data.reduce((result, item) => {
    const [year, month, day] = item.date.split("-");
    const key = `${year}-${month}`;

    if (!result[key]) {
      result[key] = [];
    }

    result[key].push({
      date: day,
      total: item.total,
      member: item.member,
      nonMember: item.nonMember,
    });

    return result;
  }, {});
};

const groupByYear = (data) => {
  const groupedData = data.reduce((result, item) => {
    const year = item.date.split("-")[0];

    if (!result[year]) {
      result[year] = {
        date: year,
        total: 0,
        member: 0,
        nonMember: 0,
      };
    }

    result[year].total += item.total;
    result[year].member += item.member;
    result[year].nonMember += item.nonMember;

    return result;
  }, {});

  return Object.values(groupedData);
};

const displayDataByMonth = (groupedDataByMonthAndDay, selectedMonth) => {
  const monthlyData = groupedDataByMonthAndDay[selectedMonth] || [];
  return truncateDailyData(monthlyData);
};

const truncateDailyData = (data) => {
  if (data.length > MAX_DISPLAYED_DAILY_DATA) {
    const interval = Math.ceil(data.length / MAX_DISPLAYED_DAILY_DATA);
    const truncatedData = data.filter((_, index) => index % interval === 0);
    return truncatedData;
  }
  return data;
};

const DonationChart = () => {
  const [chartType, setChartType] = useState("total");
  const [dataGroup, setDataGroup] = useState("daily");
  const [donationsData, setDonationsData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");

  useEffect(() => {
    const fetchDonationsData = async () => {
      const response = await axios.get("/donate/Asc");
      const fetchedData = response.data;

      const processedData = fetchedData.reduce((acc, donation) => {
        const donationDate = donation.donationDate.split("T")[0];
        const donationCost = donation.donationCost;
        const memberNum = donation.memberNum;

        if (!acc[donationDate]) {
          acc[donationDate] = {
            date: donationDate,
            total: 0,
            member: 0,
            nonMember: 0,
          };
        }

        acc[donationDate].total += donationCost;
        if (memberNum === null) {
          acc[donationDate].nonMember += donationCost;
        } else {
          acc[donationDate].member += donationCost;
        }

        return acc;
      }, {});

      const processedDataArray = Object.values(processedData);
      setDonationsData(processedDataArray);
      const groupedDataByMonthAndDay = groupByMonthAndDay(processedDataArray);
      setSelectedMonth(Object.keys(groupedDataByMonthAndDay)[0]);
      setDonationsData(processedDataArray);
    };

    fetchDonationsData();
  }, []);

  const handleChartTypeChange = (event, newChartType) => {
    if (newChartType !== null) {
      setChartType(newChartType);
    }
  };

  const handleDataGroupChange = (event, newDataGroup) => {
    if (newDataGroup !== null) {
      setDataGroup(newDataGroup);
    }
  };

  const handleMonthChange = (event, newSelectedMonth) => {
    if (newSelectedMonth !== null) {
      setSelectedMonth(event.target.value);
    }
  };

  const getChartData = () => {
    if (dataGroup === "daily") {
      const groupedDataByMonthAndDay = groupByMonthAndDay(donationsData);
      return displayDataByMonth(groupedDataByMonthAndDay, selectedMonth);
    } else if (dataGroup === "monthly") {
      return groupByMonth(donationsData);
    } else if (dataGroup === "yearly") {
      return groupByYear(donationsData);
    }
  };

  const renderTooltipContent = (props) => {
    const { payload, label } = props;

    if (payload && payload.length) {
      const value = payload[0].value;
      let tooltipValue = `${value.toLocaleString()}원`;

      if (chartType === "total") {
        tooltipValue = `${tooltipValue} (전체)`;
      } else if (chartType === "member") {
        tooltipValue = `${tooltipValue} (회원)`;
      } else if (chartType === "nonMember") {
        tooltipValue = `${tooltipValue} (비회원)`;
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

  return (
    <div>
      <Typography
        variant="h6"
        component="div"
        color="primary"
        style={{ marginBottom: "16px" }}
      >
        기부 통계
      </Typography>
      <ToggleButtonGroup
        value={chartType}
        exclusive
        onChange={handleChartTypeChange}
        aria-label="Chart Type"
        style={{ marginBottom: "16px" }}
      >
        <ToggleButton value="total" aria-label="Total">
          전체
        </ToggleButton>
        <ToggleButton value="member" aria-label="Member">
          회원
        </ToggleButton>
        <ToggleButton value="nonMember" aria-label="Non-member">
          비회원
        </ToggleButton>
      </ToggleButtonGroup>
      <div>
        <ToggleButtonGroup
          value={dataGroup}
          exclusive
          onChange={handleDataGroupChange}
          aria-label="Data Group"
          style={{ marginBottom: "16px" }}
        >
          <ToggleButton value="daily" aria-label="Daily">
            일별
          </ToggleButton>
          <ToggleButton value="monthly" aria-label="Monthly">
            월별
          </ToggleButton>
          <ToggleButton value="yearly" aria-label="Yearly">
            년별
          </ToggleButton>
        </ToggleButtonGroup>
        {dataGroup === "daily" && (
          <Select
            value={selectedMonth}
            onChange={handleMonthChange}
            style={{ marginLeft: "16px" }}
            sx={{
              height: "45px",
            }}
          >
            {Object.keys(groupByMonthAndDay(donationsData)).map((month) => (
              <MenuItem key={month} value={month}>
                {month}
              </MenuItem>
            ))}
          </Select>
        )}
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={getChartData()}
          margin={{ top: 16, right: 16, bottom: 0, left: 24 }}
        >
          <XAxis dataKey="date" tick={{ fontSize: 10 }} />
          <YAxis
            tickFormatter={(value) => `${value.toLocaleString()}원`}
            allowDecimals={false}
            tick={{ fontSize: 12 }}
          />
          <Legend />
          <Tooltip content={renderTooltipContent} />
          <Line
            type="monotone"
            dataKey={chartType}
            stroke="#fbd385"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
      <div style={{ marginTop: "80px" }} />
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={getChartData()}
          margin={{ top: 16, right: 16, bottom: 0, left: 24 }}
        >
          <XAxis dataKey="date" tick={{ fontSize: 10 }} />
          <YAxis
            tickFormatter={(value) => `${value.toLocaleString()}원`}
            allowDecimals={false}
            tick={{ fontSize: 12 }}
          />
          <Legend />
          <Tooltip content={renderTooltipContent} />
          <Bar dataKey={chartType} fill="#fbd385" />
          <ReferenceLine y={0} stroke="#000" />
        </BarChart>
      </ResponsiveContainer>
      <div style={{ textAlign: "right", marginTop: "30px" }}>
        <Link to={ADMIN.DONATION}>기부 내역 보기</Link>
      </div>
    </div>
  );
};

export default DonationChart;
