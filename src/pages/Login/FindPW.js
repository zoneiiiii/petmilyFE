import React, { useState, useRef } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import { styled } from "@mui/material/styles";

const CustomTextField = styled(TextField)({
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
function FindPW() {
  const idLabel = "Id";
  const emailLabel = "email";

  return (
    <div
      style={{
        textAlign: "center",
        width: "350px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "0 auto",
      }}
    >
      <Typography sx={{ color: "#FBD385", mt: "30px", fontSize: "xx-large" }}>
        비밀번호 찾기
      </Typography>
      <Typography sx={{ color: "#FBD385", mb: "20px", fontSize: "small" }}>
        가입한 아이디와 이메일을 입력하세요.
      </Typography>
      <div style={{ marginTop: "10px" }}>
        <CustomTextField
          autoComplete="off"
          label={idLabel}
          type="text"
          name="id"
          variant="outlined"
          InputProps={{ style: { color: "#FBD385" } }}
          InputLabelProps={{ style: { color: "#FBD385" } }}
          sx={{
            background: "white",
            width: "300px",
          }}
          required
        />
        {/* <FormHelperText sx={{ color: "red" }}>{idError}</FormHelperText> */}
      </div>
      <div style={{ marginTop: "10px" }}>
        <CustomTextField
          label={emailLabel}
          type="email"
          name="email"
          required
          variant="outlined"
          InputProps={{ style: { color: "#FBD385" } }}
          InputLabelProps={{ style: { color: "#FBD385" } }}
          sx={{
            width: "300px",
            background: "white",
          }}
        />
        {/* <FormHelperText sx={{ color: "red" }}>{passwordError}</FormHelperText> */}
      </div>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{
          background: "#FBD385",
          width: "300px",
          height: "25px",
          mt: "10px",
        }}
      >
        비밀번호 찾기
      </Button>
    </div>
  );
}

export default FindPW;
