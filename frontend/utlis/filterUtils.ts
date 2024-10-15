// 共通のフィルタリング関数　（下限と上限が決まっている項目用）
export function isNumberWithinRange(
  value: number,
  min?: string,
  max?: string
): boolean {
  const parsedMin = min ? parseFloat(min) : null;
  const parsedMax = max ? parseFloat(max) : null;

  const isAboveMin = parsedMin !== null ? value >= parsedMin : true;
  const isBelowMax = parsedMax !== null ? value <= parsedMax : true;

  return isAboveMin && isBelowMax;
}
// 共通のフィルタリング関数　（下限と上限が決まっている項目かつ単位がついているもの）
export function isUnitValueWithinRange(
  unit: string, // ヶ月 etc..
  value: string,
  min?: string,
  max?: string
): boolean {
  const extractNumber = (value: string) =>
    parseInt(toHalfWidth(value.replace(unit, "")));
  const parsedValue = extractNumber(value);
  const parsedMin = min ? extractNumber(min) : null;
  const parsedMax = max ? extractNumber(max) : null;

  const isAboveMin = parsedMin !== null ? parsedValue >= parsedMin : true;
  const isBelowMax = parsedMax !== null ? parsedValue <= parsedMax : true;

  return isAboveMin && isBelowMax;
}

export function toHalfWidth(str: string): string {
  // 全角英数字を半角に変換
  str = str.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (s) {
    return String.fromCharCode(s.charCodeAt(0) - 0xfee0);
  });
  return str;
}

//　カレンダーの関数
export function isAfterMoveInDate(
  propertyDate: string, // 入居日 || 退去日
  moveInDate: string | undefined // 入居希望日
) {
  if (!propertyDate || !moveInDate) return true;

  const propertyMoveDate = new Date(propertyDate);
  const moveInDateFilter = new Date(moveInDate);

  return propertyMoveDate <= moveInDateFilter;
}
