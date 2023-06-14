import propTypes from 'prop-types';

import IconSad from '../../../../assets/images/sad.svg';
import Button from '../../../../components/Button';

import { Container } from './styles';

export default function ErrorStatus({ onTryAgain }) {
  return (
    <Container>
      <div className="details">
        <img src={IconSad} alt="Carinha triste" />
        <strong>Ocorreu um erro ao obter os seus contatos</strong>
      </div>

      <Button type="button" onClick={onTryAgain}>Tentar novamente</Button>
    </Container>
  );
}

ErrorStatus.propTypes = {
  onTryAgain: propTypes.func.isRequired,
};
