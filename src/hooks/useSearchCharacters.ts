import { useState, useEffect, useRef } from 'react';
import debounce from 'lodash.debounce';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  fetchSearchedCharacters,
  resetSearchedCharacterSlice,
} from '../features/characters/searchSlice';

export function useSearchCharacters() {
  const dispatch = useAppDispatch();

  const [query, setQuery] = useState('');

  const characters = useAppSelector((state) => state.searchedCharacters.list);
  const status = useAppSelector((state) => state.searchedCharacters.status);
  const error = useAppSelector((state) => state.searchedCharacters.error);
  const isLoading = status === 'loading';

  const debouncedSearch = useRef(
    debounce((value: string) => {
      dispatch(fetchSearchedCharacters(value));
    }, 300)
  ).current;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value.trim());
  };

  useEffect(() => {
    return () => {
      dispatch(resetSearchedCharacterSlice());
      debouncedSearch.cancel();
    };
  }, []);

  return {
    query,
    characters,
    status,
    error,
    isLoading,
    handleInputChange,
  };
}
