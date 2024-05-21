import EmptyList from './components/EmptyList';
import ErrorStatus from './components/ErrorStatus';
import Header from './components/Header';
import InputSearch from './components/InputSearch';
import SearchNotFound from './components/SearchNotFound';

import Loader from '../../components/Loader';

import useController from './useController';

import Modal from '../../components/Modal';
import ContactList from './components/ContactsList';

import { Container } from './styles';

export default function Home() {
  const {
    contactBeingDeleted,
    contacts,
    filteredContacts,
    handleConfirmDeleteContact,
    handleDeleteCloseDeleteModal,
    handleDeleteContact,
    handleSearchTerm,
    handleToggleOrderBy,
    hasError,
    isDeleteModalVisible,
    isLoading,
    isLoadingDelete,
    loadContacts,
    orderBy,
    searchTerm,
    isPending,
  } = useController();

  const hasContacts = !!contacts?.length;
  const isListEmpty = !hasError && !hasContacts && !isLoading;
  const isSearchEmpty = !hasError && hasContacts && !filteredContacts?.length;

  return (
    <Container>
      <Loader loading={isLoading} />

      {hasContacts && (
        <InputSearch value={searchTerm} onChange={handleSearchTerm} loading={isPending} />
      )}

      <Header
        hasError={hasError}
        qtyOfContacts={contacts?.length}
        qtyOfFilteredContacts={filteredContacts?.length}
      />

      {hasError && <ErrorStatus onTryAgain={loadContacts} />}
      {isListEmpty && <EmptyList />}
      {isSearchEmpty && <SearchNotFound searchTerm={searchTerm} />}

      {hasContacts && (
        <>
          <ContactList
            orderBy={orderBy}
            filteredContacts={filteredContacts}
            onToggleOrderBy={handleToggleOrderBy}
            onDeleteContact={handleDeleteContact}
          />

          <Modal
            danger
            confirmLabel="Deletar"
            isLoading={isLoadingDelete}
            visible={isDeleteModalVisible}
            onConfirm={handleConfirmDeleteContact}
            onCancel={handleDeleteCloseDeleteModal}
            title={`Tem certeza que deseja remover o contato ”${contactBeingDeleted?.name}”?`}
          >
            <p> Esta ação não poderá ser desfeita.</p>
          </Modal>
        </>
      )}
    </Container>
  );
}
