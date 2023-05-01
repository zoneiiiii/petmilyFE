import react, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import CustomButton from "../Login/CustomButton";
import { styled } from "@mui/material/styles";

const { kakao } = window;

const HospitalLocation = () => {
  const [inputText, setInputText] = useState("");
  const [place, setPlace] = useState("");

  let curLatitude = 37.553836;
  let curLongtitude = 126.969652;

  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(curLatitude, curLongtitude),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);

    // 장소 검색 객체를 생성
    const ps = new kakao.maps.services.Places();
    ps.keywordSearch(place, placesSearchCB);
    // 키워드 검색 완료 시 호출되는 콜백함수
    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가
        let bounds = new kakao.maps.LatLngBounds();

        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i]);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정
        map.setBounds(bounds);
      }
    }

    // 지도에 마커를 표시하는 함수
    function displayMarker(place) {
      // 마커를 생성하고 지도에 표시
      let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
      });

      let infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
      // 마커에 클릭이벤트를 등록
      kakao.maps.event.addListener(marker, "click", function () {
        // 마커를 클릭하면 장소명이 인포윈도우에 표출
        infowindow.setContent(
          '<div style="padding:5px;font-size:12px;">' +
            place.place_name +
            "</div>"
        );
        infowindow.open(map, marker);
      });
    }
  }, [place]);

  const onChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPlace(inputText);
    setInputText("");
  };

  return (
    <div
      style={{
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "0 auto",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          alt="hospital"
          style={{ width: "50px", height: "60px", marginRight: "10px" }}
          src="./../images/hospital.png"
        />
        <Typography
          component="h1"
          variant="h5"
          sx={{
            color: "black",
            mt: "30px",
            mb: "30px",
            fontSize: "xx-large",
          }}
        >
          동물병원정보
        </Typography>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <TextField
          sx={{
            background: "white",
            width: "300px",
            marginRight: "10px",
          }}
          InputProps={{
            style: {
              height: "35px",
            },
          }}
          type="text"
          name="searchHospital"
          variant="outlined"
          value={inputText}
          onChange={onChange}
        />
        <CustomButton
          type="submit"
          label="검색"
          value="병원검색"
          onClick={handleSubmit}
        ></CustomButton>
      </div>
      <div
        id="map"
        style={{
          marginTop: "20px",
          border: "solid 1px #FBD385",
          width: "1000px",
          height: "500px",
        }}
      ></div>
    </div>
  );
};

export default HospitalLocation;
