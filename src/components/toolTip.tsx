type TOOLTIP_PROP = {
  tip: string;
  children?: React.ReactNode;
};

const ToolTip: React.FC<TOOLTIP_PROP> = ({ tip, children }) => (
  <div className={`relative group inline-block`}>
    {children}
    <div className="absolute left-1/2 -translate-x-1/2 -top-7 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap">
      {tip}
    </div>
  </div>
);

export default ToolTip;
