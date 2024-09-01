import { PropertyData } from "@/types/notionTypes";
import { BadgeDollarSign, BanknoteIcon, CurrencyIcon } from "lucide-react";
import {
  Calendar,
  Image,
  CheckSquare,
  DollarSign,
  MapPin,
  User,
  Lock,
  Map,
  Users,
  Phone,
  Key,
  Wifi,
  Sun,
  Thermometer,
  Airplay,
  FileText,
} from "lucide-react";
type optionType = {
  label: string;
  value: string;
};

export const sortOptions: optionType[] = [
  { label: "金額：高い順", value: "金額：高い順" },
  { label: "金額：低い順", value: "金額：低い順" },
];

export const zoneOptions: optionType[] = [
  { label: "未選択", value: "未選択" },
  { label: "ゾーン1", value: "Zone1" },
  { label: "ゾーン2", value: "Zone2" },
  { label: "ゾーン3", value: "Zone3" },
];
export const areaOptions: optionType[] = [
  { label: "未選択", value: "未選択" },
  { label: "ダウンタウン", value: "ダウンタウン" },
  { label: "イーストバンクーバー", value: "イーストバンクーバー" },
  { label: "ウェストバンクーバー", value: "ウェストバンクーバー" },
  { label: "ノースバンクーバー", value: "ノースバンクーバー" },
  { label: "サウスバンクーバー", value: "サウスバンクーバー" },
  { label: "リッチモンド", value: "リッチモンド" },
  { label: "バーナビー", value: "バーナビー" },
];

export const propertyTabsOptions: optionType[] = [
  {
    value: "basic",
    label: "基本情報",
  },
  {
    value: "room_facilities",
    label: "部屋設備",
  },
  {
    value: "shared_facilities",
    label: "共有設備",
  },
  {
    value: "occupancy_conditions",
    label: "入居条件",
  },
];

export type PropertyConditionOptionsType = {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
};

export const propertyConditionOptions: {
  [key: string]: PropertyConditionOptionsType;
} = {
  入居可能日: {
    icon: Calendar,
    label: "入居可能日",
  },
  物件写真: {
    icon: Image,
    label: "物件写真",
  },
  サウナ: {
    icon: Thermometer,
    label: "サウナ",
  },
  ミニマムステイ: {
    icon: Calendar,
    label: "ミニマムステイ",
  },
  バスルームのシェア人数: {
    icon: Users,
    label: "バスルームのシェア人数",
  },
  家賃: {
    icon: DollarSign,
    label: "家賃",
  },
  ステータス: {
    icon: CheckSquare,
    label: "ステータス",
  },
  カップル可: {
    icon: User,
    label: "カップル可",
  },
  デポジット: {
    icon: DollarSign,
    label: "デポジット",
  },
  お問い合わせフォーム: {
    icon: Phone,
    label: "お問い合わせフォーム",
  },
  最寄り駅: {
    icon: MapPin,
    label: "最寄り駅",
  },
  住居人の性別: {
    icon: User,
    label: "住居人の性別",
  },
  鍵付き: {
    icon: Lock,
    label: "鍵付き",
  },
  エリア: {
    icon: Map,
    label: "エリア",
  },
  管理会社: {
    icon: Users,
    label: "管理会社",
  },
  住居人の国籍: {
    icon: User,
    label: "住居人の国籍",
  },
  対象: {
    icon: User,
    label: "対象",
  },
  スタッフからのコメント: {
    icon: FileText,
    label: "スタッフからのコメント",
  },
  プール: {
    icon: Sun,
    label: "プール",
  },
  退去予定日: {
    icon: Calendar,
    label: "退去予定日",
  },
  Wifi込み: {
    icon: Wifi,
    label: "Wifi込み",
  },
  光熱費込み: {
    icon: Airplay,
    label: "光熱費込み",
  },
  最寄り駅まで: {
    icon: MapPin,
    label: "最寄り駅まで",
  },
  キッチンのシェア人数: {
    icon: Users,
    label: "キッチンのシェア人数",
  },
  顧客データ: {
    icon: Users,
    label: "顧客データ",
  },
  ランドリー無料: {
    icon: CheckSquare,
    label: "ランドリー無料",
  },
  ジム: {
    icon: Sun,
    label: "ジム",
  },
  住所: {
    icon: MapPin,
    label: "住所",
  },
  サムネイル: {
    icon: Image,
    label: "サムネイル",
  },
  ゾーン: {
    icon: Map,
    label: "ゾーン",
  },
  物件のシェア人数: {
    icon: Users,
    label: "物件のシェア人数",
  },
  タイトル: {
    icon: FileText,
    label: "タイトル",
  },
  利用料: {
    icon: DollarSign,
    label: "利用料",
  },
};

// export const zoneAreaOptions = [{ zone1: ["ダウンタウン"] }];
