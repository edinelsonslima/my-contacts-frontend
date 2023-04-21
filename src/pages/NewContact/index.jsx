import ContactForm from '../../components/ContactForm';
import PageHeader from '../../components/PageHeader';
import contactsService from '../../services/contactsService';

export default function NewContact() {
  async function handleSubmit(formData) {
    try {
      const contact = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        category_id: formData.categoryId,
      };

      const response = await contactsService.createContact(contact);
      console.log(response);
    } catch {
      alert('Erro ao cadastrar contato');
    }
  }

  return (
    <>
      <PageHeader title="Novo Contato" />

      <ContactForm buttonLabel="Cadastrar" onSubmit={handleSubmit} />
    </>
  );
}
