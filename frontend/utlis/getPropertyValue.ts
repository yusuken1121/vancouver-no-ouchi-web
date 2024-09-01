export const getPropertyValue = (
  property: any,
  type: string,
  unitType?: "people" | "dollar"
): any => {
  let value = null;

  // 例外
  // 男性・女性限定
  if (type === "対象") {
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
      value = property?.checkbox ? "○" : "×";
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
