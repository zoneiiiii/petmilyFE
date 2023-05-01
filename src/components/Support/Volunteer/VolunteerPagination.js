import React from 'react';
import * as S from './VolunteerPagination.styled';
import { Pagination } from '@mui/material';


const VolunteerPagination = ({ count, page, onChange }) => {
  return (
    <S.Container>
      <S.StyledPagination count={count} page={page} onChange={onChange}/>
    </S.Container>
  );
};

export default VolunteerPagination;
