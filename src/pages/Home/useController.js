import { toast } from '@edinelsonslima/toast-notification';
import {
  useCallback, useEffect, useMemo, useState, useTransition,
} from 'react';
import contactsService from '../../services/contactsService';

export default function useController() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [contactBeingDeleted, setContactBeingDeleted] = useState(null);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [searchTerm, setSearchTerm] = useState('');
  const [deferredSearchTerm, setDeferredSearchTerm] = useState('');

  const filteredContacts = useMemo(() => contacts?.filter((contact) => (
    contact?.name.toLowerCase().includes(deferredSearchTerm.toLowerCase())
  )), [contacts, deferredSearchTerm]);

  const loadContacts = useCallback((signal) => {
    setHasError(false);
    setIsLoading(true);

    contactsService
      .listContacts(orderBy, signal)
      .then((data) => {
        setContacts(data);
        setIsLoading(false);
      })
      .catch((error) => {
        if (error instanceof DOMException && error.name === 'AbortError') return;

        setHasError(true);
        setIsLoading(false);
        setContacts([]);
      });
  }, [orderBy]);

  useEffect(() => {
    const controller = new AbortController();

    loadContacts(controller.signal);

    return () => {
      controller.abort();
    };
  }, [loadContacts]);

  const handleToggleOrderBy = useCallback(() => {
    setOrderBy((prevOrderBy) => (prevOrderBy === 'asc' ? 'desc' : 'asc'));
  }, []);

  function handleSearchTerm(event) {
    const { value } = event.target;
    setSearchTerm(value);
    startTransition(() => setDeferredSearchTerm(value));
  }

  const handleDeleteContact = useCallback((contact) => {
    setIsDeleteModalVisible(true);
    setContactBeingDeleted(contact);
  }, []);

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

      toast.success({ content: `O contato ”${contactBeingDeleted?.name}” foi removido com sucesso!` });
    } catch {
      toast.error({ content: `O contato ”${contactBeingDeleted?.name}” não foi removido. Tente novamente mais tarde.` });
    } finally {
      setIsLoadingDelete(false);
    }
  }

  return {
    isPending,
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
