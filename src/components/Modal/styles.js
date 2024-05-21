import styled, { css, keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const scaleIn = keyframes`
  from { transform: scale(0); }
  to { transform: scale(1); }
`;

const scaleOut = keyframes`
  from { transform: scale(1); }
  to { transform: scale(0); }
`;

export const Overlay = styled.div`
  ${({ $isLeaving }) => css`
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);

  position: fixed;
  width: 100%;
  height: 100%;

  left: 0;
  top: 0;

  display: grid;
  place-items: center;

  animation: ${fadeIn} 0.3s ease-in-out;

  ${$isLeaving && css`animation: ${fadeOut} 0.2s forwards;`}

  `}
`;

export const Container = styled.div`
  ${({ theme, $danger, $isLeaving }) => css`
  background: #fff;
  border-radius: 4px;
  padding: 24px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.04);

  width: min(100%, 450px);

  animation: ${scaleIn} 0.3s ease-in-out;

  ${$isLeaving && css` animation: ${scaleOut} 0.2s forwards;`}


  > h1 {
    font-size: 22px;
    color: ${$danger ? theme.colors.danger.main : theme.colors.gray[900]};
  }

  .modal-body {
    margin-top: 32px;
  }
  `}
`;

export const Footer = styled.footer`
  ${({ theme }) => css`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  margin-top: 32px;

  .cancel-button{
    background: transparent;
    border: none;
    font-size: 16px;
    margin-right: 24px;
    color: ${theme.colors.gray[200]};


    &:disabled {
      cursor: not-allowed;
    }
  }
  `}
`;
