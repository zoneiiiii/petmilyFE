import styled from "styled-components";

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
  border: 1px solid #ccc;
`;

export const User = styled.h4`
  font-size: 0.9rem;
  margin: 0.5rem 0;
`;

export const Title = styled.h3`
  font-size: 1rem;
  font-weight: bold;
  margin: 1rem 0;
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
  margin-right: 0.5rem;
`;

export const Count = styled.span`
  font-size: 0.8rem;
`;

export const ClosedContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  padding: 1rem;
  width: calc(100% / 1.5 - 1rem); // 카드 가로 크기 조정
  // min-width: 250px; // 최소 너비 설정
  width: 200px;
  background-color: #d3d3d3;
`;

export const ClosedLabel = styled.span`
  position: absolute;
  bottom: 150px;
  right: 85px;
  color: red;
  font-weight: bold;
  font-size: 30px;
`;
export const CardImage = styled.img`
  width: auto;
  height: 196px;
  object-fit: cover;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  margin: 0.5rem;
`;

export const CardTitle = styled.p`
  font-weight: bold;
  font-size: 0.9rem;
  margin: 0.5rem 0.5rem;
  line-height: 1.4em;
  height: 2.8em;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const CardWritter = styled.p`
  font-size: 14px;
  color: #888;
  // float: left;
  margin-left: 10px;
`;
export const CardDate = styled.p`
  font-size: 14px;
  color: #888;
  float: left;
  margin-left: 10px;
`;
export const CardCount = styled.p`
  font-size: 14px;
  color: #888;
  float: right;
  margin-right: 10px;
`;

export const ContainerBox = styled.div``;
