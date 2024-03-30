import styled from 'styled-components';
import defaultTheme from '../../assets/styles/theme/default';

export const Container = styled.div`
  width: min(500px,100%);
  margin: 0 auto;
  padding: 0 16px;
`;

export const ToastMessagesStyle = {
  '*': {
    fontSize: 'inherit',
    fontFamily: 'inherit',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    color: '#fff',
    padding: '16px 32px',
    borderRadius: '4px',
    boxShadow: '0px 20px 20px -16px rgba(0, 0, 0, 0.25)',
    cursor: 'pointer',
    backgroundColor: defaultTheme.colors.primary.main,
  },
  success: {
    backgroundColor: defaultTheme.colors.success.main,
  },
  error: {
    backgroundColor: defaultTheme.colors.danger.main,
  },
};
