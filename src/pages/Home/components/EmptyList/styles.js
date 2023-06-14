import styled, { css } from 'styled-components';

export const Container = styled.div`
${({ theme }) => css`
display: flex;
flex-direction: column;
align-items: center;
gap: 8px;

margin-top: 16px;

p {
  text-align: center;
  color: ${theme.colors.gray[200]};

  strong {
    color: ${theme.colors.primary.main};

  }
}
`}
`;
