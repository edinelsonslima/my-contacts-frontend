import {
  forwardRef, useEffect, useReducer, useState, useImperativeHandle,
} from 'react';
import propTypes from 'prop-types';

import isEmailValid from '../../utils/isEmailValid';
import formatPhone from '../../utils/formatPhone';

import useErrors from '../../hooks/useErrors';
import useSafeAsyncState from '../../hooks/useSafeAsyncState';

import FormGroup from '../FormGroup';
import Input from '../Input';
import Select from '../Select';
import Button from '../Button';

import { Form, ButtonContainer } from './styles';
import categoriesService from '../../services/categoriesService';

function reducerInputs(state, { name, value }) {
  return { ...state, [name]: value };
}

const initialInputsState = {
  name: '',
  email: '',
  phone: '',
  categoryId: '',
};

// eslint-disable-next-line react/display-name
const ContactForm = forwardRef(({ buttonLabel, onSubmit }, ref) => {
  const [inputs, dispatchInputs] = useReducer(reducerInputs, initialInputsState);
  const [erros, setError] = useErrors();
  const [categories, setCategories] = useSafeAsyncState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingCategories, setIsLoadingCategories] = useSafeAsyncState(true);

  const isFormValid = (inputs.name && !Object.values(erros).some((err) => err));

  useImperativeHandle(ref, () => ({
    setFieldsValues: (contact) => Object
      .keys(initialInputsState)
      .forEach((name) => {
        dispatchInputs({
          name,
          value: (name === 'phone'
            ? formatPhone(contact[name])
            : contact[name]) ?? '',
        });
      }),

    resetFields: () => Object
      .keys(initialInputsState)
      .forEach((name) => dispatchInputs({ name, value: '' })),
  }), []);

  useEffect(() => {
    setIsLoadingCategories(true);
    categoriesService.listCategories()
      .then(setCategories)
      .catch(Error)
      .finally(setIsLoadingCategories);
  }, [setCategories, setIsLoadingCategories]);

  function handleSelectChange(evt) {
    const { name, value } = evt.target;
    dispatchInputs({ name, value });
  }

  function handleNameChange(evt) {
    const { name, value } = evt.target;
    dispatchInputs({ name, value });

    if (!value.trim()) {
      setError({ field: name, message: 'Nome é obrigatório.' });
    } else {
      setError({ field: name, message: '' });
    }
  }

  function handleEmailChange(evt) {
    const { name, value } = evt.target;
    dispatchInputs({ name, value });

    if (value && !isEmailValid(value)) {
      setError({ field: name, message: 'E-mail é inválido.' });
    } else {
      setError({ field: name, message: '' });
    }
  }

  function handlePhoneChange(evt) {
    const { name, value } = evt.target;
    const formattedPhone = formatPhone(value);
    dispatchInputs({ name, value: formattedPhone });
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    setIsSubmitting(true);

    await onSubmit({ ...inputs });

    setIsSubmitting(false);
  }

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
          <option value="">Sem categoria</option>
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
