type GENDER_INFO_PROPS = {
  gender: string;
};
const GenderInfo: React.FC<GENDER_INFO_PROPS> = ({ gender }) => {
  const config = {
    male: { symbol: '\u2642', label: 'Male', color: 'text-blue-500' },
    female: { symbol: '\u2640', label: 'Female', color: 'text-pink-500' },
  }[gender] || { symbol: '\u26B2', label: 'No Gender', color: 'text-gray-500' };

  return (
    <div className={`relative group inline-block`}>
      <span className={`text-2xl font-bold ${config.color}`}>{config.symbol}</span>
      <div className="absolute left-1/2 -translate-x-1/2 -top-7 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap">
        {config.label}
      </div>
    </div>
  );
};

export default GenderInfo;
