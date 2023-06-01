import propTypes from 'prop-types';

import Loader from '../../components/Loader';
import ContactForm from '../../components/ContactForm';
import PageHeader from '../../components/PageHeader';

export default function Presentation({
  isLoading, contactName, contactFormRef, onSubmit,
}) {
  return (
    <>
      <Loader isLoading={isLoading} />
      <PageHeader title={isLoading ? 'Carregando...' : `Editar ${contactName}`} />
      <ContactForm ref={contactFormRef} buttonLabel="Salvar Alterações" onSubmit={onSubmit} />
    </>
  );
}

Presentation.propTypes = {
  onSubmit: propTypes.func.isRequired,
  isLoading: propTypes.bool.isRequired,
  contactName: propTypes.string.isRequired,
  contactFormRef: propTypes.shape().isRequired,
};
