type DateProperty = {
  id: string;
  type: "date";
  date: {
    start: string | null;
    end: string | null;
    time_zone: string | null;
  } | null;
};

type URLProperty = {
  id: string;
  type: "url";
  url: string | null;
};

type CheckboxProperty = {
  id: string;
  type: "checkbox";
  checkbox: boolean;
};

type SelectProperty = {
  id: string;
  type: "select";
  select: {
    id: string;
    name: string;
    color: string;
  } | null;
};

type NumberProperty = {
  id: string;
  type: "number";
  number: number | null;
};

type StatusProperty = {
  id: string;
  type: "status";
  status: {
    id: string;
    name: string;
    color: string;
  } | null;
};

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

type PropertyData = {
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
  住居人の国籍: SelectProperty;
  男性限定: CheckboxProperty;
  プール: CheckboxProperty;
  退去予定日: DateProperty;
  女性限定: CheckboxProperty;
  管理会社: SelectProperty;
  Wifi込み: CheckboxProperty;
  光熱費込み: CheckboxProperty;
  "最寄り駅までの時間（分）": SelectProperty;
  キッチンのシェア人数: SelectProperty;
  ランドリー無料: CheckboxProperty;
  ジム: CheckboxProperty;
  住所: RichTextProperty;
  部屋写真: FilesProperty;
  ゾーン: SelectProperty;
  物件のシェア人数: SelectProperty;
  物件名: {
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
};
