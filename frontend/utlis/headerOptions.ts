import { Pencil1Icon } from "@radix-ui/react-icons";
import { HouseIcon, MailIcon, X } from "lucide-react";

type HeaderOptionsProps = {
  category: "サービス案内" | "お問い合わせ" | "その他";
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
};
export const headerOptions: HeaderOptionsProps[] = [
  {
    category: "サービス案内",
    name: "部屋探し",
    href: "/properties",
    icon: HouseIcon,
  },
  {
    category: "サービス案内",
    name: "ブログ",
    href: "/blog",
    icon: Pencil1Icon,
  },
  {
    category: "お問い合わせ",
    name: "コンタクト",
    href: "/contact",
    icon: MailIcon,
  },
];
