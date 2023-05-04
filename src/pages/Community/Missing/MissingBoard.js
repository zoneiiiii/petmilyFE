import React from "react";
import styled from "styled-components";
import SearchBar from "../../../components/common/SearchBar";

const MissingBoard = () => {
  return (
    <>
      <Top>실종 동물 게시판</Top>
      <hr />
      <SearchContainer>
        <SearchBar />
      </SearchContainer>

    </>
  );
};

const Top = styled.h1`
    font-size: 2rem;
    font-weight: bold;
    text-align: center;
    margin-bottom: 2rem;
`;

const SearchContainer = styled.div`
  
`;

export default MissingBoard;
