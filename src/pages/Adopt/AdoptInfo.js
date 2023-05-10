import React from "react";
import AdoptInfoDetail from "./AdoptInfoDetail";
const AdoptInfo = () => {
  // const location = [
  //   "강남구" ,
  //   "강동구",
  //   "강북구",
  //   "강서구",
  //   "관악구",
  //   "광진구",
  //   "구로구",
  //   "금천구",
  //   "노원구",
  //   "도봉구",
  //   "동대문구",
  //   "동작구",
  //   "마포구",
  //   "서대문구",
  //   "서초구",
  //   "성동구",
  //   "성북구",
  //   "송파구",
  //   "양천구",
  //   "영등포구",
  //   "용산구",
  //   "은평구",
  //   "종로구",
  //   "중구",
  //   "중랑구",
  // ];

  const location = [
    { name: "강남구", code: "3220000" },
    { name: "강동구", code: "3240000" },
    { name: "강북구", code: "3080000" },
  ];
  console.log("locatio" + location.code);
  return (
    <div style={{ marginTop: "10px" }}>
      {location.map((location) => (
        <AdoptInfoDetail
          key={location.code}
          location={location.name}
          locationCode={location.code}
          sx={{ marginTop: "10px" }}
        />
      ))}
    </div>
  );
};

export default AdoptInfo;
