import propTypes from 'prop-types';

import Button from '../Button';
import ReactPortal from '../ReactPortal';

import useAnimatedUnmount from '../../hooks/useAnimatedUnmount';
import { Container, Footer, Overlay } from './styles';

export default function Modal({
  title,
  children,
  visible,
  onCancel,
  onConfirm,
  danger = false,
  isLoading = false,
  cancelLabel = 'Cancelar',
  confirmLabel = 'Confirmar',
}) {
  const { shouldRender, animatedElementRef } = useAnimatedUnmount(visible);

  if (!shouldRender) return null;

  return (
    <ReactPortal containerId="modal-root">
      <Overlay ref={animatedElementRef} $isLeaving={!visible}>
        <Container $danger={danger} $isLeaving={!visible}>
          <h1>{title}</h1>

          <div className="modal-body">{children}</div>

          <Footer>
            <button
              type="button"
              className="cancel-button"
              onClick={onCancel}
              disabled={isLoading}
            >
              {cancelLabel}
            </button>

            <Button
              type="button"
              danger={danger}
              onClick={onConfirm}
              isLoading={isLoading}
            >
              {confirmLabel}
            </Button>
          </Footer>
        </Container>
      </Overlay>
    </ReactPortal>
  );
}

Modal.propTypes = {
  danger: propTypes.bool,
  visible: propTypes.bool.isRequired,
  title: propTypes.string.isRequired,
  children: propTypes.node.isRequired,
  cancelLabel: propTypes.string,
  confirmLabel: propTypes.string,
  onCancel: propTypes.func.isRequired,
  onConfirm: propTypes.func.isRequired,
  isLoading: propTypes.bool,
};
