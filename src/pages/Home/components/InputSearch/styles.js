import styled from 'styled-components';

export const Container = styled.div`
width: 100%;

input {
  background: #fff;
  border: none;
  outline: none;

  width: 100%;
  height: 50px;

  padding: 0 16px;
  border-radius: 25px;

  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.04);

  &::placeholder {
    color: #BCBCBC;
  }
}
`;
