import { useCallback } from 'react';

import useIsMounted from './useIsMounted';

export default function useSafeAsyncAction() {
  const isMounted = useIsMounted();

  const runSafeAsyncAction = useCallback((callback) => {
    if (!isMounted()) return;
    callback();
  }, [isMounted]);

  return runSafeAsyncAction;
}
