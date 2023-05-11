import React from "react";
import AdoptInfoDetail from "./AdoptInfoDetail";
const AdoptInfo = () => {
  const location = [
    { name: "강남구", code: "3220000" },
    { name: "강동구", code: "3240000" },
    { name: "강북구", code: "3080000" },
    { name: "강서구", code: "3150000" },
    { name: "관악구", code: "3200000" },
    // { name: "광진구", code: "3040000" },
    { name: "구로구", code: "3160000" },
    // { name: "금천구", code: "3170000" },
    { name: "노원구", code: "3100000" },
    // { name: "도봉구", code: "3090000" },
    { name: "동대문구", code: "3050000" },
    // { name: "동작구", code: "3190000" },
    { name: "마포구", code: "3130000" },
    // { name: "서대문구", code: "3120000" },
    { name: "서초구", code: "3210000" },
    { name: "성동구", code: "3030000" },
    { name: "성북구", code: "3070000" },
    { name: "송파구", code: "3230000" },
    { name: "양천구", code: "3140000" },
    // { name: "영등포구", code: "3180000" },
    { name: "용산구", code: "3020000" },
    // { name: "은평구", code: "3110000" },
    // { name: "종로구", code: "3000000" },
    { name: "중구", code: "3010000" },
    { name: "중랑구", code: "3060000" },
  ];
  return (
    <div style={{ marginTop: "10px" }}>
      {location.map((loc, index) => (
        <AdoptInfoDetail
          key={index}
          name={loc.name}
          code={loc.code}
          sx={{ marginTop: "10px" }}
        />
      ))}
    </div>
  );
};

export default AdoptInfo;
