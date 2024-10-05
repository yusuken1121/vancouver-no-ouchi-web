import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type FilterRangeInputProps = {
  minValue: string;
  maxValue: string;
  errorMessage?: string;
  onMinValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onMaxValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string; // ラベル（例: "家賃", "人数" など）
  degree: string; // 単位 (例："円" "人"など)
  minPlaceholder?: string; // 最小値入力のプレースホルダー
  maxPlaceholder?: string; // 最大値入力のプレースホルダー
};

export const FilterRangeInput = ({
  minValue,
  maxValue,
  errorMessage,
  onMinValueChange,
  onMaxValueChange,
  label,
  degree,
  minPlaceholder = "最小値",
  maxPlaceholder = "最大値",
}: FilterRangeInputProps) => {
  return (
    <div className="flex flex-col gap-2">
      <p>{label}</p>
      <div className="flex flex-col">
        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Input
              id="minValue"
              type="number"
              value={minValue}
              onChange={onMinValueChange}
              placeholder={minPlaceholder}
              className="min-w-24"
            />
            <p>{degree}</p>
          </div>
          <p> 〜 </p>
          <div className="flex items-center gap-1">
            <Input
              id="maxValue"
              type="number"
              value={maxValue}
              onChange={onMaxValueChange}
              placeholder={maxPlaceholder}
              className="min-w-24"
            />
            <p>{degree}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
