import { useLocation, useNavigate } from "react-router-dom";
import { ThemeProvider, Typography } from "@mui/material";
import { CustomTheme } from "../../assets/Theme/CustomTheme";
import { useState, useEffect } from "react";
import CustomButton from "../Login/CustomButton";
import { ADOPT } from "../../constants/PageURL";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import InfoIcon from "@mui/icons-material/Info";
import { InfoOutlined } from "@material-ui/icons";

const { kakao } = window;
const AnimalListDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;

  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(35.12, 129.1),
      level: 3,
    };
    // 지도를 생성합니다.
    const map = new kakao.maps.Map(container, options);
    map.setDraggable(false); //드래그 막기
    map.setZoomable(false); //줌 막기
    // 주소-좌표 변환 객체를 생성합니다.
    const geocoder = new kakao.maps.services.Geocoder();
    // 주소로 좌표를 검색합니다..
    geocoder.addressSearch(state.careAddr, function (result, status) {
      // 정상적으로 검색이 완료됐으면
      if (status === kakao.maps.services.Status.OK) {
        var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

        // 결과값으로 받은 위치를 마커로 표시합니다
        var marker = new kakao.maps.Marker({
          map: map,
          position: coords,
        });

        // 인포윈도우로 장소에 대한 설명을 표시합니다
        var infowindow = new kakao.maps.InfoWindow({
          content:
            '<div style="padding:5px;font-size:12px;">' +
            state.careNm +
            "</div>",
        });
        infowindow.open(map, marker);

        // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
        map.setCenter(coords);
      }
    });
  }, []);
  const handleOnClick = () => {
    navigate(ADOPT.APPLICATION, {
      state: {
        desertionNo: state.desertionNo,
        profile: state.profile,
      },
    });
  };

  return (
    <ThemeProvider theme={CustomTheme}>
      <div>
        <div
          style={{
            position: "relative",
            width: "1100px",
          }}
        >
          <div style={{ postion: "relative", zIndex: 1, opacity: 0.3 }}>
            <img
              src={state.profile}
              style={{
                width: "1100px",
                height: "500px ",
                borderRadius: "10px",
              }}
            />
          </div>
          <div
            style={{
              position: "absolute",
              zIndex: 2,
              marginTop: "-400px",
              marginLeft: "50px",
            }}
          >
            <img
              src={state.profile}
              style={{
                width: "300px",
                height: "300px ",
                borderRadius: "10px",
              }}
            />
          </div>
        </div>
        <div style={{ width: "1100px" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              component="h2"
              variant="h5"
              sx={{
                mt: "30px",
                fontWeight: "bolder",
                fontSize: "xx-large",
              }}
            >
              <InfoIcon color="ff8282" /> 유기동물 정보
            </Typography>
            <CustomButton
              type="submit"
              label="입양신청"
              value="입양신청"
              onClick={handleOnClick}
            ></CustomButton>
          </div>
          <div style={{ display: "flex" }}>
            <div
              style={{
                backgroundColor: "#F5F5ED",
                borderRadius: "10px 0 0 10px",
                padding: "10px 10px 10px 30px ",
                width: "500px",
              }}
            >
              <Typography
                component="h3"
                variant="h5"
                sx={{
                  mt: "10px",
                  mb: "10px",
                  fontSize: "x-large",
                  fontWeight: "bold",
                }}
              >
                품종
              </Typography>
              <Typography
                component="h3"
                variant="h5"
                sx={{
                  mb: "30px",
                  fontSize: "large",
                }}
              >
                {state.kindCd}
              </Typography>
              <Typography
                component="h3"
                variant="h5"
                sx={{
                  mt: "10px",
                  mb: "10px",
                  fontSize: "x-large",
                  fontWeight: "bold",
                }}
              >
                나이
              </Typography>
              <Typography
                component="h3"
                variant="h5"
                sx={{
                  mb: "30px",
                  fontSize: "large",
                }}
              >
                {state.age}
              </Typography>
              <Typography
                component="h3"
                variant="h5"
                sx={{
                  mt: "10px",
                  mb: "10px",
                  fontSize: "x-large",
                  fontWeight: "bold",
                }}
              >
                체중
              </Typography>
              <Typography
                component="h3"
                variant="h5"
                sx={{
                  mb: "30px",
                  fontSize: "large",
                }}
              >
                {state.weight}
              </Typography>
              <Typography
                component="h3"
                variant="h5"
                sx={{
                  mt: "10px",
                  mb: "10px",
                  fontSize: "x-large",
                  fontWeight: "bold",
                }}
              >
                상태
              </Typography>
              <Typography
                component="h3"
                variant="h5"
                sx={{
                  mb: "10px",
                  fontSize: "large",
                }}
              >
                {state.processState}
              </Typography>
            </div>
            <div
              style={{
                backgroundColor: "#F5F5ED",
                borderRadius: "0 10px 10px 0",
                padding: "10px 10px 10px 10px ",
                width: "560px",
              }}
            >
              <Typography
                component="h3"
                variant="h5"
                sx={{
                  mt: "10px",
                  mb: "10px",
                  fontSize: "x-large",
                  fontWeight: "bold",
                }}
              >
                성별
              </Typography>
              <Typography
                component="h3"
                variant="h5"
                sx={{
                  mb: "30px",
                  fontSize: "large",
                }}
              >
                {state.sexCd}
              </Typography>
              <Typography
                component="h3"
                variant="h5"
                sx={{
                  mt: "10px",
                  mb: "10px",
                  fontSize: "x-large",
                  fontWeight: "bold",
                }}
              >
                색상
              </Typography>
              <Typography
                component="h3"
                variant="h5"
                sx={{
                  mb: "30px",
                  fontSize: "large",
                }}
              >
                {state.colorCd}색
              </Typography>
              <Typography
                component="h3"
                variant="h5"
                sx={{
                  mt: "10px",
                  mb: "10px",
                  fontSize: "x-large",
                  fontWeight: "bold",
                }}
              >
                중성화여부
              </Typography>
              <Typography
                component="h3"
                variant="h5"
                sx={{
                  mb: "30px",
                  fontSize: "large",
                }}
              >
                {state.neuterYn}
              </Typography>
            </div>
          </div>
        </div>
        <div style={{ width: "1300px" }}>
          <Typography
            component="h2"
            variant="h5"
            sx={{
              mt: "30px",
              fontWeight: "bolder",
              fontSize: "xx-large",
            }}
          >
            <HealthAndSafetyIcon color="ff8282" /> 구조 정보
          </Typography>
          <div style={{ display: "flex" }}>
            <div
              style={{
                backgroundColor: "#F5F5ED",
                borderRadius: "10px 0 0 10px",
                padding: "10px 10px 10px 30px ",
                width: "500px",
              }}
            >
              <Typography
                component="h3"
                variant="h5"
                sx={{
                  mt: "10px",
                  mb: "10px",
                  fontSize: "x-large",
                  fontWeight: "bold",
                }}
              >
                접수일시
              </Typography>
              <Typography
                component="h3"
                variant="h5"
                sx={{
                  mb: "10px",
                  fontSize: "large",
                }}
              >
                {state.happenDt}
              </Typography>
            </div>
            <div
              style={{
                backgroundColor: "#F5F5ED",
                borderRadius: "0 10px 10px 0",
                padding: "10px 10px 10px 0px ",
                width: "560px",
              }}
            >
              <Typography
                component="h3"
                variant="h5"
                sx={{
                  mt: "10px",
                  mb: "10px",
                  fontSize: "x-large",
                  fontWeight: "bold",
                }}
              >
                발견장소
              </Typography>
              <Typography
                component="h3"
                variant="h5"
                sx={{
                  fontSize: "large",
                }}
              >
                {state.happenPlace}
              </Typography>
            </div>
          </div>
        </div>
        <div style={{ width: "1100px" }}>
          <Typography
            component="h2"
            variant="h5"
            sx={{
              mt: "30px",
              fontWeight: "bolder",
              fontSize: "xx-large",
            }}
          >
            <LocationOnIcon color="ff8282" /> 동물보호 센터
          </Typography>
          <div style={{ display: "flex" }}>
            <div
              style={{
                backgroundColor: "#F5F5ED",
                borderRadius: "10px 0 0 0",
                padding: "10px 10px 0 30px ",
                width: "500px",
              }}
            >
              <Typography
                component="h3"
                variant="h5"
                sx={{
                  mt: "10px",
                  mb: "10px",
                  fontSize: "x-large",
                  fontWeight: "bold",
                }}
              >
                보호센터명
              </Typography>
              <Typography
                component="h3"
                variant="h5"
                sx={{
                  mb: "30px",
                  fontSize: "large",
                }}
              >
                {state.careNm}
              </Typography>
              <Typography
                component="h3"
                variant="h5"
                sx={{
                  mt: "10px",
                  mb: "10px",
                  fontSize: "x-large",
                  fontWeight: "bold",
                }}
              >
                보호센터 전화번호
              </Typography>
              <Typography
                component="h3"
                variant="h5"
                sx={{
                  fontSize: "large",
                }}
              >
                {state.careTel}
              </Typography>
            </div>
            <div
              style={{
                backgroundColor: "#F5F5ED",
                borderRadius: "0 10px 0 0",
                padding: "10px 10px 0 10px ",
                width: "560px",
              }}
            >
              <Typography
                component="h3"
                variant="h5"
                sx={{
                  mt: "10px",
                  mb: "10px",
                  fontSize: "x-large",
                  fontWeight: "bold",
                }}
              >
                담당자
              </Typography>
              <Typography
                component="h3"
                variant="h5"
                sx={{
                  mb: "30px",
                  fontSize: "large",
                }}
              >
                {state.chargeNm}
              </Typography>
              <Typography
                component="h3"
                variant="h5"
                sx={{
                  mt: "10px",
                  mb: "10px",
                  fontSize: "x-large",
                  fontWeight: "bold",
                }}
              >
                담당자연락처
              </Typography>
              <Typography
                component="h3"
                variant="h5"
                sx={{
                  fontSize: "large",
                }}
              >
                {state.officetel}
              </Typography>
            </div>
          </div>
          <div
            style={{
              backgroundColor: "#F5F5ED",
              borderRadius: "0 0 10px 10px",
              padding: "10px 10px 10px 30px ",
              width: "1080px",
            }}
          >
            <Typography
              component="h3"
              variant="h5"
              sx={{
                mt: "20px",
                mb: "10px",
                fontSize: "x-large",
                fontWeight: "bold",
              }}
            >
              보호장소
            </Typography>
            <Typography
              component="h3"
              variant="h5"
              sx={{
                fontSize: "large",
              }}
            >
              {state.careAddr}
            </Typography>
          </div>
        </div>
        <div
          id="map"
          style={{
            marginTop: "20px",
            border: "solid 1px #FBD385",
            width: "1100px",
            height: "500px",
            borderRadius: "10px",
          }}
        ></div>
      </div>
    </ThemeProvider>
  );
};
export default AnimalListDetail;
