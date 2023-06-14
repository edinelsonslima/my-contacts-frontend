import propTypes from 'prop-types';

import { Container } from './styles';

export default function InputSearch({ value, onChange }) {
  return (
    <Container>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Pesquise pelo contato..."
      />
    </Container>
  );
}

InputSearch.propTypes = {
  value: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired,
};
