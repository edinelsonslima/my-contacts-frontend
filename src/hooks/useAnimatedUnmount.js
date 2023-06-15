import { useEffect, useRef, useState } from 'react';

export default function useAnimatedUnmount(visible) {
  const animatedElementRef = useRef(null);
  const [shouldRender, setShouldRender] = useState(visible);

  useEffect(() => {
    if (visible) return setShouldRender(true);

    const elementRef = animatedElementRef.current;

    function handleAnimationEnd() {
      setShouldRender(false);
    }

    if (!visible) {
      elementRef?.addEventListener('animationend', handleAnimationEnd);
    }

    return () => {
      elementRef?.removeEventListener('animationend', handleAnimationEnd);
    };
  }, [visible]);

  return { animatedElementRef, shouldRender };
}
