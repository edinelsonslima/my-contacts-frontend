import styled, { css } from 'styled-components';

export const Container = styled.div`
${({ theme }) => css`
display: flex;
align-items: flex-start;
gap: 14px;

margin-top: 16px;

span {
  color: ${theme.colors.gray[200]};
  word-break: break-word;
}
`}
`;
