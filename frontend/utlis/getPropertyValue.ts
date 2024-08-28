export const getPropertyValue = (property: any, type: string): any => {
  switch (type) {
    case "title":
      return property?.title?.[0]?.plain_text || null;
    case "status":
      return property?.status?.name || null;
    case "date":
      return property?.date?.start || null;
    case "number":
      return property?.number || "確認中";
    case "select":
      return property?.select?.name || null;
    case "file":
      return property?.files?.[0]?.file?.url || null;
    default:
      return null;
  }
};
