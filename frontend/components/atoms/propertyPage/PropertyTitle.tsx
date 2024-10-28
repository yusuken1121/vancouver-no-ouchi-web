"use client";

import { Copy } from "lucide-react";
import React, { FC } from "react";
import { toast } from "sonner";

type PropertyTitleProps = {
  title: string | null;
  rent: number | null;
};
const PropertyTitle: FC<PropertyTitleProps> = ({ title, rent }) => {
  const handleClickCopy = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      toast.success("URLのコピーをしました。", { position: "top-right" });
    } catch (error) {
      toast.error("URLのコピーに失敗しました。", { position: "top-right" });
    }
  };
  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-2xl">{title}</h1>
      {/* <p className="text-2xl">${rent}/月</p> */}
      <Copy onClick={handleClickCopy} className="text-themeColor mr-2" />
    </div>
  );
};

export default PropertyTitle;
