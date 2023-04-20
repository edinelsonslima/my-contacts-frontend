import styled, { css } from 'styled-components';

export const Container = styled.div`
  ${({ theme }) => css`
  margin-bottom: 24px;

  a {
    display: flex;
    align-items: center;

    text-decoration: none;

    margin-bottom: 8px;

    span {
      font-weight: bold;
      color: ${theme.colors.primary.main};
    }

    img {
      margin-right: 8px;
      transform: rotate(-90deg);
    }
  }

  h1 {
    font-size: 24px;
  }

  `}
`;
