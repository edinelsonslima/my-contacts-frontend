import propTypes from 'prop-types';

import ReactPortal from '../ReactPortal';

import { Overlay } from './styles';
import Spinner from '../Spinner';

export default function Loader({ loading }) {
  if (!loading) return null;

  return (
    <ReactPortal containerId="Loader-root">
      <Overlay>
        <Spinner size={90} />
      </Overlay>
    </ReactPortal>
  );
}

Loader.propTypes = {
  loading: propTypes.bool,
};

Loader.defaultProps = {
  loading: false,
};
