import propTypes from 'prop-types';

import ReactPortal from '../ReactPortal';
import Button from '../Button';

import { Container, Overlay, Footer } from './styles';

export default function Modal({
  danger,
  title,
  children,
  isLoading,
  visible,
  cancelLabel,
  confirmLabel,
  onCancel,
  onConfirm,
}) {
  if (!visible) return null;

  return (
    <ReactPortal containerId="modal-root">
      <Overlay>
        <Container danger={danger}>
          <h1>{title}</h1>

          <div className="modal-body">
            {children}
          </div>

          <Footer>
            <button type="button" className="cancel-button" onClick={onCancel} disabled={isLoading}>
              {cancelLabel}
            </button>

            <Button type="button" danger={danger} onClick={onConfirm} isLoading={isLoading}>
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

Modal.defaultProps = {
  danger: false,
  isLoading: false,
  cancelLabel: 'Cancelar',
  confirmLabel: 'Confirmar',
};
