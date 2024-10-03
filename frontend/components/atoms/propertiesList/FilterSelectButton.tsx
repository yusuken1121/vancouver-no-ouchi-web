"use client";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import React, { FC, ReactNode, useEffect, useState } from "react";

type FilterSelectButtonProps = {
  queryKey: string;
  queryValue: string;
  children: ReactNode;
  className?: string;
};
const FilterSelectButton: FC<FilterSelectButtonProps> = ({
  children,
  className,
  queryKey,
  queryValue,
}) => {
  const [isFilter, setIsFilter] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  useEffect(() => {
    const currentParams = searchParams.get(queryKey);
    if (currentParams && currentParams.split("%").includes(queryValue)) {
      setIsFilter(true);
    }
  }, [queryKey, queryValue, searchParams]);
  const handleClick: () => void = () => {
    const currentParams = searchParams.get(queryKey);
    let values = currentParams ? currentParams.split("%") : [];
    let updatedSearchParam = new URLSearchParams(searchParams.toString());

    if (!isFilter) {
      if (!currentParams) {
        updatedSearchParam.set(queryKey, queryValue);
      } else {
        values.push(queryValue);
        updatedSearchParam.set(queryKey, values.join("%"));
      }
    } else {
      values = values.filter((v) => v !== queryValue);
      if (values.length > 0) {
        updatedSearchParam.set(queryKey, values.join("%"));
      } else {
        updatedSearchParam.delete(queryKey);
      }
    }

    setIsFilter((prev) => !prev);
    router.push(
      `${pathname}?${decodeURIComponent(updatedSearchParam.toString())}` // preventing from displaying "%25" using decodeURIComponent
    );
  };
  return (
    <Button
      variant={isFilter ? "default" : "outline"}
      aria-pressed={isFilter}
      onClick={handleClick}
      className={clsx("flex items-center gap-2", className)}
    >
      {children}
    </Button>
  );
};

export default FilterSelectButton;
