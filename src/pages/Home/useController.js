import {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import contactsService from '../../services/contactsService';
import toast from '../../utils/toast';

export default function useController() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [contactBeingDeleted, setContactBeingDeleted] = useState(null);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const filteredContacts = useMemo(() => contacts?.filter((contact) => (
    contact?.name.toLowerCase().includes(searchTerm.toLowerCase())
  )), [contacts, searchTerm]);

  const loadContacts = useCallback(() => {
    setHasError(false);
    setIsLoading(true);

    contactsService.listContacts(orderBy)
      .then(setContacts)
      .catch(() => {
        setHasError(true);
        setContacts([]);
      })
      .finally(setIsLoading);
  }, [orderBy]);

  useEffect(() => loadContacts(), [loadContacts]);

  function handleToggleOrderBy() {
    setOrderBy((prevOrderBy) => (prevOrderBy === 'asc' ? 'desc' : 'asc'));
  }

  function handleSearchTerm(event) {
    setSearchTerm(event.target.value);
  }

  function handleDeleteContact(contact) {
    setIsDeleteModalVisible(true);
    setContactBeingDeleted(contact);
  }

  function handleDeleteCloseDeleteModal() {
    setIsDeleteModalVisible(false);
  }

  async function handleConfirmDeleteContact() {
    try {
      setIsLoadingDelete(true);

      await contactsService.deleteContact(contactBeingDeleted.id);

      handleDeleteCloseDeleteModal();

      setContacts((prevContacts) => (
        prevContacts.filter((contact) => contact.id !== contactBeingDeleted.id)
      ));

      toast({
        type: 'success',
        title: 'Contato deletado com sucesso!',
        text: `O contato ”${contactBeingDeleted?.name}” foi removido com sucesso!`,
      });
    } catch {
      toast({
        type: 'danger',
        title: 'Ocorreu um erro ao deletar o contato!',
        text: `O contato ”${contactBeingDeleted?.name}” não foi removido. Tente novamente mais tarde.`,
      });
    } finally {
      setIsLoadingDelete(false);
    }
  }

  return {
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
  };
}
