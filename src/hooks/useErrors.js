import { useCallback, useState } from 'react';

export default function useErrors() {
  const [erros, setErros] = useState({});

  const setError = useCallback(({ field, message }) => {
    setErros((prevErros) => ({ ...prevErros, [field]: message }));
  }, []);

  return [erros, setError];
}
