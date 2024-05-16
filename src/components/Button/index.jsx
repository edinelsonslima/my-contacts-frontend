import propTypes from 'prop-types';
import Spinner from '../Spinner';
import { SpinnerWrapper, StyledButton } from './styles';

export default function Button({
  children,
  type = 'button',
  disabled = false,
  isLoading = false,
  danger = false,
  onClick,
}) {
  return (
    <StyledButton
      type={type}
      $danger={danger}
      onClick={onClick}
      disabled={disabled || isLoading}
    >
      {children}
      {isLoading && (
        <SpinnerWrapper>
          <Spinner size={16} />
        </SpinnerWrapper>
      )}
    </StyledButton>
  );
}

Button.propTypes = {
  danger: propTypes.bool,
  disabled: propTypes.bool,
  isLoading: propTypes.bool,
  children: propTypes.node.isRequired,
  onClick: propTypes.func,
  type: propTypes.oneOf(['button', 'submit', 'reset']),
};
