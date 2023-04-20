import { useState } from 'react';

export default function useErrors() {
  const [erros, setErros] = useState({});

  function setError({ field, message }) {
    setErros((prevErros) => ({ ...prevErros, [field]: message }));
  }

  return [erros, setError];
}
