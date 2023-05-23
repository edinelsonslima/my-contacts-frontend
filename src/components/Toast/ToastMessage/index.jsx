import propTypes from 'prop-types';
import { useEffect } from 'react';
import { Container } from './styles';

import IconXCircle from '../../../assets/images/icons/x-circle.svg';
import IconCheckCircle from '../../../assets/images/icons/check-circle.svg';

export default function ToastMessage({ message, onRemoveMessage }) {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onRemoveMessage(message.id);
    }, message.duration || 1000 * 7 /* 7 seconds */);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [onRemoveMessage, message.id, message.duration]);

  function handleRemoveMessage() {
    onRemoveMessage(message.id);
  }

  return (
    <Container
      tabIndex={0}
      role="button"
      type={message.type}
      onClick={handleRemoveMessage}
    >
      {message.type === 'danger' && <img src={IconXCircle} alt="X" />}
      {message.type === 'success' && <img src={IconCheckCircle} alt="Check" />}

      <strong>{message.text}</strong>
    </Container>
  );
}

ToastMessage.propTypes = {
  onRemoveMessage: propTypes.func.isRequired,
  message: propTypes.shape({
    duration: propTypes.number,
    id: propTypes.number.isRequired,
    text: propTypes.string.isRequired,
    type: propTypes.oneOf(['default', 'danger', 'success']),
  }).isRequired,
};
