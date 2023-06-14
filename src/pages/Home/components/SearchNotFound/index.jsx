/* eslint-disable react/jsx-one-expression-per-line */
import propTypes from 'prop-types';

import IconMagnifierQuestion from '../../../../assets/images/magnifier-question.svg';

import { Container } from './styles';

export default function SearchNotFound({ searchTerm }) {
  return (
    <Container>
      <img src={IconMagnifierQuestion} alt="Lupa" />

      <span>
        Nenhum resultado foi encontrado para <strong>”{searchTerm}”</strong>.
      </span>
    </Container>
  );
}

SearchNotFound.propTypes = {
  searchTerm: propTypes.string.isRequired,
};
