import styled, { css } from 'styled-components';

export const Container = styled.div`
${({ theme }) => css`
display: flex;
flex-direction: column;
align-items: center;
gap: 24px;

margin-top: 16px;

.details {
  display: flex;
  align-items: center;
  gap: 24px;

  strong {
    font-size: 24px;
    color: ${theme.colors.danger.main};
    display: block;
    margin-bottom: 8px;
  }
}
`}
`;
