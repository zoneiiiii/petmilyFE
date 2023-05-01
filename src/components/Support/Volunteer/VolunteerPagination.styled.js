import styled from 'styled-components';
import { Pagination } from '@mui/material';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

export const StyledPagination = styled(Pagination)`
  & .MuiPagination-ul {
    justify-content: center;
  }
  & .MuiPaginationItem-root.Mui-selected {
    background-color: #FBD385;
    color : #FFF;
    }
  }
`;
