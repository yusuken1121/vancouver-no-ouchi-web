"use client";

import FilterCheckboxButtons from "@/components/molecules/propertiesList/FilterCheckboxButtons";
import { FilterRangeInput } from "@/components/molecules/propertiesList/FilterInput";
import { FilterRadioBoxes } from "@/components/molecules/propertiesList/FilterRadioBoxes";
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
  statusOptions,
  zoneOptions,
} from "@/config/commonOptions";
import {
  monthSchema,
  peopleSchema,
  priceSchema,
  stationTimeSchema,
} from "@/types/filterTypesSchema";
import { createQueryString } from "@/utlis/queryStringHelper";
import { SlidersHorizontal } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SetStateAction, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

import { z } from "zod";

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
  const [priceError, setPriceError] = useState({ min: "", max: "" });

  const [minSharePeople, setMinSharePeople] = useState("");
  const [maxSharePeople, setMaxSharePeople] = useState("");
  const [sharePeopleError, setSharePeopleError] = useState({
    min: "",
    max: "",
  });

  const [minKitchenPeople, setMinKitchenPeople] = useState("");
  const [maxKitchenPeople, setMaxKitchenPeople] = useState("");
  const [kitchenPeopleError, setKitchenPeopleError] = useState({
    min: "",
    max: "",
  });

  const [minBathPeople, setMinBathPeople] = useState("");
  const [maxBathPeople, setMaxBathPeople] = useState("");
  const [bathPeopleError, setBathPeopleError] = useState({ min: "", max: "" });

  const [minMonth, setMinMonth] = useState("");
  const [maxMonth, setMaxMonth] = useState("");
  const [monthError, setMonthError] = useState({ min: "", max: "" });

  const [minStationTime, setMinStationTime] = useState("");
  const [maxStationTime, setMaxStationTime] = useState("");
  const [stationTimeError, setStationTimeError] = useState({
    min: "",
    max: "",
  });

  const [date, setDate] = useState<Date | undefined>(undefined);

  const hasErrors = () => {
    return (
      priceError.min !== "" ||
      priceError.max !== "" ||
      sharePeopleError.min !== "" ||
      sharePeopleError.max !== "" ||
      kitchenPeopleError.min !== "" ||
      kitchenPeopleError.max !== "" ||
      bathPeopleError.min !== "" ||
      bathPeopleError.max !== "" ||
      monthError.min !== "" ||
      monthError.max !== "" ||
      stationTimeError.min !== "" ||
      stationTimeError.max !== ""
    );
  };

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
    setFunc: React.Dispatch<SetStateAction<string>>,
    schema: z.ZodSchema,
    setErrorFunc: (msg: string) => void
  ) => {
    const newValue = e.target.value;
    setFunc(newValue);

    const result = schema.safeParse(newValue);
    if (!result.success) {
      setErrorFunc(result.error.errors[0].message);
    } else {
      setErrorFunc("");
      handleQueryUpdate(queryKey, newValue);
    }
  };

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
    setPriceError({ min: "", max: "" });
    setSharePeopleError({ min: "", max: "" });
    setKitchenPeopleError({ min: "", max: "" });
    setBathPeopleError({ min: "", max: "" });
    setMonthError({ min: "", max: "" });
    setStationTimeError({ min: "", max: "" });
  };
  const handleDiscard = () => {
    resetFilters();
    router.push(pathname);
    setOpen(false);
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
        <Button
          variant="outline"
          className="flex items-center justify-center w-12 h-12 rounded-full font-medium hover:bg-grayThemeColor"
        >
          <SlidersHorizontal className="w-10 h-10 text-themeColor" />
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
              errorMessage={priceError}
              onMinValueChange={(e) =>
                handleChange(e, "minPrice", setMinPrice, priceSchema, (msg) =>
                  setPriceError((prev) => ({ ...prev, min: msg }))
                )
              }
              onMaxValueChange={(e) =>
                handleChange(e, "maxPrice", setMaxPrice, priceSchema, (msg) =>
                  setPriceError((prev) => ({ ...prev, max: msg }))
                )
              }
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

          {/* Range */}
          {/* ミニマムステイ */}
          <FilterRangeInput
            minValue={minMonth}
            maxValue={maxMonth}
            errorMessage={monthError}
            onMinValueChange={(e) =>
              handleChange(e, "minMonth", setMinMonth, monthSchema, (msg) =>
                setMonthError((prev) => ({ ...prev, min: msg }))
              )
            }
            onMaxValueChange={(e) =>
              handleChange(e, "maxMonth", setMaxMonth, monthSchema, (msg) =>
                setMonthError((prev) => ({ ...prev, max: msg }))
              )
            }
            label="ミニマムステイ"
            unit="ヶ月"
            minPlaceholder="最短期間"
            maxPlaceholder="最長期間"
          />

          {/* station */}
          <div className="flex flex-col gap-2">
            <p>最寄駅</p>
            <FilterRadioBoxes />
          </div>

          {/* 最寄駅からの時間 */}
          <FilterRangeInput
            minValue={minStationTime}
            maxValue={maxStationTime}
            errorMessage={stationTimeError}
            onMinValueChange={(e) =>
              handleChange(
                e,
                "minStationTime",
                setMinStationTime,
                stationTimeSchema,
                (msg) => setStationTimeError((prev) => ({ ...prev, min: msg }))
              )
            }
            onMaxValueChange={(e) =>
              handleChange(
                e,
                "maxStationTime",
                setMaxStationTime,
                stationTimeSchema,
                (msg) => setStationTimeError((prev) => ({ ...prev, max: msg }))
              )
            }
            label="最寄駅からの時間"
            unit="分"
            minPlaceholder="最短時間"
            maxPlaceholder="最長時間"
          />

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
            errorMessage={sharePeopleError}
            onMinValueChange={(e) =>
              handleChange(
                e,
                "minSharePeople",
                setMinSharePeople,
                peopleSchema,
                (msg) => setSharePeopleError((prev) => ({ ...prev, min: msg }))
              )
            }
            onMaxValueChange={(e) =>
              handleChange(
                e,
                "maxSharePeople",
                setMaxSharePeople,
                peopleSchema,
                (msg) => setSharePeopleError((prev) => ({ ...prev, max: msg }))
              )
            }
            label="物件のシェア人数"
            unit="人"
            minPlaceholder="最小人数"
            maxPlaceholder="最大人数"
          />
          <FilterRangeInput
            minValue={minKitchenPeople}
            maxValue={maxKitchenPeople}
            errorMessage={kitchenPeopleError}
            onMinValueChange={(e) =>
              handleChange(
                e,
                "minKitchenPeople",
                setMinKitchenPeople,
                peopleSchema,
                (msg) =>
                  setKitchenPeopleError((prev) => ({ ...prev, min: msg }))
              )
            }
            onMaxValueChange={(e) =>
              handleChange(
                e,
                "maxKitchenPeople",
                setMaxKitchenPeople,
                peopleSchema,
                (msg) =>
                  setKitchenPeopleError((prev) => ({ ...prev, max: msg }))
              )
            }
            label="キッチンのシェア人数"
            unit="人"
            minPlaceholder="最小人数"
            maxPlaceholder="最大人数"
          />
          <FilterRangeInput
            minValue={minBathPeople}
            maxValue={maxBathPeople}
            errorMessage={bathPeopleError}
            onMinValueChange={(e) =>
              handleChange(
                e,
                "minBathPeople",
                setMinBathPeople,
                peopleSchema,
                (msg) => setBathPeopleError((prev) => ({ ...prev, min: msg }))
              )
            }
            onMaxValueChange={(e) =>
              handleChange(
                e,
                "maxBathPeople",
                setMaxBathPeople,
                peopleSchema,
                (msg) => setBathPeopleError((prev) => ({ ...prev, max: msg }))
              )
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
            {filteredPropertiesNumbers === 0 || hasErrors() ? (
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
