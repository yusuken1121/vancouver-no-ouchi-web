import { FloatingInput, FloatingLabel } from "@/components/ui/floatingInput";

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
  const disableScroll = (e: React.WheelEvent<HTMLInputElement>) => {
    e.currentTarget.blur(); // 一時的にフォーカスを外す
  };

  return (
    <div className="flex flex-col gap-2">
      <p>{label}</p>
      <div className="flex flex-col">
        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <div className="relative">
              <FloatingInput
                id={`${label}-1`}
                type="number"
                value={minValue}
                onChange={onMinValueChange}
                // placeholder={degree}
                onWheel={disableScroll}
                autoComplete="off"
                className="min-w-24"
              />
              <FloatingLabel htmlFor={`${label}-1`}>
                {minPlaceholder}
              </FloatingLabel>
            </div>
            <p>{degree}</p>
          </div>
          <p> 〜 </p>
          <div className="flex items-center gap-1">
            <div className="relative">
              <FloatingInput
                id={`${label}-2`}
                type="number"
                value={maxValue}
                onChange={onMaxValueChange}
                // placeholder={degree}
                autoComplete="off"
                onWheel={disableScroll}
                className="min-w-24"
              />
              <FloatingLabel htmlFor={`${label}-2`}>
                {maxPlaceholder}
              </FloatingLabel>
            </div>
            <p>{degree}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
