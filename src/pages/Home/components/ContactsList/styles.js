import styled, { css, keyframes } from 'styled-components';

const fadeInList = keyframes`
from {
  opacity: 0;
  transform: translateX(100vw);
}

to {
  opacity: 1;
  transform: translateX(0);
}
`;

export const ListHeader = styled.header`
${({ theme, orderBy }) => css`
margin-top: 24px;
margin-bottom: 8px;

button{
  display: flex;
  align-items: center;

  background: transparent;
  border: none;

  span{
    margin-right: 8px;
    font-weight: bold;
    color: ${theme.colors.primary.main}
  }

  img {
    transition: transform 0.2s ease-in;
    transform: ${orderBy === 'asc' ? 'rotate(-180deg)' : 'rotate(0deg)'};
  }
}

`}
`;

export const Card = styled.div`
${({ theme, timeAnimation }) => css`
display: flex;
align-items: center;
justify-content: space-between;

background: #fff;
box-shadow: 0 4px 10px rgba(0, 0, 0, 0.04);
padding: 16px;

border-radius: 4px;

animation: ${fadeInList} ease-in-out;
animation-duration: ${timeAnimation}ms;

& + & {
  margin-top: 16px;
}

.info {
  .contact-name{
    display: flex;
    align-items: center;

    small {
      background: ${theme.colors.primary.lighter};
      color: ${theme.colors.primary.main};
      font-weight: bolder;
      text-transform: uppercase;
      padding: 4px;
      border-radius: 4px;
      margin-left: 8px;
    }
  }

  span {
    display: block;
    font-size: 14px;
    color: ${theme.colors.gray[200]};
  }
}

.actions{
  display: flex;
  align-items: center;

  a, button {
    img {
      &:hover {
        filter: brightness(0.8);
      }
    }
  }

  button{
    background: transparent;
    border: none;
    margin-left: 8px;
  }
}
`}
`;
