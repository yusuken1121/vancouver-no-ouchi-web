"use client";

import FilterCheckboxButtons from "@/components/molecules/propertiesList/FilterCheckboxButtons";
import { FilterRangeInput } from "@/components/molecules/propertiesList/FilterInput";
import FilterSelectButtons from "@/components/molecules/propertiesList/FilterSelectButtons";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  areaOptions,
  checkboxFacilityOptions,
  checkboxGenderOptions,
  monthOptions,
  statusOptions,
  zoneOptions,
} from "@/utlis/commonOptions";
import { createQueryString } from "@/utlis/queryStringHelper";
import { LucideListFilter } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SetStateAction, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

type FilterDialogProps = {
  filteredPropertiesNumbers: number;
};
export function FilterDialog({ filteredPropertiesNumbers }: FilterDialogProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [open, setOpen] = useState<boolean>(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minSharePeople, setMinSharePeople] = useState<string>("");
  const [maxSharePeople, setMaxSharePeople] = useState<string>("");
  const [minKitchenPeople, setMinKitchenPeople] = useState<string>("");
  const [maxKitchenPeople, setMaxKitchenPeople] = useState<string>("");
  const [minBathPeople, setMinBathPeople] = useState<string>("");
  const [maxBathPeople, setMaxBathPeople] = useState<string>("");
  const [minMonth, setMinMonth] = useState<string>("");
  const [maxMonth, setMaxMonth] = useState<string>("");

  const [date, setDate] = useState<Date | undefined>(undefined);

  const [errorMessage, setErrorMessage] = useState("");

  const handleQueryUpdate = useDebouncedCallback(
    (key: string, value: string) => {
      switch (
        key // ミニマムステイのみ例外処理
      ) {
        case "minMonth":
        case "maxMonth":
          if (value) value = value + "ヶ月";
      }

      let updatedSearchParams = createQueryString(searchParams, key, value);
      updatedSearchParams = createQueryString(updatedSearchParams, "page", "1"); // ページをリセット

      router.push(`${pathname}?${updatedSearchParams}`);
    },
    300
  );

  // レンジが決まっているフィルター向けの関数
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    queryKey: string,
    setFunc: React.Dispatch<SetStateAction<string>>
  ) => {
    const newValue = e.target.value;
    setFunc(newValue);
    handleQueryUpdate(queryKey, newValue);
  };

  // const validatePrice = (price: string) => {
  //   if (price === "") return true;
  //   const valuePrice: number = parseInt(price);
  //   return !isNaN(valuePrice) && valuePrice >= 0 && valuePrice < 10000;
  // };

  // Apply for the filter
  const handleSubmit = () => {
    setOpen(false);
  };

  // Discard for the filter
  const resetFilters = () => {
    setMinPrice("");
    setMaxPrice("");
    setMinSharePeople("");
    setMaxSharePeople("");
    setMinKitchenPeople("");
    setMaxKitchenPeople("");
    setMinBathPeople("");
    setMaxBathPeople("");
    setMinMonth("");
    setMaxMonth("");
    setDate(undefined);
    setErrorMessage("");
  };
  const handleDiscard = () => {
    resetFilters();
    router.push(pathname);
    setOpen(false);
    setErrorMessage("");
  };

  // Calendar
  // 今日の日付を取得して時間をクリア
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // カレンダーの選択を処理する関数
  const handleOnChangeCalendar = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (selectedDate) {
      const formattedDate = formatDateToYMD(selectedDate);
      handleQueryUpdate("moveInDate", formattedDate);
    } else {
      handleQueryUpdate("moveInDate", ""); // 日付が選択されていない場合、クエリをクリア
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          フィルター
          <LucideListFilter className="iconLabelItem" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>フィルター</DialogTitle>
          <DialogDescription>
            フィルターをしたい項目を入力し、保存ボタンを押してください。
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-10">
          <div className="">
            {/* Filter */}
            {/* 家賃 */}
            <FilterRangeInput
              minValue={minPrice}
              maxValue={maxPrice}
              errorMessage={errorMessage}
              onMinValueChange={(e) => handleChange(e, "minPrice", setMinPrice)}
              onMaxValueChange={(e) => handleChange(e, "maxPrice", setMaxPrice)}
              label="家賃"
              unit="$"
              minPlaceholder="最小金額"
              maxPlaceholder="最大金額"
            />
          </div>

          {/* button */}
          <div className="flex flex-col gap-2">
            <p>ゾーン</p>
            <FilterSelectButtons options={zoneOptions} queryKey="zone" />
          </div>

          <div className="flex flex-col gap-2">
            <p>エリア</p>
            <FilterSelectButtons options={areaOptions} queryKey="area" />
          </div>

          <div className="flex flex-col gap-2">
            <p>住居状況</p>
            <FilterSelectButtons options={statusOptions} queryKey="status" />
          </div>

          {/* <div className="flex flex-col gap-2">
            <p>住居人の性別</p>
            <FilterSelectButtons options={genderOptions} queryKey="gender" />
          </div> */}

          {/* <div className="flex flex-col gap-2">
            <p>最寄駅からの時間</p>
            <FilterSelectButtons options={timeOptions} queryKey="stationTime" />
          </div> */}

          {/* Range */}
          {/* ミニマムステイ */}
          <FilterRangeInput
            minValue={minMonth}
            maxValue={maxMonth}
            errorMessage={errorMessage}
            onMinValueChange={(e) => handleChange(e, "minMonth", setMinMonth)}
            onMaxValueChange={(e) => handleChange(e, "maxMonth", setMaxMonth)}
            label="ミニマムステイ"
            unit="ヶ月"
            minPlaceholder="最短の期間"
            maxPlaceholder="最長の期間"
          />
          {/* <div className="flex flex-col gap-2">
            <p>ミニマムステイ</p>
            <FilterSelectButtons options={monthOptions} queryKey="minMonth" />
          </div> */}

          {/* Calendar */}
          <div className="flex flex-col gap-2">
            <p>入居予定日</p>
            <Calendar
              mode="single"
              selected={date}
              onSelect={(date) => handleOnChangeCalendar(date)}
              disabled={(date) => date < today}
            />
          </div>

          <FilterRangeInput
            minValue={minSharePeople}
            maxValue={maxSharePeople}
            errorMessage={errorMessage}
            onMinValueChange={(e) =>
              handleChange(e, "minSharePeople", setMinSharePeople)
            }
            onMaxValueChange={(e) =>
              handleChange(e, "maxSharePeople", setMaxSharePeople)
            }
            label="物件のシェア人数"
            unit="人"
            minPlaceholder="最小人数"
            maxPlaceholder="最大人数"
          />
          <FilterRangeInput
            minValue={minKitchenPeople}
            maxValue={maxKitchenPeople}
            errorMessage={errorMessage}
            onMinValueChange={(e) =>
              handleChange(e, "minKitchenPeople", setMinKitchenPeople)
            }
            onMaxValueChange={(e) =>
              handleChange(e, "maxKitchenPeople", setMaxKitchenPeople)
            }
            label="キッチンのシェア人数"
            unit="人"
            minPlaceholder="最小人数"
            maxPlaceholder="最大人数"
          />
          <FilterRangeInput
            minValue={minBathPeople}
            maxValue={maxBathPeople}
            errorMessage={errorMessage}
            onMinValueChange={(e) =>
              handleChange(e, "minBathPeople", setMinBathPeople)
            }
            onMaxValueChange={(e) =>
              handleChange(e, "maxBathPeople", setMaxBathPeople)
            }
            label="バスルームのシェア人数"
            unit="人"
            minPlaceholder="最小人数"
            maxPlaceholder="最大人数"
          />

          {/* checkbox */}
          <div className="flex flex-col gap-2">
            <p>設備条件</p>
            <FilterCheckboxButtons options={checkboxFacilityOptions} />
          </div>

          <div className="flex flex-col gap-2">
            <p>入居条件</p>
            <FilterCheckboxButtons options={checkboxGenderOptions} />
          </div>
        </div>
        <DialogFooter className="sticky bottom-0 flex items-center justify-center w-full py-2 bg-opacity-90 bg-white z-50">
          <div className="flex gap-2 mt-2">
            <Button variant="destructive" type="button" onClick={handleDiscard}>
              変更を破棄
            </Button>

            {filteredPropertiesNumbers === 0 ? (
              <Button
                variant="default"
                disabled
                type="button"
                onClick={handleSubmit}
              >
                {filteredPropertiesNumbers} 件表示
              </Button>
            ) : (
              <Button variant="default" type="button" onClick={handleSubmit}>
                {filteredPropertiesNumbers} 件表示
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// 日付を YYYY-MM-DD 形式にフォーマットする関数
export const formatDateToYMD = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
