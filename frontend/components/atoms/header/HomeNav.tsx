import Link from "next/link";
import React, { FC, ReactNode } from "react";

type HomeNavProps = {
  children: ReactNode;
  href: string;
  className?: string;
};

const HomeNav: FC<HomeNavProps> = ({ children, href, className }) => {
  return (
    <li className={className}>
      <Link href={href}>{children}</Link>
    </li>
  );
};

export default HomeNav;
