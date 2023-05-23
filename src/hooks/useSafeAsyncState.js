import { useCallback, useState } from 'react';
import useIsMounted from './useIsMounted';

export default function useSafeAsyncState(initialState) {
  const [state, setState] = useState(initialState);

  const isMounted = useIsMounted();

  const setSafeAsyncState = useCallback((data) => {
    if (!isMounted()) return;
    setState(data);
  }, [isMounted]);

  return [state, setSafeAsyncState];
}
