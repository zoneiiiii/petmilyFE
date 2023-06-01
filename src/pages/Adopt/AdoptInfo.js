import React, { useLayoutEffect } from "react";
import AdoptInfoDetail from "./AdoptInfoDetail";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { ThemeProvider } from "@mui/material";
import { CustomTheme } from "../../assets/Theme/CustomTheme";

const AdoptInfo = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setError(null);
      setLoading(true);
      const response = await axios.get(
        `http://apis.data.go.kr/1543061/abandonmentPublicSrvc/sigungu?upr_cd=6110000&serviceKey=AhrFaZaAefMdQ7n5tWepAOM5tzLw5%2BCiT3stOXtEl3uTyXNtr0xlgtAn6WZppVVYaZdAuyqJvj%2FS65SSV4iapw%3D%3D&_type=json`
      );

      const data2 = response.data.response.body.items.item;
      const location = data2.map((item) => ({
        uprCd: item.uprCd,
        name: item.orgdownNm,
        code: item.orgCd,
      }));
      setData(location);
      setLoading(true);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ThemeProvider theme={CustomTheme}>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div style={{ marginTop: "10px" }}>
          {data.map((loc, index) => (
            <AdoptInfoDetail
              key={index}
              uprCd={loc.uprCd}
              name={loc.name}
              code={loc.code}
              sx={{ marginTop: "10px" }}
            />
          ))}
        </div>
      )}
    </ThemeProvider>
  );
};

export default AdoptInfo;
