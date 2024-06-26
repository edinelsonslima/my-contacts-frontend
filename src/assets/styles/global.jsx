import '@edinelsonslima/toast-notification/style.css';
import { createGlobalStyle, css } from 'styled-components';

export default createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    font-family: 'Sora', sans-serif;
  }

  body {
    ${({ theme }) => css`
      background: ${theme.colors.background};
      color: ${theme.colors.gray[900]};
      font-size: 16px;
    `}
  }

  button {
    cursor: pointer;
  }

`;
