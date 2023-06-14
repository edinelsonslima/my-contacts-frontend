/* eslint-disable no-nested-ternary */
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';

import { Container } from './styles';

export default function Header({ hasError, qtyOfContacts, qtyOfFilteredContacts }) {
  const alignment = hasError
    ? 'flex-end'
    : qtyOfContacts
      ? 'space-between'
      : 'center';

  return (
    <Container justifyContent={alignment}>
      {(!hasError && !!qtyOfContacts) && (
      <strong>
        {qtyOfFilteredContacts}
        {qtyOfFilteredContacts === 1 ? ' Contato' : ' Contatos'}
      </strong>
      )}

      <Link to="/new">
        Novo Contato
      </Link>
    </Container>
  );
}

Header.propTypes = {
  hasError: propTypes.bool.isRequired,
  qtyOfContacts: propTypes.number.isRequired,
  qtyOfFilteredContacts: propTypes.number.isRequired,
};
