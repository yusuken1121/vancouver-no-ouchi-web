import { PrimarySelect } from "@/components/atoms/common/PrimarySelect";
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
import { areaOptions, zoneOptions } from "@/utlis/commonOptions";
import { LucideListFilter } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export function FilterDialog() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [open, setOpen] = useState<boolean>(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [zone, setZone] = useState("");
  const [area, setArea] = useState("");

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setMinPrice(newValue);
  };
  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setMaxPrice(newValue);
  };

  const handleSubmit = () => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    // reset the previous query string
    router.push(pathname);
    console.log("pathname: ", pathname);

    if (minPrice) newSearchParams.set("minPrice", minPrice);
    if (maxPrice) newSearchParams.set("maxPrice", maxPrice);
    if (zone) {
      newSearchParams.set("zone", zone);
    }
    if (area) newSearchParams.set("area", area);

    router.push(pathname + "?" + newSearchParams.toString());

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <LucideListFilter className="iconLabelItem" />
          フィルター
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
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
            <div className="flex items-center gap-2">
              <Input
                id="minPrice"
                value={minPrice}
                onChange={handleMinPriceChange}
                placeholder="最小金額"
                className="min-w-24"
              />
              <p> 〜 </p>
              <Input
                id="maxPrice"
                value={maxPrice}
                onChange={handleMaxPriceChange}
                placeholder="最高金額"
                className="min-w-24"
              />
            </div>
          </div>
          <div className="">
            <Label htmlFor="zone" className="text-right">
              ゾーン
            </Label>
            <PrimarySelect
              placeholder="選択してください"
              handleChange={(value) => {
                if (value === "未選択") {
                  setZone("");
                } else {
                  setZone(value);
                }
              }}
              selectItems={zoneOptions}
              labelName="選択してください"
            />
          </div>
          <div>
            <Label htmlFor="area" className="text-right">
              エリア
            </Label>
            <PrimarySelect
              placeholder="選択してください"
              handleChange={(value) => {
                if (value === "未選択") {
                  setArea("");
                } else {
                  setArea(value);
                }
              }}
              selectItems={areaOptions}
              labelName=""
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleSubmit}>
            保存
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
