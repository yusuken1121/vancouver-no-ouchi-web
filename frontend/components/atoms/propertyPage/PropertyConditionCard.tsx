import { FC } from "react";

type PropertyConditionCardProps = {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
};

const PropertyConditionCard: FC<PropertyConditionCardProps> = ({
  icon: Icon,
  label,
}) => {
  return (
    <div className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-md">
      <Icon className="flex items-center justify-center" />
      <div className="flex flex-col items-center justify-center w-full">
        <p>{label}</p>
        <p>3ヶ月</p>
      </div>
    </div>
  );
};

export default PropertyConditionCard;
