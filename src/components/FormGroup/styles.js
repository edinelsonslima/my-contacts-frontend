import styled, { css } from 'styled-components';

export const Container = styled.div`
  ${({ theme }) => css`
  & + & {
    margin-top: 16px;
  }

  small {
    display: block;
    margin-top: 8px;

    color: ${theme.colors.danger.main};
    font-size: 12px;
  }
  `}
`;
