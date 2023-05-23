import { useEffect, useState, useRef } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import toast from '../../utils/toast';

import useSafeAsyncAction from '../../hooks/useSafeAsyncAction';

import Loader from '../../components/Loader';
import ContactForm from '../../components/ContactForm';
import PageHeader from '../../components/PageHeader';
import contactsService from '../../services/contactsService';

export default function EditContact() {
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

        const contact = await contactsService.getContactById(params.id);

        safeAsyncAction(() => {
          const editedContact = {
            name: contact.name,
            email: contact.email,
            phone: contact.phone,
            categoryId: contact.category_id,
          };

          contactFormRef.current.setFieldsValues(editedContact);
          setContactName(contact.name);
          setIsLoading(false);
        });
      } catch {
        safeAsyncAction(() => {
          history.push('/');
          toast({
            type: 'danger',
            text: 'Contato não encontrado!',
          });
        });
      }
    }

    loaderContact();
  }, [history, params.id, safeAsyncAction]);

  async function handleSubmit(formData) {
    try {
      const contact = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        category_id: formData.categoryId,
      };

      const contactData = await contactsService.updateContact(params.id, contact);
      setContactName(contactData.name);

      toast({
        type: 'success',
        text: 'Contato editado com sucesso!',
      });
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao editar o contato!',
      });
    }
  }

  return (
    <>
      <Loader isLoading={isLoading} />
      <PageHeader title={isLoading ? 'Carregando...' : `Editar ${contactName}`} />
      <ContactForm ref={contactFormRef} buttonLabel="Salvar Alterações" onSubmit={handleSubmit} />
    </>
  );
}
