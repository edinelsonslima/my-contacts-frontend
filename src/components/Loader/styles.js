import styled, { css, keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

export const Overlay = styled.div`
  ${({ $isLeaving }) => css`
  width: 100%;
  height: 100%;

  position: fixed;
  inset: 0;

  background: rgba(246, 245,252, 0.7);

  display: grid;
  place-items: center;

  animation: ${fadeIn} 0.3s;

  ${$isLeaving && css`animation: ${fadeOut} 0.2s forwards;`}
`}
`;
