import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  width: 70vw;
  min-width: 1000px;
  margin: 0 auto;
`;

export const Line = styled.hr`
  width: 70vw;
  border: 1px solid #cccccc;
  margin: 1.5rem 0;
`;

export const MainTitle = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 1rem;
`;

export const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  // text-align: center;
  width: 30vw;
  min-width: 500px;
  margin-bottom: 1.5%;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  align-items: center;
`;

export const InputWrapper = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Field = styled.div`
  display: flex;
  align-items: center;
  width: 30vw;
  min-width: 500px;
  margin-bottom: 1rem;
`;

export const Label = styled.label`
  font-size: 1.1rem;
  margin-right: 1rem;
  min-width: 100px;
`;

export const PayLabel = styled.label`
  font-size: 1.1rem;
  margin-right: 1rem;
  min-width: 120px;
`;

export const InputAdornment = styled.span`
  margin-left: 0.8rem;
  margin-left: -16px;
`;

export const PaymentButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
`;

export const ErrorMsg = styled.p`
  color: red;
  text-align: left;
  font-size: 14px;
`;
