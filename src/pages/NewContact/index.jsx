import ContactForm from '../../components/ContactForm';
import PageHeader from '../../components/PageHeader';
import contactsService from '../../services/contactsService';

export default function NewContact() {
  function handleSubmit(formData) {
    const contact = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      category_id: formData.categoryId,
    };

    contactsService.createContact(contact)
      .then(console.log)
      .catch(() => alert('Ocorreu um erro ao cadastrar o contato. Tente novamente.'))
      .finally();
  }

  return (
    <>
      <PageHeader title="Novo Contato" />

      <ContactForm buttonLabel="Cadastrar" onSubmit={handleSubmit} />
    </>
  );
}
