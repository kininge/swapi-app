import React from 'react';
import CharacterList from '../../components/characterList';
import { useSearchCharacters } from '../../hooks/useSearchCharacters';

const SearchPage: React.FC = () => {
  const { query, characters, isLoading, error, handleInputChange } = useSearchCharacters();

  // const [query, setQuery] = useState('');
  // const dispatch = useAppDispatch();
  // const characters: CHARACTER[] = useAppSelector((state) => state.searchedCharacters.list);
  // const status = useAppSelector((state) => state.searchedCharacters.status);
  // const error = useAppSelector((state) => state.searchedCharacters.error);
  // const isLoading = status == 'loading';

  // // debounced search
  // const debouncedSearch = useRef(
  //   debounce((value: string) => {
  //     dispatch(fetchSearchedCharacters(value.trim()));
  //   }, 300)
  // ).current;

  // // user input in search
  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value;
  //   setQuery(value); // to show data in search
  //   debouncedSearch(value.trim());
  // };

  // // component unmount
  // useEffect(() => {
  //   return () => {
  //     dispatch(resetSearchedCharacterSlice());
  //     debouncedSearch.cancel();
  //   };
  // }, []);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search by name..."
        className="w-full px-4 py-2 outline-none border border-theme-border focus:ring-2 focus:ring-theme-primary bg-theme-background text-white mb-4 rounded-3xl"
      />

      <CharacterList
        characters={characters}
        isLoading={isLoading}
        isIdle={query.trim() === ''}
        error={error}
        noCharacterMessage={`No character found for "${query.trim()}"`}
        canLoadMore={false}
        onLoadMore={() => {}}
      />
    </div>
  );
};

export default SearchPage;
