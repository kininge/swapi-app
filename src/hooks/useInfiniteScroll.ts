// src/shared/hooks/useInfiniteScroll.ts
import { useEffect, type RefObject, useRef } from 'react';

export function useInfiniteScroll<T extends HTMLElement>(
  ref: RefObject<T | null>,
  callback: () => void,
  delay = 500 // ms debounce between triggers
) {
  const lastCalled = useRef(0);

  useEffect(() => {
    if (!ref || !ref.current) return;
    const node = ref.current;

    const observer = new IntersectionObserver(([entry]) => {
      const now = Date.now();
      const timePassed = now - lastCalled.current;
      if (entry.isIntersecting && timePassed > delay) {
        lastCalled.current = now;
        callback();
      }
    });

    observer.observe(node);
    return () => {
      if (node) observer.unobserve(node);
    };
  }, [ref, callback, delay]);
}
