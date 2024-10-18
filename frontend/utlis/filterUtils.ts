import { PropertyData } from "@/types/notionTypes";
import { getPropertyValue } from "./getPropertyValue";
import { stationOptions } from "./commonOptions";

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

export function matchKeyword(property: PropertyData, keyword: string) {
  const title = getPropertyValue(property.タイトル, "title") || "";
  const station = getPropertyValue(property.最寄り駅, "select") || "";
  const zone = getPropertyValue(property.ゾーン, "select") || "";
  const status = getPropertyValue(property.ステータス, "status") || "";
  const area = getPropertyValue(property.エリア, "select") || "";

  let searchAry = [title, station, zone, status, area].map(
    (field) => field.replace(/\s+/g, "") // 文字の中間にある空白の削除
  );

  const isMatch = searchAry.some((item) =>
    item
      .toLowerCase()
      .includes(keyword.trim().toLowerCase().replace(/\s+/g, ""))
  );

  return isMatch;
}

// function katakanaToHiragana(src: string) {
//   return src.replace(/[\u30a1-\u30f6]/g, function (match) {
//     const chr = match.charCodeAt(0) - 0x60;
//     return String.fromCharCode(chr);
//   });
// }

// function hiraganaToKatakana(src: string) {
//   return src.replace(/[\u3041-\u3096]/g, function (match) {
//     const chr = match.charCodeAt(0) + 0x60;
//     return String.fromCharCode(chr);
//   });
// }

// function escapeRegExp(string: string) {
//   return string.replace(/[.*+\-?^${}()|[\]\\]/g, "\\$&");
// }

// function generateFuzzyRegExp(searchWord: string) {
//   searchWord = escapeRegExp(searchWord);
//   const chars = searchWord.split("").map((char) => {
//     const hiragana = katakanaToHiragana(char);
//     const katakana = this.hiraganaToKatakana(char);
//     if (hiragana === katakana) return char;
//     return `(${hiragana}|${katakana})`;
//   });
//   const fuzzyRegExp = new RegExp(`(${chars.join("")})`, "ig");
//   return fuzzyRegExp;
// }

// 最寄駅フィルター
export function matchStation(
  params: string | undefined,
  property: PropertyData
) {
  const paramsArray = params ? params.split("%") : [];
  if (paramsArray.length === 0) return true; //　クエリがないとき

  // label ➡️ value（stationOptions）　に変換
  // label (Commercial - broadway) ➡️ value (Commercial-broadway)
  const stationLabel = getPropertyValue(property.最寄り駅, "select");

  const stationValue = stationOptions.find(
    (station) =>
      station.label.toLocaleLowerCase() === stationLabel.toLowerCase()
  )?.value;

  if (!stationValue) return false;

  return paramsArray.includes(stationValue);
  // return true;
}
