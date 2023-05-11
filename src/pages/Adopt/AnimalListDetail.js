import { useLocation } from "react-router-dom";
import Typography from "@mui/material/Typography";
const AnimalListDetail = () => {
  const location = useLocation();
  const state = location.state;

  return (
    <div>
      <img
        src={state.profile}
        style={{
          width: "300px",
          height: "300px ",
        }}
      />
      <div>
        <Typography
          component="h1"
          variant="h5"
          sx={{
            mt: "30px",
            mb: "30px",
            fontSize: "xx-large",
          }}
        >
          나이 : {state.age}
        </Typography>
        <Typography
          component="h1"
          variant="h5"
          sx={{
            mt: "30px",
            mb: "30px",
            fontSize: "xx-large",
          }}
        >
          품종 : {state.kindCd}
        </Typography>
        <Typography
          component="h1"
          variant="h5"
          sx={{
            mt: "30px",
            mb: "30px",
            fontSize: "xx-large",
          }}
        >
          성별 : {state.sexCd}
        </Typography>
        <Typography
          component="h1"
          variant="h5"
          sx={{
            mt: "30px",
            mb: "30px",
            fontSize: "xx-large",
          }}
        >
          색상 : {state.colorCd}
        </Typography>
        <Typography
          component="h1"
          variant="h5"
          sx={{
            mt: "30px",
            mb: "30px",
            fontSize: "xx-large",
          }}
        >
          체중 : {state.weight}
        </Typography>
        <Typography
          component="h1"
          variant="h5"
          sx={{
            mt: "30px",
            mb: "30px",
            fontSize: "xx-large",
          }}
        >
          중성화여부 : {state.neuterYn}
        </Typography>
        <Typography
          component="h1"
          variant="h5"
          sx={{
            mt: "30px",
            mb: "30px",
            fontSize: "xx-large",
          }}
        >
          상태 : {state.processState}
        </Typography>
        <Typography
          component="h1"
          variant="h5"
          sx={{
            mt: "30px",
            mb: "30px",
            fontSize: "xx-large",
          }}
        >
          접수일시 : {state.happenDt}
        </Typography>
        <Typography
          component="h1"
          variant="h5"
          sx={{
            mt: "30px",
            mb: "30px",
            fontSize: "xx-large",
          }}
        >
          발견장소 : {state.happenPlace}
        </Typography>
        <Typography
          component="h1"
          variant="h5"
          sx={{
            mt: "30px",
            mb: "30px",
            fontSize: "xx-large",
          }}
        >
          보호센터명 : {state.careNm}
        </Typography>
        <Typography
          component="h1"
          variant="h5"
          sx={{
            mt: "30px",
            mb: "30px",
            fontSize: "xx-large",
          }}
        >
          보호소 전화번호 : {state.careTel}
        </Typography>
        <Typography
          component="h1"
          variant="h5"
          sx={{
            mt: "30px",
            mb: "30px",
            fontSize: "xx-large",
          }}
        >
          보호장소 : {state.careAddr}
        </Typography>
        <Typography
          component="h1"
          variant="h5"
          sx={{
            mt: "30px",
            mb: "30px",
            fontSize: "xx-large",
          }}
        >
          담당자 : {state.chargeNm}
        </Typography>
        <Typography
          component="h1"
          variant="h5"
          sx={{
            mt: "30px",
            mb: "30px",
            fontSize: "xx-large",
          }}
        >
          담당자 연락처 : {state.officetel}
        </Typography>
      </div>
    </div>
  );
};
export default AnimalListDetail;
