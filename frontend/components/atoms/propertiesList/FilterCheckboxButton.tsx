"use client";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import React, { FC, ReactNode, useEffect, useState } from "react";

type FilterCheckBoxButtonProps = {
  queryKey: string;
  icon: React.ComponentType<{ className?: string }>;
  children: ReactNode;
  className?: string;
};
const FilterCheckBoxButton: FC<FilterCheckBoxButtonProps> = ({
  children,
  className,
  queryKey,
  icon: Icon,
}) => {
  const [isFilter, setIsFilter] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  useEffect(() => {
    const currentParams = searchParams.get(queryKey);
    if (currentParams && currentParams.split("%").includes("true")) {
      setIsFilter(true);
    }
  }, [queryKey, searchParams]);
  const handleClick: () => void = () => {
    const currentParams = searchParams.get(queryKey);
    let values = currentParams ? currentParams.split("%") : [];
    let updatedSearchParam = new URLSearchParams(searchParams.toString());

    if (!isFilter) {
      if (!currentParams) {
        updatedSearchParam.set(queryKey, "true");
      } else {
        values.push("true");
        updatedSearchParam.set(queryKey, values.join("%"));
      }
    } else {
      values = values.filter((v) => v !== "true");
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
      className={clsx("flex items-center justify-between gap-2", className)}
    >
      <Icon className="w-4 h-4" />
      {children}
    </Button>
  );
};

export default FilterCheckBoxButton;
