/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-one-expression-per-line */
import { Link } from 'react-router-dom';
import {
  useCallback, useEffect, useMemo, useState,
} from 'react';

import IconArrow from '../../assets/images/icons/arrow.svg';
import IconEdit from '../../assets/images/icons/edit.svg';
import IconTrash from '../../assets/images/icons/trash.svg';
import IconSad from '../../assets/images/sad.svg';
import IconEmptyBox from '../../assets/images/empty-box.svg';
import IconMagnifierQuestion from '../../assets/images/magnifier-question.svg';

import Loader from '../../components/Loader';
import Button from '../../components/Button';

import {
  Card,
  Header,
  Container,
  ListHeader,
  ErrorContainer,
  EmptyListContainer,
  InputSearchContainer,
  SearchNotFoundContainer,
} from './styles';
import contactsService from '../../services/contactsService';

export default function Home() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const filteredContacts = useMemo(() => contacts?.filter((contact) => (
    contact?.name.toLowerCase().includes(searchTerm.toLowerCase())
  )), [contacts, searchTerm]);

  const loadContacts = useCallback(() => {
    setHasError(false);
    setIsLoading(true);

    contactsService.listContacts(orderBy)
      .then(setContacts)
      .catch(setHasError)
      .finally(setIsLoading);
  }, [orderBy]);

  useEffect(() => loadContacts(), [loadContacts]);

  function handleToggleOrderBy() {
    setOrderBy((prevOrderBy) => (prevOrderBy === 'asc' ? 'desc' : 'asc'));
  }

  function handleSearchTerm(event) {
    setSearchTerm(event.target.value);
  }

  return (
    <Container>
      <Loader loading={isLoading} />
      {!!contacts?.length && (
        <InputSearchContainer>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchTerm}
            placeholder="Pesquise pelo contato..."
          />
        </InputSearchContainer>
      )}

      <Header justifyContent={hasError ? 'flex-end' : contacts?.length ? 'space-between' : 'center'}>
        {(!hasError && !!contacts?.length) && (
          <strong>
            {filteredContacts?.length}
            {filteredContacts?.length === 1 ? ' Contato' : ' Contatos'}
          </strong>
        )}

        <Link to="/new">
          Novo Contato
        </Link>
      </Header>

      {hasError && (
      <ErrorContainer>
        <div className="details">
          <img src={IconSad} alt="Carinha triste" />
          <strong>Ocorreu um erro ao obter os seus contatos</strong>
        </div>

        <Button type="button" onClick={loadContacts}>Tentar novamente</Button>
      </ErrorContainer>
      )}

      {!hasError && (
      <>
        {(!contacts?.length && !isLoading) && (
          <EmptyListContainer>
            <img src={IconEmptyBox} alt="Caixa vazia" />

            <p>
              Você ainda não tem nenhum contato cadastrado!
              Clique no botão <strong>”Novo contato”</strong> à cima
              para cadastrar o seu primeiro!
            </p>
          </EmptyListContainer>
        )}

        {(!!contacts.length && !filteredContacts?.length) && (
          <SearchNotFoundContainer>
            <img src={IconMagnifierQuestion} alt="Lupa" />

            <span>
              Nenhum resultado foi encontrado para <strong>”{searchTerm}”</strong>.
            </span>
          </SearchNotFoundContainer>
        )}

          {!!filteredContacts?.length && (
          <ListHeader orderBy={orderBy}>
            <button type="button" onClick={handleToggleOrderBy}>
              <span>Nome</span>
              <img src={IconArrow} alt="Seta" />
            </button>
          </ListHeader>
          )}

        {filteredContacts?.map((contact, i) => (
          <Card
            key={contact?.id}
            timeAnimation={((i + 1) * 200) > 1500 ? 1500 : ((i + 1) * 200)}
          >
            <div className="info">
              <div className="contact-name">
                <strong>{contact?.name}</strong>
                {contact?.category_name && <small>{contact?.category_name}</small>}
              </div>

              <span>{contact?.email}</span>
              <span>{contact?.phone}</span>
            </div>

            <div className="actions">
              <Link to={'/edit/' + contact.id}>
                <img src={IconEdit} alt="Edit" />
              </Link>

              <button type="button">
                <img src={IconTrash} alt="Trash" />
              </button>
            </div>
          </Card>
        ))}
      </>
      )}
    </Container>
  );
}
