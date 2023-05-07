import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import CustomButton from "../Login/CustomButton";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
const CustomTextField = styled(TextField)({
  backgroundColor: "white",
  "& label.Mui-focused": {
    color: "#FBD385",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#FBD385",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#FBD385",
    },
    "&:hover fieldset": {
      borderColor: "#FBD385",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#FBD385",
    },
  },
});
const CustomizedButton = styled(Button)`
  background-color: #fbd385;
  color: white;
  width: 90px;
  height: 40px;
  margin-top: 10px;
  &:hover {
    background-color: #facc73;
  }
  &:focus {
    background-color: #facc73;
  }
`;

const AdoptApplication = () => {
  return (
    <div
      style={{
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "50px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <img
          className="ProfileImg"
          src="./../images/emptyProfile.png"
          alt="profile"
          width={"300px"}
          height={"300px"}
          style={{ borderRadius: "50%", marginRight: "20px" }}
        />

        <img
          className="Arrow"
          src="./../images/Arrow.png"
          alt="Arrow"
          style={{
            objectFit: "contian",
            marginRight: "20px",
          }}
        />
        <img
          className="AdoptedCat"
          src="./../images/AdoptedCat.png"
          alt="profile"
          width={"300px"}
          height={"300px"}
          style={{ borderRadius: "50%" }}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: "650px",
          justifyContent: "space-between",
        }}
      >
        <Typography
          component="h4"
          variant="h5"
          sx={{
            color: "black",
            mt: "30px",
          }}
        >
          user1
        </Typography>
        <Typography
          component="h4"
          variant="h5"
          sx={{
            color: "black",
            mt: "30px",
          }}
        >
          고양이
        </Typography>
      </div>

      <Typography
        component="h5"
        variant="h5"
        sx={{
          color: "black",
          mt: "50px",
          mb: "30px",
        }}
      >
        입양 체크리스트를 꼭 확인 후 신청해 주세요!
      </Typography>
      <Typography
        component="h1"
        variant="h2"
        sx={{
          color: "black",
          mt: "30px",
          mb: "30px",
        }}
      >
        입양 신청
      </Typography>
      <div
        style={{
          backgroundColor: "#F5F5ED",
          width: "650px",
          height: "450px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "5%",
        }}
      >
        <Box sx={{ width: "600px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <CustomTextField
                required
                fullWidth
                name="name"
                label="이름"
                type="text"
                autoFocus
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                required
                fullWidth
                name="birth"
                label="생년월일"
                type="text"
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField required fullWidth name="tel" label="전화번호" />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                required
                fullWidth
                name="addr"
                label="주소"
                type="text"
              />
            </Grid>{" "}
            <Grid item xs={12}>
              <CustomTextField required fullWidth label="이메일" name="email" />
            </Grid>
          </Grid>
          <Grid sx={{ marginTop: "10px" }}>
            <CustomizedButton
              type="submit"
              variant="contained"
              sx={{ marginRight: "15px" }}
            >
              신청
            </CustomizedButton>
            <CustomizedButton type="submit" variant="contained">
              취소
            </CustomizedButton>
          </Grid>
        </Box>
      </div>
    </div>
  );
};

export default AdoptApplication;
