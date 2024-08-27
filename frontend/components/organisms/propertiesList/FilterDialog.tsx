import { PrimarySelect } from "@/components/atoms/PrimarySelect";
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
import { Select } from "@radix-ui/react-select";
import { LucideListFilter } from "lucide-react";

export function FilterDialog() {
  return (
    <Dialog>
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
                value="" // e渡す
                placeholder="最小金額"
                className="min-w-24"
              />
              <p> 〜 </p>
              <Input
                id="maxPrice"
                value=""
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
              handleChange={() => {}}
              selectItems={zoneOptions}
              labelName=""
            />
          </div>
          <div>
            <Label htmlFor="area" className="text-right">
              エリア
            </Label>
            <PrimarySelect
              placeholder="選択してください"
              handleChange={() => {}}
              selectItems={areaOptions}
              labelName=""
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">保存</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
