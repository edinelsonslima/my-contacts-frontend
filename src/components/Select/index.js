import styled, { css } from 'styled-components';

export default styled.select`
  ${({ theme }) => css`
  border: none;
  outline: none;
  height: 52px;

  width: 100%;
  background: #fff;
  border 2px solid #fff;

  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.04);
  border-radius: 4px;

  padding: 0 16px;

  font-size: 16px;

  cursor: pointer;

  transition: border-color 0.2s ease-in;

  appearance: none;

  &[data-option-empty="true"] {
    color: ${theme.colors.gray[200]};
  }

  &:focus {
    border-color: ${theme.colors.primary.main};
  }

  &[disabled] {
    opacity: 1;
    border-color: ${theme.colors.gray[200]};
    background-color: ${theme.colors.gray[100]};
    cursor: not-allowed;
  }
  `}
`;
