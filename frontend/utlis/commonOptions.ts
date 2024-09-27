import {
  BadgeDollarSign,
  BathIcon,
  BookHeart,
  Dumbbell,
  Heart,
  Lightbulb,
  TrainFront,
  Utensils,
  WashingMachine,
  Waves,
} from "lucide-react";
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
  Wifi,
  Thermometer,
  FileText,
} from "lucide-react";
export type optionType = {
  label: string;
  value: string;
};

export const sortOptions: optionType[] = [
  { label: "金額：高い順", value: "金額：高い順" },
  { label: "金額：低い順", value: "金額：低い順" },
];

// filter
export const zoneOptions: optionType[] = [
  { label: "ゾーン1", value: "Zone1" },
  { label: "ゾーン2", value: "Zone2" },
  { label: "ゾーン3", value: "Zone3" },
];
export const areaOptions: optionType[] = [
  { label: "ダウンタウン", value: "ダウンタウン" },
  { label: "イーストバンクーバー", value: "イーストバンクーバー" },
  { label: "ウェストバンクーバー", value: "ウェストバンクーバー" },
  { label: "ノースバンクーバー", value: "ノースバンクーバー" },
  { label: "サウスバンクーバー", value: "サウスバンクーバー" },
  { label: "リッチモンド", value: "リッチモンド" },
  { label: "バーナビー", value: "バーナビー" },
];

export const statusOptions: optionType[] = [
  {
    label: "入居中",
    value: "入居中",
  },
  {
    label: "即入居可能",
    value: "即入居可能",
  },
  {
    label: "入居者募集中",
    value: "入居者募集中",
  },
  // {
  //   label: "成約済み",
  //   value: "成約済み",
  // },
  // {
  //   label: "休止中",
  //   value: "休止中",
  // },
];

export const genderOptions: optionType[] = [
  {
    label: "男性",
    value: "男性",
  },
  {
    label: "女性",
    value: "女性",
  },
  // {
  //   label: "不明",
  //   value: "不明",
  // },
  {
    label: "カップル",
    value: "カップル",
  },
];

export const timeOptions: optionType[] = [
  { label: "5分", value: "5分" },
  { label: "10分", value: "10分" },
  { label: "15分", value: "15分" },
  { label: "20分", value: "20分" },
  { label: "25分", value: "25分" },
  { label: "30分", value: "30分" },
  { label: "35分", value: "35分" },
  { label: "40分", value: "40分" },
  { label: "45分", value: "45分" },
  { label: "50分", value: "50分" },
  { label: "55分", value: "55分" },
  { label: "60分", value: "60分" },
];

export const monthOptions: optionType[] = [
  { label: "1ヶ月", value: "1ヶ月" },
  { label: "2ヶ月", value: "2ヶ月" },
  { label: "3ヶ月", value: "3ヶ月" },
  { label: "4ヶ月", value: "4ヶ月" },
  { label: "5ヶ月", value: "5ヶ月" },
  { label: "6ヶ月", value: "6ヶ月" },
  { label: "7ヶ月", value: "7ヶ月" },
  { label: "8ヶ月", value: "8ヶ月" },
  { label: "9ヶ月", value: "9ヶ月" },
  { label: "10ヶ月", value: "10ヶ月" },
  { label: "11ヶ月", value: "11ヶ月" },
  { label: "12ヶ月", value: "12ヶ月" },
];

export const sharePeopleOptions: optionType[] = [
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" },
  { label: "5", value: "5" },
  { label: "6", value: "6" },
  { label: "7", value: "7" },
  { label: "8", value: "8" },
  { label: "9", value: "9" },
  { label: "10", value: "10" },
];

export const bathPeopleOptions: optionType[] = [
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" },
  { label: "5", value: "5" },
  { label: "6", value: "6" },
  { label: "7", value: "7" },
  { label: "8", value: "8" },
  { label: "9", value: "9" },
  { label: "10", value: "10" },
];

export const kitchenPeopleOptions: optionType[] = [
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" },
  { label: "5", value: "5" },
  { label: "6", value: "6" },
  { label: "7", value: "7" },
  { label: "8", value: "8" },
  { label: "9", value: "9" },
  { label: "10", value: "10" },
];

// PropertyPage tabs
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
  key: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  type: string;
  unitType?: "people" | "dollar";
};

export const propertyConditionOptions: {
  [key: string]: PropertyConditionOptionsType;
} = {
  入居可能日: {
    key: "入居可能日",
    icon: Calendar,
    label: "入居可能日",
    type: "date",
  },
  物件写真: {
    key: "物件写真",
    icon: Image,
    label: "物件写真",
    type: "url",
  },
  サウナ: {
    key: "サウナ",
    icon: Thermometer,
    label: "サウナ",
    type: "checkbox",
  },
  ミニマムステイ: {
    key: "ミニマムステイ",
    icon: Calendar,
    label: "ミニマムステイ",
    type: "select",
  },
  バスルームのシェア人数: {
    key: "バスルームのシェア人数",
    icon: BathIcon,
    label: "バスルーム人数",
    type: "select",
    unitType: "people",
  },
  家賃: {
    key: "家賃",
    icon: DollarSign,
    label: "家賃",
    type: "number",
    unitType: "dollar",
  },
  ステータス: {
    key: "ステータス",
    icon: CheckSquare,
    label: "ステータス",
    type: "status",
  },
  カップル可: {
    key: "カップル可",
    icon: Heart,
    label: "カップル可",
    type: "checkbox",
  },
  デポジット: {
    key: "デポジット",
    icon: BadgeDollarSign,
    label: "デポジット",
    type: "number",
    unitType: "dollar",
  },
  お問い合わせフォーム: {
    key: "お問い合わせフォーム",
    icon: Phone,
    label: "お問い合わせフォーム",
    type: "url",
  },
  最寄り駅: {
    key: "最寄り駅",
    icon: MapPin,
    label: "最寄り駅",
    type: "select",
  },
  住居人の性別: {
    key: "住居人の性別",
    icon: User,
    label: "住居人の性別",
    type: "select",
  },
  鍵付き: {
    key: "鍵付き",
    icon: Lock,
    label: "鍵付き",
    type: "checkbox",
  },
  エリア: {
    key: "エリア",
    icon: Map,
    label: "エリア",
    type: "select",
  },
  住居人の国籍: {
    key: "住居人の国籍",
    icon: User,
    label: "住居人の国籍",
    type: "select",
  },

  スタッフからのコメント: {
    key: "スタッフからのコメント",
    icon: FileText,
    label: "スタッフからのコメント",
    type: "rich_text",
  },
  プール: {
    key: "プール",
    icon: Waves,
    label: "プール",
    type: "checkbox",
  },
  退去予定日: {
    key: "退去予定日",
    icon: Calendar,
    label: "退去予定日",
    type: "date",
  },
  Wifi込み: {
    key: "Wifi込み",
    icon: Wifi,
    label: "Wifi込み",
    type: "checkbox",
  },
  光熱費込み: {
    key: "光熱費込み",
    icon: Lightbulb,
    label: "光熱費込み",
    type: "checkbox",
  },
  最寄り駅まで: {
    key: "最寄り駅まで",
    icon: MapPin,
    label: "最寄り駅まで",
    type: "select",
  },
  キッチンのシェア人数: {
    key: "キッチンのシェア人数",
    icon: Utensils,
    label: "キッチン人数",
    type: "select",
    unitType: "people",
  },
  顧客データ: {
    key: "顧客データ",
    icon: Users,
    label: "顧客データ",
    type: "relation",
  },
  ランドリー無料: {
    key: "ランドリー無料",
    icon: WashingMachine,
    label: "ランドリー無料",
    type: "checkbox",
  },
  ジム: {
    key: "ジム",
    icon: Dumbbell,
    label: "ジム",
    type: "checkbox",
  },
  住所: {
    key: "住所",
    icon: MapPin,
    label: "住所",
    type: "rich_text",
  },
  サムネイル: {
    key: "サムネイル",
    icon: Image,
    label: "サムネイル",
    type: "file",
  },
  ゾーン: {
    key: "ゾーン",
    icon: TrainFront,
    label: "ゾーン",
    type: "select",
  },
  物件のシェア人数: {
    key: "物件のシェア人数",
    icon: Users,
    label: "シェア人数",
    type: "select",
    unitType: "people",
  },
  タイトル: {
    key: "タイトル",
    icon: FileText,
    label: "タイトル",
    type: "title",
  },
  利用料: {
    key: "利用料",
    icon: DollarSign,
    label: "利用料",
    type: "number",
    unitType: "dollar",
  },
  対象: {
    //original
    key: "対象",
    icon: User,
    label: "対象",
    type: "対象",
  },
  入居日: {
    key: "入居日",
    icon: Calendar,
    label: "入居日",
    type: "入居日",
  },
};
// export const zoneAreaOptions = [{ zone1: ["ダウンタウン"] }];
