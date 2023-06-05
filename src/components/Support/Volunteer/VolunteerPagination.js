import React from 'react';
import * as S from './VolunteerPagination.styled';
import { ThemeProvider } from "@mui/material";
import { CustomTheme } from "../../../assets/Theme/CustomTheme";

const VolunteerPagination = ({ count, page, onChange }) => {
  return (
    <ThemeProvider theme={CustomTheme}>
      <S.Container>
        <S.StyledPagination color="primary" count={count} page={page} onChange={onChange} />
      </S.Container>
    </ThemeProvider>
  );
};

export default VolunteerPagination;
