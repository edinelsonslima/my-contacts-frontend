import { toast } from '@edinelsonslima/toast-notification';
import { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import useSafeAsyncAction from '../../hooks/useSafeAsyncAction';

import ContactsService from '../../services/contactsService';

export default function Container({ children }) {
  const params = useParams();
  const history = useHistory();
  const contactFormRef = useRef(null);

  const [isLoading, setIsLoading] = useState(true);
  const [contactName, setContactName] = useState('');

  const safeAsyncAction = useSafeAsyncAction();

  useEffect(() => {
    async function loaderContact() {
      try {
        setIsLoading(true);

        const contact = await ContactsService.getContactById(params.id);

        safeAsyncAction(() => {
          contactFormRef.current.setFieldsValues(contact);
          setContactName(contact.name);
          setIsLoading(false);
        });
      } catch {
        safeAsyncAction(() => {
          history.push('/');
          toast.error({ content: 'Contato não encontrado!' });
        });
      }
    }

    loaderContact();
  }, [history, params.id, safeAsyncAction]);

  async function handleSubmit(contact) {
    try {
      const contactData = await ContactsService.updateContact(
        params.id,
        contact,
      );
      setContactName(contactData.name);

      toast.success({ content: 'Contato editado com sucesso!' });
    } catch {
      toast.error({ content: 'Ocorreu um erro ao editar o contato!' });
    }
  }

  return children.bind(this, {
    isLoading,
    handleSubmit,
    contactName,
    contactFormRef,
  })();
}
