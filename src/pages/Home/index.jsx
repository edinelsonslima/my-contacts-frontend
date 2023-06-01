/* eslint-disable no-nested-ternary */
import { Link } from 'react-router-dom';

import Loader from '../../components/Loader';
import Button from '../../components/Button';
import Modal from '../../components/Modal';

import useController from './useController';

import IconArrow from '../../assets/images/icons/arrow.svg';
import IconEdit from '../../assets/images/icons/edit.svg';
import IconTrash from '../../assets/images/icons/trash.svg';
import IconSad from '../../assets/images/sad.svg';
import IconEmptyBox from '../../assets/images/empty-box.svg';
import IconMagnifierQuestion from '../../assets/images/magnifier-question.svg';

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

export default function Home() {
  const {
    isLoading,
    isLoadingDelete,
    contactBeingDeleted,
    isDeleteModalVisible,
    handleDeleteCloseDeleteModal,
    handleConfirmDeleteContact,
    contacts,
    searchTerm,
    handleSearchTerm,
    hasError,
    filteredContacts,
    loadContacts,
    orderBy,
    handleToggleOrderBy,
    handleDeleteContact,
  } = useController();

  return (
    <Container>
      <Loader loading={isLoading} />

      <Modal
        danger
        isLoading={isLoadingDelete}
        title={`Tem certeza que deseja remover o contato ”${contactBeingDeleted?.name}”?`}
        confirmLabel="Deletar"
        visible={isDeleteModalVisible}
        onCancel={handleDeleteCloseDeleteModal}
        onConfirm={handleConfirmDeleteContact}
      >
        <p> Esta ação não poderá ser desfeita.</p>
      </Modal>

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
              Clique no botão
              {' '}
              <strong>”Novo contato”</strong>
              {' '}
              à cima
              para cadastrar o seu primeiro!
            </p>
          </EmptyListContainer>
        )}

        {(!!contacts.length && !filteredContacts?.length) && (
          <SearchNotFoundContainer>
            <img src={IconMagnifierQuestion} alt="Lupa" />

            <span>
              Nenhum resultado foi encontrado para
              {' '}
              <strong>
                ”
                {searchTerm}
                ”
              </strong>
              .
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
                {contact?.category?.name && <small>{contact?.category?.name}</small>}
              </div>

              <span>{contact?.email}</span>
              <span>{contact?.phone}</span>
            </div>

            <div className="actions">
              <Link to={'/edit/' + contact.id}>
                <img src={IconEdit} alt="Edit" />
              </Link>

              <button type="button" onClick={() => handleDeleteContact(contact)}>
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
