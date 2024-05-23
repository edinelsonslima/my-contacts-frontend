import { toast } from '@edinelsonslima/toast-notification';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import useSafeAsyncAction from '../../hooks/useSafeAsyncAction';

import ContactsService from '../../services/contactsService';

export default function Container({ children }) {
  const params = useParams();
  const navigate = useNavigate();
  const contactFormRef = useRef(null);

  const [isLoading, setIsLoading] = useState(true);
  const [contactName, setContactName] = useState('');

  const safeAsyncAction = useSafeAsyncAction();

  useEffect(() => {
    const controller = new AbortController();
    setIsLoading(true);

    ContactsService.getContactById(params.id, controller.signal)
      .then((contact) => {
        safeAsyncAction(() => {
          contactFormRef.current.setFieldsValues(contact);
          setContactName(contact.name);
          setIsLoading(false);
        });
      })
      .catch((error) => {
        if (error instanceof DOMException && error.name === 'AbortError') return;

        safeAsyncAction(() => {
          setIsLoading(false);
          navigate('/', { replace: true });
          toast.error({ content: 'Contato não encontrado!' });
        });
      });

    return () => {
      controller.abort();
    };
  }, [navigate, params.id, safeAsyncAction]);

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
