/* eslint-disable react/jsx-one-expression-per-line */
import IconEmptyBox from '../../../../assets/images/empty-box.svg';

import { Container } from './styles';

export default function EmptyList() {
  return (
    <Container>
      <img src={IconEmptyBox} alt="Caixa vazia" />

      <p>
        Você ainda não tem nenhum contato cadastrado!
        Clique no botão <strong>”Novo contato”</strong> à cima
        para cadastrar o seu primeiro!
      </p>
    </Container>
  );
}
