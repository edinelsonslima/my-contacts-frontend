import { toast } from '@edinelsonslima/toast-notification';
import { useRef } from 'react';
import contactsService from '../../services/contactsService';

export default function useController() {
  const contactFormRef = useRef(null);

  async function handleSubmit(contact) {
    try {
      await contactsService.createContact(contact);

      contactFormRef.current.resetFields();

      toast.success({ content: 'Contato cadastrado com sucesso!' });
    } catch {
      toast.error({ content: 'Ocorreu um erro ao cadastrar o contato!' });
    }
  }

  return {
    contactFormRef,
    handleSubmit,
  };
}
