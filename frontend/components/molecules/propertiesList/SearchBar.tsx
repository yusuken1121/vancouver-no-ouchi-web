"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { CircleX, TextSearch } from "lucide-react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createQueryString } from "@/utlis/queryStringHelper";
import { toast } from "sonner";

const SearchBar = () => {
  const [keyword, setKeyword] = useState<string>("");
  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSearch = () => {
    const trimmedKeyword = keyword.trim();

    if (keyword.length > 0 && !trimmedKeyword) {
      toast.error("空白のみの入力では検索できません。", {
        icon: <CircleX className="w-4 h-4 text-red-600" />,
      });
      return;
    }
    let updatedSearchParams = createQueryString(
      searchParams,
      "keyword",
      keyword
    );
    router.push(`${pathname}?${updatedSearchParams}`);
  };
  return (
    <div className="relative w-[200px] max-w-sm">
      <Input
        type="search"
        placeholder="検索..."
        className="w-full pr-12 text-xs" // 右側にアイコン分の余白を確保
        value={keyword}
        onChange={(e) => handleKeywordChange(e)}
      />
      <Button
        type="button"
        variant="outline"
        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 bg-themeColor hover:bg-lightThemeColor flex items-center justify-center rounded-full"
        onClick={handleSearch}
      >
        <TextSearch className="w-6 h-6 text-white shrink-0" />
      </Button>
    </div>
  );
};

export default SearchBar;
