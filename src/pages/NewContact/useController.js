import { useRef } from 'react';
import contactsService from '../../services/contactsService';
import toast from '../../utils/toast';

export default function useController() {
  const contactFormRef = useRef(null);

  async function handleSubmit(contact) {
    try {
      await contactsService.createContact(contact);

      contactFormRef.current.resetFields();

      toast({
        type: 'success',
        text: 'Contato cadastrado com sucesso!',
      });
    } catch {
      toast({
        text: 'Ocorreu um erro ao cadastrar o contato!',
        type: 'danger',
      });
    }
  }

  return {
    contactFormRef,
    handleSubmit,
  };
}
