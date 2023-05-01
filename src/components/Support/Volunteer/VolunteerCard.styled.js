import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #cccccc;
  border-radius: 4px;
  padding: 1rem;
  width: calc(100% / 1.5 - 1rem); // 카드 가로 크기 조정
  min-width: 250px; // 최소 너비 설정
`;

export const Thumbnail = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

export const User = styled.h3`
  font-size: 1rem;
  font-weight: bold;
  margin: 1rem 0;
`;

export const Title = styled.h4`
  font-size: 0.9rem;
  margin: 0.5rem 0;
`;


export const Date = styled.p`
  font-size: 0.8rem;
  margin: 0.5rem 0;
  color: #999999;
`;

export const CountWrapper = styled.div`
  width: 100%;
  text-align: right;
  margin-top: 0.5rem;
  margin-right : 0.5rem;
`;

export const Count = styled.span`
  font-size: 0.8rem;
`;