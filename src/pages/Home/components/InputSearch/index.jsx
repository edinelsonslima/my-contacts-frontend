import propTypes from 'prop-types';

import Spinner from '../../../../components/Spinner';
import { Container } from './styles';

export default function InputSearch({ value, onChange, loading = false }) {
  return (
    <Container>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Pesquise pelo contato..."
      />

      { loading && <Spinner size={16} /> }
    </Container>
  );
}

InputSearch.propTypes = {
  value: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired,
  loading: propTypes.bool,
};
