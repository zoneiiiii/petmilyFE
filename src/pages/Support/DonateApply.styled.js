import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

export const Logo = styled.img`
  max-width: 200px;
  height: auto;
`;

export const Line = styled.hr`
  width: 100%;
  border: 1px solid #cccccc;
  margin: 1.5rem 0;
`;

export const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  width: 100%;
  margin-bottom: 2%;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  align-items: center;
`;

export const Field = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

export const Label = styled.label`
  font-size: 1.1rem;
  margin-right: 1rem;
  min-width: 100px;
`;

export const InputAdornment = styled.span`
  margin-left: 0.8rem;
  margin-left: -16px;
`;

export const PaymentButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-left: 4px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
`;
