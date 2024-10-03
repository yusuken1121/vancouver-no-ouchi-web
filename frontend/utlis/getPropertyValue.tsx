import { DateProperty } from "@/types/notionTypes";
import { BadgeCheck, Ban, Circle, X } from "lucide-react";
export const getPropertyValue = (
  property: any, // ex) p.properties.エリア
  type: string,
  unitType?: "people" | "dollar"
): any => {
  let value: string | JSX.Element | null = null;

  // 例外
  // 男性・女性限定
  if (type === "対象") {
    value = property;
  }
  if (type === "入居日") {
    value = property;
  }

  // 通常
  switch (type) {
    case "title":
      value = property?.title?.[0]?.plain_text || null;
      break;
    case "status":
      value = property?.status?.name || null;
      break;
    case "date":
      value = property?.date?.start || null;
      break;
    case "number":
      value = property?.number || "確認中";
      break;
    case "select":
      value = property?.select?.name || "確認中";
      break;
    case "file":
      value = property?.files?.[0]?.file?.url || null;
      break;
    case "url":
      value = property?.url;
      break;
    case "checkbox":
      value = property?.checkbox ? (
        <Circle className="w-4 h-4 mt-1" />
      ) : (
        <X className="w-4 h-4 mt-1" />
      );
      break;
    case "checkbox-filter":
      value = property?.checkbox ? "true" : "false";
      break;
    case "rich_text":
      value = property?.rich_text?.[0]?.plain_text || null;
      break;
    default:
      return value;
  }

  if (value === undefined) {
    return value;
  }

  if (value && unitType) {
    switch (unitType) {
      case "people":
        value += " 人";
        break;
      case "dollar":
        value = "$ " + value;
        break;
    }
  }

  return value;
};

export const getStartDate = (
  status: string,
  MoveOutDay: DateProperty,
  MoveInDay: DateProperty
) => {
  switch (status) {
    case "入居中":
    case "成約済み":
      return (
        (
          <>
            {getPropertyValue(MoveOutDay, "date")} <br />
            (退去予定日)
          </>
        ) || null
      );
    default:
      return (
        (
          <>
            {getPropertyValue(MoveInDay, "date")} <br />
            (入居可能日)
          </>
        ) || null
      );
  }
};

export const matchParams = (
  params: string | undefined,
  property: any, // p.properties.エリア
  type: string
) => {
  const paramsArray = params ? params.split("%") : [];
  return paramsArray.length > 0
    ? paramsArray.includes(getPropertyValue(property, type))
    : true;
};
