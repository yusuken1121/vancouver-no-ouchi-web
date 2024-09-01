// ユーザーに関する型定義
type NotionUser = {
  object: "user";
  id: string;
};

// 親要素に関する型定義
type NotionParent = {
  type: "database_id";
  database_id: string;
};

// 日付プロパティに関する型定義
type DateProperty = {
  id: string;
  type: "date";
  date: {
    start: string | null;
    end: string | null;
    time_zone: string | null;
  } | null;
};

// URLプロパティに関する型定義
type URLProperty = {
  id: string;
  type: "url";
  url: string | null;
};

// チェックボックスプロパティに関する型定義
type CheckboxProperty = {
  id: string;
  type: "checkbox";
  checkbox: boolean;
};

// 選択プロパティに関する型定義
type SelectProperty = {
  id: string;
  type: "select";
  select: {
    id: string;
    name: string;
    color: string;
  } | null;
};

// 数値プロパティに関する型定義
type NumberProperty = {
  id: string;
  type: "number";
  number: number | null;
};

// ステータスプロパティに関する型定義
type StatusProperty = {
  id: string;
  type: "status";
  status: {
    id: string;
    name: string;
    color: string;
  } | null;
};

// リッチテキストプロパティに関する型定義
type RichTextProperty = {
  id: string;
  type: "rich_text";
  rich_text: {
    type: string;
    text: {
      content: string;
      link: string | null;
    };
    annotations: {
      bold: boolean;
      italic: boolean;
      strikethrough: boolean;
      underline: boolean;
      code: boolean;
      color: string;
    };
    plain_text: string;
    href: string | null;
  }[];
};

// ファイルプロパティに関する型定義
type FilesProperty = {
  id: string;
  type: "files";
  files: {
    name: string;
    type: "file";
    file: {
      url: string;
      expiry_time: string;
    };
  }[];
};

// 関連プロパティに関する型定義
type RelationProperty = {
  id: string;
  type: "relation";
  relation: any[];
  has_more: boolean;
};

// タイトルプロパティに関する型定義
type TitleProperty = {
  id: string;
  type: "title";
  title: {
    type: "text";
    text: {
      content: string;
      link: string | null;
    };
    annotations: {
      bold: boolean;
      italic: boolean;
      strikethrough: boolean;
      underline: boolean;
      code: boolean;
      color: string;
    };
    plain_text: string;
    href: string | null;
  }[];
};

// プロパティデータに関する型定義
export type PropertyData = {
  入居可能日: DateProperty;
  物件写真: URLProperty;
  サウナ: CheckboxProperty;
  ミニマムステイ: SelectProperty;
  バスルームのシェア人数: SelectProperty;
  家賃: NumberProperty;
  ステータス: StatusProperty;
  カップル可: CheckboxProperty;
  デポジット: NumberProperty;
  お問い合わせフォーム: URLProperty;
  最寄り駅: SelectProperty;
  住居人の性別: SelectProperty;
  鍵付き: CheckboxProperty;
  エリア: SelectProperty;
  管理会社: RelationProperty;
  住居人の国籍: SelectProperty;
  男性限定: CheckboxProperty;
  スタッフからのコメント: RichTextProperty;
  プール: CheckboxProperty;
  退去予定日: DateProperty;
  女性限定: CheckboxProperty;
  Wifi込み: CheckboxProperty;
  光熱費込み: CheckboxProperty;
  最寄り駅まで: SelectProperty;
  キッチンのシェア人数: SelectProperty;
  顧客データ: RelationProperty;
  ランドリー無料: CheckboxProperty;
  ジム: CheckboxProperty;
  住所: RichTextProperty;
  サムネイル: FilesProperty;
  ゾーン: SelectProperty;
  物件のシェア人数: SelectProperty;
  タイトル: TitleProperty; // タイトルプロパティを追加
};

// Notionページ全体の型定義
export type NotionPage = {
  object: "page";
  id: string;
  created_time: string; // ISO 8601形式の日付
  last_edited_time: string; // ISO 8601形式の日付
  created_by: NotionUser;
  last_edited_by: NotionUser;
  cover: null | string; // 画像のURLやnullが入る
  icon: null | string; // アイコンのURLやnullが入る
  parent: NotionParent;
  archived: boolean;
  in_trash: boolean;
  properties: PropertyData;
  url: string;
  public_url: null | string;
};
