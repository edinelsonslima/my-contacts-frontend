import styled, { css } from 'styled-components';

export const Overlay = styled.div`
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);

  position: fixed;
  width: 100%;
  height: 100%;

  left: 0;
  top: 0;

  display: grid;
  place-items: center;
`;

export const Container = styled.div`
  ${({ theme, danger }) => css`
  background: #fff;
  border-radius: 4px;
  padding: 24px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.04);

  width: min(100%, 450px);

  > h1 {
    font-size: 22px;
    color: ${danger ? theme.colors.danger.main : theme.colors.gray[900]};
  }

  .modal-body {
    margin-top: 32px;
  }
  `}
`;

export const Footer = styled.footer`
  ${({ theme }) => css`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  margin-top: 32px;

  .cancel-button{
    background: transparent;
    border: none;
    font-size: 16px;
    margin-right: 24px;
    color: ${theme.colors.gray[200]};


    &:disabled {
      cursor: not-allowed;
    }
  }
  `}
`;
