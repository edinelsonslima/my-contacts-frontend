import styled, { css } from 'styled-components';

export default styled.button`
  ${({ theme, danger }) => css`
  height: 52px;
  padding: 0 16px;

  border: none;
  outline: none;

  background: ${theme.colors.primary.main};
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.04);

  font-size: 16px;
  font-weight: bold;

  color: #fff;

  border-radius: 4px;

  transition: background 0.2s ease-in;

  &:hover {
    background: ${theme.colors.primary.light};
  }

  &:active {
    background: ${theme.colors.primary.dark};
  }

  &:disabled {
    background: #CCC;
    cursor: not-allowed;
  }

  ${danger && css`
    background: ${theme.colors.danger.main};

    &:hover {
      background: ${theme.colors.danger.light};
    }

    &:active {
      background: ${theme.colors.danger.dark};
    }
  `}

  `}

`;
