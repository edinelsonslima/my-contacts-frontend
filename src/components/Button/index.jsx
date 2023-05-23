import propTypes from 'prop-types';
import { StyledButton, SpinnerWrapper } from './styles';
import Spinner from '../Spinner';

export default function Button({
  children,
  type,
  disabled,
  isLoading,
  danger,
  onClick,
}) {
  return (
    <StyledButton
      type={type}
      danger={danger}
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

Button.defaultProps = {
  type: 'button',
  danger: false,
  disabled: false,
  isLoading: false,
  onClick: undefined,
};
