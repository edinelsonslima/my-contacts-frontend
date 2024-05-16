import propTypes from 'prop-types';

import useAnimatedUnmount from '../../hooks/useAnimatedUnmount';

import ReactPortal from '../ReactPortal';
import Spinner from '../Spinner';

import { Overlay } from './styles';

export default function Loader({ loading = false }) {
  const { animatedElementRef, shouldRender } = useAnimatedUnmount(loading);

  if (!shouldRender) return null;

  return (
    <ReactPortal containerId="Loader-root">
      <Overlay ref={animatedElementRef} $isLeaving={!loading}>
        <Spinner size={90} />
      </Overlay>
    </ReactPortal>
  );
}

Loader.propTypes = {
  loading: propTypes.bool,
};
