import { ToastContainer } from '@edinelsonslima/toast-notification';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import Header from '../Header';

import GlobalStyles from '../../assets/styles/global';
import defaultTheme from '../../assets/styles/theme/default';

import Routes from '../../Routes';
import { Container } from './styles';

import '@edinelsonslima/toast-notification/style.css';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyles />
        <ToastContainer />
        <Container>
          <Header />
          <Routes />
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
