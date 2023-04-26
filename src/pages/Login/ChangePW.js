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
function ChangePW() {
  const pwLabel = "PW";
  const pwchangeLabel = "PW변경";

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
      <div style={{ marginTop: "10px" }}>
        <CustomTextField
          autoComplete="off"
          label={pwLabel}
          type="password"
          name="password"
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
          label={pwchangeLabel}
          type="password"
          name="password"
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

export default ChangePW;
