import ReactDOM from 'react-dom';
import propTypes from 'prop-types';

import { Overlay } from './styles';

export default function Loader({ loading }) {
  if (!loading) return null;
  return ReactDOM.createPortal(
    <Overlay><div className="loader" /></Overlay>,
    document.getElementById('loader-root'),
  );
}

Loader.propTypes = {
  loading: propTypes.bool,
};

Loader.defaultProps = {
  loading: false,
};
