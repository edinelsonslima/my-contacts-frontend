import {
  useEffect, useImperativeHandle, useReducer, useState,
} from 'react';

import useErrors from '../../hooks/useErrors';
import useSafeAsyncState from '../../hooks/useSafeAsyncState';

import CategoriesService from '../../services/categoriesService';

import isEmailValid from '../../utils/isEmailValid';
import formatPhone from '../../utils/formatPhone';

function reducerInputs(state, { name, value }) {
  return { ...state, [name]: value };
}

const initialInputsState = {
  name: '', email: '', phone: '', categoryId: '',
};

export default function useController({ onSubmit, ref }) {
  const [inputs, dispatchInputs] = useReducer(reducerInputs, initialInputsState);
  const [erros, setError] = useErrors();
  const [categories, setCategories] = useSafeAsyncState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingCategories, setIsLoadingCategories] = useSafeAsyncState(true);

  const isFormValid = (inputs.name && !Object.values(erros).some((err) => err));

  useImperativeHandle(ref, () => ({
    setFieldsValues: (contact) => ({
      name: dispatchInputs({ name: 'name', value: contact.name }),
      email: dispatchInputs({ name: 'email', value: contact.email }),
      categoryId: dispatchInputs({ name: 'categoryId', value: contact.category.id }),
      phone: dispatchInputs({ name: 'phone', value: formatPhone(contact.phone) }),
    }),

    resetFields: () => ({
      name: dispatchInputs({ name: 'name', value: '' }),
      email: dispatchInputs({ name: 'email', value: '' }),
      phone: dispatchInputs({ name: 'phone', value: '' }),
      categoryId: dispatchInputs({ name: 'categoryId', value: '' }),
    }),
  }), []);

  useEffect(() => {
    setIsLoadingCategories(true);
    CategoriesService.listCategories()
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

  return {
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
  };
}
