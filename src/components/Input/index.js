import styled, { css } from 'styled-components';

export default styled.input`
  ${({ theme, $error }) => css`
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

  transition: border-color 0.2s ease-in;

  appearance: none;

  &:focus {
    border-color: ${theme.colors.primary.main};
  }

  &:invalid {
    color: ${theme.colors.danger.main};
    border-color: ${theme.colors.danger.main};
  }

  &::placeholder {
    color: ${theme.colors.gray[200]};
  }

  ${$error && css`
    color: ${theme.colors.danger.main};
    border-color: ${theme.colors.danger.main} !important;
  `}

  &[disabled] {
    background-color: ${theme.colors.gray[100]};
    border-color: ${theme.colors.gray[200]};
    cursor: not-allowed;
  }
  `}

`;
