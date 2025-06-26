import type { JSX } from 'react';
import PlanetInfo from '../../components/planetInfo';
import type { UpdatedFields } from '../../features/characters/updatedCharacterSlice';
import React from 'react';
import {
  UserIcon,
  EyeIcon,
  RulerIcon,
  WeightIcon,
  CalendarIcon,
  PaletteIcon,
  SparklesIcon,
} from 'lucide-react';

// Icon mapping for better UX
const ICONS: Record<string, JSX.Element> = {
  'Skin Color': <PaletteIcon className="w-4 h-4 text-gray-400 mr-1" />,
  'Hair Color': <SparklesIcon className="w-4 h-4 text-gray-400 mr-1" />,
  'Eye Color': <EyeIcon className="w-4 h-4 text-gray-400 mr-1" />,
  Gender: <UserIcon className="w-4 h-4 text-gray-400 mr-1" />,
  'Birth Year': <CalendarIcon className="w-4 h-4 text-gray-400 mr-1" />,
  Height: <RulerIcon className="w-4 h-4 text-gray-400 mr-1" />,
  Mass: <WeightIcon className="w-4 h-4 text-gray-400 mr-1" />,
};

type CharacterDataDisplayProps = {
  updatableData: UpdatedFields;
  homeworldUrl: string;
};

const CharacterDataDisplay: React.FC<CharacterDataDisplayProps> = ({
  updatableData,
  homeworldUrl,
}) => {
  const { birth_year, skin_color, eye_color, gender, hair_color, height, mass } = updatableData;
  const rows: { label: string; value: string | number | JSX.Element | null }[] = [
    { label: 'Skin Color', value: skin_color || 'Unknown' },
    { label: 'Hair Color', value: hair_color || 'Unknown' },
    { label: 'Eye Color', value: eye_color || 'Unknown' },
    { label: 'Gender', value: gender || 'Unknown' },
    { label: 'Birth Year', value: birth_year || 'Unknown' },
    { label: 'Height', value: height ? `${height} cm` : 'Unknown' },
    { label: 'Mass', value: mass ? `${mass} kg` : 'Unknown' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 mb-8">
      <dl className="space-y-2">
        {rows.map((row) => (
          <div
            data-testid="character-property"
            key={row.label}
            className="flex flex-col"
            aria-label={`${row.label}: ${row.value}`}
          >
            <dt className="text-sm text-gray-400 flex items-center">
              {ICONS[row.label]} {row.label}
            </dt>
            <dd className="text-base font-medium text-white">{row.value}</dd>
          </div>
        ))}
      </dl>
      <br />
      <PlanetInfo planetUrl={homeworldUrl} variant="detail" />
    </div>
  );
};

export default React.memo(CharacterDataDisplay);
