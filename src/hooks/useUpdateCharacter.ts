import { useState } from 'react';
import { useAppDispatch } from '../store/hooks';
import { setUpdatedCharacter } from '../features/characters/updatedCharacterSlice';
import type { UpdatedFields } from '../features/characters/updatedCharacterSlice';
import type { CHARACTER } from '../types';

export const useUpdateCharacter = (
  character: CHARACTER | undefined,
  latestCharacter: UpdatedFields
) => {
  const dispatch = useAppDispatch();
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [updatedCharacter, setLocalUpdatedCharacter] = useState({
    gender: latestCharacter.gender || '',
    height: latestCharacter.height || '',
    mass: latestCharacter.mass || '',
    hair_color: latestCharacter.hair_color || '',
    eye_color: latestCharacter.eye_color || '',
    skin_color: latestCharacter.skin_color || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLocalUpdatedCharacter((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!character) return;
    dispatch(setUpdatedCharacter({ uid: character.uid, changes: updatedCharacter }));
    setIsUpdating(false);
  };

  const handleCancel = () => {
    setLocalUpdatedCharacter({
      gender: latestCharacter.gender || '',
      height: latestCharacter.height || '',
      mass: latestCharacter.mass || '',
      hair_color: latestCharacter.hair_color || '',
      eye_color: latestCharacter.eye_color || '',
      skin_color: latestCharacter.eye_color || '',
    });
    setIsUpdating(false);
  };

  return {
    isUpdating,
    setIsUpdating,
    updatedCharacter,
    handleChange,
    handleSave,
    handleCancel,
  };
};
