import styled, { css, keyframes } from 'styled-components';

const messageIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(100px);
  }

  to {
    opacity: 1;
    transform: translateY(0px);
  }
`;

const containerVariants = {
  success: ({ theme }) => css`
    background-color: ${theme.colors.success.main};
  `,

  danger: ({ theme }) => css`
    background-color: ${theme.colors.danger.main};
  `,

  default: ({ theme }) => css`
    background-color: ${theme.colors.primary.main};
  `,
};

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  color: #fff;
  padding: 16px 32px;
  border-radius: 4px;
  box-shadow: 0px 20px 20px -16px rgba(0, 0, 0, 0.25);
  animation: ${messageIn} 0.3s ease-in-out;
  cursor: pointer;

  ${({ type }) => containerVariants[type] || containerVariants.default}
  `;
