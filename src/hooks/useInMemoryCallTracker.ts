import { useRef } from 'react';

export function useInMemoryCallTracker() {
  const callTracker = useRef<Record<string, boolean>>({});

  const hasBeenCalled = (id: string) => !!callTracker.current[id];
  const markAsCalled = (id: string) => {
    callTracker.current[id] = true;
  };

  return { hasBeenCalled, markAsCalled };
}
