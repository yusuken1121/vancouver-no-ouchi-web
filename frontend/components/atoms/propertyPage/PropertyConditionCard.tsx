import { FC } from "react";

type PropertyConditionCardProps = {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: any;
};

const PropertyConditionCard: FC<PropertyConditionCardProps> = ({
  icon: Icon,
  label,
  value,
}) => {
  return (
    <div className="flex items-center gap-2 px-3 py-2 min-h-24 border border-slate-200 rounded-md">
      <Icon className="flex items-center justify-center" />
      <div className="flex flex-col items-center justify-center w-full">
        <p className="font-bold text-slate-500">{label}</p>
        <p>{value}</p>
      </div>
    </div>
  );
};

export default PropertyConditionCard;
