"use client";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useState } from "react";
import { X } from "lucide-react";
import Link from "next/link";
import { headerOptions } from "@/utlis/headerOptions";

export function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className="flex items-center justify-center">
      <button className="" onClick={toggleMenu}>
        {isOpen ? (
          <X className="iconLabelItem h-6 w-6 hover:scale-110" />
        ) : (
          <HamburgerMenuIcon className="iconLabelItem h-6 w-6 hover:scale-110" />
        )}
      </button>

      {isOpen && (
        <Command className="fixed z-50 top-16 right-0 md:right-2 rounded-lg border shadow-md md:max-w-[300px] max-h-[200px]">
          {/* <CommandInput placeholder="Type a command or search..." /> */}
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="サービス案内">
              {headerOptions
                .filter((h) => h.category === "サービス案内")
                .map((h, index) => {
                  return (
                    <CommandItem key={index} className="cursor-pointer">
                      <Link
                        key={h.id}
                        href={h.href}
                        className="flex items-center w-full"
                        onClick={closeMenu}
                      >
                        <h.icon className="iconLabelItem" />
                        <span>{h.name}</span>
                      </Link>
                    </CommandItem>
                  );
                })}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="お問い合わせ">
              {headerOptions
                .filter((h) => h.category === "お問い合わせ")
                .map((h, index) => {
                  return (
                    <CommandItem key={index} className="cursor-pointer">
                      <Link href={h.href} className="flex items-center w-full">
                        <h.icon className="iconLabelItem" />
                        <span>{h.name}</span>
                      </Link>
                    </CommandItem>
                  );
                })}
            </CommandGroup>
          </CommandList>
        </Command>
      )}
    </div>
  );
}
