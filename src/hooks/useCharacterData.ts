import { useParams, useLocation } from 'react-router-dom';
import { useGetCharacterByIdQuery } from '../features/characters/characterApi';
import { useAppSelector } from '../store/hooks';
import type { CHARACTER } from '../types';
import type { UpdatedFields } from '../features/characters/updatedCharacterSlice';

export const useCharacterData = () => {
  const { id } = useParams();
  const location = useLocation();

  // priority 1: passed as prop
  const characterFromState: CHARACTER | undefined = (location.state as { character?: CHARACTER })
    ?.character;
  const fetchById: boolean = characterFromState === undefined;

  // priority 2: fetch character by id
  const {
    data: fetchedCharacter,
    isLoading,
    isError,
  } = useGetCharacterByIdQuery(id!, {
    skip: !fetchById, // do not call if you already get by props
  });

  // get character either from props or fetch by id
  const character = characterFromState || fetchedCharacter;

  // updated character data ---> there no api to update - we cached the update
  const updated: UpdatedFields = useAppSelector((state) => {
    if (!character) return {};
    return state.updatedCharacter.updatedCharactersById[character.uid];
  });

  // character data and updated character data combined to show update data
  const latestCharacter: UpdatedFields = {
    ...character?.properties,
    ...updated,
  };

  return {
    character,
    latestCharacter,
    isLoading,
    isError,
  };
};
