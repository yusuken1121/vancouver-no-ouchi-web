import HomeNav from "@/components/atoms/header/HomeNav";
import { headerOptions } from "@/utlis/headerOptions";
import React from "react";

const NavMenu = () => {
  return (
    <nav>
      <ul className="flex items-center gap-2">
        {headerOptions.map((h) => (
          <HomeNav
            key={h.id}
            href={h.href}
            className="flex items-center justify-center w-32 p-2 text-center rounded-md transition-all duration-300 ease-in-out hover:bg-slate-500 hover:cursor-pointer"
          >
            <div className="flex items-center">
              <h.icon className="iconLabelItem" />
              <span>{h.name}</span>
            </div>
          </HomeNav>
        ))}
      </ul>
    </nav>
  );
};

export default NavMenu;
