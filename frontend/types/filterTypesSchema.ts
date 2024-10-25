import { z } from "zod";

export const priceSchema = z
  .string()
  .regex(/^\d*$/, "数値を入力してください")
  .transform((val) => (val === "" ? undefined : Number(val)))
  .refine((val) => val === undefined || (val >= 0 && val <= 9999), {
    message: "0〜9999の間で入力してください",
  });
export const peopleSchema = z
  .string()
  .regex(/^\d*$/, "数値を入力してください")
  .transform((val) => (val === "" ? undefined : Number(val)))
  .refine((val) => val === undefined || (val >= 0 && val <= 10), {
    message: "0〜10の間で入力してください",
  });
export const monthSchema = z
  .string()
  .regex(/^\d*$/, "数値を入力してください")
  .transform((val) => (val === "" ? undefined : Number(val)))
  .refine((val) => val === undefined || (val >= 1 && val <= 12), {
    message: "1〜12の間で入力してください",
  });
export const stationTimeSchema = z
  .string()
  .regex(/^\d*$/, "数値を入力してください")
  .transform((val) => (val === "" ? undefined : Number(val)))
  .refine((val) => val === undefined || (val >= 0 && val <= 60), {
    message: "0〜60の間で入力してください",
  });
