import ToolTip from './toolTip';

type GENDER_INFO_PROPS = {
  gender: string;
};
const GenderInfo: React.FC<GENDER_INFO_PROPS> = ({ gender }) => {
  const config = {
    male: { symbol: '\u2642', label: 'Male', color: 'text-blue-500' },
    female: { symbol: '\u2640', label: 'Female', color: 'text-pink-500' },
  }[gender] || { symbol: '\u26B2', label: 'No Gender', color: 'text-gray-500' };

  return (
    <ToolTip tip={config.label}>
      <span data-testid="character-gender" className={`text-2xl font-bold ${config.color}`}>
        {config.symbol}
      </span>
    </ToolTip>
  );
};

export default GenderInfo;
