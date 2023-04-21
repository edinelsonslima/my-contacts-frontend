import propTypes from 'prop-types';
import { StyledButton } from './styles';
import Spinner from '../Spinner';

export default function Button({
  children, type, disabled, isLoading, danger,
}) {
  return (
    <StyledButton
      type={type}
      danger={danger}
      disabled={disabled || isLoading}
    >
      {!isLoading && children}
      {isLoading && <Spinner size={16} />}
    </StyledButton>
  );
}

Button.propTypes = {
  danger: propTypes.bool,
  disabled: propTypes.bool,
  isLoading: propTypes.bool,
  children: propTypes.node.isRequired,
  type: propTypes.oneOf(['button', 'submit', 'reset']),
};

Button.defaultProps = {
  type: 'button',
  danger: false,
  disabled: false,
  isLoading: false,
};
