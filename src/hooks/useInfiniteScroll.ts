import { useEffect, useRef, useState } from 'react';
import debounce from 'lodash.debounce';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import type { RootState } from '../store/store';

interface UseInfiniteScrollProps {
  fetchFn: (page: number) => any; // RTK thunk action
  selectStatus: (state: RootState) => 'idle' | 'loading' | 'succeeded' | 'failed';
  selectNext: (state: RootState) => string | null;
  resetFn?: () => any;
  debounceMs?: number;
}

export const useInfiniteScroll = ({
  fetchFn,
  selectStatus,
  selectNext,
  resetFn,
  debounceMs = 100,
}: UseInfiniteScrollProps) => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectStatus);
  const next = useAppSelector(selectNext);

  const [page, setPage] = useState(1);

  const debouncedFetch = useRef(
    debounce((pageNum: number) => {
      dispatch(fetchFn(pageNum));
    }, debounceMs)
  ).current;

  // Initial load
  useEffect(() => {
    if (status === 'idle' && next === null) {
      debouncedFetch(1);
    }

    // clear the garbage
    return () => {
      if (resetFn) dispatch(resetFn());
      debouncedFetch.cancel();
    };
  }, []);

  // Subsequent pages
  useEffect(() => {
    if (status !== 'idle' && next) {
      debouncedFetch(page);
    }
  }, [page]);

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  const shouldLoadMore = status !== 'loading' && !!next;

  return {
    page,
    status,
    loadMore,
    shouldLoadMore,
  };
};
