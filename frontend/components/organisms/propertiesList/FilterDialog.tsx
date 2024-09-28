"use client";

import FilterButtons from "@/components/molecules/propertiesList/FilterButtons";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  areaOptions,
  kitchenPeopleOptions,
  monthOptions,
  sharePeopleOptions,
  statusOptions,
  zoneOptions,
} from "@/utlis/commonOptions";
import { createQueryString } from "@/utlis/queryStringHelper";
import { LucideListFilter } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

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
  const [errorMessage, setErrorMessage] = useState("");

  const handleQueryUpdate = (key: string, value: string) => {
    let updatedSearchParams = createQueryString(searchParams, key, value);
    updatedSearchParams = createQueryString(updatedSearchParams, "page", "1"); // ページをリセット

    router.push(`${pathname}?${updatedSearchParams}`);
  };
  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setMinPrice(newValue);
    handleQueryUpdate("minPrice", newValue);
  };
  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setMaxPrice(newValue);
    handleQueryUpdate("maxPrice", newValue);
  };

  const validatePrice = (price: string) => {
    if (price === "") return true;
    const valuePrice: number = parseInt(price);
    return !isNaN(valuePrice) && valuePrice >= 0 && valuePrice < 10000;
  };

  const handleSubmit = () => {
    // //validation for 家賃
    // if (!validatePrice(minPrice)) {
    //   setErrorMessage("最小価格は0以上9999未満でなければなりません。");
    //   return;
    // }
    // if (!validatePrice(maxPrice)) {
    //   setErrorMessage("最大価格は0以上9999未満でなければなりません。");
    //   return;
    // }

    // if (minPrice && maxPrice && parseInt(minPrice) > parseInt(maxPrice)) {
    //   setErrorMessage("最大金額は最小金額以下でなければいけません。");
    //   return;
    // }

    // // Query
    // let updatedSearchParams = createQueryString(
    //   searchParams,
    //   "minPrice",
    //   minPrice || ""
    // );
    // updatedSearchParams = createQueryString(
    //   updatedSearchParams,
    //   "maxPrice",
    //   maxPrice || ""
    // );

    // // reset the page query to 1
    // updatedSearchParams = createQueryString(updatedSearchParams, "page", "1");

    // router.push(pathname + "?" + updatedSearchParams);

    // setMinPrice("");
    // setMaxPrice("");
    setOpen(false);
    // setErrorMessage("");
  };

  const handleDiscard = () => {
    router.push(pathname);
    setOpen(false);
    setErrorMessage("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <LucideListFilter className="iconLabelItem" />
          フィルター
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>フィルター</DialogTitle>
          <DialogDescription>
            フィルターをしたい項目を入力し、保存ボタンを押してください。
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-6">
          <div className="">
            <Label htmlFor="rent" className="text-right">
              家賃
            </Label>
            <div className="flex flex-col">
              {errorMessage && (
                <p className="text-red-500 text-sm">{errorMessage}</p>
              )}
              <div className="flex items-center gap-2">
                <Input
                  id="minPrice"
                  type="number"
                  value={minPrice}
                  onChange={handleMinPriceChange}
                  placeholder="最小金額"
                  className="min-w-24"
                />
                <p> 〜 </p>
                <Input
                  id="maxPrice"
                  type="number"
                  value={maxPrice}
                  onChange={handleMaxPriceChange}
                  placeholder="最高金額"
                  className="min-w-24"
                />
              </div>
            </div>
          </div>

          {/* Filter */}
          <div className="flex flex-col gap-2">
            <p>ゾーン</p>
            <FilterButtons options={zoneOptions} queryKey="zone" />
          </div>

          <div className="flex flex-col gap-2">
            <p>エリア</p>
            <FilterButtons options={areaOptions} queryKey="area" />
          </div>

          <div className="flex flex-col gap-2">
            <p>住居状況</p>
            <FilterButtons options={statusOptions} queryKey="status" />
          </div>

          {/* <div className="flex flex-col gap-2">
            <p>住居人の性別</p>
            <FilterButtons options={genderOptions} queryKey="gender" />
          </div> */}

          {/* <div className="flex flex-col gap-2">
            <p>最寄駅からの時間</p>
            <FilterButtons options={timeOptions} queryKey="stationTime" />
          </div> */}

          <div className="flex flex-col gap-2">
            <p>ミニマムステイ</p>
            <FilterButtons options={monthOptions} queryKey="minMonth" />
          </div>

          <div className="flex flex-col gap-2">
            <p>物件のシェア人数</p>
            <FilterButtons
              options={sharePeopleOptions}
              queryKey="sharePeople"
            />
          </div>

          <div className="flex flex-col gap-2">
            <p>バスルームのシェア人数</p>
            <FilterButtons options={sharePeopleOptions} queryKey="bathPeople" />
          </div>

          <div className="flex flex-col gap-2">
            <p>キッチンのシェア人数</p>
            <FilterButtons
              options={kitchenPeopleOptions}
              queryKey="kitchenPeople"
            />
          </div>
        </div>
        <DialogFooter>
          <div className="flex gap-2 mt-2">
            <Button variant="destructive" type="button" onClick={handleDiscard}>
              変更を破棄
            </Button>

            <Button variant="secondary" type="button" onClick={handleSubmit}>
              {filteredPropertiesNumbers} 件表示
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
