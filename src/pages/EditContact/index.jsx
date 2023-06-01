/* eslint-disable object-curly-newline */
import Container from './Container';
import Presentation from './Presentation';

export default function EditContact() {
  return (
    <Container>
      {({ isLoading, handleSubmit, contactName, contactFormRef }) => (
        <Presentation
          isLoading={isLoading}
          onSubmit={handleSubmit}
          contactName={contactName}
          contactFormRef={contactFormRef}
        />
      )}
    </Container>
  );
}
