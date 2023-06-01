import PageHeader from '../../components/PageHeader';
import ContactForm from '../../components/ContactForm';

import useController from './useController';

export default function NewContact() {
  const { contactFormRef, handleSubmit } = useController();

  return (
    <>
      <PageHeader title="Novo Contato" />
      <ContactForm
        ref={contactFormRef}
        buttonLabel="Cadastrar"
        onSubmit={handleSubmit}
      />
    </>
  );
}
