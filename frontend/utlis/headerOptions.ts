import { Pencil1Icon } from "@radix-ui/react-icons";
import { HouseIcon, MailIcon, X } from "lucide-react";

type HeaderOptionsProps = {
  id: number;
  category: "サービス案内" | "お問い合わせ" | "その他";
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
};
export const headerOptions: HeaderOptionsProps[] = [
  {
    id: 1,
    category: "サービス案内",
    name: "部屋探し",
    href: "/properties",
    icon: HouseIcon,
  },
  {
    id: 2,
    category: "サービス案内",
    name: "ブログ",
    href: "/blog",
    icon: Pencil1Icon,
  },
  {
    id: 3,
    category: "お問い合わせ",
    name: "コンタクト",
    href: "/contact",
    icon: MailIcon,
  },
];
