import { useReducer } from 'react';
import propTypes from 'prop-types';

import isEmailValid from '../../utils/isEmailValid';
import formatPhone from '../../utils/formatPhone';

import useErrors from '../../hooks/useErrors';

import FormGroup from '../FormGroup';
import Input from '../Input';
import Select from '../Select';
import Button from '../Button';

import { Form, ButtonContainer } from './styles';

function reducerInputs(state, { name, value }) {
  return { ...state, [name]: value };
}

const initialInputsState = {
  name: '',
  email: '',
  phone: '',
  category: '',
};

export default function ContactForm({ buttonLabel }) {
  const [inputs, dispatchInputs] = useReducer(reducerInputs, initialInputsState);
  const [erros, setError] = useErrors();

  const isFormValid = (inputs.name && !Object.values(erros).some((err) => err));

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

  function handleSubmit(evt) {
    evt.preventDefault();
  }

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <FormGroup error={erros.name}>
        <Input
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
          type="tel"
          name="phone"
          maxLength={15}
          value={inputs.phone}
          placeholder="Telefone"
          onChange={handlePhoneChange}
        />
      </FormGroup>

      <FormGroup>
        <Select
          name="category"
          value={inputs.category}
          onChange={handleSelectChange}
        >
          <option value="instagram">Instagram</option>
          <option value="whatsapp">whatsapp</option>
          <option value="facebook">facebook</option>
          <option value="twitter">twitter</option>
        </Select>
      </FormGroup>

      <ButtonContainer>
        <Button type="submit" disabled={!isFormValid}>{buttonLabel}</Button>
      </ButtonContainer>
    </Form>
  );
}

ContactForm.propTypes = {
  buttonLabel: propTypes.string.isRequired,
};
