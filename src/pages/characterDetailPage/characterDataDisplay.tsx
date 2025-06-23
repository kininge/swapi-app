import type { JSX } from 'react';
import PlanetInfo from '../../components/planetInfo';
import type { EditedFields } from '../../features/characters/editedCharacterSlice';
import React from 'react';

type CharacterDataDisplayProps = {
  editableData: EditedFields;
  homeworldUrl: string;
};

const CharacterDataDisplay: React.FC<CharacterDataDisplayProps> = ({
  editableData,
  homeworldUrl,
}) => {
  const { birth_year, skin_color, eye_color, gender, hair_color, height, mass } = editableData;
  const rows: { label: string; value: string | number | JSX.Element | null }[] = [
    { label: 'Skin Color', value: skin_color || 'Unknown' },
    { label: 'Hair Color', value: hair_color || 'Unknown' },
    { label: 'Eye Color', value: eye_color || 'Unknown' },
    { label: 'Gender', value: gender || 'Unknown' },
    { label: 'Birth Year', value: birth_year || 'Unknown' },
    { label: 'Height', value: height ? `${height} cm` : 'Unknown' },
    { label: 'Mass', value: mass ? `${mass} kg` : 'Unknown' },
    { label: 'Homeworld', value: <PlanetInfo planetUrl={homeworldUrl} /> },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 mb-8">
      {rows.map((row) => (
        <div key={row.label} className="flex flex-col">
          <span className="text-sm text-gray-400">{row.label}</span>
          <span className="text-base font-medium text-white">{row.value}</span>
        </div>
      ))}
    </div>
  );
};

export default React.memo(CharacterDataDisplay);
