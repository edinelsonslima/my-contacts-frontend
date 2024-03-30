import propTypes from 'prop-types';
import { forwardRef } from 'react';

import Button from '../Button';
import FormGroup from '../FormGroup';
import Input from '../Input';
import Select from '../Select';

import { ButtonContainer, Form } from './styles';
import useController from './useController';

// eslint-disable-next-line react/display-name
const ContactForm = forwardRef(({ buttonLabel, onSubmit }, ref) => {
  const {
    categories,
    erros,
    handleEmailChange,
    handleNameChange,
    handlePhoneChange,
    handleSelectChange,
    handleSubmit,
    inputs,
    isFormValid,
    isLoadingCategories,
    isSubmitting,
  } = useController({ onSubmit, ref });

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <FormGroup error={erros.name}>
        <Input
          disabled={isSubmitting}
          isRequired
          name="name"
          type="text"
          placeholder="Nome *"
          error={erros.name}
          value={inputs.name}
          onChange={handleNameChange}
        />
      </FormGroup>

      <FormGroup error={erros.email}>
        <Input
          disabled={isSubmitting}
          name="email"
          type="email"
          placeholder="Email"
          error={erros.email}
          value={inputs.email}
          onChange={handleEmailChange}
        />
      </FormGroup>

      <FormGroup>
        <Input
          disabled={isSubmitting}
          type="tel"
          name="phone"
          maxLength={15}
          value={inputs.phone}
          placeholder="Telefone"
          onChange={handlePhoneChange}
        />
      </FormGroup>

      <FormGroup isLoading={isLoadingCategories}>
        <Select
          name="categoryId"
          value={inputs.categoryId}
          onChange={handleSelectChange}
          disabled={isLoadingCategories || isSubmitting}
          data-option-empty={!inputs.categoryId}
        >
          <option value="Sem categoria">Sem categoria</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
      </FormGroup>

      <ButtonContainer>
        <Button
          type="submit"
          disabled={!isFormValid}
          isLoading={isSubmitting}
        >
          {buttonLabel}
        </Button>
      </ButtonContainer>
    </Form>
  );
});

ContactForm.propTypes = {
  buttonLabel: propTypes.string.isRequired,
  onSubmit: propTypes.func.isRequired,
};

export default ContactForm;
