import { FloatingInput, FloatingLabel } from "@/components/ui/floatingInput";
import { cn } from "@/lib/utils";

type FilterRangeInputProps = {
  minValue: string;
  maxValue: string;
  errorMessage?: { min: string; max: string };
  onMinValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onMaxValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string; // ラベル（例: "家賃", "人数" など）
  unit: string; // 単位 (例："円" "人"など)
  minPlaceholder?: string; // 最小値入力のプレースホルダー
  maxPlaceholder?: string; // 最大値入力のプレースホµルダー
};

export const FilterRangeInput = ({
  minValue,
  maxValue,
  errorMessage,
  onMinValueChange,
  onMaxValueChange,
  label,
  unit,
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
        <div className="flex  gap-2">
          {/* 最小値の入力フィールド */}
          <div className="flex flex-col items-start justify-evenly gap-1">
            <div className="flex items-center gap-1">
              <div className="relative">
                <FloatingInput
                  id={`${label}-1`}
                  type="number"
                  value={minValue}
                  onChange={onMinValueChange}
                  onWheel={disableScroll}
                  autoComplete="off"
                  className={cn(
                    "min-w-24 text-black",
                    errorMessage?.min && "border-red-500 text-red-500"
                  )}
                />
                <FloatingLabel
                  htmlFor={`${label}-1`}
                  className={cn(errorMessage?.min && " text-red-500")}
                >
                  {minPlaceholder}
                </FloatingLabel>
              </div>
              <p className="text-xs">{unit}</p>
            </div>
            {(errorMessage?.min || errorMessage?.max) && (
              <p className="text-red-500 text-xs h-5">{errorMessage.min}</p>
            )}
          </div>

          <div className="relative top-2 w-6">
            <p>〜</p>
          </div>

          {/* 最大値の入力フィールド */}
          <div className="flex flex-col items-start gap-1">
            <div className="flex items-center gap-1">
              <div className="relative">
                <FloatingInput
                  id={`${label}-2`}
                  type="number"
                  value={maxValue}
                  onChange={onMaxValueChange}
                  onWheel={disableScroll}
                  autoComplete="off"
                  className={cn(
                    "min-w-24",
                    errorMessage?.max && "border-red-500 text-red-500"
                  )}
                />
                <FloatingLabel
                  htmlFor={`${label}-2`}
                  className={cn(errorMessage?.max && " text-red-500")}
                >
                  {maxPlaceholder}
                </FloatingLabel>
              </div>
              <p className="text-xs">{unit}</p>
            </div>
            {(errorMessage?.max || errorMessage?.min) && (
              <p className="text-red-500 text-xs h-5">{errorMessage.max}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
