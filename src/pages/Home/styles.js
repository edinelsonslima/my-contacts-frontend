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

export const Container = styled.div`
position: relative;
margin-top: 32px;

overflow-x: hidden;
`;

export const InputSearchContainer = styled.div`
width: 100%;

input {
  background: #fff;
  border: none;
  outline: none;

  width: 100%;
  height: 50px;

  padding: 0 16px;
  border-radius: 25px;

  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.04);

  &::placeholder {
    color: #BCBCBC;
  }
}
`;

export const Header = styled.header`
${({ theme, justifyContent }) => css`
display: flex;
align-items: center;
justify-content: ${justifyContent};
margin-top: 32px;

border-bottom: 2px solid ${theme.colors.gray[100]};
padding-bottom: 16px;

strong {
  font-size: 24px;
}

a {
  color: ${theme.colors.primary.main};
  text-decoration: none;
  font-weight: bold;

  border: 2px solid ${theme.colors.primary.main};
  border-radius: 4px;
  padding: 8px 16px;
  transition: all 0.2s ease-in;

  &:hover {
    background: ${theme.colors.primary.main};
    color: #fff;
  }
}
`}
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

export const ErrorContainer = styled.div`
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

export const EmptyListContainer = styled.div`
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

export const SearchNotFoundContainer = styled.div`
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
